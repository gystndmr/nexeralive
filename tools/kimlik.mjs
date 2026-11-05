// NEXERA kurumsal kimlik: tüm sayfalarda aynı bilgiler (yapısal veri kaynağı). Doğrulanmamış bilgi eklemeyin.
export const SITE = 'https://nexeralive.com';
export const ORG = {
  '@type': 'GeneralContractor', '@id': SITE + '/#nexera', name: 'NEXERA İnşaat', legalName: 'Nexera İnşaat Limited Şirketi',
  url: SITE + '/insaat/', email: 'info@nexeralive.com', telephone: '+90 551 272 06 06', foundingDate: '2015',
  slogan: 'The next era lives here.', image: SITE + '/og.jpg', logo: SITE + '/og.jpg',
  address: { '@type': 'PostalAddress', streetAddress: 'Yakacık Çarşı Mah. Rota Sk. B Blok No:1 B', addressLocality: 'Kartal', addressRegion: 'İstanbul', addressCountry: 'TR' },
  areaServed: { '@type': 'City', name: 'İstanbul' },
  sameAs: ['https://www.instagram.com/nexera.34/'],
  knowsLanguage: ['tr', 'en']
};
export const WEBSITE = { '@type': 'WebSite', '@id': SITE + '/#site', url: SITE + '/', name: 'NEXERA', inLanguage: ['tr-TR', 'en'], publisher: { '@id': SITE + '/#nexera' } };
