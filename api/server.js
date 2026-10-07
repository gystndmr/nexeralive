// NEXERA site API — assistant (Claude) + lead intake. Node 22, no dependencies.
// Env: ANTHROPIC_API_KEY (optional; without it the site uses its built-in answers), MODEL, ADMIN_KEY, PORT
import http from 'node:http';
import fs from 'node:fs';
import crypto from 'node:crypto';

const PORT = +(process.env.PORT || 8091);
const KEY = process.env.ANTHROPIC_API_KEY || '';
const MODEL = process.env.MODEL || 'claude-sonnet-5-5';
const BASE = process.env.ANTHROPIC_BASE_URL || 'https://api.anthropic.com';
const ADMIN = process.env.ADMIN_KEY || '';
const DATA = process.env.DATA_DIR || '/data';
const LEADS = DATA + '/talepler.jsonl';
fs.mkdirSync(DATA, { recursive: true });

const SYSTEM = `Sen NEXERA Asistan'sın: NEXERA İnşaat Ltd. Şti.'nin (nexeralive.com) web sitesindeki Türkçe danışman.
NEXERA: 2015'ten beri faaliyet gösteren, İstanbul Anadolu yakasında (özellikle Kadıköy) kentsel dönüşüm ve konut projeleri geliştiren yapı şirketi. Slogan: "The next era lives here." Değerleri: güvenlik tavizsiz, büyümeden önce kalite, şeffaflık, zamansız tasarım, NEXERA ALIVE akıllı yaşam (Base ALIVE, ALIVE+, SIGNATURE), satış sonrası NEXERA CARE.
İlk proje: Erenköy, Kadıköy — hazırlık aşamasında; fiyat, teslim tarihi, daire sayısı gibi bilgileri ASLA uydurma, "henüz açıklanmadı" de.
İletişim: info@nexeralive.com, +90 551 272 06 06, Yakacık Çarşı Mah. Rota Sk. B Blok No:1 B, Kartal/İstanbul.

Kurallar:
- Kısa, sıcak ve net yaz (en fazla ~120 kelime). Gerekirse kısa numaralı adımlar kullan. Markdown başlık kullanma.
- Kentsel dönüşüm (6306 sayılı Kanun), riskli yapı tespiti, malik kararı, kira yardımı, kat karşılığı hakkında genel bilgi ver. Oran, tutar, süre gibi değişebilen rakamlarda emin değilsen rakam verme; "güncel değeri birlikte teyit ederiz" de. Hukuki danışmanlık olmadığını gerektiğinde belirt.
- Rakip firmalar hakkında yorum yapma. Konu dışı isteklerde nazikçe kentsel dönüşüme dön.
- Kullanıcı binası için görüşme/ön değerlendirme isterse sırayla ad-soyad, telefon ve bina adresi ya da ada/parsel bilgisini iste. Hepsini aldıktan sonra bilgilerin kaydedilip ekibin aramasına AÇIKÇA onay iste. Yalnızca kullanıcı onay verirse talep_kaydet aracını çağır. Onay yoksa kaydetme.`;

const TOOLS = [{
  name: 'talep_kaydet',
  description: 'Kullanıcı açıkça onay verdikten sonra ön değerlendirme/görüşme talebini kaydeder; ekip kullanıcıyı arar.',
  input_schema: { type: 'object', properties: {
    ad: { type: 'string' }, telefon: { type: 'string' }, eposta: { type: 'string' },
    adres: { type: 'string', description: 'Bina adresi veya ada/parsel' }, konu: { type: 'string' }, not: { type: 'string' }
  }, required: ['ad', 'telefon'] }
}];

