// NEXERA ALIVE akıllı yaşam sayfası (TR + EN). Kaynak: NEXERA kuruluş kitabı/kataloğu (sitedeki Vizyon ve 3B daire içerikleriyle aynı).
import { GUNCEL } from './icerik-ortak.mjs';

const KATMAN_TR = `<div class="tw"><table><tr><th>Katman</th><th>Kapsam</th><th>Dairede örnekler</th></tr>
<tr><td><b>Base ALIVE</b></td><td>Daireye dahil temel akıllı yaşam standardı: aydınlatma, iklim, temel güvenlik ve mobil erişim.</td><td>Aydınlatma sahneleri, iklim kontrolü, giyinme odası aydınlatması, telefondan erişim.</td></tr>
<tr><td><b>ALIVE+</b></td><td>Daha yüksek konfor ve otomasyon: gelişmiş senaryolar, çoklu ortam ve enerji optimizasyonu.</td><td>Motorlu perdeler ve mahremiyet modu, TV/sinema ve çok odalı müzik, çalışma modu, yerden ısıtma.</td></tr>
<tr><td><b>SIGNATURE</b></td><td>Üst seviye kişiselleştirilmiş deneyim: yapay zekâ entegrasyonu, özel senaryo tasarımı ve 7/24 danışmanlık.</td><td>Mutfak senaryoları, uyku asistanı, kişisel duş ayarları.</td></tr>
</table></div>`;
const KATMAN_EN = `<div class="tw"><table><tr><th>Tier</th><th>Scope</th><th>Examples in the apartment</th></tr>
<tr><td><b>Base ALIVE</b></td><td>The smart-living standard included with the apartment: lighting, climate, basic security and mobile access.</td><td>Lighting scenes, climate control, walk-in closet lighting, phone access.</td></tr>
<tr><td><b>ALIVE+</b></td><td>Higher comfort and automation: advanced scenarios, multi-room media and energy optimisation.</td><td>Motorised curtains and privacy mode, TV/cinema and multi-room music, work mode, underfloor heating.</td></tr>
<tr><td><b>SIGNATURE</b></td><td>Top-level personalised experience: AI integration, custom scenario design and 24/7 concierge support.</td><td>Kitchen scenarios, sleep assistant, personal shower settings.</td></tr>
</table></div>`;

export const ALIVE_TR = {
  slug: 'nexera-alive', path: '/nexera-alive/', alt: '/en/nexera-alive/', type: 'page', updated: GUNCEL, amac: 'oturum',
  crumbs: [['Rehberler', 'https://nexeralive.com/rehber/']], related: ['akilli-daire-rehberi', 'projeden-mi-hazir-mi', 'tapu-kontrol-listesi'],
  kicker: 'NEXERA ALIVE · AKILLI YAŞAM', title: 'NEXERA ALIVE: İstanbul’da Akıllı Daire ve Yapay Zekâ ile Yaşam', h1: 'NEXERA ALIVE: <span>yaşayan akıllı daire.</span>',
  desc: 'NEXERA ALIVE, NEXERA İnşaat konutlarının akıllı yaşam platformu: Base ALIVE, ALIVE+ ve SIGNATURE katmanları; aydınlatma, iklim, güvenlik, enerji ve yapay zekâ entegrasyonu; internet olmadan da çalışan altyapı ve NEXERA CARE satış sonrası hizmet.',
  lead: 'NEXERA ALIVE, NEXERA İnşaat’ın konutlara inşaat aşamasından itibaren yerleştirdiği akıllı yaşam platformudur. Amaç, sakinini tanıyan, öğrenen ve koruyan; teknolojisi görünmeyen ama her gün hissedilen bir daire.',
  answer: 'NEXERA ALIVE, NEXERA İnşaat konutlarının akıllı yaşam platformudur ve üç katmandan oluşur: daireye dahil Base ALIVE (aydınlatma, iklim, temel güvenlik, mobil erişim), ALIVE+ (gelişmiş senaryolar, çoklu ortam, enerji optimizasyonu) ve SIGNATURE (yapay zekâ entegrasyonu, özel senaryo tasarımı, 7/24 danışmanlık). Altyapı inşaat sırasında kurulur ve internet kesildiğinde de temel işlevlerin çalışması (offline dayanıklılık) ilke olarak benimsenir. Paketlerin projeye göre ayrıntılı şartnamesi ve fiyatları, ilgili proje satışa açıldığında yazılı olarak açıklanır; şu an satışta daire yoktur.',
  body: `
<h2>Dört temel</h2>
<ul>
<li><b>Akıllı aydınlatma ve iklim:</b> Saate, odaya ve senaryoya göre ışık ve sıcaklık.</li>
<li><b>Enerji optimizasyonu:</b> Tüketimin izlenmesi ve gereksiz kullanımın azaltılması.</li>
<li><b>Güvenlik ve erişim:</b> Kapı, giriş ve uzaktan erişim; bildirimler.</li>
<li><b>Offline dayanıklılık:</b> Temel işlevlerin internete ve uzak bir sunucuya bağımlı olmadan, bina içinde çalışması.</li>
</ul>
<h2>Üç katman</h2>
${KATMAN_TR}
<p>Base ALIVE, NEXERA dairesinin standardıdır. ALIVE+ ve SIGNATURE, aynı altyapı üzerine eklenen üyelik katmanlarıdır.</p>
<h2>Daireyi kendiniz gezin</h2>
<p>Sitedeki <a href="/daire/">3B NEXERA dairesinde</a> odaları dolaşıp ışık, perde, iklim, sinema, duş ve güvenlik senaryolarını deneyebilir, her özelliğin hangi katmana ait olduğunu görebilirsiniz. Görseller temsilîdir.</p>
<h2>NEXERA CARE: teslimden sonra</h2>
<p>Teslim öncesinde ALIVE kurulumu ve kullanım eğitimi tamamlanır. NEXERA CARE; teslim deneyimi, proaktif bakım, 7/24 destek ve topluluk yönetimiyle sistemin ve binanın değerini yıllar boyunca korumayı amaçlar. Bir sorun olduğunda tek bir numaraya ulaşırsınız.</p>
<h2>Gizlilik</h2>
<p>Akıllı ev verileri kişisel veridir. NEXERA, ALIVE’ı 6698 sayılı Kişisel Verilerin Korunması Kanunu’na uygun tasarlamayı ilke edinir; hangi verinin nerede tutulduğu ve kimin erişebildiği, projenin şartnamesi ve aydınlatma metniyle birlikte açıklanacaktır.</p>
<h2>Hangi projelerde?</h2>
<p>ALIVE, NEXERA konut projelerinin standardıdır. Erenköy’deki projemiz (NEXERA’nın ortak olduğu proje) hazırlık aşamasındadır; daire tipleri, ALIVE katmanlarının bu projedeki ayrıntıları ve fiyatlar henüz açıklanmadı. Haberdar olmak için aşağıdaki formu doldurabilir ya da sağ alttaki danışmanımıza yazabilirsiniz.</p>
<p>Akıllı daire alırken genel olarak neye bakılacağını <a href="/rehber/akilli-daire-rehberi/">akıllı daire rehberimizde</a> anlattık.</p>`,
  sources: [['NEXERA — Vizyon ve Akıllı Yaşam', 'https://nexeralive.com/vizyon/'], ['NEXERA — 3B daire', 'https://nexeralive.com/daire/']]
};

