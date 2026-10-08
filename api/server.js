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
const AR_DIR = DATA + '/ar';
const AR_FILES = { 'erenkoy-maket.usdz':'model/vnd.usdz+zip', 'erenkoy-gercek.usdz':'model/vnd.usdz+zip', 'erenkoy-maket.glb':'model/gltf-binary', 'erenkoy-gercek.glb':'model/gltf-binary' };
const AR_SRC = 'https://raw.githubusercontent.com/gystndmr/nexeralive/';
// phone push notifications for new leads via ntfy (topic is secret, derived from ADMIN_KEY unless NTFY_TOPIC is set)
const NTFY = process.env.NTFY_TOPIC || (ADMIN ? 'nexera-' + crypto.createHash('sha256').update('nexera-ntfy:' + ADMIN).digest('hex').slice(0, 20) : '');
const NTFY_URL = (process.env.NTFY_SERVER || 'https://ntfy.sh') + '/' + NTFY;
const KAYNAK = { 'form':'İletişim formu', 'asistan-ai':'NEXERA Asistan', 'asistan':'NEXERA Asistan', 'hesaplayici':'Binam ne kazanır?', 'risk-testi':'Riskli yapı testi' };
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
    konu: clean(d.konu, 120), not: String(d.not || d.mesaj || '').split('\n').map(l => clean(l, 400)).filter(Boolean).join('\n').slice(0, 2000), kaynak: clean(d.kaynak, 30) };
  fs.appendFileSync(LEADS, JSON.stringify(rec) + '\n');
  notify(rec).catch(e => console.error('bildirim', e.message));
  return rec;
}

