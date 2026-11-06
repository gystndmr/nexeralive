// Rehberler: kentsel dönüşümde müteahhit seçimi, akıllı daire alırken nelere bakılmalı (TR + EN). 6 Kasım 2026.
import { GUNCEL } from './icerik-ortak.mjs';
const MEV = n => `https://www.mevzuat.gov.tr/MevzuatMetin/1.5.${n}.pdf`;
const C_TR = [['Rehberler', 'https://nexeralive.com/rehber/']], C_EN = [['Guides', 'https://nexeralive.com/en/guides/']];

export const MUT_TR = {
  slug: 'kentsel-donusum-muteahhit-secimi', path: '/rehber/kentsel-donusum-muteahhit-secimi/', alt: '/en/guides/choosing-an-urban-renewal-contractor/', type: 'article', updated: GUNCEL, amac: 'donusum', crumbs: C_TR,
  related: ['tapu-kontrol-listesi', 'projeden-mi-hazir-mi', 'konut-alim-maliyetleri'],
  kicker: 'REHBER · KENTSEL DÖNÜŞÜM', title: 'Kentsel Dönüşümde Müteahhit Nasıl Seçilir? Kontrol Listesi', h1: 'Kentsel dönüşümde <span>müteahhit nasıl seçilir?</span>',
  desc: 'Binanızı dönüştürecek müteahhidi seçmeden önce: yetki belgesi, şirket kayıtları, bitirilmiş işler, kat karşılığı sözleşmesinde teminat, süre, ceza ve kira maddeleri. Malikler için sade kontrol listesi.',
  lead: 'Kentsel dönüşümde malikler, binalarını ve çoğu zaman tek varlıklarını birkaç yıllığına bir şirkete emanet eder. Müteahhidi teklifin büyüklüğüne göre değil, işi bitirme kapasitesine ve sözleşmenin sizi ne kadar koruduğuna göre seçmek gerekir.',
  answer: 'Önce firmanın yapı müteahhidi yetki belgesini, ticaret sicil kayıtlarını ve iskân almış bitmiş işlerini kontrol edin; bitirdiği binaların maliklerinden biriyle konuşun. Kat karşılığı sözleşmesini noterde düzenleme şeklinde yapın; teslim süresi, gecikme cezası, kira yardımı, daire dağılımı, malzeme şartnamesi ve teminat (ör. banka teminat mektubu ya da aşamalı tapu devri) açıkça yazılsın. Tek teklife değil, aynı şartnameye göre alınmış birkaç teklife bakın ve sözleşmeyi imzadan önce bağımsız bir avukata inceletin.',
  body: `
<h2>1. Firmayı tanıyın</h2>
<ul>
<li><b>Yapı müteahhidi yetki belgesi:</b> Türkiye’de yapı müteahhitleri Çevre, Şehircilik ve İklimlendirme Bakanlığı’nın sistemine kayıtlıdır ve iş deneyimine göre gruplara ayrılır. Firmadan yetki belge numarasını ve grubunu isteyin; grubun, yapılacak binanın büyüklüğüne uygun olup olmadığını sorun.</li>
<li><b>Şirket kayıtları:</b> Ticaret unvanı, kuruluş yılı, ortaklar ve adres Ticaret Sicili Gazetesi’nde görünür. Sözleşmeyi imzalayacak şirketle size sunum yapan şirketin aynı olduğundan emin olun.</li>
<li><b>Bitmiş işler:</b> “Yapıyoruz” değil “bitirdik” denilen binaları isteyin: adres, iskân tarihi ve teslim süresi. Mümkünse o binaların maliklerinden biriyle konuşun.</li>
<li><b>Mali güç:</b> Firmanın aynı anda kaç şantiyesi olduğunu ve inşaatı nasıl finanse edeceğini (öz kaynak, kredi, satış) sorun. Finansmanı yalnızca ön satışa dayanan bir plan, satışlar yavaşlarsa gecikme riski taşır.</li>
</ul>
<h2>2. Teklifleri karşılaştırılabilir yapın</h2>
<p>Teklifler farklı varsayımlarla hazırlanırsa yalnızca “kaç daire veriyor” sorusu yanıltıcı olur. Tüm firmalardan aynı bilgilerle teklif isteyin: brüt ve net metrekareler, daire dağılımı ve kat/cephe seçimi, otopark ve depo, malzeme ve marka şartnamesi, teslim süresi ve kira yardımı. Daha fazla daire veren ama şartnamesi zayıf bir teklif, uzun vadede daha pahalıya gelebilir.</p>
<h2>3. Sözleşmede mutlaka olması gerekenler</h2>
<div class="tw"><table><tr><th>Madde</th><th>Neden önemli?</th></tr>
<tr><td>Taraflar ve taşınmaz</td><td>Ada, parsel, bağımsız bölümler ve tüm maliklerin adı eksiksiz yazılmalı.</td></tr>
<tr><td>Paylaşım ve daire dağılımı</td><td>Hangi malike hangi dairenin düşeceği ya da dağılımın nasıl yapılacağı (kura, mevcut konum) önceden belirlenmeli.</td></tr>
<tr><td>Süreler</td><td>Ruhsat, yıkım, inşaata başlama ve iskânlı teslim için ayrı ayrı tarih.</td></tr>
<tr><td>Gecikme cezası</td><td>Gecikilen her ay için malike ödenecek tutar ya da kira bedeli.</td></tr>
<tr><td>Kira yardımı</td><td>İnşaat süresince kimin, ne kadar ve hangi tarihte kira ödeyeceği; devlet kira yardımından ayrı mı olduğu.</td></tr>
<tr><td>Teminat</td><td>Müteahhide verilecek tapu paylarının inşaatın ilerlemesine göre aşamalı devri ya da banka teminat mektubu. Tüm payların en başta devri, malik için en riskli düzendir.</td></tr>
<tr><td>Şartname</td><td>Malzeme, marka ve sınıflar ek olarak; “birinci sınıf” gibi belirsiz ifadeler yerine ölçülebilir tanımlar.</td></tr>
<tr><td>Fesih</td><td>Müteahhit işi bırakırsa ya da süreleri aşarsa maliklerin hangi koşulla sözleşmeyi feshedip payları geri alacağı.</td></tr>
</table></div>
<p>Kat karşılığı inşaat sözleşmesinin <b>noterde düzenleme şeklinde</b> yapılması ve tapuya şerh verilmesi yaygın ve koruyucu bir yöntemdir.</p>
<h2>4. Süreci birlikte doğru yürütün</h2>
<ul>
<li><b>Riskli yapı tespiti</b> lisanslı kurum ya da kuruluşlarca yapılır; tespit raporu ve itiraz süreleri 6306 sayılı Kanun ve uygulama yönetmeliğine tabidir.</li>
<li><b>Malik kararı:</b> Riskli yapılarda uygulamaya, Kanun’da öngörülen pay çoğunluğuyla karar verilir. Güncel çoğunluk oranını ve azınlık paylarına ilişkin usulü, karar toplantısından önce avukatınıza ve belediyeye teyit ettirin.</li>
<li><b>Yapı denetimi:</b> İnşaat, 4708 sayılı Kanun kapsamında yapı denetim kuruluşunun denetimiyle yapılır. Zemin etüdü, statik proje ve şantiye denetim raporlarını isteyebilirsiniz.</li>
<li><b>İletişim:</b> Maliklerin kendi aralarından bir temsilci seçmesi ve müteahhitle düzenli, yazılı bilgilendirme (aylık rapor, şantiye fotoğrafları) üzerinde anlaşması süreci rahatlatır.</li>
</ul>
<h2>5. Uyarı işaretleri</h2>
<ul>
<li>İmzadan önce tapu devri ya da avans isteyen firmalar.</li>
<li>Bitirdiği bir bina gösteremeyen, yalnızca görsel ve render paylaşan teklifler.</li>
<li>Süre, ceza ve teminat maddesi olmayan ya da “ileride konuşuruz” denilen sözleşmeler.</li>
<li>Diğer tekliflerin çok üzerinde daire ya da kira vaadi: hesabını mutlaka sorun.</li>
</ul>
<h2>NEXERA olarak nasıl çalışıyoruz?</h2>
<p>NEXERA İnşaat, 2015’ten beri İstanbul Anadolu yakasında, özellikle Kadıköy’de konut ve kentsel dönüşüm projeleri geliştirir. Ön değerlendirme için binanızın adresini ya da ada/parsel bilgisini paylaşmanız yeterlidir; tekliflerimizi yukarıdaki maddeleri yazılı olarak içerecek şekilde hazırlarız. Bu rehber genel bilgilendirme amaçlıdır, hukuki danışmanlık değildir.</p>`,
  sources: [
    ['6306 sayılı Afet Riski Altındaki Alanların Dönüştürülmesi Hakkında Kanun', MEV(6306)],
    ['634 sayılı Kat Mülkiyeti Kanunu', MEV(634)],
    ['4708 sayılı Yapı Denetimi Hakkında Kanun', MEV(4708)],
    ['Yapı Müteahhitlerinin Sınıflandırılması ve Kayıtlarının Tutulması Hakkında Yönetmelik (Resmî Gazete, 2 Mart 2019)', 'https://www.resmigazete.gov.tr/eskiler/2019/03/20190302-1.htm'],
    ['Çevre, Şehircilik ve İklimlendirme Bakanlığı', 'https://www.csb.gov.tr/']
  ]
};

