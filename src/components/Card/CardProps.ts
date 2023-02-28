import { ReactElement } from "react";
export interface ICardProps<T extends { id: unknown }> {
  items: T[];
  width?: number;
  height?: number;
  backgroundImage?: string;

  backgroundImageSuffix?: keyof T;
  title: keyof T;
  children?: ReactElement;
  onclick?: () => void;
}
