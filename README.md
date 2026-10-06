# NEXERA — nexeralive.com

NEXERA İnşaat kurumsal web sitesi. Tek dosya: `index.html` (three.js gömülü, harici bağımlılık yok).

## Sunucu (tek seferlik)
```
curl -fsSL https://raw.githubusercontent.com/gystndmr/nexeralive/main/kur.sh | bash
```
Kendi nginx konteynerinde (`nexeralive-web`) çalışır, sunucudaki mevcut Caddy'ye `nexeralive.com` bloğu eklenir. Zoniq'ten bağımsızdır.

## Güncelleme
`index.html` değişip `main`'e gönderildiğinde sunucu 3 dakika içinde yeni sürümü kendisi alır (`nexeralive-guncelle.timer`, günlük: `/var/log/nexeralive-guncelle.log`).
