import { Observable } from "rxjs";
import { ICardProps } from "../Card/CardProps";
import { IResponse } from "../../core/models/Response";

export type ICardListProps<T extends { id: any, vote_average: number }> = {
  listContainerId: string;
  otherRequestParams?: Record<string, any>;
  getAll?: (
    ...args
  ) => Observable<IResponse<T>>;
} & ICardProps<T>;
