import { Observable } from "rxjs";
import { ICardProps } from "../Card/CardProps";
import { IResponse } from "../../core/models/Response";

export type ICardListProps<T extends { id: any }> = {
  listContainerId: string;
  getAll: (
    params: { page: number } & Record<string, any>
  ) => Observable<IResponse<T>>;
} & ICardProps<T>;
