// NEXERA site API — assistant (Claude) + lead intake. Node 22, no dependencies.
// Env: ANTHROPIC_API_KEY (optional; without it the site uses its built-in answers), MODEL, ADMIN_KEY, PORT
import http from 'node:http';
import fs from 'node:fs';
import crypto from 'node:crypto';

const PORT = +(process.env.PORT || 8091);
const KEY = process.env.ANTHROPIC_API_KEY || '';
const MODEL = process.env.MODEL || 'claude-sonnet-5-5';
const BASE = process.env.ANTHROPIC_BASE_URL || 'https://api.anthropic.com';
const ADMIN = process.env.ADMIN_KEY || '';
const DATA = process.env.DATA_DIR || '/data';
const LEADS = DATA + '/talepler.jsonl';
const AR_DIR = DATA + '/ar';
const DIAG = DATA + '/hatalar.jsonl';
const AR_FILES = { 'erenkoy-maket.usdz':'model/vnd.usdz+zip', 'erenkoy-gercek.usdz':'model/vnd.usdz+zip', 'erenkoy-maket.glb':'model/gltf-binary', 'erenkoy-gercek.glb':'model/gltf-binary' };
const AR_SRC = 'https://raw.githubusercontent.com/gystndmr/nexeralive/';
// phone push notifications for new leads via ntfy (topic is secret, derived from ADMIN_KEY unless NTFY_TOPIC is set)
const NTFY = process.env.NTFY_TOPIC || (ADMIN ? 'nexera-' + crypto.createHash('sha256').update('nexera-ntfy:' + ADMIN).digest('hex').slice(0, 20) : '');
const NTFY_URL = (process.env.NTFY_SERVER || 'https://ntfy.sh') + '/' + NTFY;
const KAYNAK = { 'form':'İletişim formu', 'asistan-ai':'Deniz (AI danışman)', 'asistan':'NEXERA Asistan', 'hesaplayici':'Binam ne kazanır?', 'risk-testi':'Riskli yapı testi' };
fs.mkdirSync(DATA, { recursive: true });

