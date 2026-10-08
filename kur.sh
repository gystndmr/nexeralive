#!/usr/bin/env bash
# NEXERA — nexeralive.com sunucu kurulumu (Zoniq'ten tamamen bağımsız).
# Kullanım (root):  curl -fsSL https://raw.githubusercontent.com/gystndmr/nexeralive/main/kur.sh | bash
#  * Site dosyaları: /opt/nexeralive/www  → kendi nginx konteyneri "nexeralive-web" (127.0.0.1:8090)
#  * Sunucudaki Caddy'nin ek siteler klasörüne (caddy-ek/nexeralive.caddy) kendi dosyası yazılır; HALLET'in ana Caddyfile'ına dokunulmaz
#  * API (asistan + talepler): kendi konteyneri "nexeralive-api" (127.0.0.1:8091); /api/* oraya yönlenir
#    Yapay zekâ için: curl ... | ANTHROPIC_API_KEY=sk-ant-... bash   (anahtar /opt/nexeralive/api.env içinde saklanır)
#  * Otomatik güncelleme: GitHub'daki site (index.html + www/), api/server.js ve güncelleyicinin kendisi 3 dakikada bir kontrol edilir (nexeralive-guncelle.timer)
#  * Yeni talep bildirimi: talepler sayfasında telefona bildirim (ntfy) bağlantısı yer alır
set -euo pipefail
[ "$(id -u)" = 0 ] || { echo "root olarak çalıştırın"; exit 1; }
D=nexeralive.com
BASE=/opt/nexeralive
WWW=$BASE/www
RAW=https://raw.githubusercontent.com/gystndmr/nexeralive/main
NAME=nexeralive-web
MARK="# nexera:$D"

echo "==> 1/5 Eski geçici kurulum (Zoniq üzerinden yapılan) temizleniyor"
docker rm -f site-nexeralive-com >/dev/null 2>&1 || true
rm -rf /srv/siteler/nexeralive.com /srv/siteler/.nexeralive.com.port
rmdir /srv/siteler 2>/dev/null || true

echo "==> 2/5 Site dosyaları indiriliyor"
mkdir -p "$WWW"
curl -fsSL "$RAW/index.html?t=$(date +%s)" -o "$WWW/index.html.yeni"
grep -q "NEXERA" "$WWW/index.html.yeni" && mv "$WWW/index.html.yeni" "$WWW/index.html"
chmod 644 "$WWW/index.html"
# nginx ayarı: göreli yönlendirme, sıkıştırma, rehber sayfaları için klasör dizini
cat > "$BASE/nginx.conf" <<'NGX'
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;
    absolute_redirect off;
    gzip on; gzip_types text/css application/javascript application/json image/svg+xml text/xml application/xml text/plain;
    location = /index.html { add_header Cache-Control "no-cache"; }
    location = / { add_header Cache-Control "no-cache"; try_files /index.html =404; }
    location ~* \.(jpg|jpeg|png|webp|svg|woff2?)$ { add_header Cache-Control "public, max-age=604800"; }
    location / { try_files $uri $uri/ =404; }
    error_page 404 /index.html;
}
NGX

echo "==> 3/5 Web sunucusu (nginx) başlatılıyor"
PORTF=$BASE/port
if [ ! -s "$PORTF" ]; then
  for p in $(seq 8090 8139); do ss -ltnH "( sport = :$p )" | grep -q . || { echo "$p" > "$PORTF"; break; }; done
fi
P=$(cat "$PORTF")
docker rm -f "$NAME" >/dev/null 2>&1 || true
docker run -d --name "$NAME" --restart unless-stopped -p "127.0.0.1:$P:80" -v "$WWW":/usr/share/nginx/html:ro -v "$BASE/nginx.conf":/etc/nginx/conf.d/default.conf:ro nginx:alpine >/dev/null
echo "    $NAME → 127.0.0.1:$P"

echo "==> 3b/5 API (asistan + talepler) başlatılıyor"
mkdir -p "$BASE/api" "$BASE/data"
curl -fsSL "$RAW/api/server.js?t=$(date +%s)" -o "$BASE/api/server.js"
ENVF=$BASE/api.env; touch "$ENVF"; chmod 600 "$ENVF"
setenv(){ grep -v "^$1=" "$ENVF" > "$ENVF.t" || true; echo "$1=$2" >> "$ENVF.t"; mv "$ENVF.t" "$ENVF"; chmod 600 "$ENVF"; }
[ -n "${ANTHROPIC_API_KEY:-}" ] && setenv ANTHROPIC_API_KEY "$ANTHROPIC_API_KEY"
[ -n "${MODEL:-}" ] && setenv MODEL "$MODEL"
grep -q '^ADMIN_KEY=' "$ENVF" || setenv ADMIN_KEY "$(openssl rand -hex 12 2>/dev/null || date +%s%N | sha256sum | cut -c1-24)"
docker rm -f nexeralive-api >/dev/null 2>&1 || true
docker run -d --name nexeralive-api --restart unless-stopped -p 127.0.0.1:8091:8091 --env-file "$ENVF" \
  -v "$BASE/api":/app:ro -v "$BASE/data":/data node:22-alpine node /app/server.js >/dev/null
