import { Subject } from 'rxjs';
import { ENUS } from './en-us';
import { PTBR } from './pt-br';

export const languageMap = {
  "pt-BR": { value: PTBR, name: 'Português' },
  "en-US": { value: ENUS, name: 'English' },
};

type Langs = typeof PTBR;
export type AvaliableLangs = keyof typeof languageMap;

export class Lang {
  public static currentLang: AvaliableLangs =
    navigator.language as keyof typeof languageMap;

  public static LANG: Langs = languageMap[Lang.currentLang].value;
  private static readonly listener = new Subject<Langs>();

  public static change(lang: AvaliableLangs): void {
    Lang.LANG = languageMap[lang].value;
    localStorage.setItem('lang', lang)
    this.listener.next(Lang.LANG);
  }

  public static langListener(): Pick<Subject<Langs>, 'subscribe'> {
    return this.listener;
  }
}
