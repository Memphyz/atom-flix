import { ReactElement } from "react";
import { PTBR } from "../../shared/lang/pt-br";
export interface ICardProps<T extends { id: unknown }> {
  items: T[];
  width?: number;
  height?: number;
  backgroundImage?: string;
  onMouseOver?: (id: number) => void;
  backgroundImageSuffix?: keyof T;
  title: keyof T;
  children?: ReactElement;
  widthDetailsMultiplier?: number;
  onclick?: () => void;
  totalItems?: number;
  lang: typeof PTBR;
  onClickMore?: () => void;
}
