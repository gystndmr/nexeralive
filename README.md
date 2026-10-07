# NEXERA — nexeralive.com

NEXERA İnşaat kurumsal web sitesi. Tek dosya: `index.html` (three.js gömülü, harici bağımlılık yok).

## Sunucu (tek seferlik)
```
curl -fsSL https://raw.githubusercontent.com/gystndmr/nexeralive/main/kur.sh | bash
```
Kendi nginx konteynerinde (`nexeralive-web`) çalışır, Caddy için yalnızca `caddy-ek/nexeralive.caddy` dosyası yazılır; HALLET'in ana Caddyfile'ına ve Zoniq'e dokunulmaz.

## Güncelleme
`index.html` değişip `main`'e gönderildiğinde sunucu 3 dakika içinde yeni sürümü kendisi alır (`nexeralive-guncelle.timer`, günlük: `/var/log/nexeralive-guncelle.log`).

## Asistan ve talepler (API)
`api/server.js` — bağımlılıksız Node servisi, `nexeralive-api` konteynerinde (127.0.0.1:8091) çalışır; Caddy `/api/*` isteklerini oraya yönlendirir.
- `GET /api/durum` · `POST /api/asistan` (Claude; `ANTHROPIC_API_KEY` yoksa site kendi hazır yanıtlarını kullanır) · `POST /api/talep` · `GET /api/talepler?key=ADMIN_KEY`
- Talepler `/opt/nexeralive/data/talepler.jsonl` dosyasında saklanır.
- Yapay zekâyı açmak: `curl -fsSL https://raw.githubusercontent.com/gystndmr/nexeralive/main/kur.sh | ANTHROPIC_API_KEY=sk-ant-... bash`