export const MUT_EN = {
  slug: 'choosing-an-urban-renewal-contractor', path: '/en/guides/choosing-an-urban-renewal-contractor/', alt: '/rehber/kentsel-donusum-muteahhit-secimi/', type: 'article', updated: GUNCEL, amac: 'donusum', crumbs: C_EN,
  related: ['title-deed-checklist', 'off-plan-vs-completed-property', 'total-cost-of-buying-property-in-turkey'],
  kicker: 'GUIDE · URBAN RENEWAL', title: 'Choosing a Contractor for Urban Renewal (Kentsel Dönüşüm) in Istanbul', h1: 'Urban renewal in Istanbul: <span>choosing a contractor.</span>',
  desc: 'A checklist for building owners in Istanbul: contractor licence, company records, completed projects, and what a flat-for-land (kat karşılığı) contract must include — guarantees, deadlines, penalties and rent.',
  lead: 'In urban renewal, owners hand their building — often their main asset — to a company for several years. Choose the contractor by its ability to finish and by how well the contract protects you, not by the size of the offer.',
  answer: 'Check the contractor’s licence (yapı müteahhidi yetki belgesi), its trade-registry records and completed buildings that received an occupancy permit, and speak to an owner from one of them. Sign the flat-for-land contract before a notary (düzenleme şeklinde) and make sure it states delivery dates, late-delivery penalties, rent support, the allocation of flats, a specification list and a guarantee such as staged transfer of land shares or a bank letter of guarantee. Compare several offers on the same specification and have an independent lawyer review the contract before signing.',
  body: `
<h2>1. Know the company</h2>
<ul>
<li><b>Contractor licence:</b> Building contractors in Türkiye are registered with the Ministry of Environment, Urbanisation and Climate Change and grouped by experience. Ask for the licence number and group, and whether the group fits the size of your building.</li>
<li><b>Company records:</b> Trade name, founding year, partners and address appear in the Trade Registry Gazette. Make sure the company that signs is the one that presented to you.</li>
<li><b>Completed work:</b> Ask for finished buildings — address, occupancy-permit (iskân) date and how long they took — and talk to an owner there.</li>
<li><b>Financial capacity:</b> Ask how many sites run in parallel and how construction is financed. A plan that depends only on pre-sales carries delay risk if sales slow down.</li>
</ul>
<h2>2. Make offers comparable</h2>
<p>Ask every company to price the same thing: gross and net areas, flat allocation, parking and storage, a material and brand specification, delivery time and rent support. An offer with more flats but a weak specification can cost more in the long run.</p>
<h2>3. What the contract must include</h2>
<div class="tw"><table><tr><th>Clause</th><th>Why it matters</th></tr>
<tr><td>Parties and property</td><td>Block (ada), parcel, units and every owner listed in full.</td></tr>
<tr><td>Share and allocation</td><td>Which owner receives which flat, or how allocation is decided.</td></tr>
<tr><td>Deadlines</td><td>Separate dates for permit, demolition, start of works and delivery with occupancy permit.</td></tr>
<tr><td>Late-delivery penalty</td><td>An amount or rent paid to owners for each month of delay.</td></tr>
<tr><td>Rent support</td><td>Who pays rent during construction, how much and when; whether it is separate from state rent assistance.</td></tr>
<tr><td>Guarantee</td><td>Transfer of land shares in stages as construction progresses, or a bank letter of guarantee. Transferring all shares at the start is the riskiest arrangement for owners.</td></tr>
<tr><td>Specification</td><td>Materials, brands and grades as an annex, with measurable definitions.</td></tr>
<tr><td>Termination</td><td>On what conditions owners can terminate and recover their shares if the contractor stops or misses deadlines.</td></tr>
</table></div>
<p>Signing the flat-for-land contract before a notary in the <b>düzenleme şeklinde</b> form and annotating it on the title deed is a common, protective practice.</p>
<h2>4. Run the process together</h2>
<ul>
<li><b>Risky-building assessment</b> is carried out by licensed institutions under Law No. 6306 and its implementing regulation, including objection periods.</li>
<li><b>Owners’ decision:</b> For risky buildings, owners decide by the share majority set in the Law. Confirm the current majority and the procedure for minority shares with your lawyer and the municipality before the meeting.</li>
<li><b>Building inspection:</b> Construction is supervised by a licensed building-inspection firm under Law No. 4708; you can ask for soil, structural and site reports.</li>
</ul>
<h2>5. Warning signs</h2>
<ul>
<li>Requests for title transfer or advance payment before signing.</li>
<li>No completed building to show — only renders.</li>
<li>No deadline, penalty or guarantee clauses.</li>
<li>Offers far above all others: ask how the numbers work.</li>
</ul>
<h2>How NEXERA works</h2>
<p>NEXERA İnşaat has developed residential and urban-renewal projects on Istanbul’s Asian side, mainly in Kadıköy, since 2015. For a preliminary assessment, share your building’s address or block/parcel; our written offers cover the points above. This guide is general information, not legal advice.</p>`,
  sources: [
    ['Law No. 6306 on the Transformation of Areas under Disaster Risk (Turkish)', MEV(6306)],
    ['Law No. 634 on Condominium (Turkish)', MEV(634)],
    ['Law No. 4708 on Building Inspection (Turkish)', MEV(4708)],
    ['Regulation on the Classification of Building Contractors (Official Gazette, 2 March 2019, Turkish)', 'https://www.resmigazete.gov.tr/eskiler/2019/03/20190302-1.htm'],
    ['Ministry of Environment, Urbanisation and Climate Change', 'https://www.csb.gov.tr/']
  ]
};

