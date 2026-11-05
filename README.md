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

## Rehberler, İngilizce sayfalar ve SEO araçları (Kasım 2026)
- `node tools/rehber.mjs` → `/rehber/…`, `/en/…`, `/gizlilik/`, `/taslak/…` (içerik: `tools/icerik-*.mjs`, proje verisi: `tools/projeler.json`, kurumsal kimlik: `tools/kimlik.mjs`).
- `node tools/sayfalar.mjs` → kentsel dönüşüm rehberleri (artık sitemap/robots yazmaz).
- `node tools/bas-etiketleri.mjs` → mevcut sayfalara ölçüm betiği, TR↔EN hreflang, kurumsal yapısal veri, menüye Rehberler/EN (tekrar çalıştırılabilir; pages.py ile yeniden üretilen sayfalardan sonra mutlaka çalıştırın).
- Commit'ten SONRA `node tools/site-haritasi.mjs` → `sitemap.xml` (gerçek son değişiklik tarihleri, hreflang) ve `robots.txt`.
- Yayından sonra `node tools/indexnow.mjs <adresler>` → Bing/Yandex'e değişiklik bildirimi.
- Taslaklar (`/taslak/…`) noindex'tir, menüde ve sitemap'te yer almaz; avukat incelemesinden sonra `draft` kaldırılıp TR_GUIDES'a taşınır.
- Anonim ölçüm: `www/nx.js` → `POST /api/olay`; rapor: `GET /api/olaylar?key=ADMIN_KEY`. Çerez ve kişisel veri yok.
- Ölçüm soru seti ve kayıt şablonu: `docs/olcum/`.