export const ALIVE_EN = {
  slug: 'nexera-alive', path: '/en/nexera-alive/', alt: '/nexera-alive/', type: 'page', updated: GUNCEL, amac: 'oturum',
  crumbs: [['Guides', 'https://nexeralive.com/en/guides/']], related: ['smart-apartment-buyers-guide', 'off-plan-vs-completed-property', 'title-deed-checklist'],
  kicker: 'NEXERA ALIVE · SMART LIVING', title: 'NEXERA ALIVE: Smart, AI-Integrated Apartments in Istanbul', h1: 'NEXERA ALIVE: <span>the apartment that lives with you.</span>',
  desc: 'NEXERA ALIVE is the smart-living platform of NEXERA İnşaat homes in Istanbul: Base ALIVE, ALIVE+ and SIGNATURE tiers covering lighting, climate, security, energy and AI integration, offline-resilient infrastructure and NEXERA CARE after-sales service.',
  lead: 'NEXERA ALIVE is the smart-living platform NEXERA İnşaat builds into its homes from the construction stage — an apartment that knows, learns and protects its residents, with technology you do not see but feel every day.',
  answer: 'NEXERA ALIVE is the smart-living platform of NEXERA İnşaat homes, in three tiers: Base ALIVE, included with the apartment (lighting, climate, basic security, mobile access); ALIVE+ (advanced scenarios, multi-room media, energy optimisation); and SIGNATURE (AI integration, custom scenario design, 24/7 concierge support). The infrastructure is installed during construction, and basic functions are designed to keep working without the internet (offline resilience). Detailed specifications and prices per project are published in writing when that project opens for sale; no units are on sale at the moment.',
  body: `
<h2>Four foundations</h2>
<ul>
<li><b>Smart lighting and climate</b> by time, room and scenario.</li>
<li><b>Energy optimisation:</b> monitoring consumption and cutting waste.</li>
<li><b>Security and access:</b> doors, entry and remote access with notifications.</li>
<li><b>Offline resilience:</b> core functions run inside the building, without depending on the internet or a remote server.</li>
</ul>
<h2>Three tiers</h2>
${KATMAN_EN}
<p>Base ALIVE is the NEXERA standard. ALIVE+ and SIGNATURE are membership tiers on the same infrastructure.</p>
<h2>Walk through the apartment</h2>
<p>In the <a href="/daire/" hreflang="tr">3D NEXERA apartment</a> you can move between rooms, try lighting, curtain, climate, cinema, shower and security scenarios, and see which tier each feature belongs to (interface in Turkish; visuals are illustrative).</p>
<h2>NEXERA CARE after handover</h2>
<p>ALIVE set-up and a short training are completed before handover. NEXERA CARE — handover experience, proactive maintenance, 24/7 support and community management — aims to protect the system and the building’s value for years, with one number to call.</p>
<h2>Privacy</h2>
<p>Smart-home data is personal data. NEXERA designs ALIVE to comply with Türkiye’s data-protection law (KVKK, Law No. 6698); what is stored where, and who can access it, will be set out in each project’s specification and privacy notice.</p>
<h2>Which projects?</h2>
<p>ALIVE is the standard for NEXERA residential projects. Our Erenköy project (in which NEXERA is a partner) is in pre-construction; unit types, tier details for that project and prices have not been announced. Leave your details below or chat with our assistant to be notified.</p>
<p>For general advice, see our <a href="/en/guides/smart-apartment-buyers-guide/">smart apartment buyer’s guide</a>.</p>`,
  sources: [['NEXERA — Vision and smart living (Turkish)', 'https://nexeralive.com/vizyon/'], ['NEXERA — 3D apartment (Turkish)', 'https://nexeralive.com/daire/']]
};
