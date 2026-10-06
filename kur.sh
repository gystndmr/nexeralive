#!/usr/bin/env bash
# NEXERA — nexeralive.com sunucu kurulumu (Zoniq'ten tamamen bağımsız).
# Kullanım (root):  curl -fsSL https://raw.githubusercontent.com/gystndmr/nexeralive/main/kur.sh | bash
#  * Site dosyaları: /opt/nexeralive/www  → kendi nginx konteyneri "nexeralive-web" (127.0.0.1:8090)
#  * Sunucuda 80/443'ü dinleyen mevcut Caddy'ye nexeralive.com bloğu eklenir (HTTPS otomatik)
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

echo "==> 4/5 Caddy'ye $D ekleniyor"
CADDY=$(docker ps --format '{{.Names}}' | grep -i caddy | head -1 || true)
[ -n "$CADDY" ] || { echo "    HATA: çalışan Caddy konteyneri bulunamadı"; exit 2; }
MNT=$(docker inspect -f '{{range .Mounts}}{{.Destination}}|{{.Source}}{{"\n"}}{{end}}' "$CADDY")
LINE=$(echo "$MNT" | awk -F'|' '$1 ~ /Caddyfile$/ {print; exit}')
if [ -n "$LINE" ]; then IN=${LINE%%|*}; SRC=${LINE#*|}
else LINE=$(echo "$MNT" | awk -F'|' '$1=="/etc/caddy" {print; exit}'); IN=${LINE%%|*}/Caddyfile; SRC=${LINE#*|}/Caddyfile; fi
[ -f "$SRC" ] || { echo "    HATA: Caddyfile bulunamadı ($CADDY)"; exit 3; }
echo "    Caddy: $CADDY  dosya: $SRC"
BK="$SRC.yedek.$(date +%F_%H%M%S)"; cp "$SRC" "$BK"
# eski geçici blok ("# zoniq:nexeralive.com") ve önceki NEXERA bloğu çıkarılır, yenisi eklenir
awk -v m1="# zoniq:$D" -v m2="$MARK" 'skip&&/^}/{skip=0;next} skip{next} $0==m1||$0==m2{skip=1;next} {print}' "$BK" > "$SRC.tmp"
printf '\n%s\n%s, www.%s {\n    encode gzip\n    header {\n        Strict-Transport-Security "max-age=31536000"\n        X-Content-Type-Options nosniff\n    }\n    reverse_proxy 127.0.0.1:%s\n}\n' "$MARK" "$D" "$D" "$P" >> "$SRC.tmp"
cat "$SRC.tmp" > "$SRC"; rm -f "$SRC.tmp"
if docker exec "$CADDY" caddy validate --config "$IN" --adapter caddyfile >/dev/null 2>&1; then
  docker exec "$CADDY" caddy reload --config "$IN" --adapter caddyfile >/dev/null 2>&1 || docker restart "$CADDY" >/dev/null
  echo "    Caddy yeniden yüklendi (yedek: $BK)"
else
  echo "    HATA: yapılandırma doğrulanamadı, yedek geri yüklendi"; cat "$BK" > "$SRC"; exit 4
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
