#!/usr/bin/env bash
# NEXERA otomatik güncelleme (kur.sh tarafından /usr/local/bin/nexeralive-guncelle olarak kurulur; 3 dakikada bir çalışır)
# GitHub'daki depodan: index.html + www/ (rehber sayfaları, sitemap, görseller) → site; api/server.js → API; bu betiğin kendisi.
set -euo pipefail
BASE=/opt/nexeralive; WWW=$BASE/www
T=$(mktemp -d); trap 'rm -rf "$T"' EXIT
if curl -fsSL --max-time 60 "https://codeload.github.com/gystndmr/nexeralive/tar.gz/refs/heads/main" -o "$T/r.tgz" && tar xzf "$T/r.tgz" -C "$T" && [ -d "$T/nexeralive-main" ]; then
  R=$T/nexeralive-main
  # site
  if [ -s "$R/index.html" ] && grep -q "NEXERA" "$R/index.html"; then
    mkdir -p "$T/site"; cp "$R/index.html" "$T/site/"; [ -d "$R/www" ] && cp -r "$R/www/." "$T/site/"
    if ! diff -rq "$T/site" "$WWW" >/dev/null 2>&1; then
      cp -r "$T/site/." "$WWW/"; chmod -R a+rX "$WWW"; echo "$(date -Is) site güncellendi"
    fi
  fi
  # api
  if [ -s "$R/api/server.js" ] && grep -q "createServer" "$R/api/server.js" && ! cmp -s "$R/api/server.js" "$BASE/api/server.js"; then
    install -m 644 "$R/api/server.js" "$BASE/api/server.js"; docker restart nexeralive-api >/dev/null 2>&1 || true; echo "$(date -Is) api güncellendi"
  fi
  # bu betik
  if [ -s "$R/guncelle.sh" ] && grep -q "nexeralive" "$R/guncelle.sh" && bash -n "$R/guncelle.sh" && ! cmp -s "$R/guncelle.sh" /usr/local/bin/nexeralive-guncelle; then
    install -m 755 "$R/guncelle.sh" /usr/local/bin/nexeralive-guncelle; echo "$(date -Is) güncelleyici güncellendi"
  fi
else
  # yedek yol: yalnızca index.html
  curl -fsSL "https://raw.githubusercontent.com/gystndmr/nexeralive/main/index.html?t=$(date +%s)" -o "$T/i.html" || exit 0
  if [ -s "$T/i.html" ] && grep -q "NEXERA" "$T/i.html" && ! cmp -s "$T/i.html" "$WWW/index.html"; then install -m 644 "$T/i.html" "$WWW/index.html"; echo "$(date -Is) site güncellendi (yedek yol)"; fi
fi
