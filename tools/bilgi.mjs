// Deniz (AI danışman) için rehber bilgisini api/server.js içine gömer (BILGI:BASLA … BILGI:BITIS).
// Rehber metni değişince çalıştırın: node tools/bilgi.mjs
import fs from 'node:fs';
import { EN_GUIDE_LIST } from './icerik-en.mjs';
const ROOT = new URL('../', import.meta.url).pathname;
const txt = h => String(h || '')
  .replace(/<\/(p|li|h2|h3|tr|div)>/g, '\n').replace(/<(td|th)[^>]*>/g, ' | ')
  .replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/[ \t]+/g, ' ').replace(/\n\s*\n+/g, '\n').trim();
const parts = EN_GUIDE_LIST.map(g => `### ${g.title} (${g.path}, checked ${g.updated})\n${txt(g.answer)}\n${txt(g.body)}`);
const bilgi = parts.join('\n\n');
const f = ROOT + 'api/server.js';
const s = fs.readFileSync(f, 'utf8');
const out = s.replace(/\/\/ BILGI:BASLA\n[\s\S]*?\/\/ BILGI:BITIS/, `// BILGI:BASLA\nconst BILGI = ${JSON.stringify(bilgi).replace(/\$\{/g, '$\\u007b')};\n// BILGI:BITIS`);
fs.writeFileSync(f, out);
console.log('BILGI', bilgi.split(/\s+/).length, 'kelime');
