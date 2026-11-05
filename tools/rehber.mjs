// Alıcı ve yatırımcı rehberleri (TR + EN), /en/ ana sayfası, gizlilik metinleri ve taslaklar.
// Kullanım: node tools/rehber.mjs   → www/rehber/…, www/en/…, www/gizlilik/, www/taslak/…
// İçerik: tools/icerik-tr.mjs, tools/icerik-en.mjs. Taslaklar (draft:true) noindex, sitemap ve menü dışıdır.
import fs from 'node:fs';
import { TR } from './icerik-tr.mjs';
import { EN } from './icerik-en.mjs';
import { ORG, SITE } from './kimlik.mjs';

const OUT = new URL('../www/', import.meta.url).pathname;
const LOGO = `<svg viewBox="-4 -4 211 155" aria-hidden="true"><path fill="#3d8bff" d="M0 5L42 5L128 72L100 90L40 47L40 135L0 150Z"/><path fill="#3d8bff" d="M96 0L203 73L96 147L96 110L148 73L96 38Z"/></svg>`;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const strip = s => String(s).replace(/<[^>]+>/g, '');

const css = `:root{--ink:#040914;--gold:#d9b878;--gold2:#f6dca6;--text:#e8edf6;--muted:#8c9bb8;--dim:#6b7a9c;--line:rgba(217,184,120,.22);--line2:rgba(120,160,230,.18)}
*{box-sizing:border-box;margin:0;padding:0}html{background:var(--ink)}body{background:radial-gradient(120% 60% at 80% 0%,#0b1d3d 0,var(--ink) 60%) fixed;color:var(--text);font:400 17px/1.75 Manrope,system-ui,sans-serif;-webkit-font-smoothing:antialiased}
a{color:var(--gold2)}header{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:22px clamp(16px,5vw,64px);flex-wrap:wrap}header a.logo{display:flex;align-items:center;gap:14px;text-decoration:none;color:var(--text);font:600 14px Manrope;letter-spacing:.5em}header svg{width:38px}
header nav{display:flex;flex-wrap:wrap;gap:6px 20px;align-items:center}header nav a{font:400 11px 'JetBrains Mono',monospace;letter-spacing:.18em;color:var(--muted);text-decoration:none;padding:6px 0}header nav a:hover,header nav a[aria-current]{color:var(--gold2)}header nav a.lng{border:1px solid var(--line);padding:5px 9px;color:var(--gold2)}
main{max-width:860px;margin:0 auto;padding:30px clamp(16px,5vw,40px) 60px}.k{font:400 11px 'JetBrains Mono',monospace;letter-spacing:.3em;color:var(--gold);display:flex;gap:14px;align-items:center}.k::before{content:'';width:42px;height:1px;background:var(--gold)}
.crumb{font:400 11px 'JetBrains Mono',monospace;letter-spacing:.08em;color:var(--dim);margin-bottom:18px}.crumb a{color:var(--muted);text-decoration:none}
h1{font:400 clamp(34px,5.6vw,60px)/1.08 Cinzel,serif;margin:20px 0 22px}h1 span{color:var(--gold2)}.lead{font:400 clamp(19px,2.1vw,23px)/1.55 'Cormorant Garamond',serif;color:#d5ddee;margin-bottom:22px}
.meta{font:400 12px/1.7 'JetBrains Mono',monospace;color:var(--dim);margin-bottom:30px;border-left:1px solid var(--line);padding-left:12px}
.answer{border:1px solid var(--line);background:rgba(217,184,120,.06);padding:18px 20px;margin:0 0 30px}.answer b{display:block;font:400 11px 'JetBrains Mono',monospace;letter-spacing:.24em;color:var(--gold);margin-bottom:6px}.answer p{margin:0;color:#e6ebf5}
h2{font:500 clamp(25px,3vw,32px)/1.25 'Cormorant Garamond',serif;color:#fff;margin:40px 0 12px}h3{font:600 17px Manrope;color:#fff;margin:24px 0 8px}p{margin:0 0 16px;color:#c9d2e4}ul,ol{margin:0 0 16px 22px;color:#c9d2e4}li{margin:6px 0}b,strong{color:#fff;font-weight:600}
.tw{overflow-x:auto;margin:6px 0 22px}table{border-collapse:collapse;width:100%;font-size:15px;min-width:640px}th,td{border-bottom:1px solid var(--line2);padding:10px 12px;text-align:left;vertical-align:top;color:#c9d2e4}th{font:400 11px 'JetBrains Mono',monospace;letter-spacing:.12em;color:var(--gold);font-weight:400}
.note{font-size:14px;color:var(--muted);border-left:1px solid var(--line);padding-left:14px;margin:26px 0}.src{margin-top:40px;font-size:14px}.src ol{margin-left:20px}.src li{color:var(--muted)}.src a{word-break:break-word}
.draft{border:1px solid #c0703a;background:rgba(192,112,58,.12);padding:14px 18px;margin:0 0 26px;color:#f3c9a6;font-size:14px}.draft b{color:#ffd9b8}
.cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px;margin:18px 0 10px}.card{display:block;padding:20px;border:1px solid var(--line2);background:rgba(10,22,48,.45);text-decoration:none;color:var(--text)}.card:hover{border-color:var(--gold)}.card small{display:block;font:400 10.5px 'JetBrains Mono',monospace;letter-spacing:.18em;color:var(--gold);margin-bottom:8px}.card b{display:block;font:500 21px/1.3 'Cormorant Garamond',serif}.card span{display:block;font-size:14px;color:var(--muted);margin-top:8px;line-height:1.55}
.cta{margin:50px 0 0;padding:28px;border:1px solid var(--line2);background:linear-gradient(160deg,rgba(20,40,84,.5),rgba(6,14,32,.42))}.cta>b{display:block;font:400 11px 'JetBrains Mono',monospace;letter-spacing:.3em;color:var(--gold);margin-bottom:10px}.cta>p{font:400 21px/1.45 'Cormorant Garamond',serif;color:#fff}
.btns{display:flex;flex-wrap:wrap;gap:10px;margin-top:16px}.btns a{font:500 11px 'JetBrains Mono',monospace;letter-spacing:.18em;padding:13px 18px;border:1px solid var(--gold);color:var(--gold2);text-decoration:none}.btns a:hover{background:var(--gold);color:var(--ink)}.btns a.wa{border-color:rgba(159,240,196,.5);color:#9ff0c4}
form.f{margin-top:22px;display:grid;grid-template-columns:1fr 1fr;gap:14px 16px}form.f .full{grid-column:1/-1}form.f label,form.f legend{display:block;font:400 11px 'JetBrains Mono',monospace;letter-spacing:.12em;color:var(--muted);margin-bottom:6px}
form.f input[type=text],form.f input[type=tel],form.f input[type=email],form.f select,form.f textarea{width:100%;padding:12px 13px;background:rgba(4,9,20,.7);border:1px solid var(--line2);color:var(--text);font:400 16px Manrope;border-radius:0}form.f textarea{min-height:96px;resize:vertical}
form.f input:focus,form.f select:focus,form.f textarea:focus{outline:2px solid var(--gold);outline-offset:1px}form.f fieldset{border:0}form.f .rad{display:flex;flex-wrap:wrap;gap:8px 18px}form.f .rad label,form.f .chk{display:flex;gap:9px;align-items:flex-start;font:400 15px/1.5 Manrope;letter-spacing:0;color:#c9d2e4;margin:0}form.f .chk input,form.f .rad input{margin-top:5px;width:16px;height:16px;flex:none;accent-color:#d9b878}
form.f .hp{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden}form.f button{justify-self:start;font:500 12px 'JetBrains Mono',monospace;letter-spacing:.2em;padding:15px 24px;background:var(--gold);color:var(--ink);border:0;cursor:pointer}form.f button:disabled{opacity:.6}
.f-st{grid-column:1/-1;font-size:15px;min-height:1px}.f-st.ok{color:#9ff0c4}.f-st.bad{color:#ffb3a7}.f-st a{color:inherit}.opt{color:var(--dim)}
.more{margin-top:46px;display:grid;gap:8px}.more>b{font:400 11px 'JetBrains Mono',monospace;letter-spacing:.3em;color:var(--gold)}.more a{text-decoration:none}
footer{border-top:1px solid var(--line2);padding:26px clamp(16px,5vw,64px);font:400 11px/1.9 'JetBrains Mono',monospace;letter-spacing:.1em;color:var(--muted);display:flex;flex-wrap:wrap;gap:8px 30px;justify-content:space-between}footer a{color:var(--muted)}
@media(max-width:640px){form.f{grid-template-columns:1fr}header a.logo{letter-spacing:.35em}body{font-size:16.5px}}`;

