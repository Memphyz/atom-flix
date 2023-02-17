import { ENUS } from "./en-us";
import { PTBR } from "./pt-br";
import { Subject } from "rxjs";

const languageMap = {
  "pt-BR": PTBR,
  "en-US": ENUS,
};

type Langs = typeof PTBR;
type AvaliableLangs = keyof typeof languageMap;

export class Lang {
  public static currentLang: AvaliableLangs =
    navigator.language as keyof typeof languageMap;
    
  public static LANG: Langs = languageMap[Lang.currentLang];
  public static readonly listener = new Subject<Langs>();

  public static change(lang: AvaliableLangs): void {
    this.LANG = languageMap[lang];
    this.listener.next(this.LANG);
  }

  public static langListener(): Pick<Subject<Langs>, 'subscribe'> {
    return this.listener
  }
}
