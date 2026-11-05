// Rehberler: tapu kontrol listesi, projeden mi hazır mı (TR + EN). Resmî kaynaklar 6 Kasım 2026'da kontrol edildi.
import { GUNCEL } from './icerik-ortak.mjs';
const MEV = n => `https://www.mevzuat.gov.tr/MevzuatMetin/1.5.${n}.pdf`;

export const TAPU_TR = {
  slug: 'tapu-kontrol-listesi', path: '/rehber/tapu-kontrol-listesi/', alt: '/en/guides/title-deed-checklist/', type: 'article', updated: GUNCEL, amac: 'oturum',
  crumbs: [['Rehberler', 'https://nexeralive.com/rehber/']], related: ['konut-alim-maliyetleri', 'projeden-mi-hazir-mi', 'yabancilar-konut-satin-alma'],
  kicker: 'REHBER · TAPU', title: 'Ev Almadan Önce Tapu ve Taşınmaz Kontrol Listesi', h1: 'Ev almadan önce <span>tapu kontrol listesi.</span>',
  desc: 'Konut almadan önce tapuda neye bakılır? Malik, hisse, ipotek, haciz, şerh ve beyanlar; kat irtifakı ile kat mülkiyeti farkı; ruhsat, iskân ve aidat borcu kontrolü.',
  lead: 'Bir konutun değeri, tapusundaki kayıtlar kadar güvenlidir. Kapora vermeden ve sözleşme imzalamadan önce aşağıdaki kontrolleri yapmak, sonradan çözülmesi yıllar sürebilecek sorunları baştan önler.',
  answer: 'Satın almadan önce güncel tapu kaydını görün; satıcının gerçek malik olduğunu, hissenizin ne olduğunu ve tapuda ipotek, haciz, şerh veya beyan bulunup bulunmadığını kontrol edin. Tapu kat mülkiyeti mi kat irtifakı mı, binanın yapı ruhsatı ve iskânı var mı, yönetim ve aidat borcu kalmış mı, mutlaka sorun. Ödemenin büyük kısmını tapu devrinden önce yapmayın.',
  body: `
<h2>1. Tapu kaydını kendiniz görün</h2>
<p>Satıcının gösterdiği bir fotokopiye değil, güncel kayda bakın. Malik kendi tapu bilgilerini e-Devlet’teki “Tapu Bilgileri Sorgulama” hizmetinden görebilir; alıcı olarak satıcıdan bu dökümü ya da tapu müdürlüğünden alınmış güncel bir kayıt örneğini isteyin. Tapudaki <b>ada, parsel ve bağımsız bölüm numarası</b> ile satın aldığınız dairenin aynı olduğunu doğrulayın.</p>
<h2>2. Malik ve hisse</h2>
<ul>
<li><b>Satıcı gerçekten malik mi?</b> Tapudaki ad ile kimlik eşleşmeli. Vekâletle satışta vekâletnamenin aslını ve kapsamını (satış yetkisi, taşınmazın açıkça yazılması) kontrol edin.</li>
<li><b>Hisseli mülkiyet:</b> Tapuda birden fazla malik varsa hepsinin satışa katılması gerekir. Yalnızca bir hisseyi almak, dairenin tamamını almak anlamına gelmez.</li>
</ul>
<h2>3. Takyidatlar: ipotek, haciz, şerh, beyan</h2>
<div class="tw"><table><tr><th>Kayıt</th><th>Ne anlama gelir?</th><th>Ne yapmalı?</th></tr>
<tr><td>İpotek</td><td>Taşınmaz bir borcun teminatıdır (çoğunlukla banka kredisi).</td><td>Tapu devrinden önce ipoteğin kaldırılmasını ya da nasıl kaldırılacağının yazılı olarak planlanmasını şart koşun.</td></tr>
<tr><td>Haciz</td><td>Malikin bir borcu nedeniyle taşınmaz üzerine konmuş icra kaydıdır.</td><td>Haciz kaldırılmadan alım yapmayın.</td></tr>
<tr><td>Şerh</td><td>Kira, önalım, satış vaadi, riskli yapı gibi hakların üçüncü kişilere karşı ileri sürülebilir hâle getirilmiş kaydıdır.</td><td>Her şerhin ne olduğunu ve sizi nasıl bağladığını öğrenin; gerekirse avukata sorun.</td></tr>
<tr><td>Beyan</td><td>Yönetim planı, kat irtifakı/mülkiyeti notları gibi bilgilendirme amaçlı kayıtlardır.</td><td>Okuyun; özellikle yönetim planındaki kullanım kısıtlamalarına bakın.</td></tr>
</table></div>
<h2>4. Kat irtifakı mı, kat mülkiyeti mi?</h2>
<p>634 sayılı Kat Mülkiyeti Kanunu’na göre <b>kat irtifakı</b>, henüz tamamlanmamış ya da yapı kullanma izni (iskân) alınmamış bir binada ileride bağımsız bölüm olacak yerler için kurulur. Bina tamamlanıp iskân alındığında <b>kat mülkiyetine</b> geçilir. Projeden alımda kat irtifaklı tapu olağandır; tamamlanmış bir binada hâlâ kat irtifakı varsa iskânın neden alınmadığını sorun.</p>
<h2>5. Ruhsat, iskân ve imar</h2>
<ul>
<li><b>Yapı ruhsatı:</b> Bina belediyenin onayladığı projeye göre yapılmış olmalı. Yeni projede ruhsat tarihini ve numarasını isteyin.</li>
<li><b>İskân (yapı kullanma izni):</b> Tamamlanmış binada iskân belgesini görün. İskânsız binalarda abonelik, kredi ve satış süreçlerinde sorun yaşanabilir.</li>
<li><b>Projeye uygunluk:</b> Dairede onaylı projede olmayan değişiklikler (kapatılmış balkon, birleştirilmiş bölümler) varsa ileride sorun çıkarabilir.</li>
<li><b>Riskli yapı:</b> Tapuda riskli yapı şerhi varsa bina 6306 sayılı Kanun kapsamında dönüşüm sürecindedir; bu durumda alımın sonuçlarını mutlaka ayrıca değerlendirin.</li>
</ul>
<h2>6. Binanın günlük borçları</h2>
<p>Aidat, ortak gider ve yakıt borcu olup olmadığını bina yönetiminden yazılı olarak öğrenin. Elektrik, su ve doğalgaz aboneliklerinin borçsuz devredileceğini teyit edin. Zorunlu deprem sigortasının (DASK) geçerli olup olmadığını kontrol edin.</p>
<h2>7. Ödemeyi tapuya bağlayın</h2>
<p>Satış, tapu müdürlüğünde resmî senetle yapılır. Kapora verirseniz koşullarını yazılı yapın; ödemenin büyük kısmını tapu devri anında, izlenebilir banka transferiyle yapın. Projeden alımlarda satış vaadi sözleşmesinin noterde düzenleme şeklinde yapılması ve tapuya şerh verilmesi, alıcıyı üçüncü kişilere karşı korur.</p>`,
  sources: [
    ['Türkiye Cumhuriyeti Tapu ve Kadastro Genel Müdürlüğü (TKGM)', 'https://www.tkgm.gov.tr/'],
    ['e-Devlet — Tapu Bilgileri Sorgulama', 'https://www.turkiye.gov.tr/tkgm-tapu-bilgileri-sorgulama'],
    ['634 sayılı Kat Mülkiyeti Kanunu', MEV(634)],
    ['3194 sayılı İmar Kanunu', MEV(3194)],
    ['6306 sayılı Afet Riski Altındaki Alanların Dönüştürülmesi Hakkında Kanun', MEV(6306)],
    ['Doğal Afet Sigortaları Kurumu (DASK)', 'https://www.dask.gov.tr/']
  ]
};