const UI = {
  tr: { home: '/insaat/', homeName: 'NEXERA İnşaat', nav: [['/insaat/', 'ANA SAYFA'], ['/projeler/', 'PROJELER'], ['/rehber/', 'REHBERLER'], ['/kurumsal/', 'KURUMSAL'], ['#iletisim', 'İLETİŞİM']],
    updated: 'Son kontrol', by: 'Hazırlayan', sources: 'Kaynaklar', short: 'KISA CEVAP', more: 'İLGİLİ REHBERLER', crumbHome: 'Ana sayfa', guides: 'Rehberler',
    disclaimer: 'Bu sayfa genel bilgilendirme amaçlıdır; hukuki, mali veya vergi danışmanlığı yerine geçmez. Mevzuat ve tutarlar değişebilir; işlem öncesinde güncel durumu resmî kurumlardan ve bir avukattan teyit edin.',
    draft: '<b>TASLAK — yayında değil.</b> Bu metin hukukçu incelemesi bekliyor ve arama motorlarına kapalıdır (noindex). İçerik kontrol edilmeden yayına alınmamalıdır.',
    foot: `<span>© ${new Date().getFullYear()} NEXERA İNŞAAT LTD. ŞTİ.</span><span>Yakacık Çarşı Mah. Rota Sk. B Blok No:1 B, Kartal / İstanbul</span><span><a href="mailto:info@nexeralive.com">info@nexeralive.com</a> · <a href="tel:+905512720606">+90 551 272 06 06</a> · <a href="/gizlilik/">Gizlilik</a></span>` },
  en: { home: '/en/', homeName: 'NEXERA', nav: [['/en/', 'HOME'], ['/en/guides/', 'GUIDES'], ['/en/#projects', 'PROJECTS'], ['#contact', 'CONTACT']],
    updated: 'Last reviewed', by: 'Prepared by', sources: 'Sources', short: 'SHORT ANSWER', more: 'RELATED GUIDES', crumbHome: 'Home', guides: 'Guides',
    disclaimer: 'This page is general information, not legal, financial or tax advice. Rules and amounts change; confirm the current position with the official authorities and an independent lawyer before any transaction.',
    draft: '<b>DRAFT — not published.</b> This text is awaiting review by a lawyer and is closed to search engines (noindex). It must not be published before it has been checked.',
    foot: `<span>© ${new Date().getFullYear()} NEXERA İNŞAAT LTD. ŞTİ. · ISTANBUL</span><span>Yakacık Çarşı Mah. Rota Sk. B Blok No:1 B, Kartal / İstanbul, Türkiye</span><span><a href="mailto:info@nexeralive.com">info@nexeralive.com</a> · <a href="tel:+905512720606">+90 551 272 06 06</a> · <a href="/en/privacy/">Privacy</a></span>` }
};

