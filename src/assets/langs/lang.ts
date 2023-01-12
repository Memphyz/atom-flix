import { EN_LANGUAGE } from './en-US';
import { PT_LANG } from './pt-BR';

export const LANG_IDENTIFYER = {
     "pt-BR": PT_LANG,
     "en-US": EN_LANGUAGE
}

export let LANG: typeof PT_LANG = LANG_IDENTIFYER[window.navigator.language];

export function changeLanguage(lang: typeof PT_LANG): void {
     LANG = lang;
}