const hits = new Map();
function limited(ip, max, winMs){ const now = Date.now(); const a = (hits.get(ip) || []).filter(t => now - t < winMs); a.push(now); hits.set(ip, a); return a.length > max; }
function ipOf(req){ return (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket.remoteAddress || '?'; }
function readBody(req){ return new Promise((res, rej) => { let s = ''; req.on('data', c => { s += c; if (s.length > 32768) { rej(new Error('too large')); req.destroy(); } }); req.on('end', () => { try { res(JSON.parse(s || '{}')); } catch (e) { rej(e); } }); }); }
function send(res, code, obj, type = 'application/json'){ res.writeHead(code, { 'Content-Type': type + '; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(type === 'application/json' ? JSON.stringify(obj) : obj); }
const clean = (v, n = 300) => String(v ?? '').replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, n);

function saveLead(d, ip){
  const rec = { id: crypto.randomUUID(), zaman: new Date().toISOString(), ip,
    ad: clean(d.ad, 120), telefon: clean(d.telefon, 40), eposta: clean(d.eposta, 120), adres: clean(d.adres, 300),
    konu: clean(d.konu, 120), not: clean(d.not || d.mesaj, 1500), kaynak: clean(d.kaynak, 30) };
  fs.appendFileSync(LEADS, JSON.stringify(rec) + '\n');
  return rec;
}

async function claude(messages){
  const r = await fetch(BASE + '/v1/messages', { method: 'POST',
    headers: { 'x-api-key': KEY, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
    body: JSON.stringify({ model: MODEL, max_tokens: 700, system: SYSTEM, tools: TOOLS, messages }) });
  if (!r.ok) throw new Error('anthropic ' + r.status + ' ' + (await r.text()).slice(0, 200));
  return r.json();
}

async function asistan(body, ip){
  const msgs = (Array.isArray(body.messages) ? body.messages : []).slice(-16)
    .filter(m => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map(m => ({ role: m.role, content: clean(m.content, 2000) }));
  while (msgs.length && msgs[0].role !== 'user') msgs.shift();
  if (!msgs.length) return { reply: 'Merhaba, size nasıl yardımcı olabilirim?' };
  let saved = false;
  for (let i = 0; i < 3; i++){
    const out = await claude(msgs);
    const text = out.content.filter(c => c.type === 'text').map(c => c.text).join('\n').trim();
    const tools = out.content.filter(c => c.type === 'tool_use');
    if (out.stop_reason !== 'tool_use' || !tools.length) return { reply: text || 'Anlayamadım, tekrar yazar mısınız?', saved };
    msgs.push({ role: 'assistant', content: out.content });
    msgs.push({ role: 'user', content: tools.map(t => { if (t.name === 'talep_kaydet'){ saveLead(Object.assign({ kaynak: 'asistan-ai' }, t.input), ip); saved = true; return { type: 'tool_result', tool_use_id: t.id, content: 'Talep kaydedildi.' }; } return { type: 'tool_result', tool_use_id: t.id, content: 'Bilinmeyen araç', is_error: true }; }) });
  }
  return { reply: 'Talebiniz alındı, ekibimiz sizinle iletişime geçecek.', saved };
}

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
function leadsPage(){
  const rows = fs.existsSync(LEADS) ? fs.readFileSync(LEADS, 'utf8').trim().split('\n').filter(Boolean).map(l => JSON.parse(l)).reverse() : [];
  return `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>NEXERA Talepler</title>
<style>body{font:14px system-ui;background:#05080f;color:#e8edf6;margin:0;padding:24px}h1{font-weight:500;letter-spacing:.2em;font-size:16px;color:#f6dca6}table{border-collapse:collapse;width:100%}td,th{border-bottom:1px solid #1d2a44;padding:8px;text-align:left;vertical-align:top}th{color:#8c9bb8;font-weight:400;font-size:12px;letter-spacing:.1em}a{color:#f6dca6}</style>
<h1>NEXERA · TALEPLER (${rows.length})</h1><div style="overflow-x:auto"><table><tr><th>ZAMAN</th><th>AD</th><th>TELEFON</th><th>E-POSTA</th><th>ADRES / ADA-PARSEL</th><th>KONU</th><th>NOT</th><th>KAYNAK</th></tr>
${rows.map(r => `<tr><td>${esc(new Date(r.zaman).toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' }))}</td><td>${esc(r.ad)}</td><td><a href="tel:${esc(r.telefon)}">${esc(r.telefon)}</a></td><td>${esc(r.eposta)}</td><td>${esc(r.adres)}</td><td>${esc(r.konu)}</td><td>${esc(r.not)}</td><td>${esc(r.kaynak)}</td></tr>`).join('')}</table></div>`;
}

http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x'); const ip = ipOf(req);
  try {
    if (req.method === 'GET' && url.pathname === '/api/durum') return send(res, 200, { ai: !!KEY });
    if (req.method === 'POST' && url.pathname === '/api/asistan'){
      if (!KEY) return send(res, 503, { error: 'ai kapalı' });
      if (limited('a' + ip, 40, 10 * 60e3)) return send(res, 429, { error: 'çok fazla istek' });
      return send(res, 200, await asistan(await readBody(req), ip));
    }
    if (req.method === 'POST' && url.pathname === '/api/talep'){
      if (limited('t' + ip, 6, 60 * 60e3)) return send(res, 429, { error: 'çok fazla istek' });
      const b = await readBody(req);
      if (!clean(b.ad) || !/\d{7,}/.test(String(b.telefon || '').replace(/\D/g, '')) && !/@/.test(String(b.eposta || ''))) return send(res, 400, { error: 'ad ve telefon/e-posta gerekli' });
      saveLead(b, ip); return send(res, 200, { ok: true });
    }
    if (req.method === 'GET' && url.pathname === '/api/talepler'){
      if (!ADMIN || url.searchParams.get('key') !== ADMIN) return send(res, 403, { error: 'yetkisiz' });
      return send(res, 200, leadsPage(), 'text/html');
    }
    send(res, 404, { error: 'bulunamadı' });
  } catch (e) { console.error(e.message); send(res, 500, { error: 'sunucu hatası' }); }
}).listen(PORT, () => console.log('nexera api :' + PORT + (KEY ? ' (ai açık)' : ' (ai kapalı)')));