// ---------- talep formu (alıcı / yatırımcı)
function form(lang, ctx = {}){
  const en = lang === 'en';
  const L = en ? {
    h: 'Tell us what you are looking for', p: 'Leave your details and our team will get back to you. We never ask for passport, bank or citizenship documents at this stage.',
    ad: 'Full name', tel: 'Phone (with country code)', mail: 'E-mail', pref: 'How should we contact you?', prefs: [['telefon', 'Phone call'], ['whatsapp', 'WhatsApp'], ['eposta', 'E-mail']],
    dil: 'Language', diller: [['en', 'English'], ['tr', 'Türkçe'], ['ar', 'العربية (Arabic)'], ['ru', 'Русский (Russian)'], ['diger', 'Other']],
    para: 'Currency', butce: 'Budget range', bolge: 'Preferred area', bolgePh: 'e.g. Kadıköy, Istanbul Asian side', amac: 'Purpose', amaclar: [['oturum', 'A home to live in'], ['yatirim', 'Investment'], ['kira', 'Rental income'], ['tatil', 'Holiday home'], ['vatandaslik', 'Researching citizenship by investment'], ['donusum', 'I own a building (urban renewal)'], ['diger', 'Other']],
    zaman: 'Timing', zamanlar: [['0-3', 'Within 3 months'], ['3-6', '3–6 months'], ['6-12', '6–12 months'], ['12+', 'Later than 12 months'], ['arastirma', 'Just researching']],
    proje: 'Project of interest', projeler: [['karar-yok', 'Not decided yet'], ['erenkoy', 'Erenköy, Kadıköy (pre-construction)']],
    mesaj: 'Message', opt: '(optional)', ayd: 'I have read the <a href="/en/privacy/" target="_blank">privacy notice</a> on how my data is processed to answer this request.', paz: 'I would also like to receive news about NEXERA projects (optional; you can withdraw at any time).', send: 'SEND REQUEST' }
  : {
    h: 'Ne aradığınızı anlatın', p: 'Bilgilerinizi bırakın, ekibimiz size dönüş yapsın. Bu aşamada pasaport, banka veya vatandaşlık belgesi istemiyoruz.',
    ad: 'Ad soyad', tel: 'Telefon', mail: 'E-posta', pref: 'Size nasıl ulaşalım?', prefs: [['telefon', 'Telefonla arayın'], ['whatsapp', 'WhatsApp'], ['eposta', 'E-posta']],
    dil: 'Dil', diller: [['tr', 'Türkçe'], ['en', 'English'], ['ar', 'العربية (Arapça)'], ['ru', 'Русский (Rusça)'], ['diger', 'Diğer']],
    para: 'Para birimi', butce: 'Bütçe aralığı', bolge: 'Tercih ettiğiniz bölge', bolgePh: 'ör. Kadıköy, Anadolu yakası', amac: 'Amaç', amaclar: [['oturum', 'Oturmak için konut'], ['yatirim', 'Yatırım'], ['kira', 'Kira geliri'], ['tatil', 'Tatil konutu'], ['vatandaslik', 'Yatırımla vatandaşlığı araştırıyorum'], ['donusum', 'Binam var (kentsel dönüşüm)'], ['diger', 'Diğer']],
    zaman: 'Zamanlama', zamanlar: [['0-3', '3 ay içinde'], ['3-6', '3–6 ay'], ['6-12', '6–12 ay'], ['12+', '12 aydan sonra'], ['arastirma', 'Sadece araştırıyorum']],
    proje: 'İlgilendiğiniz proje', projeler: [['karar-yok', 'Henüz karar vermedim'], ['erenkoy', 'Erenköy, Kadıköy (hazırlık aşamasında)']],
    mesaj: 'Mesajınız', opt: '(isteğe bağlı)', ayd: 'Talebime yanıt verilmesi için kişisel verilerimin işlenmesine ilişkin <a href="/gizlilik/" target="_blank">aydınlatma metnini</a> okudum.', paz: 'NEXERA projeleriyle ilgili haber ve duyuruların da bana gönderilmesini istiyorum (isteğe bağlı; dilediğiniz an geri alabilirsiniz).', send: 'TALEBİ GÖNDER' };
  const sel = (n, list, first = '—') => `<select id="f-${n}" name="${n}"><option value="">${first}</option>${list.map(([v, t]) => `<option value="${v}">${t}</option>`).join('')}</select>`;
  const amacSel = ctx.amac ? L.amaclar.map(([v, t]) => `<option value="${v}"${v === ctx.amac ? ' selected' : ''}>${t}</option>`).join('') : null;
  return `<section class="cta" id="${en ? 'contact' : 'iletisim'}" aria-labelledby="f-h"><b>${en ? 'CONTACT' : 'İLETİŞİM'}</b><p id="f-h">${L.h}</p><p style="font:400 15px/1.6 Manrope;color:#c9d2e4;margin-top:8px">${L.p}</p>
<div class="btns"><a class="wa" href="https://wa.me/905512720606">WHATSAPP</a><a href="tel:+905512720606">+90 551 272 06 06</a><a href="mailto:info@nexeralive.com">INFO@NEXERALIVE.COM</a></div>
<form class="f" data-nx-form data-lang="${lang}" novalidate>
<div><label for="f-ad">${L.ad}</label><input type="text" id="f-ad" name="ad" autocomplete="name" required maxlength="120"></div>
<div><label for="f-dil">${L.dil}</label>${sel('dil', L.diller).replace(`value="${lang}"`, `value="${lang}" selected`)}</div>
<div><label for="f-telefon">${L.tel}</label><input type="tel" id="f-telefon" name="telefon" autocomplete="tel" inputmode="tel" maxlength="40"></div>
<div><label for="f-eposta">${L.mail}</label><input type="email" id="f-eposta" name="eposta" autocomplete="email" maxlength="120"></div>
<fieldset class="full"><legend>${L.pref}</legend><div class="rad">${L.prefs.map(([v, t], i) => `<label><input type="radio" name="tercih" value="${v}"${i === (en ? 1 : 0) ? ' checked' : ''}> ${t}</label>`).join('')}</div></fieldset>
<div><label for="f-para">${L.para} <span class="opt">${L.opt}</span></label><select id="f-para" name="para">${['USD', 'EUR', 'GBP', 'TRY'].map(c => `<option${c === (en ? 'USD' : 'TRY') ? ' selected' : ''}>${c}</option>`).join('')}</select></div>
<div><label for="f-butce">${L.butce} <span class="opt">${L.opt}</span></label><select id="f-butce" name="butce"><option value="">—</option></select></div>
<div><label for="f-amac">${L.amac} <span class="opt">${L.opt}</span></label>${amacSel ? `<select id="f-amac" name="amac"><option value="">—</option>${amacSel}</select>` : sel('amac', L.amaclar)}</div>
<div><label for="f-zamanlama">${L.zaman} <span class="opt">${L.opt}</span></label>${sel('zamanlama', L.zamanlar)}</div>
<div><label for="f-bolge">${L.bolge} <span class="opt">${L.opt}</span></label><input type="text" id="f-bolge" name="bolge" maxlength="120" placeholder="${L.bolgePh}"></div>
<div><label for="f-proje">${L.proje} <span class="opt">${L.opt}</span></label>${sel('proje', L.projeler)}</div>
<div class="full"><label for="f-mesaj">${L.mesaj} <span class="opt">${L.opt}</span></label><textarea id="f-mesaj" name="mesaj" maxlength="1500"></textarea></div>
<div class="hp" aria-hidden="true"><label for="f-web">Web</label><input type="text" id="f-web" name="web" tabindex="-1" autocomplete="off"></div>
<label class="chk full"><input type="checkbox" name="aydinlatma" required> <span>${L.ayd}</span></label>
<label class="chk full"><input type="checkbox" name="pazarlama"> <span>${L.paz}</span></label>
<button type="submit">${L.send}</button><div class="f-st" aria-live="polite"></div>
</form></section>`;
}