// BILGI:BASLA
const BILGI = "### Buying Property in Turkey as a Foreigner: Step by Step (/en/guides/buying-property-in-turkey-as-a-foreigner/, checked 2026-11-06)\nCitizens of countries listed by the President can buy homes, within the statutory area limits and outside military or security zones. You apply through Web Tapu, the Alo 181 line or the land registry office; you need your passport, a compulsory earthquake insurance (DASK) policy, a photo, a valuation report (for foreign buyers) and a foreign-exchange purchase certificate (DAB) issued by a Turkish bank. A sworn translator attends if you do not speak Turkish. The sale is completed with an official deed at the land registry.\nWho can buy, and the limits\nIndividuals who are citizens of countries designated by the President may acquire homes and land, subject to legal restrictions. Reciprocity has not been required since 2012.\nTotal foreign ownership may not exceed 10% of the privately owned area of a district, and one person may not hold more than 30 hectares nationwide. Purchases are not possible in military prohibited zones and security zones; land registry offices check this against their own records.\nCompanies incorporated abroad can acquire property only under special-law exceptions; this guide is for individuals.\nStep by step\nCheck the property and its title. Owner, share, mortgage, attachments, annotations, construction and occupancy permits. Our title deed checklist covers this in detail.\nTax number and bank account. In practice foreign buyers are asked for a Turkish tax number, and the payment has to go through a bank in Türkiye.\nApplication and appointment. Apply through Web Tapu, the Alo 181 call centre or the land registry office.\nValuation report. If the buyer is a foreigner, a report by a valuer licensed by the Capital Markets Board (SPK) is requested through Web Tapu before the sale application.\nForeign-exchange purchase certificate (DAB). Foreign buyers without a Blue Card present a DAB showing that the foreign currency for the price was sold to a bank in Türkiye; the Turkish-lira amount on the DAB is recorded as the sale price.\nDocuments. Passport, a power of attorney if someone acts for you, a DASK earthquake insurance policy and a photo. If either party does not speak Turkish, a sworn translator from the official register must attend.\nCompletion day. The title-deed fee and the land registry service fee are paid, the official deed is signed and the title is registered in your name. See our total cost guide for the costs.\nCommon mistakes\nPaying a deposit before seeing the title record, or paying most of the price before the transfer.\nRelying on verbal promises: delivery date, specifications and payment plan must be in writing.\nRelying only on the seller’s side instead of an independent lawyer and a sworn translator.\nAssuming that owning property is the same as a residence permit or citizenship: they are separate applications with separate conditions.\nProperty, residence and citizenship\nOwning a home in Türkiye does not by itself give you a residence permit or citizenship. A property-based short-term residence permit and citizenship by investment are separate applications to different authorities with their own conditions (for example, as of 2026 the home must be worth at least USD 200,000 and must not be rented out for a property-based residence permit; citizenship requires a purchase of at least USD 400,000 with a 3-year no-sale annotation). We recommend working with an independent lawyer on these questions.\n\n### Total Cost of Buying an Apartment in Turkey (2026) (/en/guides/total-cost-of-buying-property-in-turkey/, checked 2026-11-06)\nFor a resale home the main extra costs are the buyer’s 2% title-deed fee, the land registry service fee, DASK earthquake insurance and, for foreign buyers, the valuation report and translator. For the first sale of a new home, VAT is added: 10% on the first 150 m² net and 20% above for projects permitted from 1 April 2022, or 1% on the first 150 m² in urban-renewal projects. After that you pay annual property tax (0.2% of the tax value in Istanbul) and service charges.\nCost items (2026)\n | Item | Amount / rate | Who pays | Notes\n | Title-deed fee (tapu harcı) | 2% of the price from the buyer and 2% from the seller (4% in total) | Buyer and seller separately | The declared price cannot be below the property-tax value. For foreign buyers the lira amount on the DAB is used.\n | Land registry service fee (döner sermaye) | A fixed amount set each year × regional coefficient | Usually the buyer | Confirm the 2026 Istanbul amount with the land registry before completion.\n | VAT (new homes, first sale only) | For projects permitted on or after 1 April 2022: 10% on the first 150 m² net, 20% above; 1% on the first 150 m² net in urban-renewal projects under Law 6306 | Buyer (ask whether it is included in the price) | Older permits may follow different rates. A conditional exemption exists for non-residents (below).\n | Compulsory earthquake insurance (DASK) | Annual premium by size and zone | Owner | No transfer is registered without a valid policy.\n | Valuation report | Valuer’s fee | In practice the buyer | Required for foreign buyers.\n | Sworn translator, notary | Market fee / notary tariff | Whoever uses the service | Translator if a party does not speak Turkish; notary for powers of attorney and sales-promise contracts.\n | Stamp duty | None on the land-registry sale; zero rate on notarised sales-promise contracts | — | \n | Annual property tax | 0.1% of the tax value for homes; 0.2% in metropolitan municipalities such as Istanbul | Owner (yearly) | 2026 tax values are capped at twice the 2025 values.\nVAT exemption for non-residents\nUnder article 13/i of the VAT Law, the first sale of a home or workplace to foreign individuals not resident in Türkiye, to Turkish citizens who have lived abroad for more than six months with a work or residence permit, and to companies resident abroad is exempt from VAT, provided the price is paid in foreign currency brought into Türkiye. If the property is sold within 3 years, the VAT not paid because of the exemption must be paid with late-payment interest before the title transfer, and the buyer is jointly liable if the conditions were not met. Confirm the documentation with a tax adviser before you buy.\nWorked example (method only)\nAssumption: a resale home with a declared price of TRY 10,000,000, above its property-tax value. Buyer’s title-deed fee: 10,000,000 × 2% = TRY 200,000. Add that year’s land registry service fee, the DASK premium and any valuation, translator and notary fees. For the first sale of a new home VAT is calculated separately; make sure the contract states whether VAT is included.\nQuestions to ask with every offer\nIs the price VAT-inclusive? At which rate and on how many net m²?\nWho pays the title-deed fee and the land registry service fee?\nAre electricity, water and gas connections included?\nWhen do service charges start, and roughly how much are they?\nFor off-plan purchases, which construction stages are the payments tied to?\n\n### Turkish Title Deed (Tapu) Checklist Before You Buy (/en/guides/title-deed-checklist/, checked 2026-11-06)\nSee the current land-registry record yourself. Confirm that the seller is the registered owner, what share you are buying, and whether there is any mortgage, attachment, annotation (şerh) or declaration (beyan). Ask whether the deed is full condominium (kat mülkiyeti) or construction servitude (kat irtifakı), whether the building has a construction permit and occupancy permit (iskân), and whether any building dues are unpaid. Do not pay most of the price before the title transfer.\n1. See the land-registry record yourself\nDo not rely on a photocopy. Owners can view their records on the e-Devlet “Tapu Bilgileri Sorgulama” service; ask the seller for this record or for a current extract from the land registry office. Check that the block (ada), parcel and unit number match the flat you are buying.\n2. Owner and share\nIs the seller the registered owner? The name on the deed must match the seller’s ID. If someone sells under a power of attorney, check the original document and that it expressly authorises the sale of this property.\nShared ownership: if several people are registered, all of them must take part in the sale. Buying one share is not buying the whole flat.\n3. Encumbrances: mortgage, attachment, annotations, declarations\n | Record | What it means | What to do\n | Mortgage (ipotek) | The property secures a debt, usually a bank loan. | Make removal of the mortgage, or a written plan for removing it, a condition before transfer.\n | Attachment (haciz) | An enforcement record placed because of the owner’s debt. | Do not buy until it is lifted.\n | Annotation (şerh) | Registers a right (lease, pre-emption, sales promise, risky-building status) so that it binds third parties. | Find out what each annotation is and how it affects you; ask a lawyer if unsure.\n | Declaration (beyan) | Informational notes such as the building’s management plan. | Read them, especially any use restrictions in the management plan.\n4. Construction servitude or full condominium?\nUnder the Condominium Law No. 634, kat irtifakı (construction servitude) is established for future independent units in a building that is not finished or has no occupancy permit yet. When the building is completed and the occupancy permit is issued, it is converted into kat mülkiyeti (full condominium ownership). Off-plan purchases normally start with kat irtifakı; if a finished building still has only kat irtifakı, ask why the occupancy permit has not been obtained.\n5. Permits and zoning\nConstruction permit (yapı ruhsatı): for a new project, ask for the permit date and number.\nOccupancy permit (iskân / yapı kullanma izni): for a completed building, see the document. Buildings without it can face problems with utilities, mortgages and resale.\nConformity with the approved plans: unapproved changes (enclosed balconies, merged units) can cause problems later.\nRisky building: a risky-building annotation means the building is in an urban-renewal process under Law No. 6306; assess the consequences separately before buying.\n6. Day-to-day debts of the flat\nGet written confirmation from the building management that there are no unpaid service charges. Confirm that electricity, water and gas accounts will be transferred without debt, and that compulsory earthquake insurance (DASK) is in force.\n7. Tie payment to the transfer\nThe sale is completed at the land registry office with an official deed. Put any deposit terms in writing, and pay most of the price at the moment of transfer by traceable bank transfer. For off-plan purchases, a notarised sales-promise contract annotated on the title deed protects the buyer against third parties.\n\n### Off-Plan vs Completed Property in Istanbul (/en/guides/off-plan-vs-completed-property/, checked 2026-11-06)\nIf you need to live in the property or earn rent soon and dislike surprises, a completed flat is the safer choice. If you can wait a few years, want to spread payments and can examine the developer’s track record, permit and contract carefully, buying off-plan can be worthwhile. The key protections are a notarised sales-promise contract annotated on the title deed and a payment plan tied to construction progress.\nSide by side\n | | Off-plan (under construction) | Completed\n | Price | Usually lower before delivery; payments can be spread. | Market price; usually paid upfront or with a mortgage.\n | What you see | Plans, renderings and specifications; the real flat at delivery. | The flat itself: view, light, noise, neighbours.\n | Title | Usually construction servitude (kat irtifakı) or a sales promise; full condominium after the occupancy permit. | Usually full condominium (kat mülkiyeti).\n | Main risk | Delay, deviation from specifications, developer failing to finish. | Hidden defects, zoning/occupancy problems, age and earthquake resistance of the building.\n | Use / rent | No income until delivery. | Can be occupied or let immediately.\n | Building standard | Current earthquake regulation and technical standards. | Depends on the construction year; assess earthquake risk in older buildings.\nOff-plan: what to check in the contract\nConstruction permit: does the project have one, and do the unit count and areas match what is being sold?\nSales-promise contract: a contract made before a notary and annotated on the title deed protects you against third parties.\nDelivery date and delay: a firm date, a penalty for delay and the conditions for withdrawing should be written down.\nSpecifications: materials and brands, net and gross m², common areas and parking.\nPayment plan: linking payments to construction progress and paying by traceable bank transfer lowers risk.\nWhat the price includes: VAT, title-deed fee, utility connections and service charges. See our total cost guide.\nCompleted: what to check\nTitle-deed records, the occupancy permit, construction year, unpaid dues and the building’s earthquake resistance matter most. Use our title deed checklist. In older buildings, also ask whether the building may enter an urban-renewal process.\nNEXERA today\nThe Erenköy project in which NEXERA is a partner (block 3450, parcel 186, 998.99 m²) is in pre-construction; unit types, prices and the delivery date have not been announced and no units are on sale yet. When sales open we will provide the permit, specifications and payment plan in writing.\n\n### Investment Property in Istanbul: Rental Income, Costs and Risks (/en/guides/rental-income-costs-and-risks/, checked 2026-11-06)\nNet yield = (annual rent − vacancy − service charges, maintenance, insurance, property tax and income tax) ÷ total purchase cost. In 2026 the first TRY 58,000 of annual residential rent is exempt under conditions; rent above that is declared and taxed at 15%–40%. Non-residents must also declare rent from Türkiye. Renting a home to tourists for up to 100 days requires a permit from the Ministry of Culture and Tourism.\nGross and net yield\nGross yield = annual rent ÷ purchase price. Net yield deducts the items below and divides by the total purchase cost (including fees, VAT, valuation and so on):\nVacancy: allow for empty months between tenants.\nService charges, maintenance, repairs and furniture replacement.\nDASK and optional home insurance.\nProperty tax: 0.2% of the tax value in Istanbul.\nIncome tax (below) and any agency or management fees.\nCurrency risk: rent is in lira; if you invested in foreign currency, your return moves with the exchange rate.\nTax on rental income (2026)\n | Topic | Rule\n | Exemption | The first TRY 58,000 a year of residential rent is exempt. The exemption is lost if income above it is not declared or is under-declared, and it does not apply to people who file returns for business, agricultural or professional income or whose total gross income exceeds TRY 1,500,000 in 2026.\n | Expenses | Instead of actual expenses you may deduct a flat 15% of the rent; once chosen, you must keep this method for 2 years.\n | Rates | Progressive: 15%–40%.\n | Non-residents | Rent from property in Türkiye is taxable for non-residents too. Because private-individual tenants do not withhold tax, non-resident landlords in practice need to file a return.\nShort-term (tourist) rentals\nSince 1 January 2024, Law No. 7464 requires a permit from the Ministry of Culture and Tourism to rent a home to tourists for up to 100 days. All owners in the building must agree unanimously; a plaque is displayed at the door and guests are registered with the authorities. Renting without a permit is fined per home.\nResidence permit and renting do not mix\nFor a property-based short-term residence permit, the Presidency of Migration Management requires the home to be used as the applicant’s residence and not rented out. If you plan both, discuss it with a lawyer before applying.\nChecklist\nBase your rent estimate on actual lettings of similar flats nearby; asking rents are not achieved rents.\nInclude the full purchase costs in your calculation.\nRe-run the numbers assuming at least one empty month and one month of maintenance costs a year.\nIf you plan short-term lets, check in advance whether the building can meet the permit conditions.\n\n### Buying a Smart Apartment in Istanbul: What to Check (/en/guides/smart-apartment-buyers-guide/, checked 2026-11-06)\nThe real value of a smart apartment is the infrastructure installed during construction: enough cabling and empty conduits, a central distribution panel and open standards such as KNX or Matter/Thread. Ask in writing which systems are installed; check that basic functions work locally when the internet is down, where camera and sensor data are stored, whether there are monthly fees and who handles maintenance and updates after handover.\n1. Define “smart” first\nAsk the seller for a list of every installed system — lighting, blinds, heating and cooling, door and lock, video intercom, security cameras, leak and smoke sensors, energy metering, shared-area and parking access — with brand, model and the app used. “Smart-home ready” is not the same as “installed and working”.\n2. Infrastructure matters more than gadgets\nCabling: network cable (Cat6 or better) to the rooms, empty conduits, a central communications panel. Devices change every few years; what is inside the walls stays with the building.\nOpen standards: KNX for wired automation; Matter and Thread for wireless devices from different brands — these avoid lock-in to one manufacturer.\nCoverage: Wi-Fi access points should be planned so every room is covered.\n3. What happens when the internet is down?\nLights, heating and the door should keep working locally, without depending on a company’s cloud. Ask how locks and the intercom behave in a power cut.\n4. Data and privacy\nWhere are camera, microphone and sensor data stored, who can access them and for how long?\nHow are shared-area cameras managed under Türkiye’s data-protection law (KVKK, Law No. 6698)?\nAre default passwords changed at handover and do devices receive security updates?\n5. Fees, maintenance and warranty\nAre there monthly or yearly fees, and what stops working if you do not pay?\nWho maintains the system after handover and whom do you call when something fails?\nWarranty periods and spare-part availability; make sure administrator access is handed over to you.\n6. Ask for at handover\nA device list with serial numbers, network and panel diagrams, transfer of user and admin accounts, warranty documents and a short training. When buying off-plan, these items should be written into the sales contract or specification.\nNEXERA ALIVE\nNEXERA plans smart living as building infrastructure from the construction stage and packages it as NEXERA ALIVE: Base ALIVE, ALIVE+ and SIGNATURE. Package contents and the projects they apply to will be published in writing with the specification when a project opens for sale. No units are on sale at the moment.\n\n### Choosing a Contractor for Urban Renewal (Kentsel Dönüşüm) in Istanbul (/en/guides/choosing-an-urban-renewal-contractor/, checked 2026-11-06)\nCheck the contractor’s licence (yapı müteahhidi yetki belgesi), its trade-registry records and completed buildings that received an occupancy permit, and speak to an owner from one of them. Sign the flat-for-land contract before a notary (düzenleme şeklinde) and make sure it states delivery dates, late-delivery penalties, rent support, the allocation of flats, a specification list and a guarantee such as staged transfer of land shares or a bank letter of guarantee. Compare several offers on the same specification and have an independent lawyer review the contract before signing.\n1. Know the company\nContractor licence: Building contractors in Türkiye are registered with the Ministry of Environment, Urbanisation and Climate Change and grouped by experience. Ask for the licence number and group, and whether the group fits the size of your building.\nCompany records: Trade name, founding year, partners and address appear in the Trade Registry Gazette. Make sure the company that signs is the one that presented to you.\nCompleted work: Ask for finished buildings — address, occupancy-permit (iskân) date and how long they took — and talk to an owner there.\nFinancial capacity: Ask how many sites run in parallel and how construction is financed. A plan that depends only on pre-sales carries delay risk if sales slow down.\n2. Make offers comparable\nAsk every company to price the same thing: gross and net areas, flat allocation, parking and storage, a material and brand specification, delivery time and rent support. An offer with more flats but a weak specification can cost more in the long run.\n3. What the contract must include\n | Clause | Why it matters\n | Parties and property | Block (ada), parcel, units and every owner listed in full.\n | Share and allocation | Which owner receives which flat, or how allocation is decided.\n | Deadlines | Separate dates for permit, demolition, start of works and delivery with occupancy permit.\n | Late-delivery penalty | An amount or rent paid to owners for each month of delay.\n | Rent support | Who pays rent during construction, how much and when; whether it is separate from state rent assistance.\n | Guarantee | Transfer of land shares in stages as construction progresses, or a bank letter of guarantee. Transferring all shares at the start is the riskiest arrangement for owners.\n | Specification | Materials, brands and grades as an annex, with measurable definitions.\n | Termination | On what conditions owners can terminate and recover their shares if the contractor stops or misses deadlines.\nSigning the flat-for-land contract before a notary in the düzenleme şeklinde form and annotating it on the title deed is a common, protective practice.\n4. Run the process together\nRisky-building assessment is carried out by licensed institutions under Law No. 6306 and its implementing regulation, including objection periods.\nOwners’ decision: For risky buildings, owners decide by the share majority set in the Law. Confirm the current majority and the procedure for minority shares with your lawyer and the municipality before the meeting.\nBuilding inspection: Construction is supervised by a licensed building-inspection firm under Law No. 4708; you can ask for soil, structural and site reports.\n5. Warning signs\nRequests for title transfer or advance payment before signing.\nNo completed building to show — only renders.\nNo deadline, penalty or guarantee clauses.\nOffers far above all others: ask how the numbers work.\nHow NEXERA works\nNEXERA İnşaat has developed residential and urban-renewal projects on Istanbul’s Asian side, mainly in Kadıköy, since 2015. For a preliminary assessment, share your building’s address or block/parcel; our written offers cover the points above. This guide is general information, not legal advice.";
// BILGI:BITIS
// Deniz: NEXERA'nın yapay zekâ satış ve iletişim danışmanı (her dilde). Rehber bilgisi tools/bilgi.mjs ile aşağıya gömülür.
const SYSTEM = `You are "Deniz", the digital sales and contact consultant of NEXERA İnşaat Ltd. Şti. on nexeralive.com. You are an AI assistant. Write your name as "Deniz" in Latin-script languages, "دنيز" in Arabic, "Дениз" in Russian.

VOICE
- Talk like an experienced, warm, honest property consultant in a real conversation: short messages (usually 2–4 sentences, max ~90 words in any language; split long information over several turns), natural phrasing, one question at a time, remember what the visitor already told you, use their name once you know it. No markdown headings, no long lists, no emojis except at most one occasional friendly one, no sales pressure.
- ALWAYS reply in the language the visitor writes in (Turkish, English, Arabic, Russian, German, Persian, anything). If unclear, use the page language given in the context. In Turkish use "siz".
- You are not a human. Never claim or imply to be human, never invent a personal life, location or feelings. If asked whether you are a bot/AI/real person, say plainly that you are NEXERA's AI assistant and that a team member can call or WhatsApp them.

FACTS (never go beyond these; if something is not here, say it has not been announced or that the team will confirm)
- NEXERA İnşaat (Nexera İnşaat Limited Şirketi), Istanbul construction company active since 2015; residential and urban-renewal (kentsel dönüşüm, Law 6306) projects on Istanbul's Asian side, mainly Kadıköy. Values: uncompromising safety, quality before growth, transparency, timeless design; NEXERA ALIVE smart living (Base ALIVE, ALIVE+, SIGNATURE); after-sales NEXERA CARE.
- Current published project: Erenköy, Kadıköy — block (ada) 3450, parcel 186, parcel area 998.99 m². NEXERA is a partner (ortak) in this project. Status: preparation / pre-construction. No units are on sale yet; unit types, number of units, prices, payment plans and delivery date have NOT been announced. 3D and AR views on /projeler/ are illustrative.
- Do not mention any other project. If asked about other projects or areas, say Erenköy is the only published project for now and offer to notify them when new projects are announced.
- Contact: +90 551 272 06 06 (phone and WhatsApp), info@nexeralive.com, office: Yakacık Çarşı Mah. Rota Sk. B Blok No:1 B, Kartal/İstanbul. Instagram @nexera.34.
- English home page /en/, guides /en/guides/ and /rehber/ (Turkish). Privacy notice: /gizlilik/ (Turkish) and /en/privacy/ (English).

HARD LIMITS
- Never invent prices, m² prices, rents, yields, returns, discounts, delivery dates, unit counts or availability. Never promise value increase.
- NEXERA is not a law firm, tax adviser or citizenship/immigration consultant. You may explain general rules ONLY from the guide knowledge below, mention the date they were checked, and recommend an independent licensed lawyer/accountant for their case. Never say that a NEXERA home qualifies for citizenship or a residence permit; never guarantee any permit, approval or outcome.
- Do not discuss competitors. For off-topic requests, politely steer back to homes, investment in Istanbul, urban renewal or contacting NEXERA.
- Never ask for ID/passport numbers, bank or card details or passwords. If someone shares them, tell them not to and do not store them.

WHAT YOU DO
1) Buyers / investors / foreigners: understand their goal (to live, investment, rental income, holiday home, residence permit, citizenship), budget and currency, timing, preferred area, and preferred contact channel. Answer their questions from the facts and guides. Be honest that nothing is on sale yet and offer to put them on the list so the team contacts them when Erenköy opens for sale or a suitable project is announced.
2) Building owners (urban renewal): give general information on Law 6306, risky-building assessment, owner majority decisions, rent assistance and flat-for-land agreements; do not give uncertain figures ("we confirm current values together"). For a preliminary assessment collect name, phone and the building address or ada/parcel.
3) Lead capture — when the visitor wants to be contacted:
   a) collect name and at least one of phone/WhatsApp or email (plus the details above you already have — do not interrogate, 1 question per message);
   b) then share the privacy notice link (/gizlilik/ for Turkish speakers, /en/privacy/ for everyone else) and ask clearly: may we store these details and contact them about their request? Separately and optionally ask whether they also want occasional news about new projects;
   c) ONLY after an explicit yes, call talep_kaydet with aydinlatma=true (pazarlama=true only if they said yes to news). Then confirm warmly that the team will contact them, in which channel, and that working hours are Istanbul time (UTC+3).
   If they say no, do not save anything; give the phone/WhatsApp number instead.

GUIDE KNOWLEDGE (general information, last checked on the date shown in each guide; quote carefully):
${BILGI}`;

