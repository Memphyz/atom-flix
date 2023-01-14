import { icons } from '../../assets/icons/icons';

export class DropdownItem {
     public text: string;
     public icon?: keyof typeof icons | ((...params) => keyof typeof icons);
     public onClick?: (...params: any) => void;

     constructor(text: string, icon?: keyof typeof icons | ((...params) => keyof typeof icons), onClick?: (...params: any) => void) {
          this.text = text;
          this.icon = icon;
          this.onClick = onClick;
     }
}