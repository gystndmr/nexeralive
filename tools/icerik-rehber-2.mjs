// Rehberler: yabancıların konut alımı, toplam maliyet, kira geliri (yayında) — vatandaşlık, uzaktan alım/vekâlet, ikamet izni (TASLAK).
// Tüm rakamlar 6 Kasım 2026'da resmî metinlerden (mevzuat.gov.tr, resmigazete.gov.tr, e-ikamet.goc.gov.tr, dış temsilcilik) kontrol edildi.
import { GUNCEL } from './icerik-ortak.mjs';
const M = (k, n) => `https://www.mevzuat.gov.tr/MevzuatMetin/${k}.${n}.pdf`;
const SRC = {
  tapu: ['2644 sayılı Tapu Kanunu, m. 35 (yabancıların taşınmaz edinimi)', M('1.3', 2644)],
  harc: ['492 sayılı Harçlar Kanunu, (4) sayılı tarife ve m. 63', M('1.5', 492)],
  kdv: ['3065 sayılı Katma Değer Vergisi Kanunu, m. 13/i', M('1.5', 3065)],
  kdvoran: ['Cumhurbaşkanı Kararı 5359 (KDV oranları, Resmî Gazete 29.03.2022)', 'https://www.resmigazete.gov.tr/eskiler/2022/03/20220329-6.pdf'],
  kdv7346: ['Cumhurbaşkanı Kararı 7346 (KDV oranları, Resmî Gazete 07.07.2023)', 'https://www.resmigazete.gov.tr/eskiler/2023/07/20230707-11.pdf'],
  emlak: ['1319 sayılı Emlak Vergisi Kanunu, m. 8 ve geçici m. 23', M('1.5', 1319)],
  dask: ['6305 sayılı Afet Sigortaları Kanunu, m. 2 ve 13', M('1.5', 6305)],
  damga: ['488 sayılı Damga Vergisi Kanunu, (2) sayılı tablo', M('1.5', 488)],
  vat: ['5901 sayılı Türk Vatandaşlığı Kanunu, m. 12', M('1.5', 5901)],
  vatyon: ['Türk Vatandaşlığı Kanununun Uygulanmasına İlişkin Yönetmelik, m. 20', M('21.5', 2010139)],
  yukk: ['6458 sayılı Yabancılar ve Uluslararası Koruma Kanunu, m. 31', M('1.5', 6458)],
  eikamet: ['Göç İdaresi — e-İkamet başvuruda istenen belgeler (taşınmaz sahibi)', 'https://e-ikamet.goc.gov.tr/Ikamet/BasvuruIstenenBelgeler/BasvuruFormuIstenenBelgeler?tur=0'],
  gvk: ['193 sayılı Gelir Vergisi Kanunu, m. 21, 74, 86, 103', M('1.4', 193)],
  kisa: ['7464 sayılı Konutların Turizm Amaçlı Kiralanmasına ve Bazı Kanunlarda Değişiklik Yapılmasına Dair Kanun', M('1.5', 7464)],
  berlin: ['T.C. Berlin Başkonsolosluğu — Tapu işlemleri bilgi notu', 'https://berlin-bk.mfa.gov.tr/Content/assets/consulate/images/localCache/1/9f8dee6c-2f4d-425e-81da-286c568f0b5a.docx'],
  tkgm: ['Tapu ve Kadastro Genel Müdürlüğü (TKGM)', 'https://www.tkgm.gov.tr/'],
  webtapu: ['Web Tapu (randevu, değerleme ve başvuru)', 'https://webtapu.tkgm.gov.tr/'],
  medeni: ['4721 sayılı Türk Medeni Kanunu, m. 1009–1012, 1020', M('1.5', 4721)],
};
const EN = { tapu: 'Land Registry Law No. 2644, art. 35 (acquisition by foreigners) — Turkish', harc: 'Fees Law No. 492, tariff (4) and art. 63 — Turkish', kdv: 'VAT Law No. 3065, art. 13/i — Turkish', kdvoran: 'Presidential Decision 5359 on VAT rates (Official Gazette 29 Mar 2022) — Turkish', kdv7346: 'Presidential Decision 7346 on VAT rates (Official Gazette 7 Jul 2023) — Turkish', emlak: 'Property Tax Law No. 1319, art. 8 and temporary art. 23 — Turkish', dask: 'Disaster Insurance Law No. 6305, arts. 2 and 13 — Turkish', damga: 'Stamp Duty Law No. 488, table (2) — Turkish', vat: 'Turkish Citizenship Law No. 5901, art. 12 — Turkish', vatyon: 'Regulation on the Implementation of the Turkish Citizenship Law, art. 20 — Turkish', yukk: 'Law No. 6458 on Foreigners and International Protection, art. 31 — Turkish', eikamet: 'Presidency of Migration Management — e-İkamet document list for property owners (Turkish)', gvk: 'Income Tax Law No. 193, arts. 21, 74, 86, 103 — Turkish', kisa: 'Law No. 7464 on short-term tourist rental of homes — Turkish', berlin: 'Consulate General of Türkiye in Berlin — land registry information sheet (Turkish)', tkgm: 'General Directorate of Land Registry and Cadastre (TKGM)', webtapu: 'Web Tapu — appointments, valuation and applications', medeni: 'Turkish Civil Code No. 4721, arts. 1009–1012, 1020 — Turkish' };
const src = (...k) => k.map(x => SRC[x]);
const srcEn = (...k) => k.map(x => [EN[x], SRC[x][1]]);
const C_TR = [['Rehberler', 'https://nexeralive.com/rehber/']], C_EN = [['Guides', 'https://nexeralive.com/en/guides/']];