export const AKILLI_TR = {
  slug: 'akilli-daire-rehberi', path: '/rehber/akilli-daire-rehberi/', alt: '/en/guides/smart-apartment-buyers-guide/', type: 'article', updated: GUNCEL, amac: 'oturum', crumbs: C_TR,
  related: ['projeden-mi-hazir-mi', 'tapu-kontrol-listesi', 'konut-alim-maliyetleri'],
  kicker: 'REHBER · AKILLI EV', title: 'Akıllı Daire Alırken Nelere Bakılmalı? İstanbul İçin Rehber', h1: 'Akıllı daire alırken <span>nelere bakılmalı?</span>',
  desc: 'Akıllı ev sistemi olan bir daire alırken: altyapı (kablolama, KNX, Matter, Thread), yerel kontrol, veri gizliliği, abonelik ücretleri, bakım ve teslimde istenecek belgeler. Projeden alıcılar için kontrol listesi.',
  lead: 'İlanlarda “akıllı ev” çok farklı şeyleri anlatabilir: birkaç akıllı priz de, binanın inşaatında kurulmuş kapsamlı bir otomasyon altyapısı da. Satın almadan önce neyin kurulduğunu, kimin işlettiğini ve yıllar sonra nasıl güncelleneceğini sormak gerekir.',
  answer: 'Akıllı dairede asıl değer, inşaat sırasında kurulan altyapıdadır: yeterli kablolama ve boş borular, merkezi dağıtım panosu ve açık standartlar (ör. KNX, Matter/Thread). Satın almadan önce hangi sistemlerin kurulduğunu yazılı isteyin; internet kesildiğinde temel işlevlerin yerel olarak çalışıp çalışmadığını, kamera ve sensör verilerinin nerede saklandığını, aylık ücret olup olmadığını ve teslimden sonra bakım ile güncellemeyi kimin yapacağını sorun.',
  body: `
<h2>1. “Akıllı” ne demek? Önce kapsamı netleştirin</h2>
<p>Satıcıdan dairede kurulu olan her sistemi bir liste hâlinde isteyin: aydınlatma, perde, ısıtma-soğutma, kapı ve kilit, görüntülü diyafon, güvenlik ve kamera, su kaçağı ve duman sensörleri, enerji ölçümü, ortak alan ve otopark erişimi. Her kalem için markayı, modeli ve hangi uygulamayla kontrol edildiğini yazdırın. “Akıllı ev hazır altyapı” ile “kurulu ve çalışır akıllı ev” aynı şey değildir.</p>
<h2>2. Altyapı, cihazlardan daha önemlidir</h2>
<ul>
<li><b>Kablolama:</b> Odalara giden ağ kablosu (Cat6 ya da üstü), tavan ve duvarlarda boş borular, merkezi bir iletişim/dağıtım panosu. Cihazlar birkaç yılda değişir; duvarın içindeki altyapı binayla birlikte kalır.</li>
<li><b>Açık standartlar:</b> Kablolu otomasyonda KNX gibi açık bir standart; kablosuz cihazlarda Matter ve Thread gibi farklı markaların birlikte çalışmasını hedefleyen standartlar, sizi tek bir üreticiye bağlamaz.</li>
<li><b>Kapsama:</b> Kablosuz ağın tüm odalarda çekmesi için erişim noktalarının yerleri projede düşünülmüş olmalı.</li>
</ul>
<h2>3. İnternet kesilince ne oluyor?</h2>
<p>Işık, ısıtma ve kapı gibi temel işlevlerin internete ve bir şirketin sunucusuna bağlı olmadan, binanın içinde (yerel olarak) çalışabilmesi önemlidir. Elektrik kesintisinde kilitlerin ve diyafonun nasıl davrandığını da sorun.</p>
<h2>4. Veri ve gizlilik</h2>
<ul>
<li>Kamera, mikrofon ve sensör verileri nerede saklanıyor, kimler erişebiliyor, ne kadar süre tutuluyor?</li>
<li>Ortak alan kameralarında yönetimin rolü ve kişisel verilerin korunması (6698 sayılı KVKK) nasıl sağlanıyor?</li>
<li>Varsayılan şifreler teslimde değiştiriliyor mu; cihazlar güvenlik güncellemesi alıyor mu?</li>
</ul>
<h2>5. Ücretler, bakım ve garanti</h2>
<ul>
<li>Uygulama ya da hizmetler için aylık/yıllık ücret var mı? Ücret ödenmezse hangi özellikler kapanıyor?</li>
<li>Teslimden sonra sistemi kim kuruyor, kim bakımını yapıyor, arıza olursa kime başvuruluyor?</li>
<li>Cihazların garanti süresi ve yedek parça bulunabilirliği.</li>
<li>Sistem yöneticiliğinin (admin) teslimde size devredildiğini teyit edin.</li>
</ul>
<h2>6. Teslimde isteyin</h2>
<p>Kurulu cihaz listesi ve seri numaraları, ağ ve pano şeması, kullanıcı ve yönetici hesaplarının devri, garanti belgeleri ve kısa bir kullanım eğitimi. Projeden alımlarda bu kalemlerin satış sözleşmesine ya da şartnameye yazılması gerekir.</p>
<h2>NEXERA ALIVE</h2>
<p>NEXERA, konut projelerinde akıllı yaşamı inşaat aşamasından itibaren altyapı olarak planlar ve bunu NEXERA ALIVE adı altında paketler: Base ALIVE, ALIVE+ ve SIGNATURE. Paketlerin içeriği ve hangi projede sunulduğu, ilgili proje satışa açıldığında şartnameyle birlikte yazılı olarak yayınlanacaktır. Şu an satışta daire bulunmamaktadır.</p>`,
  sources: [
    ['KNX Association — KNX standardı', 'https://www.knx.org/'],
    ['Connectivity Standards Alliance — Matter', 'https://csa-iot.org/all-solutions/matter/'],
    ['6698 sayılı Kişisel Verilerin Korunması Kanunu', MEV(6698)],
    ['Kişisel Verileri Koruma Kurumu', 'https://www.kvkk.gov.tr/']
  ]
};

