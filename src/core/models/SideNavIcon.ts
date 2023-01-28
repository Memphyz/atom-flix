import { icons } from '../../assets/icons/icons';
import { Language } from './../../assets/langs/lang';
import { PT_LANG } from './../../assets/langs/pt-BR';

export class SideNavItem {
     public icon: keyof typeof icons;
     public text: keyof typeof PT_LANG;

     public getTranslated(): string {
          return Language.LANG[this.text] as string
     }

     constructor(text: keyof typeof PT_LANG, icon: keyof typeof icons) {
          this.text = text;
          this.icon = icon;
     }
}