export const TAPU_EN = {
  slug: 'title-deed-checklist', path: '/en/guides/title-deed-checklist/', alt: '/rehber/tapu-kontrol-listesi/', type: 'article', updated: GUNCEL, amac: 'oturum',
  crumbs: [['Guides', 'https://nexeralive.com/en/guides/']], related: ['total-cost-of-buying-property-in-turkey', 'off-plan-vs-completed-property', 'buying-property-in-turkey-as-a-foreigner'],
  kicker: 'GUIDE · TITLE DEED', title: 'Turkish Title Deed (Tapu) Checklist Before You Buy', h1: 'Title deed (tapu) <span>checklist before you buy.</span>',
  desc: 'What to check on a Turkish title deed before buying: owner and share, mortgage, attachment, annotations, condominium vs. construction servitude, permits, occupancy and unpaid dues.',
  lead: 'A property in Türkiye is only as safe as the records on its title deed (tapu). Run these checks before you pay a deposit or sign anything; problems found afterwards can take years to resolve.',
  answer: 'See the current land-registry record yourself. Confirm that the seller is the registered owner, what share you are buying, and whether there is any mortgage, attachment, annotation (şerh) or declaration (beyan). Ask whether the deed is full condominium (kat mülkiyeti) or construction servitude (kat irtifakı), whether the building has a construction permit and occupancy permit (iskân), and whether any building dues are unpaid. Do not pay most of the price before the title transfer.',
  body: `
<h2>1. See the land-registry record yourself</h2>
<p>Do not rely on a photocopy. Owners can view their records on the e-Devlet “Tapu Bilgileri Sorgulama” service; ask the seller for this record or for a current extract from the land registry office. Check that the <b>block (ada), parcel and unit number</b> match the flat you are buying.</p>
<h2>2. Owner and share</h2>
<ul>
<li><b>Is the seller the registered owner?</b> The name on the deed must match the seller’s ID. If someone sells under a power of attorney, check the original document and that it expressly authorises the sale of this property.</li>
<li><b>Shared ownership:</b> if several people are registered, all of them must take part in the sale. Buying one share is not buying the whole flat.</li>
</ul>
<h2>3. Encumbrances: mortgage, attachment, annotations, declarations</h2>
<div class="tw"><table><tr><th>Record</th><th>What it means</th><th>What to do</th></tr>
<tr><td>Mortgage (ipotek)</td><td>The property secures a debt, usually a bank loan.</td><td>Make removal of the mortgage, or a written plan for removing it, a condition before transfer.</td></tr>
<tr><td>Attachment (haciz)</td><td>An enforcement record placed because of the owner’s debt.</td><td>Do not buy until it is lifted.</td></tr>
<tr><td>Annotation (şerh)</td><td>Registers a right (lease, pre-emption, sales promise, risky-building status) so that it binds third parties.</td><td>Find out what each annotation is and how it affects you; ask a lawyer if unsure.</td></tr>
<tr><td>Declaration (beyan)</td><td>Informational notes such as the building’s management plan.</td><td>Read them, especially any use restrictions in the management plan.</td></tr>
</table></div>
<h2>4. Construction servitude or full condominium?</h2>
<p>Under the Condominium Law No. 634, <b>kat irtifakı</b> (construction servitude) is established for future independent units in a building that is not finished or has no occupancy permit yet. When the building is completed and the occupancy permit is issued, it is converted into <b>kat mülkiyeti</b> (full condominium ownership). Off-plan purchases normally start with kat irtifakı; if a finished building still has only kat irtifakı, ask why the occupancy permit has not been obtained.</p>
<h2>5. Permits and zoning</h2>
<ul>
<li><b>Construction permit (yapı ruhsatı):</b> for a new project, ask for the permit date and number.</li>
<li><b>Occupancy permit (iskân / yapı kullanma izni):</b> for a completed building, see the document. Buildings without it can face problems with utilities, mortgages and resale.</li>
<li><b>Conformity with the approved plans:</b> unapproved changes (enclosed balconies, merged units) can cause problems later.</li>
<li><b>Risky building:</b> a risky-building annotation means the building is in an urban-renewal process under Law No. 6306; assess the consequences separately before buying.</li>
</ul>
<h2>6. Day-to-day debts of the flat</h2>
<p>Get written confirmation from the building management that there are no unpaid service charges. Confirm that electricity, water and gas accounts will be transferred without debt, and that compulsory earthquake insurance (DASK) is in force.</p>
<h2>7. Tie payment to the transfer</h2>
<p>The sale is completed at the land registry office with an official deed. Put any deposit terms in writing, and pay most of the price at the moment of transfer by traceable bank transfer. For off-plan purchases, a notarised sales-promise contract annotated on the title deed protects the buyer against third parties.</p>`,
  sources: [
    ['General Directorate of Land Registry and Cadastre (TKGM)', 'https://www.tkgm.gov.tr/'],
    ['e-Devlet — Title deed information inquiry (Turkish)', 'https://www.turkiye.gov.tr/tkgm-tapu-bilgileri-sorgulama'],
    ['Condominium Law No. 634 (Turkish)', MEV(634)],
    ['Zoning Law No. 3194 (Turkish)', MEV(3194)],
    ['Law No. 6306 on the Transformation of Areas under Disaster Risk (Turkish)', MEV(6306)],
    ['Turkish Catastrophe Insurance Pool (DASK)', 'https://www.dask.gov.tr/']
  ]
};