const TOOLS = [{
  name: 'talep_kaydet',
  description: 'Saves a contact/lead request ONLY after the visitor explicitly agreed to the privacy notice and to being contacted. The team then contacts them.',
  input_schema: { type: 'object', properties: {
    ad: { type: 'string', description: 'Full name' }, telefon: { type: 'string', description: 'Phone / WhatsApp with country code' }, eposta: { type: 'string' },
    adres: { type: 'string', description: 'Building address or ada/parcel (urban renewal only)' },
    konu: { type: 'string', description: 'Short subject, e.g. "Erenköy satış listesi", "Kentsel dönüşüm ön değerlendirme"' },
    not: { type: 'string', description: 'Short summary of the conversation and questions, in Turkish, for the team' },
    dil: { type: 'string', enum: ['tr', 'en', 'ar', 'ru', 'diger'], description: 'Language the visitor used' },
    amac: { type: 'string', enum: ['oturum', 'yatirim', 'kira', 'tatil', 'vatandaslik', 'donusum', 'diger'] },
    para: { type: 'string', enum: ['TRY', 'USD', 'EUR', 'GBP'] },
    butce: { type: 'string', enum: ['b1', 'b2', 'b3', 'b4', 'b5', 'yok'], description: 'TRY: b1<5M b2 5–10M b3 10–20M b4 20–40M b5 40M+; other currencies: b1<150k b2 150–300k b3 300–500k b4 500k–1M b5 1M+; yok = not stated' },
    zamanlama: { type: 'string', enum: ['0-3', '3-6', '6-12', '12+', 'arastirma'], description: 'Months until purchase; arastirma = just researching' },
    tercih: { type: 'string', enum: ['telefon', 'whatsapp', 'eposta'] },
    proje: { type: 'string', enum: ['karar-yok', 'erenkoy'] },
    aydinlatma: { type: 'boolean', description: 'true only if the visitor explicitly agreed after seeing the privacy notice link' },
    pazarlama: { type: 'boolean', description: 'true only if they explicitly want news about new projects' }
  }, required: ['ad', 'aydinlatma'] }
}];