// ===================== 1. YABANCILAR İÇİN KONUT ALIMI =====================
export const YAB_TR = {
  slug: 'yabancilar-konut-satin-alma', path: '/rehber/yabancilar-konut-satin-alma/', alt: '/en/guides/buying-property-in-turkey-as-a-foreigner/', type: 'article', updated: GUNCEL, amac: 'yatirim', crumbs: C_TR,
  related: ['konut-alim-maliyetleri', 'tapu-kontrol-listesi', 'projeden-mi-hazir-mi', 'kira-geliri-giderler-riskler'],
  kicker: 'REHBER · YABANCI ALICI', title: 'Yabancılar Türkiye’de Konut Nasıl Satın Alır? Adım Adım', h1: 'Yabancılar için Türkiye’de <span>konut alımı.</span>',
  desc: 'Yabancı uyruklu alıcılar için Türkiye’de konut satın alma adımları: kimler alabilir, sınırlamalar, değerleme raporu, döviz alım belgesi (DAB), tercüman ve tapu günü.',
  lead: 'Yabancı uyruklu kişiler Türkiye’de konut satın alabilir; işlem tapu müdürlüğünde, Türk vatandaşlarının alımına benzer bir süreçle yapılır. Farklar; değerleme raporu, ödemenin döviz alım belgesiyle (DAB) belgelenmesi ve Türkçe bilmeyen taraf için yeminli tercümandır.',
  answer: 'Cumhurbaşkanınca belirlenen ülkelerin vatandaşları, kanundaki alan sınırları içinde ve askerî/güvenlik bölgeleri dışında konut alabilir. Başvuru Web Tapu, Alo 181 veya tapu müdürlüğünden yapılır; pasaport, DASK poliçesi, fotoğraf, yabancı alıcı için değerleme raporu ve bankadan alınan döviz alım belgesi (DAB) gerekir. Türkçe bilmeyen taraf için yeminli tercüman hazır bulunur. Yabancı alıcılar için de satış tapu müdürlüğünde resmî senetle tamamlanır.',
  body: `
<h2>Kimler alabilir, sınırlar neler?</h2>
<ul>
<li>Cumhurbaşkanınca belirlenen ülkelerin vatandaşı olan gerçek kişiler, kanuni sınırlamalara uyulması şartıyla Türkiye’de konut ve arsa edinebilir. 2012’den beri karşılıklılık (mütekabiliyet) şartı aranmaz.</li>
<li>Yabancıların toplam edinimi bir ilçenin özel mülkiyete konu alanının <b>%10’unu</b>, bir kişinin ülke genelindeki edinimi <b>30 hektarı</b> geçemez. Askerî yasak bölgeler ve güvenlik bölgelerinde edinim yapılamaz; tapu müdürlükleri bu kontrolü kendi kayıtları üzerinden yapar.</li>
<li>Yurt dışında kurulmuş yabancı şirketler yalnızca özel kanunlardaki istisnalarla taşınmaz edinebilir; bu rehber gerçek kişiler içindir.</li>
</ul>
<h2>Adım adım</h2>
<ol>
<li><b>Konutu ve tapusunu kontrol edin.</b> Malik, hisse, ipotek, haciz, şerh, ruhsat ve iskân bilgilerini görün. <a href="/rehber/tapu-kontrol-listesi/">Tapu kontrol listemiz</a> bu adımı ayrıntılı anlatır.</li>
<li><b>Vergi numarası ve banka hesabı.</b> Uygulamada yabancı alıcılardan vergi numarası istenir; ödemeyi Türkiye’deki bir banka üzerinden yapmanız gerekir.</li>
<li><b>Başvuru ve randevu.</b> Satış başvurusu Web Tapu, Alo 181 çağrı merkezi veya tapu müdürlüğünden yapılır.</li>
<li><b>Değerleme raporu.</b> Alıcı yabancıysa, satış başvurusundan önce Web Tapu üzerinden SPK lisanslı bir değerleme uzmanının raporu istenir.</li>
<li><b>Döviz alım belgesi (DAB).</b> Mavi Kart sahibi olmayan yabancı alıcılar, satış bedeline ilişkin dövizin Türkiye’deki bir bankaya satıldığını gösteren DAB’ı ibraz eder; tapuda satış bedeli olarak DAB’daki Türk lirası tutarı esas alınır.</li>
<li><b>Belgeler.</b> Pasaport, gerekiyorsa vekâletname, zorunlu deprem sigortası (DASK) poliçesi ve fotoğraf. Taraflardan biri Türkçe bilmiyorsa resmî listede kayıtlı bir <b>yeminli tercüman</b> işlemde hazır bulunur.</li>
<li><b>Tapu günü.</b> Harç ve döner sermaye ücreti ödenir, resmî senet imzalanır ve tapu alıcı adına tescil edilir. Masrafların dökümü için <a href="/rehber/konut-alim-maliyetleri/">toplam maliyet rehberine</a> bakın.</li>
</ol>
<h2>Sık yapılan hatalar</h2>
<ul>
<li>Tapuyu görmeden kapora vermek veya ödemenin büyük kısmını tapudan önce yapmak.</li>
<li>Sözlü vaatlere güvenmek: teslim tarihi, şartname ve ödeme planı yazılı olmalıdır.</li>
<li>Bağımsız avukat ve yeminli tercüman yerine yalnızca satıcı tarafına güvenmek.</li>
<li>Konut sahipliği ile ikamet izni ve vatandaşlığı aynı şey sanmak: bunlar ayrı başvurular ve ayrı şartlardır.</li>
</ul>
<h2>Konut sahibi olmak, ikamet ve vatandaşlık</h2>
<p>Türkiye’de konut sahibi olmak kendiliğinden ikamet izni veya vatandaşlık vermez. Taşınmaza dayalı kısa dönem ikamet izni ve yatırım yoluyla vatandaşlık, ayrı kurumlara yapılan ayrı başvurulardır ve kendi şartları vardır (ör. 2026 itibarıyla ikamet izni için konutun en az 200.000 ABD doları değerinde olması ve kiraya verilmemesi; vatandaşlık için en az 400.000 ABD doları tutarında, 3 yıl satılmama şerhli edinim). Bu konularda bağımsız bir avukatla çalışmanızı öneririz.</p>`,
  sources: [...src('tapu', 'berlin', 'webtapu', 'harc', 'dask', 'tkgm', 'eikamet', 'vatyon')]
};

