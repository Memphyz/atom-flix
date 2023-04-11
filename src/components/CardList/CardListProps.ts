import { Observable } from "rxjs";
import { ICardProps } from "../Card/CardProps";
import { IResponse } from "../../core/models/Response";

export type ICardListProps<T extends { id: any }> = {
  listContainerId: string;
  otherRequestParams?: Record<string, any>

  getAll: (
    ...args
  ) => Observable<IResponse<T>>;
} & ICardProps<T>;
