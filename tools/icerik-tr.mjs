import { GIZLILIK_TR } from './icerik-ortak.mjs';
import { TR_REHBER } from './icerik-ana.mjs';
import { TAPU_TR, PROJE_TR } from './icerik-rehber-1.mjs';
import { YAB_TR, MAL_TR, KIRA_TR, VAT_TR, UZAK_TR, IKAMET_TR } from './icerik-rehber-2.mjs';
import { MUT_TR, AKILLI_TR } from './icerik-rehber-3.mjs';
import { ALIVE_TR } from './icerik-alive.mjs';
import { SUREC_TR } from './icerik-surec.mjs';
export const TR_GUIDES = [YAB_TR, MAL_TR, TAPU_TR, PROJE_TR, KIRA_TR, AKILLI_TR, MUT_TR];
export const TR_DRAFTS = [VAT_TR, UZAK_TR, IKAMET_TR, SUREC_TR];   // noindex, menü ve sitemap dışı
export const TR = [TR_REHBER(TR_GUIDES), ALIVE_TR, GIZLILIK_TR, ...TR_GUIDES, ...TR_DRAFTS];