export const YAB_EN = {
  slug: 'buying-property-in-turkey-as-a-foreigner', path: '/en/guides/buying-property-in-turkey-as-a-foreigner/', alt: '/rehber/yabancilar-konut-satin-alma/', type: 'article', updated: GUNCEL, amac: 'yatirim', crumbs: C_EN,
  related: ['total-cost-of-buying-property-in-turkey', 'title-deed-checklist', 'off-plan-vs-completed-property', 'rental-income-costs-and-risks'],
  kicker: 'GUIDE · FOREIGN BUYERS', title: 'Buying Property in Turkey as a Foreigner: Step by Step', h1: 'Buying property in Türkiye <span>as a foreigner.</span>',
  desc: 'How foreigners buy property in Türkiye: who can buy, legal limits, the valuation report, the foreign-exchange purchase certificate (DAB), sworn translators and the day at the land registry.',
  lead: 'Foreign nationals can buy homes in Türkiye. The purchase is completed at the land registry office in much the same way as for Turkish citizens; the differences are a mandatory valuation report, proof that the price was converted at a Turkish bank (DAB) and a sworn translator if you do not speak Turkish.',
  answer: 'Citizens of countries listed by the President can buy homes, within the statutory area limits and outside military or security zones. You apply through Web Tapu, the Alo 181 line or the land registry office; you need your passport, a compulsory earthquake insurance (DASK) policy, a photo, a valuation report (for foreign buyers) and a foreign-exchange purchase certificate (DAB) issued by a Turkish bank. A sworn translator attends if you do not speak Turkish. The sale is completed with an official deed at the land registry.',
  body: `
<h2>Who can buy, and the limits</h2>
<ul>
<li>Individuals who are citizens of countries designated by the President may acquire homes and land, subject to legal restrictions. Reciprocity has not been required since 2012.</li>
<li>Total foreign ownership may not exceed <b>10%</b> of the privately owned area of a district, and one person may not hold more than <b>30 hectares</b> nationwide. Purchases are not possible in military prohibited zones and security zones; land registry offices check this against their own records.</li>
<li>Companies incorporated abroad can acquire property only under special-law exceptions; this guide is for individuals.</li>
</ul>
<h2>Step by step</h2>
<ol>
<li><b>Check the property and its title.</b> Owner, share, mortgage, attachments, annotations, construction and occupancy permits. Our <a href="/en/guides/title-deed-checklist/">title deed checklist</a> covers this in detail.</li>
<li><b>Tax number and bank account.</b> In practice foreign buyers are asked for a Turkish tax number, and the payment has to go through a bank in Türkiye.</li>
<li><b>Application and appointment.</b> Apply through Web Tapu, the Alo 181 call centre or the land registry office.</li>
<li><b>Valuation report.</b> If the buyer is a foreigner, a report by a valuer licensed by the Capital Markets Board (SPK) is requested through Web Tapu before the sale application.</li>
<li><b>Foreign-exchange purchase certificate (DAB).</b> Foreign buyers without a Blue Card present a DAB showing that the foreign currency for the price was sold to a bank in Türkiye; the Turkish-lira amount on the DAB is recorded as the sale price.</li>
<li><b>Documents.</b> Passport, a power of attorney if someone acts for you, a DASK earthquake insurance policy and a photo. If either party does not speak Turkish, a <b>sworn translator</b> from the official register must attend.</li>
<li><b>Completion day.</b> The title-deed fee and the land registry service fee are paid, the official deed is signed and the title is registered in your name. See our <a href="/en/guides/total-cost-of-buying-property-in-turkey/">total cost guide</a> for the costs.</li>
</ol>
<h2>Common mistakes</h2>
<ul>
<li>Paying a deposit before seeing the title record, or paying most of the price before the transfer.</li>
<li>Relying on verbal promises: delivery date, specifications and payment plan must be in writing.</li>
<li>Relying only on the seller’s side instead of an independent lawyer and a sworn translator.</li>
<li>Assuming that owning property is the same as a residence permit or citizenship: they are separate applications with separate conditions.</li>
</ul>
<h2>Property, residence and citizenship</h2>
<p>Owning a home in Türkiye does not by itself give you a residence permit or citizenship. A property-based short-term residence permit and citizenship by investment are separate applications to different authorities with their own conditions (for example, as of 2026 the home must be worth at least USD 200,000 and must not be rented out for a property-based residence permit; citizenship requires a purchase of at least USD 400,000 with a 3-year no-sale annotation). We recommend working with an independent lawyer on these questions.</p>`,
  sources: [...srcEn('tapu', 'berlin', 'webtapu', 'harc', 'dask', 'tkgm', 'eikamet', 'vatyon')]
};