export const PROJE_TR = {
  slug: 'projeden-mi-hazir-mi', path: '/rehber/projeden-mi-hazir-mi/', alt: '/en/guides/off-plan-vs-completed-property/', type: 'article', updated: GUNCEL, amac: 'oturum',
  crumbs: [['Rehberler', 'https://nexeralive.com/rehber/']], related: ['tapu-kontrol-listesi', 'konut-alim-maliyetleri', 'kira-geliri-giderler-riskler'],
  kicker: 'REHBER · KARAR', title: 'Projeden Konut mu, Hazır Konut mu?', h1: 'Projeden mi, <span>hazır konut mu?</span>',
  desc: 'Yeni projeden (topraktan) konut almakla tamamlanmış daire almanın farkları: fiyat, risk, tapu, teslim süresi, kira geliri ve sözleşmede bakılacak maddeler.',
  lead: 'Projeden alım çoğu zaman daha düşük giriş fiyatı ve ödeme kolaylığı sunar; hazır konut ise gördüğünüzü almanızı ve hemen oturmanızı ya da kiraya vermenizi sağlar. Hangisinin size uygun olduğu, zamanınıza ve risk toleransınıza bağlıdır.',
  answer: 'Hemen oturmanız ya da kira geliri elde etmeniz gerekiyorsa ve sürprizi sevmiyorsanız hazır konut daha uygundur. Birkaç yıl bekleyebiliyor, ödemeyi zamana yaymak istiyor ve geliştiricinin geçmişini, ruhsatını ve sözleşmesini iyi inceleyebiliyorsanız projeden alım avantajlı olabilir. Projeden alımda en önemli koruma, noterde yapılan ve tapuya şerh edilen satış vaadi sözleşmesi ile işin ilerlemesine bağlı ödeme planıdır.',
  body: `
<h2>Karşılaştırma</h2>
<div class="tw"><table><tr><th></th><th>Projeden (inşaat aşamasında)</th><th>Hazır (tamamlanmış)</th></tr>
<tr><td>Fiyat</td><td>Genellikle teslimden önce satış fiyatı daha düşüktür; ödeme vadeye yayılabilir.</td><td>Piyasa fiyatı; ödeme çoğunlukla peşin veya krediyle.</td></tr>
<tr><td>Gördüğünüz</td><td>Plan, render ve şartname; gerçek daire teslimde görülür.</td><td>Dairenin kendisi; manzara, ışık, ses, komşular.</td></tr>
<tr><td>Tapu</td><td>Çoğunlukla kat irtifakı veya satış vaadi; kat mülkiyeti iskândan sonra.</td><td>Genellikle kat mülkiyeti.</td></tr>
<tr><td>Ana risk</td><td>Gecikme, şartnameden sapma, geliştiricinin işi bitirememesi.</td><td>Gizli kusur, imar/iskân sorunu, binanın yaşı ve deprem dayanımı.</td></tr>
<tr><td>Kullanım / kira</td><td>Teslime kadar gelir yok.</td><td>Hemen oturulabilir veya kiraya verilebilir.</td></tr>
<tr><td>Bina standardı</td><td>Güncel deprem yönetmeliği ve yeni teknik standartlar.</td><td>Yapım yılına bağlı; eski binalarda deprem riski ayrıca değerlendirilmeli.</td></tr>
</table></div>
<h2>Projeden alırken sözleşmede neye bakılır?</h2>
<ul>
<li><b>Yapı ruhsatı:</b> Satışa çıkan projenin ruhsatı var mı, ruhsattaki daire sayısı ve alanlar satışta söylenenle uyuşuyor mu?</li>
<li><b>Satış vaadi sözleşmesi:</b> Noterde düzenleme şeklinde yapılması ve tapuya şerh verilmesi, alıcıyı üçüncü kişilere karşı korur.</li>
<li><b>Teslim tarihi ve gecikme:</b> Kesin teslim tarihi, gecikmede uygulanacak cezai şart ve sözleşmeden dönme koşulları yazılı olmalı.</li>
<li><b>Şartname:</b> Malzeme ve marka listesi, net ve brüt m², ortak alanlar ve otopark açıkça yazılmalı.</li>
<li><b>Ödeme planı:</b> Ödemelerin işin ilerlemesine bağlanması ve izlenebilir banka transferiyle yapılması riski azaltır.</li>
<li><b>Fiyata dahil olanlar:</b> KDV, tapu harcı, abonelikler, aidat başlangıcı gibi kalemlerin kimde olduğu yazılı olmalı. Ayrıntılar için <a href="/rehber/konut-alim-maliyetleri/">konut alım maliyetleri</a> rehberine bakın.</li>
</ul>
<h2>Hazır alırken neye bakılır?</h2>
<p>Tapu kayıtları, iskân, yapım yılı, aidat borcu ve binanın deprem durumu öne çıkar. Adım adım kontroller için <a href="/rehber/tapu-kontrol-listesi/">tapu kontrol listemize</a> bakın. Eski binalarda, binanın kentsel dönüşüm kapsamına girip girmeyeceğini de sorun.</p>
<h2>NEXERA’da durum</h2>
<p>NEXERA’nın Erenköy’deki ilk projesi hazırlık aşamasındadır; daire tipleri, fiyatlar ve teslim tarihi henüz açıklanmadı ve şu an satışta daire yoktur. Satışa açıldığında ruhsat, şartname ve ödeme planı bilgilerini yazılı olarak paylaşacağız.</p>`,
  sources: [
    ['634 sayılı Kat Mülkiyeti Kanunu', MEV(634)],
    ['3194 sayılı İmar Kanunu', MEV(3194)],
    ['6502 sayılı Tüketicinin Korunması Hakkında Kanun (ön ödemeli konut satışları)', MEV(6502)],
    ['Tapu ve Kadastro Genel Müdürlüğü', 'https://www.tkgm.gov.tr/']
  ]
};

