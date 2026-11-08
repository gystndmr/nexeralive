/* NEXERA: anonim ölçüm + talep formu. Çerez, kişisel veri veya üçüncü taraf izleyici kullanmaz. */
(function () {
  'use strict';
  var d = document, w = window, path = location.pathname;
  // geliş türü: yapay zekâ / arama / sosyal / doğrudan / diğer (her yapay zekâ ziyareti referrer ile tespit edilemez)
  function refType() {
    var r = '';
    try { r = d.referrer ? new URL(d.referrer).hostname : ''; } catch (e) {}
    if (!r || r === location.hostname) return d.referrer ? 'diger' : 'dogrudan';
    if (/(^|\.)(chatgpt\.com|openai\.com|perplexity\.ai|claude\.ai|gemini\.google\.com|copilot\.microsoft\.com|meta\.ai|you\.com|poe\.com|deepseek\.com|grok\.com|mistral\.ai)$/.test(r)) return 'ai';
    if (/(^|\.)(google\.[a-z.]+|bing\.com|yandex\.[a-z.]+|duckduckgo\.com|yahoo\.com|ecosia\.org|brave\.com|naver\.com|baidu\.com)$/.test(r)) return 'arama';
    if (/(^|\.)(instagram\.com|facebook\.com|fb\.com|t\.co|x\.com|twitter\.com|linkedin\.com|youtube\.com|tiktok\.com|whatsapp\.com|threads\.net|lnkd\.in)$/.test(r)) return 'sosyal';
    return 'diger';
  }
  var ss = {}; try { ss = w.sessionStorage; } catch (e) {}
  function sget(k) { try { return ss.getItem(k); } catch (e) { return null; } }
  function sset(k, v) { try { ss.setItem(k, v); } catch (e) {} }
  if (!sget('nx-ref')) sset('nx-ref', refType());
  var q = new URLSearchParams(location.search), utm = ['utm_source', 'utm_medium', 'utm_campaign'].map(function (k) { return q.get(k) ? k.slice(4) + '=' + q.get(k).slice(0, 40) : ''; }).filter(Boolean).join('&');
  if (utm) sset('nx-utm', utm);
  var REF = sget('nx-ref') || 'dogrudan';
  function ev(e, p) {
    var body = JSON.stringify({ e: e, p: p || path, r: REF });
    try { if (navigator.sendBeacon && navigator.sendBeacon('/api/olay', new Blob([body], { type: 'text/plain' }))) return; } catch (x) {}
    try { fetch('/api/olay', { method: 'POST', body: body, keepalive: true }); } catch (x) {}
  }
  w.nxEv = ev;
  ev('sayfa');
  if (d.body && d.body.dataset.proje) ev('proje_goruntuleme', path);
  d.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]'); if (!a) return;
    var h = a.getAttribute('href') || '';
    if (/^tel:/.test(h)) ev('iletisim_tel');
    else if (/wa\.me|whatsapp/.test(h)) ev('iletisim_whatsapp');
    else if (/^mailto:/.test(h)) ev('iletisim_eposta');
    else if (/^\/(projeler|en\/projects)\//.test(h) && /^\/(rehber|en\/guides)\//.test(path)) ev('rehberden_projeye', path + ' > ' + h);
  }, true);

  // ---------- talep formu
  var BUTCE = {
    TRY: [['b1', '< 5.000.000'], ['b2', '5.000.000 – 10.000.000'], ['b3', '10.000.000 – 20.000.000'], ['b4', '20.000.000 – 40.000.000'], ['b5', '40.000.000 +']],
    X: [['b1', '< 150.000'], ['b2', '150.000 – 300.000'], ['b3', '300.000 – 500.000'], ['b4', '500.000 – 1.000.000'], ['b5', '1.000.000 +']]
  };
  Array.prototype.forEach.call(d.querySelectorAll('form[data-nx-form]'), function (f) {
    var en = f.dataset.lang === 'en', st = f.querySelector('.f-st'), btn = f.querySelector('button[type=submit]'), opened = false;
    var T = en ? { none: 'Prefer not to say', send: 'Sending…', ok: 'Thank you. Your request has reached us; our team will contact you in your preferred way.', need: 'Please enter your name and a phone number or e-mail address.', priv: 'Please confirm that you have read the privacy notice.', err: 'We could not send your request. Please try again or write to us on WhatsApp: ', net: 'Connection problem. Please try again or reach us on WhatsApp: ', many: 'Too many attempts. Please try again later or reach us on WhatsApp: ' }
      : { none: 'Belirtmek istemiyorum', send: 'Gönderiliyor…', ok: 'Teşekkürler, talebiniz bize ulaştı. Ekibimiz seçtiğiniz yoldan size dönüş yapacak.', need: 'Lütfen adınızı ve telefon ya da e-posta bilginizi yazın.', priv: 'Lütfen aydınlatma metnini okuduğunuzu onaylayın.', err: 'Talebinizi şu an iletemedik. Lütfen tekrar deneyin ya da WhatsApp’tan yazın: ', net: 'Bağlantı sorunu. Lütfen tekrar deneyin ya da WhatsApp’tan yazın: ', many: 'Çok fazla deneme yapıldı. Lütfen daha sonra deneyin ya da WhatsApp’tan yazın: ' };
    var WA = '<a href="https://wa.me/902162350432">+90 216 235 04 32</a>';
    var cur = f.querySelector('[name=para]'), bud = f.querySelector('[name=butce]');
    function fillBudget() { if (!cur || !bud) return; var v = bud.value, list = BUTCE[cur.value === 'TRY' ? 'TRY' : 'X'];
      bud.innerHTML = '<option value="">—</option>' + list.map(function (o) { return '<option value="' + o[0] + '">' + o[1] + ' ' + cur.value + '</option>'; }).join('') + '<option value="yok">' + T.none + '</option>'; bud.value = v; }
    if (cur) { cur.addEventListener('change', fillBudget); fillBudget(); }
    f.addEventListener('focusin', function () { if (!opened) { opened = true; ev('form_acildi'); } });
    function show(msg, ok) { st.innerHTML = msg; st.className = 'f-st ' + (ok ? 'ok' : 'bad'); st.setAttribute('role', ok ? 'status' : 'alert'); }
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var g = function (n) { var el = f.elements[n]; if (!el) return ''; if (el.length && !el.tagName) { for (var i = 0; i < el.length; i++) if (el[i].checked) return el[i].value; return ''; } return el.type === 'checkbox' ? el.checked : String(el.value || '').trim(); };
      var data = { kaynak: 'alici-formu', ad: g('ad'), telefon: g('telefon'), eposta: g('eposta'), tercih: g('tercih'), dil: g('dil'), para: g('para'), butce: g('butce'), bolge: g('bolge'), amac: g('amac'), zamanlama: g('zamanlama'), proje: g('proje'), mesaj: g('mesaj'), aydinlatma: g('aydinlatma') === true, pazarlama: g('pazarlama') === true, web: g('web'), sayfa: path, ref: REF, utm: sget('nx-utm') || '' };
      if (!data.ad || (!/\d{7,}/.test(data.telefon.replace(/\D/g, '')) && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.eposta))) { show(T.need); return; }
      if (!data.aydinlatma) { show(T.priv); return; }
      btn.disabled = true; show(T.send, true);
      fetch('/api/talep', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        .then(function (r) {
          btn.disabled = false;
          if (r.ok) { show(T.ok, true); f.reset(); fillBudget(); return; }
          ev('form_hata'); show((r.status === 429 ? T.many : T.err) + WA);
        })
        .catch(function () { btn.disabled = false; ev('form_hata'); show(T.net + WA); });
    });
  });
})();