// ===================== 3. TOPLAM MALİYET =====================
const MALIYET_TABLO_TR = `<div class="tw"><table><tr><th>Kalem</th><th>Tutar / oran</th><th>Kim öder?</th><th>Not</th></tr>
<tr><td>Tapu harcı</td><td>Satış bedelinin <b>%2</b>’si alıcıdan, <b>%2</b>’si satıcıdan (toplam %4)</td><td>Alıcı ve satıcı ayrı ayrı</td><td>Beyan edilen bedel, emlak vergisi değerinden düşük olamaz. Yabancı alıcıda DAB’daki TL tutarı esas alınır.</td></tr>
<tr><td>Döner sermaye (tapu hizmet) ücreti</td><td>Her yıl belirlenen sabit tutar × bölge katsayısı</td><td>Genellikle alıcı</td><td>İstanbul’daki 2026 tutarını işlem öncesinde tapu müdürlüğünden teyit edin.</td></tr>
<tr><td>KDV (yalnızca yeni konutta, ilk satışta)</td><td>1 Nisan 2022 ve sonrası ruhsatlı projelerde net 150 m²’ye kadar <b>%10</b>, aşan kısım <b>%20</b>; 6306 kapsamındaki dönüşüm projelerinde net 150 m²’ye kadar <b>%1</b></td><td>Alıcı (fiyata dahil olup olmadığını sorun)</td><td>Daha eski ruhsatlı projelerde farklı oranlar uygulanabilir. Yurt dışında yerleşik alıcılar için şartlı istisna var (aşağıda).</td></tr>
<tr><td>Zorunlu deprem sigortası (DASK)</td><td>Konutun büyüklüğüne ve bölgesine göre yıllık prim</td><td>Malik</td><td>Geçerli poliçe olmadan tapuda devir yapılmaz.</td></tr>
<tr><td>Değerleme raporu</td><td>Değerleme kuruluşunun ücreti</td><td>Uygulamada alıcı</td><td>Yabancı alıcılarda istenir.</td></tr>
<tr><td>Yeminli tercüman, noter</td><td>Serbest ücret / noterlik tarifesi</td><td>Hizmeti alan</td><td>Türkçe bilmeyen taraf için tercüman; vekâlet ve satış vaadi sözleşmesi için noter.</td></tr>
<tr><td>Damga vergisi</td><td>Tapudaki satış işlemi için <b>yok</b>; noterde yapılan satış vaadi sözleşmeleri için oran sıfır</td><td>—</td><td></td></tr>
<tr><td>Yıllık emlak vergisi</td><td>Konutta vergi değerinin binde 1’i; İstanbul gibi büyükşehirlerde <b>binde 2</b></td><td>Malik (her yıl)</td><td>2026 vergi değerleri 2025 değerlerinin en fazla iki katı olacak şekilde sınırlandı.</td></tr>
</table></div>`;
const MALIYET_TABLO_EN = `<div class="tw"><table><tr><th>Item</th><th>Amount / rate</th><th>Who pays</th><th>Notes</th></tr>
<tr><td>Title-deed fee (tapu harcı)</td><td><b>2%</b> of the price from the buyer and <b>2%</b> from the seller (4% in total)</td><td>Buyer and seller separately</td><td>The declared price cannot be below the property-tax value. For foreign buyers the lira amount on the DAB is used.</td></tr>
<tr><td>Land registry service fee (döner sermaye)</td><td>A fixed amount set each year × regional coefficient</td><td>Usually the buyer</td><td>Confirm the 2026 Istanbul amount with the land registry before completion.</td></tr>
<tr><td>VAT (new homes, first sale only)</td><td>For projects permitted on or after 1 April 2022: <b>10%</b> on the first 150 m² net, <b>20%</b> above; <b>1%</b> on the first 150 m² net in urban-renewal projects under Law 6306</td><td>Buyer (ask whether it is included in the price)</td><td>Older permits may follow different rates. A conditional exemption exists for non-residents (below).</td></tr>
<tr><td>Compulsory earthquake insurance (DASK)</td><td>Annual premium by size and zone</td><td>Owner</td><td>No transfer is registered without a valid policy.</td></tr>
<tr><td>Valuation report</td><td>Valuer’s fee</td><td>In practice the buyer</td><td>Required for foreign buyers.</td></tr>
<tr><td>Sworn translator, notary</td><td>Market fee / notary tariff</td><td>Whoever uses the service</td><td>Translator if a party does not speak Turkish; notary for powers of attorney and sales-promise contracts.</td></tr>
<tr><td>Stamp duty</td><td><b>None</b> on the land-registry sale; zero rate on notarised sales-promise contracts</td><td>—</td><td></td></tr>
<tr><td>Annual property tax</td><td>0.1% of the tax value for homes; <b>0.2%</b> in metropolitan municipalities such as Istanbul</td><td>Owner (yearly)</td><td>2026 tax values are capped at twice the 2025 values.</td></tr>
</table></div>`;

export const MAL_TR = {
  slug: 'konut-alim-maliyetleri', path: '/rehber/konut-alim-maliyetleri/', alt: '/en/guides/total-cost-of-buying-property-in-turkey/', type: 'article', updated: GUNCEL, amac: 'oturum', crumbs: C_TR,
  related: ['tapu-kontrol-listesi', 'yabancilar-konut-satin-alma', 'kira-geliri-giderler-riskler'],
  kicker: 'REHBER · MALİYET', title: 'Konut Alırken Toplam Maliyet: Tapu Harcı, KDV ve Diğer Giderler', h1: 'Konut alırken <span>toplam maliyet.</span>',
  desc: '2026’da Türkiye’de konut alırken ödenen tapu harcı, KDV, döner sermaye, DASK, değerleme, tercüman ve yıllık emlak vergisi: oranlar, kimin ödediği ve dikkat edilecekler.',
  lead: 'Konutun fiyatı, ödeyeceğiniz toplam tutarın yalnızca bir kısmıdır. Aşağıdaki tablo, 2026 itibarıyla resmî metinlerde yer alan kalemleri ve kimin ödediğini gösterir; teklif alırken her kalemin fiyata dahil olup olmadığını yazılı olarak sorun.',
  answer: 'İkinci el konutta temel ek maliyet, alıcıya düşen %2 tapu harcı ile döner sermaye ücreti, DASK ve (yabancıysanız) değerleme ve tercüman ücretleridir. Yeni konutun ilk satışında bunlara KDV eklenir: 1 Nisan 2022 sonrası ruhsatlı projelerde net 150 m²’ye kadar %10, aşan kısım %20; kentsel dönüşüm projelerinde 150 m²’ye kadar %1. Sonrasında her yıl emlak vergisi (İstanbul’da vergi değerinin binde 2’si) ve aidat ödenir.',
  body: `
<h2>Kalem kalem maliyetler (2026)</h2>
${MALIYET_TABLO_TR}
<h2>Yurt dışında yerleşik alıcılar için KDV istisnası</h2>
<p>KDV Kanunu’nun 13/i maddesine göre, Türkiye’de yerleşik olmayan yabancı gerçek kişilere, çalışma veya oturma izniyle 6 aydan fazla yurt dışında yaşayan Türk vatandaşlarına ve yurt dışında yerleşik şirketlere yapılan <b>ilk konut veya işyeri satışı</b>, bedelin yurt dışından getirilen dövizle ödenmesi şartıyla KDV’den istisnadır. Konut <b>3 yıl</b> içinde satılırsa istisna nedeniyle ödenmeyen KDV, gecikme faiziyle birlikte tapu devrinden önce ödenir; şartlar sağlanmamışsa alıcı satıcıyla birlikte sorumludur. Belgelendirme ayrıntılarını işlem öncesinde mali müşavirinizle teyit edin.</p>
<h2>Örnek hesap (yalnızca yöntem)</h2>
<p>Varsayım: ikinci el konut, beyan edilen satış bedeli 10.000.000 TL ve bu bedel emlak vergisi değerinin üzerinde. Alıcının tapu harcı: 10.000.000 × %2 = <b>200.000 TL</b>. Buna o yılın döner sermaye ücreti, DASK primi ve varsa değerleme, tercüman ve noter ücretleri eklenir. Yeni konutun ilk satışında KDV ayrıca hesaplanır; KDV’nin fiyata dahil olup olmadığını sözleşmede açıkça yazdırın.</p>
<h2>Teklif alırken sorulacaklar</h2>
<ul>
<li>Fiyat KDV dahil mi? Hangi oran ve hangi net m² üzerinden?</li>
<li>Tapu harcını ve döner sermaye ücretini kim ödüyor?</li>
<li>Elektrik, su, doğalgaz abonelikleri ve bağlantı bedelleri fiyata dahil mi?</li>
<li>Aidat ne zaman başlıyor ve tahmini tutarı ne?</li>
<li>Projeden alımda ödemeler hangi aşamalara bağlı?</li>
</ul>`,
  sources: [...src('harc', 'kdv', 'kdvoran', 'kdv7346', 'dask', 'damga', 'emlak', 'webtapu')]
};