const ascii = s => s.replace(/[^\x20-\x7e]/g, c => ({ 'ı':'i','İ':'I','ş':'s','Ş':'S','ğ':'g','Ğ':'G','ü':'u','Ü':'U','ö':'o','Ö':'O','ç':'c','Ç':'C','²':'2' }[c] || ''));
async function notify(rec){
  if (!NTFY) return;
  const ad = rec.ad.split(/\s+/); const kisa = ad[0] + (ad.length > 1 ? ' ' + ad[ad.length - 1][0] + '.' : '');
  const ozet = (rec.not || '').split('\n')[0].slice(0, 160);
  const body = [kisa, rec.adres && ('Adres: ' + rec.adres.slice(0, 80)), ozet].filter(Boolean).join('\n');
  const r = await fetch(NTFY_URL, { method: 'POST', body, headers: { 'Title': ascii('Yeni talep - ' + (KAYNAK[rec.kaynak] || rec.kaynak || 'site')), 'Tags': 'house', 'Priority': '4', 'Click': 'https://nexeralive.com/api/talepler' } });
  if (!r.ok) throw new Error('ntfy ' + r.status);
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
  const sub = NTFY ? `<div class="sub"><b>TELEFONA ANLIK BİLDİRİM</b><p>Yeni talep geldiğinde telefonunuza bildirim düşsün: telefonunuza <a href="https://ntfy.sh/app" target="_blank">ntfy</a> uygulamasını kurun (App Store / Google Play, ücretsiz), <b>+</b> ile abone olun ve şu konu adını yazın:</p><code>${NTFY}</code><p>Ya da telefonda bu bağlantıyı açın: <a href="${NTFY_URL}" target="_blank">${NTFY_URL}</a> · <a href="/api/bildirim-test">Test bildirimi gönder</a></p><small>Bu konu adını kimseyle paylaşmayın. Bildirimde telefon numarası yer almaz; ayrıntılar bu sayfadadır.</small></div>` : '';
  const rows = fs.existsSync(LEADS) ? fs.readFileSync(LEADS, 'utf8').trim().split('\n').filter(Boolean).map(l => JSON.parse(l)).reverse() : [];
  return `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>NEXERA Talepler</title>
<style>body{font:14px system-ui;background:#05080f;color:#e8edf6;margin:0;padding:24px}h1{font-weight:500;letter-spacing:.2em;font-size:16px;color:#f6dca6}table{border-collapse:collapse;width:100%}td,th{border-bottom:1px solid #1d2a44;padding:8px;text-align:left;vertical-align:top}th{color:#8c9bb8;font-weight:400;font-size:12px;letter-spacing:.1em}a{color:#f6dca6}td:nth-child(7){white-space:pre-wrap;max-width:420px}.sub{border:1px solid #2a3a5c;padding:14px 18px;margin:0 0 22px;max-width:760px;line-height:1.6}.sub b{color:#f6dca6;font-weight:500}.sub code{display:inline-block;background:#0d1730;padding:6px 10px;margin:4px 0;font-size:15px;user-select:all}.sub small{color:#8c9bb8}</style>
<h1>NEXERA · TALEPLER (${rows.length})</h1>${sub}<div style="overflow-x:auto"><table><tr><th>ZAMAN</th><th>AD</th><th>TELEFON</th><th>E-POSTA</th><th>ADRES / ADA-PARSEL</th><th>KONU</th><th>NOT</th><th>KAYNAK</th></tr>
${rows.map(r => `<tr><td>${esc(new Date(r.zaman).toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' }))}</td><td>${esc(r.ad)}</td><td><a href="tel:${esc(r.telefon)}">${esc(r.telefon)}</a></td><td>${esc(r.eposta)}</td><td>${esc(r.adres)}</td><td>${esc(r.konu)}</td><td>${esc(r.not)}</td><td>${esc(r.kaynak)}</td></tr>`).join('')}</table></div>`;
}

// AR models are kept in the repo; served here with the MIME types iOS Quick Look / Android Scene Viewer require
async function serveAR(res, name, ver){
  const type = AR_FILES[name]; if (!type) return send(res, 404, { error: 'yok' });
  const v = /^[0-9a-f]{7,40}$/.test(ver || '') ? ver : 'main';
  const file = `${AR_DIR}/${v}-${name}`;
  if (!fs.existsSync(file)){
    fs.mkdirSync(AR_DIR, { recursive: true });
    const r = await fetch(AR_SRC + v + '/ar/' + name); if (!r.ok) return send(res, 502, { error: 'model alınamadı' });
    fs.writeFileSync(file + '.tmp', Buffer.from(await r.arrayBuffer())); fs.renameSync(file + '.tmp', file);
  }
  const st = fs.statSync(file);
  res.writeHead(200, { 'Content-Type': type, 'Content-Length': st.size, 'Cache-Control': v === 'main' ? 'public, max-age=300' : 'public, max-age=31536000, immutable', 'Access-Control-Allow-Origin': '*' });
  fs.createReadStream(file).pipe(res);
}

http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x'); const ip = ipOf(req);
  try {
    if (req.method === 'GET' && url.pathname === '/api/durum') return send(res, 200, { ai: !!KEY });
    if ((req.method === 'GET' || req.method === 'HEAD') && url.pathname.startsWith('/api/ar/')) return serveAR(res, url.pathname.slice(8), url.searchParams.get('v'));
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
    if (req.method === 'GET' && (url.pathname === '/api/talepler' || url.pathname === '/api/bildirim-test')){
      const ck = /(?:^|;\s*)nxk=([0-9a-f]+)/.exec(req.headers.cookie || ''); const k = url.searchParams.get('key') || (ck && ck[1]);
      if (!ADMIN || k !== ADMIN) return send(res, 403, 'yetkisiz', 'text/plain');
      if (url.pathname === '/api/bildirim-test'){
        try { await notify({ ad: 'Test Bildirimi', adres: '', not: 'NEXERA bildirimleri çalışıyor.', kaynak: 'test' }); return send(res, 200, 'Test bildirimi gönderildi. Telefonunuza düşmediyse ntfy uygulamasındaki konu adını kontrol edin. <a href="/api/talepler">Geri</a>', 'text/html'); }
        catch (e) { return send(res, 502, 'Bildirim gönderilemedi: ' + esc(e.message), 'text/html'); }
      }
      res.setHeader('Set-Cookie', `nxk=${ADMIN}; Path=/api; Max-Age=31536000; HttpOnly; Secure; SameSite=Lax`);
      return send(res, 200, leadsPage(), 'text/html');
    }
    send(res, 404, { error: 'bulunamadı' });
  } catch (e) { console.error(e.message); if (!res.headersSent) send(res, 500, { error: 'sunucu hatası' }); else res.end(); }
}).listen(PORT, () => console.log('nexera api :' + PORT + (KEY ? ' (ai açık)' : ' (ai kapalı)')));
