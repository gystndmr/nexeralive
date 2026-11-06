import { GIZLILIK_EN } from './icerik-ortak.mjs';
import { EN_HOME, EN_GUIDES } from './icerik-ana.mjs';
import { TAPU_EN, PROJE_EN } from './icerik-rehber-1.mjs';
import { YAB_EN, MAL_EN, KIRA_EN } from './icerik-rehber-2.mjs';
import { MUT_EN, AKILLI_EN } from './icerik-rehber-3.mjs';
import { ALIVE_EN } from './icerik-alive.mjs';
export const EN_GUIDE_LIST = [YAB_EN, MAL_EN, TAPU_EN, PROJE_EN, KIRA_EN, AKILLI_EN, MUT_EN];
export const EN = [EN_HOME(EN_GUIDE_LIST), EN_GUIDES(EN_GUIDE_LIST), ALIVE_EN, GIZLILIK_EN, ...EN_GUIDE_LIST];