export const MAL_EN = {
  slug: 'total-cost-of-buying-property-in-turkey', path: '/en/guides/total-cost-of-buying-property-in-turkey/', alt: '/rehber/konut-alim-maliyetleri/', type: 'article', updated: GUNCEL, amac: 'oturum', crumbs: C_EN,
  related: ['title-deed-checklist', 'buying-property-in-turkey-as-a-foreigner', 'rental-income-costs-and-risks'],
  kicker: 'GUIDE · COSTS', title: 'Total Cost of Buying an Apartment in Turkey (2026)', h1: 'The total cost of buying <span>a home in Türkiye.</span>',
  desc: 'Title-deed fee, VAT, land registry fee, DASK earthquake insurance, valuation, translator and annual property tax when buying a home in Türkiye in 2026 — rates, who pays and what to ask.',
  lead: 'The price of the flat is only part of what you pay. The table below lists the items found in the official texts as of 2026 and who pays them. When you get an offer, ask in writing whether each item is included.',
  answer: 'For a resale home the main extra costs are the buyer’s 2% title-deed fee, the land registry service fee, DASK earthquake insurance and, for foreign buyers, the valuation report and translator. For the first sale of a new home, VAT is added: 10% on the first 150 m² net and 20% above for projects permitted from 1 April 2022, or 1% on the first 150 m² in urban-renewal projects. After that you pay annual property tax (0.2% of the tax value in Istanbul) and service charges.',
  body: `
<h2>Cost items (2026)</h2>
${MALIYET_TABLO_EN}
<h2>VAT exemption for non-residents</h2>
<p>Under article 13/i of the VAT Law, the <b>first sale of a home or workplace</b> to foreign individuals not resident in Türkiye, to Turkish citizens who have lived abroad for more than six months with a work or residence permit, and to companies resident abroad is exempt from VAT, provided the price is paid in foreign currency brought into Türkiye. If the property is sold within <b>3 years</b>, the VAT not paid because of the exemption must be paid with late-payment interest before the title transfer, and the buyer is jointly liable if the conditions were not met. Confirm the documentation with a tax adviser before you buy.</p>
<h2>Worked example (method only)</h2>
<p>Assumption: a resale home with a declared price of TRY 10,000,000, above its property-tax value. Buyer’s title-deed fee: 10,000,000 × 2% = <b>TRY 200,000</b>. Add that year’s land registry service fee, the DASK premium and any valuation, translator and notary fees. For the first sale of a new home VAT is calculated separately; make sure the contract states whether VAT is included.</p>
<h2>Questions to ask with every offer</h2>
<ul>
<li>Is the price VAT-inclusive? At which rate and on how many net m²?</li>
<li>Who pays the title-deed fee and the land registry service fee?</li>
<li>Are electricity, water and gas connections included?</li>
<li>When do service charges start, and roughly how much are they?</li>
<li>For off-plan purchases, which construction stages are the payments tied to?</li>
</ul>`,
  sources: [...srcEn('harc', 'kdv', 'kdvoran', 'kdv7346', 'dask', 'damga', 'emlak', 'webtapu')]
};

