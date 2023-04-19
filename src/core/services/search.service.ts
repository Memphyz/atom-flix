import { Observable } from "rxjs";
import { AbstractService } from "../abstracts/service.abstract";
import { ISearch, MultiSearch } from "../models/Search";
import { IResponse } from "../models/Response";

export class SearchService extends AbstractService<MultiSearch> {

  protected prefixUrl(): string {
    return 'search'
  }

  public search(params: { page: number, query: string }): Observable<IResponse<MultiSearch>> {
    return this.get<IResponse<MultiSearch>>(this.prefixUrl() + '/multi', params)
  }
}