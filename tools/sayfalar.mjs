// Rehber sayfalarını üretir: node tools/sayfalar.mjs  → www/<sayfa>/index.html, www/sitemap.xml, www/robots.txt
import fs from 'node:fs';
const OUT = new URL('../www/', import.meta.url).pathname;
const SITE = 'https://nexeralive.com';
const TODAY = new Date().toISOString().slice(0, 10);
const LOGO = `<svg viewBox="-4 -4 211 155" aria-hidden="true"><path fill="#3d8bff" d="M0 5L42 5L128 72L100 90L40 47L40 135L0 150Z"/><path fill="#3d8bff" d="M96 0L203 73L96 147L96 110L148 73L96 38Z"/></svg>`;
const ORG = { '@type': 'GeneralContractor', '@id': SITE + '/#nexera', name: 'NEXERA İnşaat', legalName: 'Nexera İnşaat Limited Şirketi', url: SITE, email: 'info@nexeralive.com', telephone: '+90 551 272 06 06', foundingDate: '2015', slogan: 'The next era lives here.', image: SITE + '/og.jpg', logo: SITE + '/og.jpg',
  address: { '@type': 'PostalAddress', streetAddress: 'Yakacık Çarşı Mah. Rota Sk. B Blok No:1 B', addressLocality: 'Kartal', addressRegion: 'İstanbul', addressCountry: 'TR' },
  areaServed: ['Kadıköy', 'İstanbul Anadolu Yakası'] };

