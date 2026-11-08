// Deniz — NEXERA'nın yapay zekâ satış ve iletişim danışmanı (sohbet balonu). Her dilde yanıt verir; sunucu: /api/asistan
(function(){
  if (window.__nxDeniz) return; window.__nxDeniz = 1;
  var L = (document.documentElement.lang || 'tr').slice(0, 2);
  var EN = L !== 'tr';
  var T = EN ? {
    btn: 'Chat with us', title: 'Deniz · NEXERA', sub: 'AI sales assistant · replies in your language',
    hello: 'Hello, I’m Deniz, NEXERA’s AI assistant. Ask me about our Erenköy project, buying a home in Istanbul as a foreigner, costs or anything else — in any language. A team member can also call or WhatsApp you.',
    ph: 'Write a message…', send: 'Send', err: 'I can’t connect right now. You can reach the team directly on WhatsApp:', wa: 'WhatsApp +90 551 272 06 06',
    note: 'AI assistant — general information, not legal advice. Do not share ID or card details.', priv: 'Privacy', privUrl: '/en/privacy/',
    chips: ['Is anything on sale now?', 'Can foreigners buy in Istanbul?', 'What are the total costs?', 'Please contact me']
  } : {
    btn: 'Bize yazın', title: 'Deniz · NEXERA', sub: 'Yapay zekâ satış danışmanı · her dilde yanıt verir',
    hello: 'Merhaba, ben Deniz, NEXERA’nın yapay zekâ danışmanıyım. Erenköy projemiz, konut alımı, maliyetler ya da kentsel dönüşüm hakkında sorabilirsiniz. İsterseniz ekibimiz sizi arayabilir veya WhatsApp’tan yazabilir.',
    ph: 'Mesajınızı yazın…', send: 'Gönder', err: 'Şu an bağlanamıyorum. Ekibe doğrudan WhatsApp’tan ulaşabilirsiniz:', wa: 'WhatsApp +90 551 272 06 06',
    note: 'Yapay zekâ asistanı — genel bilgilendirme, hukuki danışmanlık değildir. Kimlik/kart bilgisi paylaşmayın.', priv: 'Gizlilik', privUrl: '/gizlilik/',
    chips: ['Şu an satışta daire var mı?', 'Konut alırken toplam maliyet ne?', 'Binam kentsel dönüşüme uygun mu?', 'Beni arayın']
  };
  var KEY = 'nxDeniz';
  var st; try { st = JSON.parse(sessionStorage.getItem(KEY) || 'null'); } catch (e) {}
  st = st || { open: false, m: [] };
  function save(){ try { sessionStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} }
  function ev(e){ try { window.nxEv && window.nxEv(e); } catch (x) {} }

  var css = '#nxd-b{position:fixed;right:18px;bottom:18px;z-index:9998;display:flex;align-items:center;gap:10px;padding:12px 18px 12px 12px;border-radius:999px;border:1px solid rgba(217,184,120,.45);background:#0b1426;color:#f6dca6;font:600 14px/1 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;letter-spacing:.02em;box-shadow:0 10px 30px rgba(0,0,0,.45);cursor:pointer}'
  + '#nxd-b i{width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,#d9b878,#f6dca6);display:grid;place-items:center;color:#040914;font-style:normal;font-weight:800}'
  + '#nxd-b:focus-visible,#nxd button:focus-visible,#nxd textarea:focus-visible{outline:2px solid #f6dca6;outline-offset:2px}'
  + '#nxd{position:fixed;right:18px;bottom:18px;z-index:9999;width:min(380px,calc(100vw - 24px));height:min(600px,calc(100dvh - 36px));display:none;flex-direction:column;background:#070e1c;border:1px solid rgba(217,184,120,.3);border-radius:18px;box-shadow:0 20px 60px rgba(0,0,0,.6);color:#e8edf6;font:15px/1.5 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;overflow:hidden}'
  + '#nxd.on{display:flex}#nxd header{display:flex;align-items:center;gap:10px;padding:14px 14px 12px;border-bottom:1px solid rgba(217,184,120,.18)}'
  + '#nxd header i{width:36px;height:36px;flex:none;border-radius:50%;background:linear-gradient(135deg,#d9b878,#f6dca6);display:grid;place-items:center;color:#040914;font-style:normal;font-weight:800}'
  + '#nxd header b{display:block;color:#f6dca6;font-size:15px}#nxd header small{display:block;color:#8c9bb8;font-size:12px}'
  + '#nxd header button{margin-left:auto;background:none;border:0;color:#8c9bb8;font-size:22px;cursor:pointer;padding:4px 8px}'
  + '#nxd-l{flex:1;overflow:auto;padding:14px;display:flex;flex-direction:column;gap:10px}'
  + '.nxd-m{max-width:86%;padding:10px 13px;border-radius:14px;white-space:pre-wrap;word-wrap:break-word;unicode-bidi:plaintext}'
  + '.nxd-a{align-self:flex-start;background:#0f1b33;border:1px solid rgba(120,160,230,.18);border-bottom-left-radius:4px}'
  + '.nxd-u{align-self:flex-end;background:#d9b878;color:#040914;border-bottom-right-radius:4px}'
  + '.nxd-m a{color:#f6dca6}.nxd-u a{color:#040914}'
  + '.nxd-t{align-self:flex-start;color:#8c9bb8;font-size:13px;padding:2px 4px}'
  + '#nxd-c{display:flex;flex-wrap:wrap;gap:6px;padding:0 14px 10px}#nxd-c button{background:none;border:1px solid rgba(217,184,120,.35);color:#f6dca6;border-radius:999px;padding:6px 10px;font:13px system-ui,sans-serif;cursor:pointer}'
  + '#nxd form{display:flex;gap:8px;padding:10px 12px;border-top:1px solid rgba(217,184,120,.18)}'
  + '#nxd textarea{flex:1;resize:none;height:42px;max-height:120px;background:#0b1426;color:#e8edf6;border:1px solid rgba(120,160,230,.25);border-radius:12px;padding:10px 12px;font:15px/1.4 system-ui,sans-serif}'
  + '#nxd form button{background:#d9b878;color:#040914;border:0;border-radius:12px;padding:0 14px;font-weight:700;cursor:pointer}#nxd form button:disabled{opacity:.5}'
  + '#nxd p.nxd-n{margin:0;padding:0 14px 10px;color:#6b7a9c;font-size:11.5px}#nxd p.nxd-n a{color:#8c9bb8}'
  + '@media (max-width:520px){#nxd{right:0;bottom:0;width:100vw;height:100dvh;border-radius:0}#nxd-b{right:12px;bottom:12px}}'
  + '@media (prefers-reduced-motion:no-preference){#nxd.on{animation:nxdIn .18s ease-out}@keyframes nxdIn{from{opacity:0;transform:translateY(10px)}}}';
  var s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);

  var b = document.createElement('button'); b.id = 'nxd-b'; b.type = 'button'; b.setAttribute('aria-haspopup', 'dialog');
  b.innerHTML = '<i aria-hidden="true">D</i><span></span>'; b.querySelector('span').textContent = T.btn;
  var w = document.createElement('section'); w.id = 'nxd'; w.setAttribute('role', 'dialog'); w.setAttribute('aria-label', T.title);
  w.innerHTML = '<header><i aria-hidden="true">D</i><div><b></b><small></small></div><button type="button" aria-label="Kapat / Close">×</button></header>'
    + '<div id="nxd-l" aria-live="polite"></div><div id="nxd-c"></div><p class="nxd-n"></p>'
    + '<form><textarea rows="1" maxlength="1500" dir="auto"></textarea><button type="submit"></button></form>';
  w.querySelector('header b').textContent = T.title; w.querySelector('header small').textContent = T.sub;
  var note = w.querySelector('.nxd-n'); note.textContent = T.note + ' '; var pa = document.createElement('a'); pa.href = T.privUrl; pa.textContent = T.priv; note.appendChild(pa);
  var list = w.querySelector('#nxd-l'), chips = w.querySelector('#nxd-c'), ta = w.querySelector('textarea'), sb = w.querySelector('form button');
  ta.placeholder = T.ph; ta.setAttribute('aria-label', T.ph); sb.textContent = T.send;
  document.body.appendChild(b); document.body.appendChild(w);

  // güvenli metin + yalnızca site içi yollar, e-posta, telefon ve wa.me bağlantıya dönüşür
  function render(el, text){
    var re = /(https?:\/\/(?:www\.)?(?:nexeralive\.com|wa\.me)\/[^\s)]*|\/(?:en|rehber|gizlilik|projeler|insaat|erenkoy-3d|kentsel-donusum[\w-]*|riskli-yapi-tespiti|sss)\/[\w\/-]*|[\w.+-]+@[\w-]+\.[\w.]+|\+90 ?551 ?272 ?06 ?06|\+90 ?216 ?235 ?04 ?32)/g, last = 0, m;
    while ((m = re.exec(text))){
      el.appendChild(document.createTextNode(text.slice(last, m.index)));
      var a = document.createElement('a'), v = m[0].replace(/[.,]$/, ''); a.textContent = v;
      a.href = v.indexOf('@') > 0 ? 'mailto:' + v : /^\+90/.test(v) ? 'https://wa.me/902162350432' : v;
      if (/^https?:|wa\.me/.test(a.href) && a.host !== location.host){ a.target = '_blank'; a.rel = 'noopener'; }
      el.appendChild(a); last = m.index + v.length; re.lastIndex = last;
    }
    el.appendChild(document.createTextNode(text.slice(last)));
  }
  function add(role, text){ var d = document.createElement('div'); d.className = 'nxd-m ' + (role === 'user' ? 'nxd-u' : 'nxd-a'); d.dir = 'auto'; render(d, text); list.appendChild(d); list.scrollTop = list.scrollHeight; return d; }
  function draw(){
    list.textContent = ''; add('assistant', T.hello); st.m.forEach(function(x){ add(x.role, x.content); });
    chips.textContent = ''; if (!st.m.length) T.chips.forEach(function(c){ var k = document.createElement('button'); k.type = 'button'; k.textContent = c; k.onclick = function(){ ask(c); }; chips.appendChild(k); });
  }
  var busy = false;
  function ask(q){
    q = (q || '').trim(); if (!q || busy) return; busy = true; sb.disabled = true; chips.textContent = '';
    st.m.push({ role: 'user', content: q }); save(); add('user', q); ev('danisman_mesaj');
    var t = document.createElement('div'); t.className = 'nxd-t'; t.textContent = EN ? 'Deniz is typing…' : 'Deniz yazıyor…'; list.appendChild(t); list.scrollTop = list.scrollHeight;
    var hist = [{ role: 'assistant', content: T.hello }].concat(st.m).slice(-20);
    fetch('/api/asistan', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: hist, dil: L, sayfa: location.pathname }) })
      .then(function(r){ if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function(j){ t.remove(); var a = String(j.reply || '').trim() || '…'; st.m.push({ role: 'assistant', content: a }); save(); add('assistant', a); })
      .catch(function(){ t.remove(); var d = add('assistant', T.err + ' '); var a = document.createElement('a'); a.href = 'https://wa.me/902162350432'; a.target = '_blank'; a.rel = 'noopener'; a.textContent = T.wa; d.appendChild(a); st.m.pop(); save(); })
      .then(function(){ busy = false; sb.disabled = false; ta.focus(); });
  }
  function open(v){ st.open = v; save(); w.classList.toggle('on', v); b.style.display = v ? 'none' : ''; if (v){ draw(); ev('danisman_acildi'); setTimeout(function(){ ta.focus(); }, 50); } else b.focus(); }
  b.onclick = function(){ open(true); };
  w.querySelector('header button').onclick = function(){ open(false); };
  w.addEventListener('keydown', function(e){ if (e.key === 'Escape') open(false); });
  w.querySelector('form').onsubmit = function(e){ e.preventDefault(); var q = ta.value; ta.value = ''; ask(q); };
  ta.addEventListener('keydown', function(e){ if (e.key === 'Enter' && !e.shiftKey){ e.preventDefault(); w.querySelector('form').requestSubmit(); } });
  // sayfadaki "bize yazın / chat" bağlantıları sohbeti açabilir
  document.addEventListener('click', function(e){ var a = e.target.closest && e.target.closest('[data-deniz]'); if (a){ e.preventDefault(); open(true); } });
  if (st.open) open(true);
})();
