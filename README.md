# NEXERA — nexeralive.com

NEXERA İnşaat kurumsal web sitesi. Tek dosya: `index.html` (three.js gömülü, harici bağımlılık yok).

## Sunucu (tek seferlik)
```
curl -fsSL https://raw.githubusercontent.com/gystndmr/nexeralive/main/kur.sh | bash
```
Kendi nginx konteynerinde (`nexeralive-web`) çalışır, Caddy için yalnızca `caddy-ek/nexeralive.caddy` dosyası yazılır; HALLET'in ana Caddyfile'ına ve Zoniq'e dokunulmaz.

## Güncelleme
`index.html` değişip `main`'e gönderildiğinde sunucu 3 dakika içinde yeni sürümü kendisi alır (`nexeralive-guncelle.timer`, günlük: `/var/log/nexeralive-guncelle.log`).
