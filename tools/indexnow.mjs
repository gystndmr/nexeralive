// Bing / Yandex / Naver vb. IndexNow motorlarına değişen adresleri bildirir (Google IndexNow kullanmaz).
// Kullanım: node tools/indexnow.mjs https://nexeralive.com/en/ https://nexeralive.com/rehber/ …  (yayından SONRA)
const KEY = '3469a97dbd6b33b3dc81b37e03b4c27f', HOST = 'nexeralive.com';
const urlList = process.argv.slice(2); if (!urlList.length) { console.log('adres verin'); process.exit(1); }
const r = await fetch('https://api.indexnow.org/indexnow', { method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' }, body: JSON.stringify({ host: HOST, key: KEY, keyLocation: 'https://' + HOST + '/' + KEY + '.txt', urlList }) });
console.log('IndexNow', r.status, await r.text());