export const PROJE_EN = {
  slug: 'off-plan-vs-completed-property', path: '/en/guides/off-plan-vs-completed-property/', alt: '/rehber/projeden-mi-hazir-mi/', type: 'article', updated: GUNCEL, amac: 'oturum',
  crumbs: [['Guides', 'https://nexeralive.com/en/guides/']], related: ['title-deed-checklist', 'total-cost-of-buying-property-in-turkey', 'rental-income-costs-and-risks'],
  kicker: 'GUIDE · DECISION', title: 'Off-Plan vs Completed Property in Istanbul', h1: 'Off-plan or <span>completed property?</span>',
  desc: 'Buying off-plan versus a completed flat in Türkiye: price, risk, title deed, delivery time, rental income and the contract clauses to check.',
  lead: 'Off-plan purchases often come with a lower entry price and staged payments; a completed flat lets you buy what you see and move in or rent it out at once. Which suits you depends on your timeline and how much risk you can carry.',
  answer: 'If you need to live in the property or earn rent soon and dislike surprises, a completed flat is the safer choice. If you can wait a few years, want to spread payments and can examine the developer’s track record, permit and contract carefully, buying off-plan can be worthwhile. The key protections are a notarised sales-promise contract annotated on the title deed and a payment plan tied to construction progress.',
  body: `
<h2>Side by side</h2>
<div class="tw"><table><tr><th></th><th>Off-plan (under construction)</th><th>Completed</th></tr>
<tr><td>Price</td><td>Usually lower before delivery; payments can be spread.</td><td>Market price; usually paid upfront or with a mortgage.</td></tr>
<tr><td>What you see</td><td>Plans, renderings and specifications; the real flat at delivery.</td><td>The flat itself: view, light, noise, neighbours.</td></tr>
<tr><td>Title</td><td>Usually construction servitude (kat irtifakı) or a sales promise; full condominium after the occupancy permit.</td><td>Usually full condominium (kat mülkiyeti).</td></tr>
<tr><td>Main risk</td><td>Delay, deviation from specifications, developer failing to finish.</td><td>Hidden defects, zoning/occupancy problems, age and earthquake resistance of the building.</td></tr>
<tr><td>Use / rent</td><td>No income until delivery.</td><td>Can be occupied or let immediately.</td></tr>
<tr><td>Building standard</td><td>Current earthquake regulation and technical standards.</td><td>Depends on the construction year; assess earthquake risk in older buildings.</td></tr>
</table></div>
<h2>Off-plan: what to check in the contract</h2>
<ul>
<li><b>Construction permit:</b> does the project have one, and do the unit count and areas match what is being sold?</li>
<li><b>Sales-promise contract:</b> a contract made before a notary and annotated on the title deed protects you against third parties.</li>
<li><b>Delivery date and delay:</b> a firm date, a penalty for delay and the conditions for withdrawing should be written down.</li>
<li><b>Specifications:</b> materials and brands, net and gross m², common areas and parking.</li>
<li><b>Payment plan:</b> linking payments to construction progress and paying by traceable bank transfer lowers risk.</li>
<li><b>What the price includes:</b> VAT, title-deed fee, utility connections and service charges. See our <a href="/en/guides/total-cost-of-buying-property-in-turkey/">total cost guide</a>.</li>
</ul>
<h2>Completed: what to check</h2>
<p>Title-deed records, the occupancy permit, construction year, unpaid dues and the building’s earthquake resistance matter most. Use our <a href="/en/guides/title-deed-checklist/">title deed checklist</a>. In older buildings, also ask whether the building may enter an urban-renewal process.</p>
<h2>NEXERA today</h2>
<p>NEXERA’s first project in Erenköy is in pre-construction; unit types, prices and the delivery date have not been announced and no units are on sale yet. When sales open we will provide the permit, specifications and payment plan in writing.</p>`,
  sources: [
    ['Condominium Law No. 634 (Turkish)', MEV(634)],
    ['Zoning Law No. 3194 (Turkish)', MEV(3194)],
    ['Consumer Protection Law No. 6502 — pre-paid housing sales (Turkish)', MEV(6502)],
    ['General Directorate of Land Registry and Cadastre (TKGM)', 'https://www.tkgm.gov.tr/']
  ]
};