const PAGES = [
{ slug: 'kentsel-donusum-sureci', kicker: 'REHBER · SÜREÇ', title: 'Kentsel Dönüşüm Süreci Adım Adım',
  h1: 'Kentsel dönüşüm süreci <span>adım adım.</span>',
  desc: 'Riskli yapı tespitinden anahtar teslime kentsel dönüşüm süreci: her adımda malikin ne yaptığı, müteahhidin neyi üstlendiği ve dikkat edilmesi gerekenler.',
  lead: 'İlk görüşmeden yeni dairenizin anahtarına kadar kentsel dönüşüm; hukuki, teknik ve insani adımlardan oluşan uzun bir yolculuktur. Bu rehberde her adımı, sizin ne yaptığınızı ve NEXERA\'nın neyi üstlendiğini sade bir dille anlatıyoruz.',
  body: `
<h2>1. Ön görüşme ve ön değerlendirme</h2>
<p>Her şey binanızı tanımakla başlar. Adres ya da ada/parsel bilgisiyle imar durumu, emsal (KAKS), plan notları, yapı yaklaşma mesafeleri ve otopark koşulları incelenir. Bu çalışma, yeni binanın yaklaşık büyüklüğünü ve dönüşümün sizin için ne anlama geldiğini ilk günden gösterir. Ön fikir edinmek için <a href="/#hesapla">Binam ne kazanır? hesaplayıcısını</a> kullanabilirsiniz.</p>
<h2>2. Riskli yapı tespiti</h2>
<p>6306 sayılı Afet Riski Altındaki Alanların Dönüştürülmesi Hakkında Kanun kapsamındaki süreç, binanın riskli yapı olarak tespit edilmesiyle başlar. Tespit, Çevre, Şehircilik ve İklim Değişikliği Bakanlığı tarafından lisanslandırılmış kuruluşlarca yapılır. Başvuru için tüm maliklerin bir araya gelmesi gerekmez; maliklerden birinin başvurusu yeterlidir. Ayrıntılar için <a href="/riskli-yapi-tespiti/">riskli yapı tespiti rehberimize</a> bakabilirsiniz.</p>
<h2>3. Şerh ve tebliğ</h2>
<p>Rapor ilgili idarece onaylandıktan sonra tapu kaydına riskli yapı şerhi işlenir ve maliklere tebliğ edilir. Maliklerin rapora karşı itiraz hakkı vardır; itiraz yasal süre içinde yapılmalıdır. Bu aşamadan sonra süreç belirli takvimlere bağlanır; NEXERA, tebliğ sonrası adımları malikler için sade bir takvime döker.</p>
<h2>4. Malik toplantısı ve karar</h2>
<p>Yeni projenin nasıl yapılacağına malikler birlikte karar verir. Riskli yapılarda karar, kanunda öngörülen çoğunlukla alınır; tüm maliklerin oybirliği aranmaz. Bu aşamada en önemli şey güvendir: NEXERA şeffaf bir paylaşım tablosu, örnek kat planları ve net bir teklif sunar; her malikin sorusunu tek tek yanıtlar.</p>
<h2>5. Kat karşılığı inşaat sözleşmesi</h2>
<p>Anlaşma, noterde düzenleme şeklinde yapılan kat karşılığı inşaat sözleşmesiyle resmîleşir. İyi bir sözleşmede teslim süresi, gecikme halinde cezai şartlar, teminatlar, malzeme ve marka şartnamesi, daire dağılımı ve tapu devirlerinin hangi aşamalarda yapılacağı açıkça yazılır.</p>
<h2>6. Tahliye ve yıkım</h2>
<p>Bina tahliye edilir; elektrik, su ve doğalgaz abonelikleri kapatılır, yıkım ruhsatı alınarak bina güvenli biçimde yıkılır. Şartları taşıyan malik ve kiracılar, Bakanlıkça belirlenen esaslara göre kira yardımına başvurabilir. Proje çalışmaları bu aşamayla paralel ilerler.</p>
<h2>7. Proje ve yapı ruhsatı</h2>
<p>Zemin etüdü, mimari, statik, mekanik ve elektrik projeleri hazırlanır; belediyeden yapı ruhsatı alınır. Daire planları için maliklerin görüş ve tercihleri bu aşamada değerlendirilir.</p>
<h2>8. İnşaat</h2>
<p>İnşaat, yapı denetim kuruluşunun denetiminde yürür. NEXERA her aşamayı kalite kapılarıyla ölçer; malikler düzenli raporlar ve şantiye ziyaretleriyle süreci izler. ALIVE akıllı yaşam altyapısı da bu aşamada kurulur.</p>
<h2>9. İskân ve anahtar teslim</h2>
<p>Bina tamamlandığında yapı kullanma izni (iskân) alınır, kat mülkiyetine geçilir ve yeni daireler sahiplerine teslim edilir. NEXERA teslimde ALIVE kurulumunu ve kullanım eğitimini tamamlar.</p>
<h2>10. NEXERA CARE</h2>
<p>Anahtar teslimi bir bitiş değil, başlangıçtır. Satış sonrası garanti, bakım ve bina yönetimi desteğiyle yapının değeri yıllarca korunur.</p>
<h2>Süreç ne kadar sürer?</h2>
<p>Toplam süre; tespitin, malik uzlaşısının ve ruhsat işlemlerinin hızına bağlıdır. Deneyimler, en çok zamanın genellikle uzlaşma aşamasında kaybedildiğini gösterir. Şeffaf bir paylaşım tablosu ve açık bir sözleşme bu süreyi belirgin biçimde kısaltır.</p>
<p class="small">Bu sayfa genel bilgilendirme amaçlıdır, hukuki danışmanlık yerine geçmez. Mevzuattaki oran, süre ve şartlar değişebileceği için güncel durumu birlikte teyit ederiz.</p>` },

{ slug: 'riskli-yapi-tespiti', kicker: 'REHBER · TESPİT', title: 'Riskli Yapı Tespiti Nedir, Nasıl Yapılır?',
  h1: 'Riskli yapı tespiti <span>nedir, nasıl yapılır?</span>',
  desc: 'Riskli yapı tespitini kim yaptırabilir, nereye başvurulur, karot alımı ve rapor süreci nasıl işler, rapora itiraz edilebilir mi? Kentsel dönüşümün ilk adımı için rehber.',
  lead: 'Riskli yapı tespiti, 6306 sayılı Kanun kapsamındaki kentsel dönüşümün ilk ve en önemli adımıdır. Binanızın deprem karşısındaki durumunu bilimsel yöntemlerle ortaya koyar ve sonraki tüm adımların zeminini oluşturur.',
  body: `
<h2>Riskli yapı nedir?</h2>
<p>Ekonomik ömrünü tamamlamış ya da yıkılma veya ağır hasar görme riski taşıdığı bilimsel ve teknik verilerle tespit edilen yapılara riskli yapı denir. Tespit, binanın taşıyıcı sistemi, beton dayanımı ve donatı durumu gibi verilere dayanır.</p>
<h2>Kim başvurabilir?</h2>
<p>Binadaki maliklerden biri ya da kanuni temsilcisi başvurabilir; bunun için diğer maliklerin onayı gerekmez. İlgili idareler de gerekli gördüğü yapılar için tespiti kendisi yaptırabilir.</p>
<h2>Nereye başvurulur?</h2>
<p>Tespit, Çevre, Şehircilik ve İklim Değişikliği Bakanlığı tarafından lisanslandırılmış kurum ve kuruluşlarca yapılır. Lisanslı kuruluşların güncel listesine Bakanlığın resmî kaynaklarından ulaşılabilir. NEXERA ile çalıştığınızda başvuru ve randevu sürecini sizin yerinize koordine ederiz.</p>
<h2>Tespit nasıl yapılır?</h2>
<ul>
<li><b>Yerinde inceleme ve röleve:</b> Binanın mevcut taşıyıcı sistemi ölçülür ve çizilir.</li>
<li><b>Karot alımı:</b> Kolon ve perdelerden beton numunesi (karot) alınarak laboratuvarda dayanımı test edilir.</li>
<li><b>Donatı tespiti:</b> Betonun içindeki demirlerin sayısı, çapı ve durumu incelenir.</li>
<li><b>Analiz ve rapor:</b> Veriler, yürürlükteki yönetmeliğe göre değerlendirilir ve rapor hazırlanır.</li>
</ul>
<h2>Rapordan sonra ne olur?</h2>
<p>Rapor ilgili idarece incelenip onaylanır, tapuya riskli yapı şerhi işlenir ve maliklere tebliğ edilir. Maliklerin, tebliğden itibaren yasal süre içinde rapora itiraz etme hakkı vardır. Ardından malik toplantısı, karar ve sözleşme aşamalarına geçilir. Tüm adımları <a href="/kentsel-donusum-sureci/">kentsel dönüşüm süreci</a> sayfasında bulabilirsiniz.</p>
<h2>Binam riskli olabilir mi?</h2>
<p>Kesin cevabı yalnızca lisanslı kuruluşların yapacağı tespit verir. Yine de yapım yılı, kat sayısı, taşıyıcı elemanlardaki hasar ve sonradan yapılan tadilatlar gibi işaretler bir ön fikir verir. <a href="/#test">2 dakikalık riskli yapı ön testimizle</a> binanızın önceliğini görebilirsiniz.</p>
<p class="small">Bu sayfa genel bilgilendirme amaçlıdır, hukuki danışmanlık yerine geçmez. Süre ve şartlar mevzuat değişikliklerine bağlı olarak değişebilir.</p>` },

{ slug: 'kadikoy-kentsel-donusum', kicker: 'REHBER · KADIKÖY', title: 'Kadıköy\'de Kentsel Dönüşüm',
  h1: 'Kadıköy\'de <span>kentsel dönüşüm.</span>',
  desc: 'Kadıköy\'de kentsel dönüşümde imar durumu, emsal, plan notları ve parsel birleştirme neden belirleyicidir? NEXERA İnşaat\'ın Kadıköy\'deki dönüşüm yaklaşımı.',
  lead: 'Kadıköy, İstanbul\'da kentsel dönüşümün en yoğun yaşandığı ilçelerden biridir. Erenköy\'den Göztepe\'ye, Suadiye\'den Caddebostan\'a uzanan apartman dokusunun önemli bir kısmı, bugünkü deprem yönetmeliğinden önceki dönemlerde inşa edildi.',
  body: `
<h2>Kadıköy\'de dönüşümü belirleyen şeyler</h2>
<ul>
<li><b>İmar durumu ve emsal:</b> Yeni binanın büyüklüğünü, parselin emsali (KAKS) ve plan notları belirler. Aynı caddede bile iki parselin hakları farklı olabilir.</li>
<li><b>Mevcut yapılaşma:</b> Kadıköy\'deki pek çok bina bugünkü emsalin üzerinde yapılmıştır. Bu durumda mevcut hakların nasıl korunacağı dönüşümün ekonomisini doğrudan etkiler.</li>
<li><b>Otopark ve çekme mesafeleri:</b> Yeni yönetmeliklerle otopark zorunluluğu ve bahçe mesafeleri, özellikle dar parsellerde tasarımı zorlaştırır.</li>
<li><b>Parsel birleştirme:</b> Komşu parsellerle birleşmek, daha verimli bir tasarım, daha iyi otopark çözümü ve daha değerli daireler anlamına gelebilir.</li>
</ul>
<h2>NEXERA\'nın yaklaşımı</h2>
<p>NEXERA, İstanbul Anadolu yakasında, özellikle Kadıköy\'de kentsel dönüşüm ve konut projeleri geliştirir. Yaklaşımımız üç ilkeye dayanır: güvenlikten taviz vermemek, malikleri her adımda şeffaf biçimde bilgilendirmek ve kopyala-yapıştır olmayan, parsele özgü zamansız bir mimari üretmek. İlk projemiz Erenköy\'de hazırlık aşamasındadır.</p>
<h2>Binanız için ilk adım</h2>
<p>Binanızın dönüşümde ne kazanabileceğini görmek için <a href="/#hesapla">hesaplayıcıyı</a> kullanabilir, risk durumu için <a href="/#test">ön testi</a> yapabilir ya da doğrudan bizimle iletişime geçebilirsiniz. Ön değerlendirmede imar durumunu, emsali ve parsel koşullarını sizin için inceleriz.</p>` },

{ slug: 'erenkoy-kentsel-donusum', kicker: 'REHBER · ERENKÖY', title: 'Erenköy\'de Kentsel Dönüşüm',
  h1: 'Erenköy\'de <span>kentsel dönüşüm.</span>',
  desc: 'Erenköy\'de kentsel dönüşüm: köşklerden apartmanlara uzanan dokuda yeni nesil güvenli konut. NEXERA İnşaat\'ın ilk projesi Erenköy\'de.',
  lead: 'Erenköy; bahçeli köşklerin, ağaçlı sokakların ve Bağdat Caddesi\'ne yakın sakin apartman dokusunun buluştuğu, Kadıköy\'ün en köklü semtlerinden biri. Bu dokunun önemli bir kısmı bugün yenilenme ihtiyacıyla karşı karşıya.',
  body: `
<h2>Neden Erenköy?</h2>
<p>Erenköy, ulaşım olanakları, sahile ve Bağdat Caddesi\'ne yakınlığı ve yerleşik mahalle kültürüyle İstanbul\'un en çok tercih edilen konut bölgelerinden biridir. Bu değer, binalar yenilendiğinde güvenli, konforlu ve zamansız bir mimariyle korunabilir.</p>
<h2>Erenköy\'de dönüşümde dikkat edilenler</h2>
<ul>
<li>Sokak dokusuna ve ağaçlı karaktere saygılı, ölçülü bir cephe dili</li>
<li>Parsele özgü imar hakları, emsal ve plan notlarının doğru okunması</li>
<li>Otopark ve bahçe mesafeleriyle dengeli, verimli daire planları</li>
<li>Komşu parsellerle birleşme olanaklarının değerlendirilmesi</li>
</ul>
<h2>NEXERA\'nın ilk projesi Erenköy\'de</h2>
<p>NEXERA\'nın ilk projesi Erenköy\'de hazırlık aşamasında. Projeyi <a href="/#insa">sitemizde 3B olarak</a> inceleyebilir, telefonunuzdan <a href="/#ar">artırılmış gerçeklikle masanıza yerleştirebilirsiniz</a>.</p>
<h2>Binanız Erenköy\'de mi?</h2>
<p>Binanız için ücretsiz ön değerlendirme isteyebilir, <a href="/#test">riskli yapı ön testini</a> yapabilir ya da <a href="/#hesapla">dönüşümde ne kazanacağınızı hesaplayabilirsiniz</a>.</p>` },

{ slug: 'sss', kicker: 'REHBER · SSS', title: 'Kentsel Dönüşüm Sık Sorulan Sorular',
  h1: 'Sık sorulan <span>sorular.</span>',
  desc: 'Kentsel dönüşümde malik kararı, riskli yapı tespiti, itiraz, kira yardımı, kat karşılığı oranı, tapu ve sözleşme hakkında en çok sorulan sorular ve yanıtları.',
  lead: 'Kentsel dönüşümde maliklerin en çok sorduğu soruları sade yanıtlarla bir araya getirdik. Aklınıza takılan başka bir soru olursa sitemizdeki NEXERA Asistan\'a sorabilir ya da bizi arayabilirsiniz.',
  faq: [
    ['Kentsel dönüşüm için tüm maliklerin onayı gerekir mi?', 'Hayır. 6306 sayılı Kanun kapsamında riskli yapılarda karar, kanunda öngörülen çoğunlukla alınır; oybirliği aranmaz. Karara katılmayan maliklerin payları için kanunda ayrıca bir usul öngörülmüştür.'],
    ['Riskli yapı tespitini kim yaptırabilir?', 'Binadaki maliklerden biri ya da kanuni temsilcisi, Bakanlıkça lisanslandırılmış bir kuruluşa başvurarak tespit yaptırabilir. Diğer maliklerin onayı gerekmez.'],
    ['Riskli yapı raporuna itiraz edilebilir mi?', 'Evet. Rapor maliklere tebliğ edildikten sonra yasal süre içinde itiraz edilebilir. İtirazlar, bu iş için oluşturulan teknik heyetlerce değerlendirilir.'],
    ['Kira yardımı alabilir miyim?', 'Şartları taşıyan malikler ve kiracılar, Bakanlıkça belirlenen esaslar çerçevesinde kira yardımına başvurabilir. Tutar ve süreler dönemsel olarak güncellendiği için başvuru öncesinde güncel koşulları birlikte teyit ederiz.'],
    ['Kat karşılığı oranı nasıl belirlenir?', 'Oranı; parselin emsali ve plan notları, mevcut binanın büyüklüğü, bölgedeki konut değerleri ve inşaat maliyetleri belirler. NEXERA her malike aynı şeffaf paylaşım tablosunu sunar.'],
    ['Yeni dairem bugünkünden büyük olur mu?', 'Bu, parselin imar haklarına ve mevcut binanın yapılaşmasına bağlıdır. Sitemizdeki "Binam ne kazanır?" hesaplayıcısıyla ön fikir edinebilir, kesin sonuç için ücretsiz ön değerlendirme isteyebilirsiniz.'],
    ['İnşaat sürerken tapum ne olur?', 'Tapunuz sizde kalır. Müteahhide devredilecek payların hangi aşamalarda devredileceği sözleşmede belirlenir; bu devirlerin işin ilerlemesine bağlanması maliklerin güvencesidir.'],
    ['Müteahhit işi yarım bırakırsa ne olur?', 'Bu risk sözleşmeyle yönetilir: teslim süresi, gecikme cezaları, teminatlar ve fesih koşulları açıkça yazılmalıdır. NEXERA bu maddeleri sözleşmeye en baştan açıkça koyar.'],
    ['Dükkân sahiplerinin hakları ne olur?', 'Ticari bağımsız bölümler de projede değerlendirilir. Cephe, konum ve büyüklük gibi koşullar sözleşmede ayrıca belirlenir.'],
    ['Kiracıysam ne olur?', 'Riskli yapı kararının ardından tahliye süreci kanuna göre yürür. Kiracılar da şartları taşıyorsa bazı desteklerden yararlanabilir.'],
    ['Harç ve vergi istisnası var mı?', '6306 sayılı Kanun kapsamındaki işlemlerde bazı harç, vergi ve ücretler için istisnalar öngörülmüştür. Kapsamı mevzuata göre değişebildiği için projeniz özelinde birlikte teyit ederiz.'],
    ['NEXERA hangi bölgelerde çalışıyor?', 'NEXERA, İstanbul Anadolu yakasında, özellikle Kadıköy\'de kentsel dönüşüm ve konut projeleri geliştirir. İlk projemiz Erenköy\'dedir.'],
    ['Ön değerlendirme ücretli mi?', 'Hayır. Binanız için imar durumu, emsal ve parsel koşullarını inceleyen ön değerlendirme ücretsizdir.']
  ] }
];