const hits = new Map();
function limited(ip, max, winMs){ const now = Date.now(); const a = (hits.get(ip) || []).filter(t => now - t < winMs); a.push(now); hits.set(ip, a); return a.length > max; }
function ipOf(req){ return (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket.remoteAddress || '?'; }
function readBody(req){ return new Promise((res, rej) => { let s = ''; req.on('data', c => { s += c; if (s.length > 32768) { rej(new Error('too large')); req.destroy(); } }); req.on('end', () => { try { res(JSON.parse(s || '{}')); } catch (e) { rej(e); } }); }); }
function send(res, code, obj, type = 'application/json'){ res.writeHead(code, { 'Content-Type': type + '; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(type === 'application/json' ? JSON.stringify(obj) : obj); }
const clean = (v, n = 300) => String(v ?? '').replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, n);

const ENUM = {
  tercih: ['telefon', 'whatsapp', 'eposta'],
  dil: ['tr', 'en', 'ar', 'ru', 'diger'],
  para: ['TRY', 'USD', 'EUR', 'GBP'],
  butce: ['b1', 'b2', 'b3', 'b4', 'b5', 'yok'],
  amac: ['oturum', 'yatirim', 'kira', 'tatil', 'vatandaslik', 'donusum', 'diger'],
  zamanlama: ['0-3', '3-6', '6-12', '12+', 'arastirma'],
  proje: ['karar-yok', 'erenkoy']
};
// anonim olay sayacı: kişisel veri, IP, çerez yok; yalnızca gün × olay × sayfa × kaynak türü sayıları
const EVENTS = DATA + '/olaylar.json';
const EV_OK = ['sayfa', 'proje_goruntuleme', 'rehberden_projeye', 'iletisim_tel', 'iletisim_whatsapp', 'iletisim_eposta', 'form_acildi', 'form_basarili', 'form_hata', 'danisman_acildi', 'danisman_mesaj', 'danisman_talep'];
const REF_OK = ['ai', 'arama', 'sosyal', 'dogrudan', 'diger', ''];
let evs = {}; try { evs = JSON.parse(fs.readFileSync(EVENTS, 'utf8')); } catch {}
let evDirty = false; setInterval(() => { if (evDirty) { evDirty = false; fs.writeFileSync(EVENTS, JSON.stringify(evs)); } }, 15000);
function count(e, p, r){ const d = new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Istanbul' }); const key = [d, e, String(p).slice(0, 120), REF_OK.includes(r) ? r : 'diger'].join('|'); evs[key] = (evs[key] || 0) + 1; evDirty = true; }

function saveLead(d, ip){
  const rec = { id: crypto.randomUUID(), zaman: new Date().toISOString(), ip,
    ad: clean(d.ad, 120), telefon: clean(d.telefon, 40), eposta: clean(d.eposta, 120), adres: clean(d.adres, 300),
    konu: clean(d.konu, 120), not: String(d.not || d.mesaj || '').split('\n').map(l => clean(l, 400)).filter(Boolean).join('\n').slice(0, 2000), kaynak: clean(d.kaynak, 30) };
  // alıcı formu alanları (yalnızca izin verilen değerler saklanır)
  for (const [k, ok] of Object.entries(ENUM)) { const v = clean(d[k], 40); if (v && ok.includes(v)) rec[k] = v; }
  if (d.bolge) rec.bolge = clean(d.bolge, 120);
  if (d.sayfa) rec.sayfa = clean(d.sayfa, 160);
  if (d.utm) rec.utm = clean(d.utm, 160);
  if (d.ref) rec.ref = clean(d.ref, 20);
  if (d.aydinlatma !== undefined) rec.aydinlatma = d.aydinlatma === true;
  if (d.pazarlama !== undefined) rec.pazarlama = d.pazarlama === true;
  fs.appendFileSync(LEADS, JSON.stringify(rec) + '\n');
  notify(rec).catch(e => console.error('bildirim', e.message));
  return rec;
}

const ascii = s => s.replace(/[^\x20-\x7e]/g, c => ({ 'ı':'i','İ':'I','ş':'s','Ş':'S','ğ':'g','Ğ':'G','ü':'u','Ü':'U','ö':'o','Ö':'O','ç':'c','Ç':'C','²':'2' }[c] || ''));
async function notify(rec){
  if (!NTFY) return;
  // bildirim yurt dışındaki bir sunucudan geçer: kişisel veri (ad, telefon, adres, mesaj) gönderilmez, ayrıntılar /api/talepler sayfasındadır
  const body = ['Yeni bir talep geldi.', rec.amac && ('Amaç: ' + rec.amac), rec.dil && ('Dil: ' + rec.dil), rec.sayfa && ('Sayfa: ' + rec.sayfa)].filter(Boolean).join('\n');
  const r = await fetch(NTFY_URL, { method: 'POST', body, headers: { 'Title': ascii('Yeni talep - ' + (KAYNAK[rec.kaynak] || rec.kaynak || 'site')), 'Tags': 'house', 'Priority': '4', 'Click': 'https://nexeralive.com/api/talepler' } });
  if (!r.ok) throw new Error('ntfy ' + r.status);
}

async function claude(messages, ctx){
  const r = await fetch(BASE + '/v1/messages', { method: 'POST',
    headers: { 'x-api-key': KEY, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
    body: JSON.stringify({ model: MODEL, max_tokens: 700, system: [{ type: 'text', text: SYSTEM, cache_control: { type: 'ephemeral' } }, { type: 'text', text: ctx }], tools: TOOLS, messages }) });
  if (!r.ok) throw new Error('anthropic ' + r.status + ' ' + (await r.text()).slice(0, 200));
  return r.json();
}

async function asistan(body, ip){
  const msgs = (Array.isArray(body.messages) ? body.messages : []).slice(-20)
    .filter(m => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map(m => ({ role: m.role, content: clean(m.content, 2000) }));
  while (msgs.length && msgs[0].role !== 'user') msgs.shift();
  const dil = ['tr', 'en', 'ar', 'ru'].includes(body.dil) ? body.dil : 'tr';
  const sayfa = clean(body.sayfa, 160);
  if (!msgs.length) return { reply: dil === 'en' ? 'Hello, how can I help you?' : 'Merhaba, size nasıl yardımcı olabilirim?' };
  const now = new Date().toLocaleString('sv-SE', { timeZone: 'Europe/Istanbul' });
  const ctx = `CONTEXT: page language ${dil}; page ${sayfa || 'unknown'}; Istanbul time ${now}.`;
  let saved = false;
  for (let i = 0; i < 3; i++){
    const out = await claude(msgs, ctx);
    const text = out.content.filter(c => c.type === 'text').map(c => c.text).join('\n').trim();
    const tools = out.content.filter(c => c.type === 'tool_use');
    if (out.stop_reason !== 'tool_use' || !tools.length) return { reply: text || '…', saved };
    msgs.push({ role: 'assistant', content: out.content });
    msgs.push({ role: 'user', content: tools.map(t => {
      if (t.name !== 'talep_kaydet') return { type: 'tool_result', tool_use_id: t.id, content: 'Unknown tool', is_error: true };
      const d = t.input || {};
      if (d.aydinlatma !== true) return { type: 'tool_result', tool_use_id: t.id, content: 'Not saved: explicit consent after the privacy notice is required first.', is_error: true };
      if (!clean(d.telefon) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean(d.eposta))) return { type: 'tool_result', tool_use_id: t.id, content: 'Not saved: a phone number or a valid email is required.', is_error: true };
      if (saved) return { type: 'tool_result', tool_use_id: t.id, content: 'Already saved.' };
      saveLead(Object.assign({}, d, { kaynak: 'asistan-ai', sayfa, pazarlama: d.pazarlama === true }), ip); saved = true;
      count('danisman_talep', sayfa || '-', '');
      return { type: 'tool_result', tool_use_id: t.id, content: 'Saved. The team will contact the visitor.' };
    }) });
  }
  return { reply: dil === 'tr' ? 'Talebiniz alındı, ekibimiz sizinle iletişime geçecek.' : 'Thank you, your request has been received; our team will contact you.', saved };
}

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const ETIKET = { tercih: 'İletişim tercihi', dil: 'Dil', butce: 'Bütçe', para: 'Para birimi', bolge: 'Bölge', amac: 'Amaç', zamanlama: 'Zamanlama', proje: 'Proje', sayfa: 'Sayfa', ref: 'Geliş', utm: 'UTM' };
const BUTCE = { TRY: { b1: '< 5 mn', b2: '5–10 mn', b3: '10–20 mn', b4: '20–40 mn', b5: '40 mn +' }, X: { b1: '< 150 bin', b2: '150–300 bin', b3: '300–500 bin', b4: '500 bin – 1 mn', b5: '1 mn +' } };
function ozetAlici(r){ const o = Object.keys(ETIKET).filter(k => r[k]).map(k => ETIKET[k] + ': ' + (k === 'butce' ? ((BUTCE[r.para === 'TRY' ? 'TRY' : 'X'][r.butce] || r.butce) + ' ' + (r.para || '')) : r[k]));
  if (r.pazarlama !== undefined) o.push('Pazarlama izni: ' + (r.pazarlama ? 'VAR' : 'yok')); return o.join('\n'); }
function leadsPage(){
  const sub = NTFY ? `<div class="sub"><b>TELEFONA ANLIK BİLDİRİM</b><p>Yeni talep geldiğinde telefonunuza bildirim düşsün: telefonunuza <a href="https://ntfy.sh/app" target="_blank">ntfy</a> uygulamasını kurun (App Store / Google Play, ücretsiz), <b>+</b> ile abone olun ve şu konu adını yazın:</p><code>${NTFY}</code><p>Ya da telefonda bu bağlantıyı açın: <a href="${NTFY_URL}" target="_blank">${NTFY_URL}</a> · <a href="/api/bildirim-test">Test bildirimi gönder</a></p><small>Bu konu adını kimseyle paylaşmayın. Bildirimde telefon numarası yer almaz; ayrıntılar bu sayfadadır.</small></div>` : '';
  const rows = fs.existsSync(LEADS) ? fs.readFileSync(LEADS, 'utf8').trim().split('\n').filter(Boolean).map(l => JSON.parse(l)).reverse() : [];
  return `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>NEXERA Talepler</title>
<style>body{font:14px system-ui;background:#05080f;color:#e8edf6;margin:0;padding:24px}h1{font-weight:500;letter-spacing:.2em;font-size:16px;color:#f6dca6}table{border-collapse:collapse;width:100%}td,th{border-bottom:1px solid #1d2a44;padding:8px;text-align:left;vertical-align:top}th{color:#8c9bb8;font-weight:400;font-size:12px;letter-spacing:.1em}a{color:#f6dca6}td:nth-child(7){white-space:pre-wrap;max-width:420px}.sub{border:1px solid #2a3a5c;padding:14px 18px;margin:0 0 22px;max-width:760px;line-height:1.6}.sub b{color:#f6dca6;font-weight:500}.sub code{display:inline-block;background:#0d1730;padding:6px 10px;margin:4px 0;font-size:15px;user-select:all}.sub small{color:#8c9bb8}</style>
<h1>NEXERA · TALEPLER (${rows.length})</h1>${sub}<div style="overflow-x:auto"><table><tr><th>ZAMAN</th><th>AD</th><th>TELEFON</th><th>E-POSTA</th><th>ADRES / ADA-PARSEL</th><th>KONU</th><th>NOT</th><th>KAYNAK</th></tr>
${rows.map(r => `<tr><td>${esc(new Date(r.zaman).toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' }))}</td><td>${esc(r.ad)}</td><td><a href="tel:${esc(r.telefon)}">${esc(r.telefon)}</a></td><td>${esc(r.eposta)}</td><td>${esc(r.adres)}</td><td>${esc(r.konu)}</td><td>${esc([r.not, ozetAlici(r)].filter(Boolean).join('\n'))}</td><td>${esc(r.kaynak)}</td></tr>`).join('')}</table></div>`;
}

// AR models are kept in the repo; served here with the MIME types iOS Quick Look / Android Scene Viewer require
async function serveAR(res, name, ver){
  const type = AR_FILES[name]; if (!type) return send(res, 404, { error: 'yok' });
  const v = /^[0-9a-f]{7,40}$/.test(ver || '') ? ver : 'main';
  const file = `${AR_DIR}/${v}-${name}`;
  if (!fs.existsSync(file)){
    fs.mkdirSync(AR_DIR, { recursive: true });
    const r = await fetch(AR_SRC + v + '/ar/' + name); if (!r.ok) return send(res, 502, { error: 'model alınamadı' });
    fs.writeFileSync(file + '.tmp', Buffer.from(await r.arrayBuffer())); fs.renameSync(file + '.tmp', file);
  }
  const st = fs.statSync(file);
  res.writeHead(200, { 'Content-Type': type, 'Content-Length': st.size, 'Cache-Control': v === 'main' ? 'public, max-age=300' : 'public, max-age=31536000, immutable', 'Access-Control-Allow-Origin': '*' });
  fs.createReadStream(file).pipe(res);
}

http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x'); const ip = ipOf(req);
  try {
    if (req.method === 'GET' && url.pathname === '/api/durum') return send(res, 200, { ai: !!KEY });
    if ((req.method === 'GET' || req.method === 'HEAD') && url.pathname.startsWith('/api/ar/')) return serveAR(res, url.pathname.slice(8), url.searchParams.get('v'));
    if (req.method === 'POST' && url.pathname === '/api/asistan'){
      if (!KEY) return send(res, 503, { error: 'ai kapalı' });
      if (limited('a' + ip, 40, 10 * 60e3)) return send(res, 429, { error: 'çok fazla istek' });
      return send(res, 200, await asistan(await readBody(req), ip));
    }
    if (req.method === 'POST' && url.pathname === '/api/hata'){
      if (limited('h' + ip, 80, 10 * 60e3)) return send(res, 204, '', 'text/plain');
      const b = await readBody(req).catch(() => ({}));
      const rec = { z: new Date().toISOString(), ip: ip.replace(/\.\d+$/, '.x'), k: clean(b.k, 30), m: clean(b.m, 300), ua: clean(b.ua, 160), w: +b.w || 0, h: +b.h || 0, dpr: +b.dpr || 0, mem: +b.mem || 0 };
      fs.appendFileSync(DIAG, JSON.stringify(rec) + '\n');
      try { if (fs.statSync(DIAG).size > 2e6) fs.writeFileSync(DIAG, fs.readFileSync(DIAG, 'utf8').split('\n').slice(-3000).join('\n')); } catch {}
      return send(res, 204, '', 'text/plain');
    }
    if (req.method === 'GET' && url.pathname === '/api/hatalar'){
      const ck = /(?:^|;\s*)nxk=([0-9a-f]+)/.exec(req.headers.cookie || ''); const k = url.searchParams.get('key') || (ck && ck[1]);
      if (!ADMIN || k !== ADMIN) return send(res, 403, 'yetkisiz', 'text/plain');
      const rows = fs.existsSync(DIAG) ? fs.readFileSync(DIAG, 'utf8').trim().split('\n').filter(Boolean).slice(-300) : [];
      return send(res, 200, rows.map(r => { try { return JSON.parse(r); } catch { return r; } }));
    }
    if (req.method === 'POST' && url.pathname === '/api/olay'){
      if (limited('o' + ip, 300, 10 * 60e3)) return send(res, 204, '', 'text/plain');
      const b = await readBody(req).catch(() => ({}));
      const e = clean(b.e, 30); if (EV_OK.includes(e) && e !== 'form_basarili') count(e, clean(b.p, 120).replace(/[?#].*$/, ''), clean(b.r, 12));
      return send(res, 204, '', 'text/plain');
    }
    if (req.method === 'GET' && url.pathname === '/api/olaylar'){
      const ck = /(?:^|;\s*)nxk=([0-9a-f]+)/.exec(req.headers.cookie || ''); const k = url.searchParams.get('key') || (ck && ck[1]);
      if (!ADMIN || k !== ADMIN) return send(res, 403, 'yetkisiz', 'text/plain');
      const rows = Object.entries(evs).map(([key, n]) => { const [gun, olay, sayfa, kaynak] = key.split('|'); return { gun, olay, sayfa, kaynak, n }; }).sort((a, b) => b.gun.localeCompare(a.gun) || b.n - a.n);
      return send(res, 200, rows);
    }
    if (req.method === 'POST' && url.pathname === '/api/talep'){
      if (limited('t' + ip, 6, 60 * 60e3)) return send(res, 429, { error: 'çok fazla istek' });
      const b = await readBody(req);
      if (b.web) return send(res, 200, { ok: true });            // bot tuzağı alanı doluysa kaydetme
      if (!clean(b.ad) || !/\d{7,}/.test(String(b.telefon || '').replace(/\D/g, '')) && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(b.eposta || '').trim())) return send(res, 400, { error: 'ad ve telefon/e-posta gerekli' });
      if (b.kaynak === 'alici-formu' && b.aydinlatma !== true) return send(res, 400, { error: 'aydınlatma metni onayı gerekli' });
      const rec = saveLead(b, ip); count('form_basarili', rec.sayfa || rec.kaynak || '-', rec.ref || ''); return send(res, 200, { ok: true });
    }
    if (req.method === 'GET' && (url.pathname === '/api/talepler' || url.pathname === '/api/bildirim-test')){
      const ck = /(?:^|;\s*)nxk=([0-9a-f]+)/.exec(req.headers.cookie || ''); const k = url.searchParams.get('key') || (ck && ck[1]);
      if (!ADMIN || k !== ADMIN) return send(res, 403, 'yetkisiz', 'text/plain');
      if (url.pathname === '/api/bildirim-test'){
        try { await notify({ ad: 'Test Bildirimi', adres: '', not: 'NEXERA bildirimleri çalışıyor.', kaynak: 'test' }); return send(res, 200, 'Test bildirimi gönderildi. Telefonunuza düşmediyse ntfy uygulamasındaki konu adını kontrol edin. <a href="/api/talepler">Geri</a>', 'text/html'); }
        catch (e) { return send(res, 502, 'Bildirim gönderilemedi: ' + esc(e.message), 'text/html'); }
      }
      res.setHeader('Set-Cookie', `nxk=${ADMIN}; Path=/api; Max-Age=31536000; HttpOnly; Secure; SameSite=Lax`);
      return send(res, 200, leadsPage(), 'text/html');
    }
    send(res, 404, { error: 'bulunamadı' });
  } catch (e) { console.error(e.message); if (!res.headersSent) send(res, 500, { error: 'sunucu hatası' }); else res.end(); }
}).listen(PORT, () => console.log('nexera api :' + PORT + (KEY ? ' (ai açık)' : ' (ai kapalı)')));
