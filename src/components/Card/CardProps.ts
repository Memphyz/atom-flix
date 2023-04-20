import { ReactElement } from "react";
export interface ICardProps<T extends { id: unknown }> {
  items?: T[];
  width?: number;
  height?: number;
  backgroundImage?: string;
  onMouseOver?: (id: number) => void;
  backgroundImageSuffix?: keyof T;
  title: keyof T;
  type: ContentTypes;
  children?: ReactElement;
  widthDetailsMultiplier?: number;
  onclick?: () => void;
  totalItems?: number;
  onClickMore?: () => void;
}

export type ContentTypes = "tv" | "movie";