// ===================== 7. KİRA GELİRİ =====================
export const KIRA_TR = {
  slug: 'kira-geliri-giderler-riskler', path: '/rehber/kira-geliri-giderler-riskler/', alt: '/en/guides/rental-income-costs-and-risks/', type: 'article', updated: GUNCEL, amac: 'kira', crumbs: C_TR,
  related: ['konut-alim-maliyetleri', 'projeden-mi-hazir-mi', 'yabancilar-konut-satin-alma'],
  kicker: 'REHBER · YATIRIM', title: 'Kira Getirisi İçin Konut Alırken Giderler ve Riskler', h1: 'Kira geliri için konut: <span>giderler ve riskler.</span>',
  desc: 'Yatırımlık konutta brüt ve net kira getirisi nasıl hesaplanır? Vergi, istisna, götürü gider, aidat, boş kalma, kısa dönem kiralama izni ve kur riski.',
  lead: 'İlan fiyatı ile beklenen kirayı bölmek size brüt bir oran verir; gerçek getiriyi görmek için vergiyi, giderleri ve dairenin boş kalacağı süreyi de hesaba katmanız gerekir. Garantili getiri diye bir şey yoktur.',
  answer: 'Net getiri = (yıllık kira − boş kalma kaybı − aidat, bakım, sigorta, emlak vergisi ve gelir vergisi) ÷ toplam alım maliyeti. 2026’da konut kira gelirinin 58.000 TL’lik kısmı şartlı olarak istisnadır; aşan kısım beyan edilir ve %15–%40 arasındaki oranlarla vergilendirilir. Türkiye’de yerleşik olmayanlar da Türkiye’deki kira gelirini beyan eder. 100 güne kadar turizm amaçlı kiralama için Kültür ve Turizm Bakanlığı izni gerekir.',
  body: `
<h2>Brüt ve net getiri</h2>
<p><b>Brüt getiri</b> = yıllık kira ÷ satın alma fiyatı. <b>Net getiri</b> ise şu kalemleri düşer ve toplam alım maliyetine (harç, KDV, değerleme vb. dahil) böler:</p>
<ul>
<li><b>Boş kalma:</b> Kiracı değişimleri arasında dairenin boş kalacağı ayları hesaba katın.</li>
<li><b>Aidat, bakım, onarım ve eşya yenileme.</b></li>
<li><b>DASK ve isteğe bağlı konut sigortası.</b></li>
<li><b>Emlak vergisi:</b> İstanbul’da konutun vergi değerinin binde 2’si.</li>
<li><b>Gelir vergisi</b> (aşağıda) ve varsa emlakçı/yönetim ücretleri.</li>
<li><b>Kur riski:</b> Kira TL, yatırımınız dövizse getiriniz kurla değişir.</li>
</ul>
<h2>Kira geliri vergisi (2026)</h2>
<div class="tw"><table><tr><th>Konu</th><th>Kural</th></tr>
<tr><td>İstisna</td><td>Konut kira gelirinin yıllık <b>58.000 TL</b>’si istisnadır. Bu tutarı aşan gelir beyan edilmezse veya eksik beyan edilirse istisnadan yararlanılamaz; ticari, zirai veya mesleki kazancı nedeniyle beyanname veren ya da toplam brüt geliri 2026 için 1.500.000 TL’yi aşanlar istisnadan yararlanamaz.</td></tr>
<tr><td>Gider</td><td>Gerçek giderler yerine kiranın <b>%15</b>’i götürü gider olarak düşülebilir; bu yöntemi seçen 2 yıl değiştiremez.</td></tr>
<tr><td>Oran</td><td>Artan oranlı tarife: <b>%15–%40</b>.</td></tr>
<tr><td>Yurt dışında yerleşikler</td><td>Türkiye’deki kira geliri, Türkiye’de yerleşik olmayanlar için de vergiye tabidir. Kiracı gerçek kişi olduğunda stopaj yapılmadığından uygulamada beyanname verilmesi gerekir.</td></tr>
</table></div>
<h2>Kısa dönem (turizm amaçlı) kiralama</h2>
<p>7464 sayılı Kanun’la 1 Ocak 2024’ten beri konutun 100 güne kadar turizm amaçlı kiralanması için Kültür ve Turizm Bakanlığı’ndan <b>izin</b> alınması gerekir. İzin için binadaki tüm kat maliklerinin oybirliğiyle onayı aranır; kapıya plaket asılır ve kiracılar kimlik bildirimine kaydedilir. İzinsiz kiralamaya her konut için idari para cezası uygulanır.</p>
<h2>İkamet izni ile kira birlikte olmaz</h2>
<p>Taşınmaza dayalı kısa dönem ikamet izni başvurusunda Göç İdaresi, konutun başvuru sahibinin konutu olarak kullanılmasını ve <b>kiraya verilmemesini</b> şart koşar. Hem ikamet izni hem kira geliri planlıyorsanız bunu başvurudan önce bir avukatla değerlendirin.</p>
<h2>Kontrol listesi</h2>
<ul>
<li>Kira beklentisini aynı sokakta, benzer büyüklükte gerçekleşmiş kiralara dayandırın; ilan fiyatları gerçekleşen kira değildir.</li>
<li>Toplam alım maliyetini (<a href="/rehber/konut-alim-maliyetleri/">harç, KDV ve diğer giderler</a>) hesaba katın.</li>
<li>Yılda en az bir ay boş kalma ve bir aylık bakım gideri varsayarak hesabı tekrar yapın.</li>
<li>Kısa dönem kiralama düşünüyorsanız binanın izin şartlarını sağlayıp sağlamadığını önceden öğrenin.</li>
</ul>`,
  sources: [...src('gvk', 'kisa', 'emlak', 'eikamet', 'yukk')]
};

export const KIRA_EN = {
  slug: 'rental-income-costs-and-risks', path: '/en/guides/rental-income-costs-and-risks/', alt: '/rehber/kira-geliri-giderler-riskler/', type: 'article', updated: GUNCEL, amac: 'kira', crumbs: C_EN,
  related: ['total-cost-of-buying-property-in-turkey', 'off-plan-vs-completed-property', 'buying-property-in-turkey-as-a-foreigner'],
  kicker: 'GUIDE · INVESTMENT', title: 'Investment Property in Istanbul: Rental Income, Costs and Risks', h1: 'Buying to let: <span>costs and risks.</span>',
  desc: 'How to estimate gross and net rental yield on a home in Türkiye: tax, exemption, flat-rate expenses, service charges, vacancy, short-term rental permits and currency risk.',
  lead: 'Dividing the asking price by the expected rent gives a gross figure. To see the real return you must account for tax, running costs and the months the flat stands empty. There is no such thing as a guaranteed yield.',
  answer: 'Net yield = (annual rent − vacancy − service charges, maintenance, insurance, property tax and income tax) ÷ total purchase cost. In 2026 the first TRY 58,000 of annual residential rent is exempt under conditions; rent above that is declared and taxed at 15%–40%. Non-residents must also declare rent from Türkiye. Renting a home to tourists for up to 100 days requires a permit from the Ministry of Culture and Tourism.',
  body: `
<h2>Gross and net yield</h2>
<p><b>Gross yield</b> = annual rent ÷ purchase price. <b>Net yield</b> deducts the items below and divides by the total purchase cost (including fees, VAT, valuation and so on):</p>
<ul>
<li><b>Vacancy:</b> allow for empty months between tenants.</li>
<li><b>Service charges, maintenance, repairs and furniture replacement.</b></li>
<li><b>DASK and optional home insurance.</b></li>
<li><b>Property tax:</b> 0.2% of the tax value in Istanbul.</li>
<li><b>Income tax</b> (below) and any agency or management fees.</li>
<li><b>Currency risk:</b> rent is in lira; if you invested in foreign currency, your return moves with the exchange rate.</li>
</ul>
<h2>Tax on rental income (2026)</h2>
<div class="tw"><table><tr><th>Topic</th><th>Rule</th></tr>
<tr><td>Exemption</td><td>The first <b>TRY 58,000</b> a year of residential rent is exempt. The exemption is lost if income above it is not declared or is under-declared, and it does not apply to people who file returns for business, agricultural or professional income or whose total gross income exceeds TRY 1,500,000 in 2026.</td></tr>
<tr><td>Expenses</td><td>Instead of actual expenses you may deduct a flat <b>15%</b> of the rent; once chosen, you must keep this method for 2 years.</td></tr>
<tr><td>Rates</td><td>Progressive: <b>15%–40%</b>.</td></tr>
<tr><td>Non-residents</td><td>Rent from property in Türkiye is taxable for non-residents too. Because private-individual tenants do not withhold tax, non-resident landlords in practice need to file a return.</td></tr>
</table></div>
<h2>Short-term (tourist) rentals</h2>
<p>Since 1 January 2024, Law No. 7464 requires a <b>permit</b> from the Ministry of Culture and Tourism to rent a home to tourists for up to 100 days. All owners in the building must agree unanimously; a plaque is displayed at the door and guests are registered with the authorities. Renting without a permit is fined per home.</p>
<h2>Residence permit and renting do not mix</h2>
<p>For a property-based short-term residence permit, the Presidency of Migration Management requires the home to be used as the applicant’s residence and <b>not rented out</b>. If you plan both, discuss it with a lawyer before applying.</p>
<h2>Checklist</h2>
<ul>
<li>Base your rent estimate on actual lettings of similar flats nearby; asking rents are not achieved rents.</li>
<li>Include the full <a href="/en/guides/total-cost-of-buying-property-in-turkey/">purchase costs</a> in your calculation.</li>
<li>Re-run the numbers assuming at least one empty month and one month of maintenance costs a year.</li>
<li>If you plan short-term lets, check in advance whether the building can meet the permit conditions.</li>
</ul>`,
  sources: [...srcEn('gvk', 'kisa', 'emlak', 'eikamet', 'yukk')]
};

