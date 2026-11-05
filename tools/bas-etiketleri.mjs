// Mevcut (elle/başka araçla üretilmiş) sayfalara tekrar çalıştırılabilir SEO düzeltmeleri uygular:
// ölçüm betiği, TR↔EN hreflang, kurumsal yapısal veri (kimlik.mjs ile aynı), menüye Rehberler ve EN bağlantısı, giriş ekranı h1.
// Kullanım: node tools/bas-etiketleri.mjs
import fs from 'node:fs';
import { ORG, WEBSITE, SITE } from './kimlik.mjs';
const ROOT = new URL('../', import.meta.url).pathname;
const files = ['index.html'];
(function walk(d){ for (const e of fs.readdirSync(ROOT + 'www/' + d, { withFileTypes: true })){ if (e.isDirectory()) walk(d + e.name + '/'); else if (e.name === 'index.html' && d) files.push('www/' + d + 'index.html'); } })('');
// TR sayfa → EN karşılığı (karşılıklı olmalı; EN tarafı tools/rehber.mjs ile üretilir)
const PAIRS = { '/insaat/': '/en/' };
let changed = 0;
for (const f of files){
  const path = f === 'index.html' ? '/' : '/' + f.slice(4).replace(/index\.html$/, '');
  if (path.startsWith('/en/') || path.startsWith('/rehber/') || path === '/gizlilik/' || path.startsWith('/taslak/')) continue; // bunlar rehber.mjs'nin
  let s = fs.readFileSync(ROOT + f, 'utf8'); const o = s;
  // 1) ölçüm betiği
  if (!s.includes('src="/nx.js"')) s = s.replace('</head>', '<script src="/nx.js" defer></script></head>');
  // 2) hreflang
  if (PAIRS[path] && !s.includes('hreflang="en"')) s = s.replace(/(<link rel="canonical" href="[^"]+">)/, `$1<link rel="alternate" hreflang="tr" href="${SITE}${path}"><link rel="alternate" hreflang="en" href="${SITE}${PAIRS[path]}"><link rel="alternate" hreflang="x-default" href="${SITE}${PAIRS[path]}">`);
  // 3) kurumsal yapısal veri: aynı @id taşıyan düğümü kimlik.mjs ile eşitle
  s = s.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g, (m, j) => {
    try {
      const d = JSON.parse(j); const g = d['@graph'] || [d]; let hit = false;
      for (let i = 0; i < g.length; i++){
        if (g[i]['@id'] === ORG['@id']){ g[i] = Object.assign({}, g[i], ORG); hit = true; }
        if (g[i]['@type'] === 'WebSite' && !g[i]['@id']){ g[i] = Object.assign({}, g[i], { '@id': WEBSITE['@id'] }); hit = true; }
      }
      return hit ? `<script type="application/ld+json">${JSON.stringify(d['@graph'] ? d : g[0])}</script>` : m;
    } catch { return m; }
  });
  // 4) üst menü (pages.py sayfaları): Rehberler + EN
  if (s.includes('<nav class="topnav"') && !s.includes('href="/rehber/">REHBER')) s = s.replace(/(<nav class="topnav"[^>]*>[\s\S]*?)(<a href="\/technologies\/">)/, '$1<a href="/rehber/">REHBER</a>$2');
  if (path === '/insaat/' && s.includes('<nav class="topnav"') && !s.includes('hreflang="en" lang="en">EN')) s = s.replace(/(<nav class="topnav"[^>]*>[\s\S]*?)(<\/nav>)/, '$1<a href="/en/" hreflang="en" lang="en">EN</a>$2');
  // menü paneli (pages.py): Rehberler bağlantısı
  if (s.includes('href="/technologies/">NEXERA Technologies ↗</a></div>') && !s.includes('href="/rehber/">Alıcı ve yatırımcı rehberleri')) s = s.replace('<div class="pg"><a href="/technologies/">NEXERA Technologies ↗</a></div>', '<div class="pg"><a href="/rehber/">Alıcı ve yatırımcı rehberleri</a></div><div class="pg"><a href="/en/" hreflang="en" lang="en">English</a></div><div class="pg"><a href="/technologies/">NEXERA Technologies ↗</a></div>');
  // 4b) proje görüntüleme ölçümü
  if (['/projeler/', '/erenkoy-3d/', '/erenkoy-sokak/'].includes(path) && !/<body[^>]*data-proje=/.test(s)) s = s.replace(/<body(\s|>)/, '<body data-proje="erenkoy"$1');
  // 5) giriş ekranı: görünen sloganı ana başlık yap
  if (path === '/' && s.includes('<div class="tag">THE NEXT ERA LIVES HERE.</div>')){
    s = s.replace('<div class="tag">THE NEXT ERA LIVES HERE.</div>', '<h1 class="tag">THE NEXT ERA LIVES HERE.</h1>').replace('.tag{text-align:center;', '.tag{margin:0;text-align:center;');
  }
  if (s !== o){ fs.writeFileSync(ROOT + f, s); changed++; console.log('güncellendi', path); }
}
console.log(changed, 'dosya');
