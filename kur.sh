#!/usr/bin/env bash
# NEXERA — nexeralive.com sunucu kurulumu (Zoniq'ten tamamen bağımsız).
# Kullanım (root):  curl -fsSL https://raw.githubusercontent.com/gystndmr/nexeralive/main/kur.sh | bash
#  * Site dosyaları: /opt/nexeralive/www  → kendi nginx konteyneri "nexeralive-web" (127.0.0.1:8090)
#  * Sunucudaki Caddy'nin ek siteler klasörüne (caddy-ek/nexeralive.caddy) kendi dosyası yazılır; HALLET'in ana Caddyfile'ına dokunulmaz
#  * Otomatik güncelleme: GitHub'daki index.html 3 dakikada bir kontrol edilir (nexeralive-guncelle.timer)
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

echo "==> 2/5 Site dosyası indiriliyor"
mkdir -p "$WWW"
curl -fsSL "$RAW/index.html?t=$(date +%s)" -o "$WWW/index.html.yeni"
grep -q "NEXERA" "$WWW/index.html.yeni" && mv "$WWW/index.html.yeni" "$WWW/index.html"
chmod 644 "$WWW/index.html"

echo "==> 3/5 Web sunucusu (nginx) başlatılıyor"
PORTF=$BASE/port
if [ ! -s "$PORTF" ]; then
  for p in $(seq 8090 8139); do ss -ltnH "( sport = :$p )" | grep -q . || { echo "$p" > "$PORTF"; break; }; done
fi
P=$(cat "$PORTF")
docker rm -f "$NAME" >/dev/null 2>&1 || true
docker run -d --name "$NAME" --restart unless-stopped -p "127.0.0.1:$P:80" -v "$WWW":/usr/share/nginx/html:ro nginx:alpine >/dev/null
echo "    $NAME → 127.0.0.1:$P"

echo "==> 4/5 Caddy'ye $D ekleniyor (HALLET'in ek siteler klasörü: caddy-ek, ana dosyaya dokunulmaz)"
CADDY=$(docker ps --format '{{.Names}}' | grep -i caddy | head -1 || true)
[ -n "$CADDY" ] || { echo "    HATA: çalışan Caddy konteyneri bulunamadı"; exit 2; }
EK=$(docker inspect -f '{{range .Mounts}}{{if eq .Destination "/etc/caddy/ek"}}{{.Source}}{{end}}{{end}}' "$CADDY")
[ -n "$EK" ] && [ -d "$EK" ] || { echo "    HATA: Caddy'nin ek siteler klasörü (/etc/caddy/ek) bulunamadı; değişiklik yapılmadı"; exit 3; }
printf '%s, www.%s {\n    encode gzip\n    reverse_proxy 127.0.0.1:%s\n}\n' "$D" "$D" "$P" > "$EK/nexeralive.caddy"
if docker exec "$CADDY" caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile >/dev/null 2>&1; then
  docker exec "$CADDY" caddy reload --config /etc/caddy/Caddyfile --adapter caddyfile >/dev/null 2>&1 && echo "    Caddy ayarı yeniden okundu ($EK/nexeralive.caddy)"
else
  rm -f "$EK/nexeralive.caddy"; echo "    HATA: ayar doğrulanamadı, nexeralive.caddy kaldırıldı (Caddy eski ayarla çalışmaya devam ediyor)"; exit 4
fi

echo "==> 5/5 Otomatik güncelleme kuruluyor (3 dakikada bir)"
cat > /usr/local/bin/nexeralive-guncelle <<'UPD'
#!/usr/bin/env bash
set -euo pipefail
WWW=/opt/nexeralive/www
T=$(mktemp)
curl -fsSL "https://raw.githubusercontent.com/gystndmr/nexeralive/main/index.html?t=$(date +%s)" -o "$T" || { rm -f "$T"; exit 0; }
if [ -s "$T" ] && grep -q "NEXERA" "$T" && ! cmp -s "$T" "$WWW/index.html"; then
  install -m 644 "$T" "$WWW/index.html"; echo "$(date -Is) site güncellendi"
fi
rm -f "$T"
UPD
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

sleep 6
echo "==> Kontrol"
curl -s -o /dev/null -w "    https://$D → HTTP %{http_code}\n" --max-time 20 "https://$D/" || echo "    HTTPS sertifikası birkaç saniye içinde alınacak."
echo "==> Tamam. Site: https://$D"
