// "NEXERA ile konut satın alma ve satış sonrası" — TASLAK. Şirketin gerçek satış/sözleşme/teslim süreci onaylanmadan yayına alınmaz.
import { GUNCEL } from './icerik-ortak.mjs';
const S = s => `<mark style="background:#5a3a14;color:#ffd9b8;padding:0 4px">[ŞİRKET ONAYI: ${s}]</mark>`;
export const SUREC_TR = {
  slug: 'nexera-satin-alma-sureci', path: '/taslak/nexera-satin-alma-sureci/', draft: true, type: 'article', updated: GUNCEL,
  kicker: 'TASLAK · NEXERA SÜRECİ', title: 'NEXERA’dan Konut Satın Alma ve Satış Sonrası Süreç', h1: 'NEXERA’dan konut almak: <span>adım adım.</span>',
  desc: 'NEXERA projelerinde ilk görüşmeden tapu ve teslime, satış sonrası destekten garantiye kadar süreç.',
  lead: 'Bu metin, NEXERA’nın gerçek satış ve teslim sürecini anlatmak için hazırlanmış bir taslaktır. İşaretli yerler şirket tarafından doldurulup onaylanmadan yayımlanmamalıdır.',
  body: `
<h2>1. İlk görüşme</h2><p>Talebiniz bize ulaştığında ${S('kaç iş günü içinde, kim tarafından, hangi dillerde')} sizinle iletişime geçeriz. Bütçenizi, bölge tercihinizi ve amacınızı dinleyip projenin size uygun olup olmadığını açıkça söyleriz.</p>
<h2>2. Proje ve daire bilgisi</h2><p>Satışa açılan projelerde daire planı, net/brüt m², fiyat ve fiyat tarihi, ödeme seçenekleri, dahil ve hariç giderler yazılı olarak verilir. ${S('satışa açılış takvimi, fiyat listesinin nasıl paylaşılacağı')}</p>
<h2>3. Rezervasyon ve sözleşme</h2><p>${S('rezervasyon/kapora uygulaması var mı, iade koşulları; satış vaadi sözleşmesi noterde mi yapılıyor; ödeme planı; teminat')}</p>
<h2>4. Yabancı alıcılar</h2><p>${S('yabancı alıcıyla çalışma deneyimi; İngilizce/Arapça/Rusça hizmet kapasitesi; yeminli tercüman ve bağımsız avukat önerisi nasıl yapılıyor')}. NEXERA hukuk, vatandaşlık veya ikamet danışmanlığı vermez; alıcının bağımsız avukatla çalışmasını öneririz.</p>
<h2>5. İnşaat süresince bilgilendirme</h2><p>${S('alıcılara hangi sıklıkla, hangi kanaldan ilerleme raporu verileceği; şantiye ziyareti')}</p>
<h2>6. Tapu, iskân ve teslim</h2><p>${S('tapu devri hangi aşamada; kat irtifakı/kat mülkiyeti; iskân ve teslim tutanağı; teslimde kontrol listesi')}</p>
<h2>7. Satış sonrası (NEXERA CARE)</h2><p>${S('garanti kapsamı ve süreleri; arıza bildirimi kanalı ve yanıt süresi; bina yönetimi desteği gerçekten veriliyor mu; ALIVE akıllı yaşam kurulumu')}</p>`,
  sources: []
};
