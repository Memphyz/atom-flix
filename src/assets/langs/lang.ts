import { EN_LANGUAGE } from './en-US';
import { PT_LANG } from './pt-BR';
import { Subject } from 'rxjs';

export const LANG_IDENTIFYER = {
     "pt-BR": PT_LANG,
     "en-US": EN_LANGUAGE
}


export function changeLanguage(lang: typeof PT_LANG): void {
     Language.LANG = lang;
}

export class Language {

     public static onChange = new Subject<'pt-BR' | 'en-US'>();

     public static getCurrentLang = (lang?: 'pt-BR' | 'en-US') => {
          if (lang) {
               localStorage.setItem('lang', lang);
               return LANG_IDENTIFYER[lang];
          }
          return LANG_IDENTIFYER[localStorage.getItem('lang') || window?.navigator.language]
     };


     public static LANG: typeof PT_LANG = Language.getCurrentLang();
}