export const AKILLI_EN = {
  slug: 'smart-apartment-buyers-guide', path: '/en/guides/smart-apartment-buyers-guide/', alt: '/rehber/akilli-daire-rehberi/', type: 'article', updated: GUNCEL, amac: 'oturum', crumbs: C_EN,
  related: ['off-plan-vs-completed-property', 'title-deed-checklist', 'total-cost-of-buying-property-in-turkey'],
  kicker: 'GUIDE · SMART HOME', title: 'Buying a Smart Apartment in Istanbul: What to Check', h1: 'Buying a smart apartment: <span>what to check.</span>',
  desc: 'Before buying a smart-home apartment in Istanbul: infrastructure (cabling, KNX, Matter, Thread), local control, data privacy, subscription fees, maintenance and the documents to ask for at handover.',
  lead: '“Smart home” in a listing can mean a few smart plugs or a full automation system built into the building. Before you buy, ask what is installed, who operates it and how it will be updated years from now.',
  answer: 'The real value of a smart apartment is the infrastructure installed during construction: enough cabling and empty conduits, a central distribution panel and open standards such as KNX or Matter/Thread. Ask in writing which systems are installed; check that basic functions work locally when the internet is down, where camera and sensor data are stored, whether there are monthly fees and who handles maintenance and updates after handover.',
  body: `
<h2>1. Define “smart” first</h2>
<p>Ask the seller for a list of every installed system — lighting, blinds, heating and cooling, door and lock, video intercom, security cameras, leak and smoke sensors, energy metering, shared-area and parking access — with brand, model and the app used. “Smart-home ready” is not the same as “installed and working”.</p>
<h2>2. Infrastructure matters more than gadgets</h2>
<ul>
<li><b>Cabling:</b> network cable (Cat6 or better) to the rooms, empty conduits, a central communications panel. Devices change every few years; what is inside the walls stays with the building.</li>
<li><b>Open standards:</b> KNX for wired automation; Matter and Thread for wireless devices from different brands — these avoid lock-in to one manufacturer.</li>
<li><b>Coverage:</b> Wi-Fi access points should be planned so every room is covered.</li>
</ul>
<h2>3. What happens when the internet is down?</h2>
<p>Lights, heating and the door should keep working locally, without depending on a company’s cloud. Ask how locks and the intercom behave in a power cut.</p>
<h2>4. Data and privacy</h2>
<ul>
<li>Where are camera, microphone and sensor data stored, who can access them and for how long?</li>
<li>How are shared-area cameras managed under Türkiye’s data-protection law (KVKK, Law No. 6698)?</li>
<li>Are default passwords changed at handover and do devices receive security updates?</li>
</ul>
<h2>5. Fees, maintenance and warranty</h2>
<ul>
<li>Are there monthly or yearly fees, and what stops working if you do not pay?</li>
<li>Who maintains the system after handover and whom do you call when something fails?</li>
<li>Warranty periods and spare-part availability; make sure administrator access is handed over to you.</li>
</ul>
<h2>6. Ask for at handover</h2>
<p>A device list with serial numbers, network and panel diagrams, transfer of user and admin accounts, warranty documents and a short training. When buying off-plan, these items should be written into the sales contract or specification.</p>
<h2>NEXERA ALIVE</h2>
<p>NEXERA plans smart living as building infrastructure from the construction stage and packages it as NEXERA ALIVE: Base ALIVE, ALIVE+ and SIGNATURE. Package contents and the projects they apply to will be published in writing with the specification when a project opens for sale. No units are on sale at the moment.</p>`,
  sources: [
    ['KNX Association — the KNX standard', 'https://www.knx.org/'],
    ['Connectivity Standards Alliance — Matter', 'https://csa-iot.org/all-solutions/matter/'],
    ['Law No. 6698 on the Protection of Personal Data (Turkish)', MEV(6698)],
    ['Personal Data Protection Authority (KVKK)', 'https://www.kvkk.gov.tr/']
  ]
};