// ===================== TASLAKLAR (hukukçu incelemesi bekliyor) =====================
export const VAT_TR = {
  slug: 'gayrimenkul-ile-vatandaslik', path: '/taslak/gayrimenkul-ile-vatandaslik/', draft: true, type: 'article', updated: GUNCEL, amac: 'vatandaslik', crumbs: C_TR,
  kicker: 'TASLAK · VATANDAŞLIK', title: 'Gayrimenkul Yatırımıyla Türk Vatandaşlığı: Şartlar ve Süreç', h1: 'Gayrimenkul yatırımıyla <span>vatandaşlık.</span>',
  desc: 'En az 400.000 ABD doları tutarında taşınmaz edinimi, 3 yıl satmama şerhi, değerleme, döviz satışı ve başvuru adımları.',
  lead: 'Türk Vatandaşlığı Kanunu, yatırım yoluyla istisnai vatandaşlık imkânı tanır. Taşınmaz yoluyla başvuruda tutar, ödeme ve şerh şartlarının her biri ayrı ayrı sağlanmalıdır.',
  answer: 'Yönetmeliğin 20. maddesine göre en az 400.000 ABD doları (veya karşılığı döviz) değerinde kat mülkiyetli/kat irtifaklı taşınmaz ya da üzerinde yapı bulunan arsa edinilmeli ve tapuya 3 yıl satılmama şerhi konulmalıdır. Döviz Türkiye’deki bir bankaya satılır. Başvuru sahibi önce yatırım ikamet iznini alır; vatandaşlık Cumhurbaşkanı kararıyla verilir. Eş ve reşit olmayan çocuklar başvuruya dahil edilebilir.',
  body: `
<h2>Temel şartlar (Yönetmelik m. 20/2-b)</h2>
<ul>
<li>En az <b>400.000 ABD doları</b> veya karşılığı döviz tutarında; kat mülkiyetli, kat irtifaklı taşınmaz ya da üzerinde yapı bulunan arsa.</li>
<li>Tapu kaydına <b>3 yıl satılmama şerhi</b>.</li>
<li>Noterde düzenlenen satış vaadi sözleşmesiyle alımda: bedelin tamamının peşin ödenmesi ve 3 yıl devir/temlik edilmeyeceği ve feshedilmeyeceği taahhüdünün tapuya şerh edilmesi.</li>
<li>Dövizin Türkiye’deki bir bankaya satılması ve bankanın Merkez Bankası’na satması (m. 20/10); kur olarak Merkez Bankası efektif satış kuru esas alınır (m. 20/6).</li>
</ul>
<h2>Uygulamada aranan diğer şartlar (TKGM kılavuzu — güncel sürümü teyit edilmeli)</h2>
<ul>
<li>Satış bedeli, değerleme ve ödemelerin <b>her biri ayrı ayrı</b> 400.000 ABD dolarını karşılamalıdır.</li>
<li>Birden fazla taşınmaz birleştirilebilir; birden fazla satış vaadi sözleşmesi birleştirilemez.</li>
<li>Hisseli taşınmazlar, birinci derece yakınlardan veya başvuru sahibinin ortağı/yöneticisi olduğu şirketten alımlar, son 3 yıl içinde yabancıdan veya yatırımla vatandaş olandan devralınmış ikinci el taşınmazlar ve daha önce vatandaşlık için kullanılmış taşınmazlar kabul edilmez.</li>
<li>Tapu müdürlüğünden uygunluk belgesi alınır.</li>
</ul>
<h2>Süreç</h2>
<ol><li>Taşınmaz edinimi, değerleme ve döviz satışı.</li><li>Tapu müdürlüğünden uygunluk belgesi.</li><li>Yatırım ikamet izni (6458 s. Kanun m. 31/1-j).</li><li>Vatandaşlık başvurusu ve Cumhurbaşkanı kararı.</li></ol>
<p class="note"><b>İnceleme notu:</b> TKGM’nin 2024 sonrası kılavuz sürümü ve 2026’da duyurulduğu bildirilen değişiklikler (değerleme geçerlilik süresi, değerleme kuruluşu seçimi, GYO alımları) birincil kaynaktan doğrulanamadı. Yayından önce avukat incelemesi gereklidir. NEXERA vatandaşlık danışmanlığı vermez; hiçbir projemiz için vatandaşlık uygunluğu incelenmemiştir.</p>`,
  sources: [...src('vat', 'vatyon', 'yukk', 'tapu')]
};

