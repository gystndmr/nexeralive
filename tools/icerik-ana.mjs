// /en/ ana sayfası, rehber dizinleri ve NEXERA süreç taslağı. Proje bilgileri tools/projeler.json'dan gelir.
import fs from 'node:fs';
import { GUNCEL } from './icerik-ortak.mjs';
const P = JSON.parse(fs.readFileSync(new URL('./projeler.json', import.meta.url), 'utf8')).projeler.filter(p => p.yayin);

export function projeKartlari(lang){
  return P.map(p => `<a class="card" href="/projeler/"${lang === 'en' ? ' hreflang="tr"' : ''}><small>${p.konum.yayinlanabilir_konum.toUpperCase()}</small><b>${p.ad[lang]}</b><span>${p.nexera_rolu === 'ortak' ? (lang === 'en' ? 'NEXERA is a partner in this project. ' : 'NEXERA bu projede ortaktır. ') : ''}${p.durum['aciklama_' + lang]} ${lang === 'en' ? 'Unit types, prices and delivery dates have not been announced; no units are on sale yet. Visuals are illustrative.' : 'Daire tipleri, fiyat ve teslim tarihi henüz açıklanmadı; şu an satışta daire yok. Görseller temsilîdir.'}</span></a>`).join('');
}

export const EN_HOME = (guides) => ({
  slug: 'en', path: '/en/', alt: '/insaat/', type: 'page', updated: GUNCEL, titleSuffix: false,
  kicker: 'NEXERA İNŞAAT · ISTANBUL', title: 'NEXERA — Residential developer in Istanbul', h1: 'New homes and urban renewal <span>in Istanbul.</span>',
  desc: 'NEXERA İnşaat is an Istanbul construction company (est. 2015) developing residential and urban-renewal projects on the city’s Asian side. Buyer guides for Türkiye and contact in English.',
  lead: 'NEXERA İnşaat (Nexera İnşaat Ltd. Şti.) is an Istanbul-based construction company founded in 2015. We develop residential buildings and urban-renewal (kentsel dönüşüm) projects on Istanbul’s Asian side, mainly in Kadıköy.',
  ldExtra: [],
  body: `
<h2>What we do</h2>
<p>We design and build new residential buildings, including urban-renewal projects carried out together with the owners of existing buildings under Türkiye’s Law No. 6306 on the transformation of areas under disaster risk. Our focus is earthquake safety, transparent agreements with owners and a calm, timeless architecture.</p>
<p>We are a developer and builder. We are not a law firm, tax adviser or citizenship consultancy: for legal, tax and immigration matters you should work with an independent, licensed professional. Our guides below explain the general rules with links to the official sources.</p>
<h2 id="projects">Our projects</h2>
<div class="cards">${projeKartlari('en')}</div>
<p class="note">Our project pages are currently in Turkish and include 3D and augmented-reality views. Ask us in English and we will answer any question about a project — <a href="https://wa.me/905512720606" data-deniz>chat with Deniz, our AI assistant</a>, who replies in English, Arabic, Russian or your own language, or message the team on WhatsApp at +90 551 272 06 06.</p>
<h2>Guides for buyers and investors</h2>
<div class="cards">${guides.map(g => `<a class="card" href="${g.path}"><small>${g.kicker}</small><b>${g.title}</b><span>${g.desc}</span></a>`).join('')}</div>`
});

export const EN_GUIDES = (guides) => ({
  slug: 'guides', path: '/en/guides/', alt: '/rehber/', type: 'page', updated: GUNCEL, crumbs: [],
  kicker: 'GUIDES', title: 'Buying property in Türkiye: guides', h1: 'Guides for buyers <span>and investors.</span>',
  desc: 'Plain-English guides to buying property in Türkiye: steps for foreigners, total costs, title-deed checks, off-plan vs completed homes and rental income — with official sources.',
  lead: 'Each guide answers one real decision question, links to the official Turkish sources we checked and shows the date it was last reviewed. They are general information, not legal advice.',
  body: `<div class="cards">${guides.map(g => `<a class="card" href="${g.path}"><small>${g.kicker}</small><b>${g.title}</b><span>${g.desc}</span></a>`).join('')}</div>`
});

export const TR_REHBER = (guides) => ({
  slug: 'rehber', path: '/rehber/', alt: '/en/guides/', type: 'page', updated: GUNCEL,
  kicker: 'REHBERLER', title: 'Konut Alırken ve Yatırım Yaparken Rehberler', h1: 'Alıcı ve yatırımcı <span>rehberleri.</span>',
  desc: 'Türkiye’de konut alırken toplam maliyet, tapu kontrolü, projeden mi hazır mı, kira geliri ve yabancıların konut alımı: resmî kaynaklı, sade rehberler.',
  lead: 'Her rehber gerçek bir karar sorusuna yanıt verir, kontrol ettiğimiz resmî kaynakları ve son kontrol tarihini gösterir. Genel bilgilendirme amaçlıdır; hukuki danışmanlık yerine geçmez.',
  body: `<div class="cards">${guides.map(g => `<a class="card" href="${g.path}"><small>${g.kicker}</small><b>${g.title}</b><span>${g.desc}</span></a>`).join('')}</div>
<h2>Kentsel dönüşüm rehberleri</h2>
<div class="cards"><a class="card" href="/kentsel-donusum-sureci/"><small>SÜREÇ</small><b>Kentsel dönüşüm süreci adım adım</b></a><a class="card" href="/riskli-yapi-tespiti/"><small>TESPİT</small><b>Riskli yapı tespiti nedir?</b></a><a class="card" href="/kadikoy-kentsel-donusum/"><small>KADIKÖY</small><b>Kadıköy’de kentsel dönüşüm</b></a><a class="card" href="/erenkoy-kentsel-donusum/"><small>ERENKÖY</small><b>Erenköy’de kentsel dönüşüm</b></a><a class="card" href="/sss/"><small>SSS</small><b>Sık sorulan sorular</b></a></div>`
});