const css = `:root{--ink:#040914;--gold:#d9b878;--gold2:#f6dca6;--text:#e8edf6;--muted:#8c9bb8;--dim:#56658a;--line:rgba(217,184,120,.22);--line2:rgba(120,160,230,.18)}
*{box-sizing:border-box;margin:0;padding:0}html{background:var(--ink)}body{background:radial-gradient(120% 60% at 80% 0%,#0b1d3d 0,var(--ink) 60%) fixed;color:var(--text);font:400 17px/1.75 Manrope,system-ui,sans-serif;-webkit-font-smoothing:antialiased}
a{color:var(--gold2)}header{display:flex;justify-content:space-between;align-items:center;padding:26px clamp(18px,5vw,64px)}header a.logo{display:flex;align-items:center;gap:14px;text-decoration:none;color:var(--text);font:600 14px Manrope;letter-spacing:.5em}header svg{width:38px}
header nav a{font:400 11px 'JetBrains Mono',monospace;letter-spacing:.2em;color:var(--muted);text-decoration:none;margin-left:22px}header nav a:hover{color:var(--gold2)}@media(max-width:600px){header nav a:not(:first-child){display:none}header nav a{margin-left:0}header a.logo{letter-spacing:.35em}}
main{max-width:820px;margin:0 auto;padding:40px clamp(18px,5vw,40px) 60px}.k{font:400 11px 'JetBrains Mono',monospace;letter-spacing:.32em;color:var(--gold);display:flex;gap:14px;align-items:center}.k::before{content:'';width:42px;height:1px;background:var(--gold)}
h1{font:400 clamp(38px,6vw,68px)/1.06 Cinzel,serif;margin:22px 0 26px}h1 span{color:var(--gold2)}.lead{font:400 clamp(20px,2.2vw,25px)/1.5 'Cormorant Garamond',serif;color:#cfd8ea;margin-bottom:34px}
h2{font:500 clamp(25px,3vw,32px)/1.25 'Cormorant Garamond',serif;color:#fff;margin:40px 0 12px}p{margin:0 0 16px;color:#c9d2e4}ul{margin:0 0 16px 20px;color:#c9d2e4}li{margin:6px 0}b{color:#fff;font-weight:600}.small{font-size:13.5px;color:var(--dim);border-left:1px solid var(--line);padding-left:14px;margin-top:34px}
details{border-bottom:1px solid var(--line2);padding:18px 0}details:first-of-type{border-top:1px solid var(--line2)}summary{cursor:pointer;font:500 22px/1.3 'Cormorant Garamond',serif;color:#fff;list-style:none;display:flex;justify-content:space-between;gap:20px}summary::after{content:'+';color:var(--gold);font-family:Manrope}details[open] summary::after{content:'−'}details p{margin:12px 0 0}
.cta{margin:54px 0 0;padding:30px;border:1px solid var(--line2);background:linear-gradient(160deg,rgba(20,40,84,.5),rgba(6,14,32,.42))}.cta b{display:block;font:400 11px 'JetBrains Mono',monospace;letter-spacing:.3em;color:var(--gold);margin-bottom:10px}.cta p{font:400 22px/1.4 'Cormorant Garamond',serif;color:#fff}
.btns{display:flex;flex-wrap:wrap;gap:12px;margin-top:18px}.btns a{font:500 11px 'JetBrains Mono',monospace;letter-spacing:.22em;padding:14px 20px;border:1px solid var(--gold);color:var(--gold2);text-decoration:none}.btns a:hover{background:var(--gold);color:var(--ink)}.btns a.wa{border-color:rgba(159,240,196,.5);color:#9ff0c4}
.more{margin-top:46px;display:grid;gap:8px}.more b{font:400 11px 'JetBrains Mono',monospace;letter-spacing:.3em;color:var(--gold)}.more a{text-decoration:none}
footer{border-top:1px solid var(--line2);padding:28px clamp(18px,5vw,64px);font:400 11px/1.9 'JetBrains Mono',monospace;letter-spacing:.12em;color:var(--muted);display:flex;flex-wrap:wrap;gap:8px 30px;justify-content:space-between}footer a{color:var(--muted)}`;

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
function page(p){
  const url = `${SITE}/${p.slug}/`;
  const ld = [ORG, { '@type': 'WebPage', '@id': url, url, name: p.title, description: p.desc, inLanguage: 'tr-TR', dateModified: TODAY, publisher: { '@id': SITE + '/#nexera' } },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'NEXERA', item: SITE + '/' }, { '@type': 'ListItem', position: 2, name: p.title, item: url }] }];
  if (p.faq) ld.push({ '@type': 'FAQPage', mainEntity: p.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
  const body = p.faq ? p.faq.map(([q, a], i) => `<details${i < 2 ? ' open' : ''}><summary>${q}</summary><p>${a}</p></details>`).join('\n') : p.body;
  const others = PAGES.filter(x => x.slug !== p.slug).map(x => `<a href="/${x.slug}/">${x.title} →</a>`).join('');
  return `<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${p.title} | NEXERA İnşaat</title><meta name="description" content="${esc(p.desc)}"><link rel="canonical" href="${url}"><meta name="theme-color" content="#050b18">
<meta property="og:type" content="article"><meta property="og:locale" content="tr_TR"><meta property="og:site_name" content="NEXERA İnşaat"><meta property="og:title" content="${esc(p.title)}"><meta property="og:description" content="${esc(p.desc)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${SITE}/og.jpg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-6 -6 215 160'%3E%3Cpath fill='%233d8bff' d='M0 5L42 5L128 72L100 90L40 47L40 135L0 150Z'/%3E%3Cpath fill='%233d8bff' d='M96 0L203 73L96 147L96 110L148 73L96 38Z'/%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400&family=Cormorant+Garamond:wght@400;500&family=JetBrains+Mono:wght@400&family=Manrope:wght@400;600&display=swap" rel="stylesheet">
<style>${css}</style><script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': ld })}</script></head>
<body><header><a class="logo" href="/">${LOGO}NEXERA</a><nav><a href="/#test">RİSK TESTİ</a><a href="/#hesapla">HESAPLA</a><a href="/#iletisim">İLETİŞİM</a></nav></header>
<main><div class="k">${p.kicker}</div><h1>${p.h1}</h1><p class="lead">${p.lead}</p>
${body}
<div class="cta"><b>ÜCRETSİZ ÖN DEĞERLENDİRME</b><p>Binanız için imar durumunu, emsali ve dönüşüm olanaklarını birlikte inceleyelim.</p>
<div class="btns"><a href="/#test">RİSK TESTİ →</a><a href="/#hesapla">BİNAM NE KAZANIR? →</a><a class="wa" href="https://wa.me/905512720606?text=${encodeURIComponent('Merhaba, binam için ön değerlendirme istiyorum.')}">WHATSAPP</a><a href="tel:+905512720606">0551 272 06 06</a></div></div>
<nav class="more"><b>DİĞER REHBERLER</b>${others}</nav></main>
<footer><span>© ${new Date().getFullYear()} NEXERA İNŞAAT LTD. ŞTİ.</span><span>Yakacık Çarşı Mah. Rota Sk. B Blok No:1 B, Kartal / İstanbul</span><span><a href="mailto:info@nexeralive.com">info@nexeralive.com</a> · <a href="tel:+905512720606">+90 551 272 06 06</a></span></footer>
</body></html>`;
}

for (const p of PAGES){ fs.mkdirSync(OUT + p.slug, { recursive: true }); fs.writeFileSync(OUT + p.slug + '/index.html', page(p)); }
fs.writeFileSync(OUT + 'sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  [['', '1.0'], ...PAGES.map(p => [p.slug + '/', '0.8'])].map(([u, pr]) => `  <url><loc>${SITE}/${u}</loc><lastmod>${TODAY}</lastmod><priority>${pr}</priority></url>`).join('\n') + '\n</urlset>\n');
fs.writeFileSync(OUT + 'robots.txt', `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE}/sitemap.xml\n`);
console.log('ok', PAGES.length, 'sayfa');