echo "    nexeralive-api → 127.0.0.1:8091 ($(grep -q '^ANTHROPIC_API_KEY=' "$ENVF" && echo 'yapay zekâ AÇIK' || echo 'yapay zekâ kapalı, hazır yanıtlar'))"

echo "==> 4/5 Caddy'ye $D ekleniyor (HALLET'in ek siteler klasörü: caddy-ek, ana dosyaya dokunulmaz)"
CADDY=$(docker ps --format '{{.Names}}' | grep -i caddy | head -1 || true)
[ -n "$CADDY" ] || { echo "    HATA: çalışan Caddy konteyneri bulunamadı"; exit 2; }
EK=$(docker inspect -f '{{range .Mounts}}{{if eq .Destination "/etc/caddy/ek"}}{{.Source}}{{end}}{{end}}' "$CADDY")
[ -n "$EK" ] && [ -d "$EK" ] || { echo "    HATA: Caddy'nin ek siteler klasörü (/etc/caddy/ek) bulunamadı; değişiklik yapılmadı"; exit 3; }
[ -f "$EK/nexeralive.caddy" ] && cp "$EK/nexeralive.caddy" "$BASE/nexeralive.caddy.yedek"
printf '%s, www.%s {\n    encode gzip\n    handle /api/* {\n        reverse_proxy 127.0.0.1:8091\n    }\n    handle {\n        reverse_proxy 127.0.0.1:%s\n    }\n}\n' "$D" "$D" "$P" > "$EK/nexeralive.caddy"
if docker exec "$CADDY" caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile >/dev/null 2>&1; then
  docker exec "$CADDY" caddy reload --config /etc/caddy/Caddyfile --adapter caddyfile >/dev/null 2>&1 && echo "    Caddy ayarı yeniden okundu ($EK/nexeralive.caddy)"
else
  if [ -f "$BASE/nexeralive.caddy.yedek" ]; then cp "$BASE/nexeralive.caddy.yedek" "$EK/nexeralive.caddy"; else rm -f "$EK/nexeralive.caddy"; fi
  echo "    HATA: yeni ayar doğrulanamadı, önceki ayar geri yüklendi (Caddy eski ayarla çalışmaya devam ediyor)"; exit 4
fi

echo "==> 5/5 Otomatik güncelleme kuruluyor (3 dakikada bir)"
curl -fsSL "$RAW/guncelle.sh?t=$(date +%s)" -o /usr/local/bin/nexeralive-guncelle.yeni && bash -n /usr/local/bin/nexeralive-guncelle.yeni && mv /usr/local/bin/nexeralive-guncelle.yeni /usr/local/bin/nexeralive-guncelle
chmod 755 /usr/local/bin/nexeralive-guncelle
cat > /etc/systemd/system/nexeralive-guncelle.service <<'UNIT'
[Unit]
Description=NEXERA site güncelleme
[Service]
Type=oneshot
ExecStart=/bin/bash -c '/usr/local/bin/nexeralive-guncelle >> /var/log/nexeralive-guncelle.log 2>&1'
UNIT
cat > /etc/systemd/system/nexeralive-guncelle.timer <<'UNIT'
[Unit]
Description=NEXERA site güncelleme (3 dakikada bir)
[Timer]
OnBootSec=2min
OnUnitActiveSec=3min
[Install]
WantedBy=timers.target
UNIT
systemctl daemon-reload && systemctl enable --now nexeralive-guncelle.timer >/dev/null
/usr/local/bin/nexeralive-guncelle || true   # rehber sayfaları, sitemap ve paylaşım görselini hemen indir

sleep 6
echo "==> Kontrol"
curl -s -o /dev/null -w "    https://$D → HTTP %{http_code}\n" --max-time 20 "https://$D/" || echo "    HTTPS sertifikası birkaç saniye içinde alınacak."
echo "==> Tamam. Site: https://$D"
AK=$(grep '^ADMIN_KEY=' "$ENVF" | cut -d= -f2)
echo "    Talepler: https://$D/api/talepler?key=$AK"
echo "    Telefona bildirim (ntfy uygulamasında abone olun): nexera-$(printf '%s' "nexera-ntfy:$AK" | sha256sum | cut -c1-20)"