export const UZAK_TR = {
  slug: 'uzaktan-alim-ve-vekalet', path: '/taslak/uzaktan-alim-ve-vekalet/', draft: true, type: 'article', updated: GUNCEL, amac: 'yatirim', crumbs: C_TR,
  kicker: 'TASLAK · UZAKTAN ALIM', title: 'Yurt Dışından Vekâletle Konut Almak', h1: 'Yurt dışından <span>vekâletle konut alımı.</span>',
  desc: 'Türkiye’ye gelmeden konut almak: konsoloslukta vekâlet, apostil, yabancı noter vekâleti, konsolosluklardaki tapu temsilcilikleri ve dikkat edilecekler.',
  lead: 'Türkiye’ye gelmeden konut almak mümkündür: işlem, verdiğiniz vekâletle Türkiye’deki temsilciniz tarafından ya da bazı dış temsilciliklerdeki tapu birimleri aracılığıyla yapılabilir.',
  answer: 'Vekâlet, Türk dış temsilciliğinde düzenlenebilir veya yabancı noterde düzenlenip Lahey Sözleşmesi’ne taraf ülkelerde apostil şerhiyle (taraf olmayan ülkelerde konsolosluk onayıyla) Türkiye’de kullanılabilir; Türkçe tercümesi gerekir. Bazı konsolosluklarda bulunan tapu temsilcilikleri, tarafların Türkiye’ye gelmesine gerek kalmadan satış işlemlerini yürütebilir.',
  body: `
<h2>Vekâletin geçerli biçimleri</h2>
<ul>
<li>Türk büyükelçiliği veya konsolosluğunda düzenlenen vekâletname.</li>
<li>Yabancı noterde düzenlenen, vekâlet verenin onaylı fotoğrafını taşıyan ve apostil şerhi bulunan vekâletname (Lahey Sözleşmesi’ne taraf ülkeler).</li>
<li>Taraf olmayan ülkelerde noter imzasının o ülke makamlarınca ve ardından Türk konsolosluğunca onaylanması.</li>
<li>Her durumda yeminli Türkçe tercüme.</li>
</ul>
<h2>Konsolosluktaki tapu birimleri</h2>
<p>TKGM’nin bazı dış temsilciliklerdeki birimleri (ör. Berlin) satış işlemlerini tarafların Türkiye’ye gelmesine gerek kalmadan yürütebilir; vekâletname Web Tapu başvurusuna eklenir.</p>
<h2>Risk notu</h2>
<p>Vekâletin kapsamını (satın alma, bedel ödeme, harç yatırma, DASK) dar ve açık tutun; işlem bitince vekâleti azledin. Ödemeyi satıcıya değil, izlenebilir banka transferiyle ve tapu devriyle eş zamanlı yapın.</p>
<p class="note"><b>İnceleme notu:</b> Vekâlet şekil şartları büyük ölçüde eski tarihli bir TKGM rehberine dayanmaktadır; güncel uygulama TKGM ve bir avukatla teyit edilmeden yayımlanmamalıdır.</p>`,
  sources: [...src('berlin', 'webtapu', 'tkgm')]
};

export const IKAMET_TR = {
  slug: 'konut-ve-ikamet-izni', path: '/taslak/konut-ve-ikamet-izni/', draft: true, type: 'article', updated: GUNCEL, amac: 'oturum', crumbs: C_TR,
  kicker: 'TASLAK · İKAMET', title: 'Konut Satın Almak İkamet İzni Verir mi?', h1: 'Konut sahipliği ve <span>ikamet izni.</span>',
  desc: 'Türkiye’de taşınmaza dayalı kısa dönem ikamet izni: 200.000 ABD doları değer şartı, kiraya vermeme koşulu, uzatma, kapalı mahalleler ve vatandaşlıkla farkı.',
  lead: 'Konut sahibi olmak ikamet iznini otomatik olarak sağlamaz; ancak şartları taşıyan yabancılar taşınmaza dayalı kısa dönem ikamet izni için başvurabilir.',
  answer: '6458 sayılı Kanun’un 31. maddesi taşınmaz sahiplerine her seferinde en fazla 2 yıllık kısa dönem ikamet izni imkânı tanır. Göç İdaresi’nin güncel belge listesine göre konutun satın alma tarihindeki değeri en az 200.000 ABD doları olmalı, başvuru sahibinin konutu olarak kullanılmalı ve kiraya verilmemelidir. İzin uzatılabilir. Bazı mahalleler yabancıların yeni ikamet kaydına kapalı olabilir.',
  body: `
<h2>Şartlar (Göç İdaresi e-İkamet belge listesi)</h2>
<ul><li>Konutun satın alma tarihindeki değeri en az <b>200.000 ABD doları</b> (TL karşılığı).</li><li>Konut başvuru sahibinin konutu olarak kullanılmalı; <b>kiraya verilmemeli</b> veya başka gelir için kullanılmamalı.</li><li>İlk başvuruda numarataj belgesi; uzatmada tapu devam belgesi.</li><li>Miras veya bağış yoluyla edinilen konutlarda değerleme raporu.</li></ul>
<h2>Kapalı mahalleler</h2>
<p>Yabancı nüfus oranı belirli eşiği aşan mahalleler yeni ikamet kayıtlarına kapatılabilir. Güncel 2026 listesi ve taşınmaz sahiplerinin bu kısıttan etkilenip etkilenmediği resmî kaynaktan teyit edilmelidir.</p>
<h2>İkamet ≠ vatandaşlık</h2>
<p>İkamet izni Türkiye’de yaşama izni verir; vatandaşlık ayrı bir başvuru ve ayrı şartlara bağlıdır.</p>
<p class="note"><b>İnceleme notu:</b> Değer eşiğinin uygulama tarihleri ve kapalı mahalle listesi ikincil kaynaklara dayanıyor; yayından önce avukat ve Göç İdaresi’nden teyit gerekir.</p>`,
  sources: [...src('yukk', 'eikamet')]
};
