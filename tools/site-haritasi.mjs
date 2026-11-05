// sitemap.xml + robots.txt üretir. Kullanım: node tools/site-haritasi.mjs (değişiklikleri commit ettikten SONRA çalıştırın;
// lastmod her sayfanın git'teki son gerçek değişiklik tarihidir). Yalnızca canonical'ı kendisini gösteren, noindex olmayan sayfalar girer.
import fs from 'node:fs';
import { execSync } from 'node:child_process';
const ROOT = new URL('../', import.meta.url).pathname, WWW = ROOT + 'www/', SITE = 'https://nexeralive.com';
const files = ['index.html'];
(function walk(d){ for (const e of fs.readdirSync(WWW + d, { withFileTypes: true })){ if (e.isDirectory()) walk(d + e.name + '/'); else if (e.name === 'index.html' && d) files.push('www/' + d + 'index.html'); } })('');
const urls = [];
for (const f of files){
  const s = fs.readFileSync(ROOT + f, 'utf8');
  if (/<meta name="robots" content="[^"]*noindex/i.test(s)) continue;
  const url = f === 'index.html' ? SITE + '/' : SITE + '/' + f.slice(4).replace(/index\.html$/, '');
  const can = (s.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
  if (!can || can !== url) continue;
  let lm = ''; try { lm = execSync(`git -C "${ROOT}" log -1 --format=%cs -- "${f}"`).toString().trim(); } catch {}
  if (!lm) lm = new Date().toISOString().slice(0, 10);
  const alts = [...s.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)">/g)].map(m => [m[1], m[2]]);
  urls.push({ url, lm, alts });
}
urls.sort((a, b) => a.url.localeCompare(b.url));
fs.writeFileSync(WWW + 'sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
  urls.map(u => `  <url><loc>${u.url}</loc><lastmod>${u.lm}</lastmod>${u.alts.map(([l, h]) => `<xhtml:link rel="alternate" hreflang="${l}" href="${h}"/>`).join('')}</url>`).join('\n') + '\n</urlset>\n');
fs.writeFileSync(WWW + 'robots.txt', `# NEXERA — nexeralive.com
# Arama ve kullanıcı isteğiyle sayfa getiren botlara açık (Google, Bing, ChatGPT arama, Claude arama, Perplexity, Apple).
# Yalnızca yapay zekâ modeli EĞİTİMİ için toplayan botlar kapalı; bu kapatma arama görünürlüğünü etkilemez (bkz. her firmanın resmî bot dokümanı).
# Google-Extended bilerek kapatılmadı: Gemini'nin yanıt verirken siteyi kaynak göstermesini (grounding) de yönetir. Karar şirkete aittir.

User-agent: GPTBot
User-agent: ClaudeBot
User-agent: CCBot
User-agent: Applebot-Extended
User-agent: meta-externalagent
Disallow: /

User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${SITE}/sitemap.xml
`);
console.log('sitemap:', urls.length, 'adres');