// ---------- sayfa
function page(p, lang, all){
  const U = UI[lang], url = SITE + p.path, alt = p.alt ? SITE + p.alt : null;
  const hre = alt ? (lang === 'tr' ? [['tr', url], ['en', alt]] : [['en', url], ['tr', alt]]) : [[lang, url]];
  const xdef = alt ? (lang === 'en' ? url : alt) : null;
  const ld = [{ '@type': ORG['@type'], '@id': ORG['@id'] }];
  const isArt = p.type === 'article';
  const crumbs = [[U.crumbHome, SITE + U.home]].concat(p.crumbs || []).concat([[strip(p.title), url]]);
  ld.push(Object.assign({ '@type': isArt ? 'Article' : 'WebPage', '@id': url + '#sayfa', url, name: strip(p.title), headline: isArt ? strip(p.title).slice(0, 110) : undefined, description: p.desc, inLanguage: lang === 'tr' ? 'tr-TR' : 'en',
    dateModified: p.updated, datePublished: isArt ? (p.published || p.updated) : undefined, author: isArt ? { '@id': ORG['@id'] } : undefined, publisher: { '@id': ORG['@id'] }, isPartOf: { '@id': SITE + '/#site' },
    citation: isArt && p.sources ? p.sources.map(s => s[1]) : undefined }));
  ld.push({ '@type': 'BreadcrumbList', itemListElement: crumbs.map(([n, u], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: u })) });
  if (p.ldExtra) ld.push(...p.ldExtra);
  const related = (p.related || []).map(s => all.find(x => x.slug === s && !x.draft)).filter(Boolean);
  const nav = U.nav.map(([h, t]) => `<a href="${h}"${(h !== '/insaat/' && h !== '/en/' && p.path.startsWith(h)) || h === p.path ? ' aria-current="page"' : ''}>${t}</a>`).join('') + (alt ? `<a class="lng" href="${p.alt}" hreflang="${lang === 'tr' ? 'en' : 'tr'}" lang="${lang === 'tr' ? 'en' : 'tr'}">${lang === 'tr' ? 'EN' : 'TR'}</a>` : '');
  const meta = isArt ? `<p class="meta">${U.updated}: ${fmtDate(p.updated, lang)} · ${U.by}: NEXERA İnşaat${p.reviewed ? '' : ''}</p>` : '';
  return `<!doctype html><html lang="${lang === 'tr' ? 'tr' : 'en'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${strip(p.title)}${p.titleSuffix === false ? '' : (lang === 'tr' ? ' | NEXERA İnşaat' : ' | NEXERA')}</title><meta name="description" content="${esc(p.desc)}">${p.draft ? '<meta name="robots" content="noindex,nofollow">' : `<link rel="canonical" href="${url}">`}
${p.draft ? '' : hre.map(([l, u]) => `<link rel="alternate" hreflang="${l}" href="${u}">`).join('') + (xdef ? `<link rel="alternate" hreflang="x-default" href="${xdef}">` : '')}
<meta name="theme-color" content="#050b18"><meta property="og:type" content="${isArt ? 'article' : 'website'}"><meta property="og:locale" content="${lang === 'tr' ? 'tr_TR' : 'en_GB'}"><meta property="og:site_name" content="NEXERA"><meta property="og:title" content="${esc(strip(p.title))}"><meta property="og:description" content="${esc(p.desc)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${SITE}/og.jpg"><meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-6 -6 215 160'%3E%3Cpath fill='%233d8bff' d='M0 5L42 5L128 72L100 90L40 47L40 135L0 150Z'/%3E%3Cpath fill='%233d8bff' d='M96 0L203 73L96 147L96 110L148 73L96 38Z'/%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400&family=Cormorant+Garamond:wght@400;500&family=JetBrains+Mono:wght@400&family=Manrope:wght@400;600&display=swap" rel="stylesheet">
<style>${css}</style>${p.draft ? '' : `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': ld }).replace(/</g, '\\u003c')}</script>`}<script src="/nx.js" defer></script></head>
<body${p.proje ? ` data-proje="${p.proje}"` : ''}><header><a class="logo" href="${U.home}" aria-label="${U.homeName}">${LOGO}NEXERA</a><nav aria-label="${lang === 'tr' ? 'Ana menü' : 'Main menu'}">${nav}</nav></header>
<main>${p.draft ? `<div class="draft">${U.draft}</div>` : ''}${p.path === U.home ? '' : `<nav class="crumb" aria-label="breadcrumb">${crumbs.slice(0, -1).map(([n, u]) => `<a href="${u.replace(SITE, '')}">${n}</a> / `).join('')}<span>${strip(p.title)}</span></nav>`}
<div class="k">${p.kicker}</div><h1>${p.h1 || p.title}</h1>${p.lead ? `<p class="lead">${p.lead}</p>` : ''}${meta}
${p.answer ? `<div class="answer"><b>${U.short}</b><p>${p.answer}</p></div>` : ''}
${p.body}
${isArt ? `<p class="note">${U.disclaimer}</p>` : ''}
${p.sources && p.sources.length ? `<section class="src"><h2 style="font-size:24px;margin-top:0">${U.sources}</h2><ol>${p.sources.map(([t, u, d]) => `<li><a href="${u}" rel="noopener" target="_blank">${t}</a>${d ? ` — ${d}` : ''}</li>`).join('')}</ol></section>` : ''}
${p.form === false ? '' : form(lang, { amac: p.amac })}
${related.length ? `<nav class="more" aria-label="${U.more}"><b>${U.more}</b>${related.map(r => `<a href="${r.path}">${strip(r.title)} →</a>`).join('')}</nav>` : ''}
</main><footer>${U.foot}</footer></body></html>`;
}
function fmtDate(iso, lang){ const [y, m, d] = iso.split('-').map(Number);
  const tr = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'], en = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return lang === 'tr' ? `${d} ${tr[m - 1]} ${y}` : `${d} ${en[m - 1]} ${y}`; }

// ---------- üret
const written = [];
for (const [lang, list] of [['tr', TR], ['en', EN]]){
  for (const p of list){
    const dir = OUT + p.path.replace(/^\//, ''); fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(dir + 'index.html', page(p, lang, list)); written.push(p.path + (p.draft ? '  (taslak, noindex)' : ''));
  }
}
console.log(written.join('\n'));
