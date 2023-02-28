import { TvShow } from "./../models/TvShow";
import { BASE_URL } from "./../../index";
import { Observable } from "rxjs";
import { AbstractService } from "../abstracts/service.abstract";
import { IResponse } from "../models/Response";

export class TvShowService extends AbstractService<TvShow> {
  protected prefixUrl(): string {
    return "tv";
  }

  public getAllPopular(params?: {
    page: number;
  }): Observable<IResponse<TvShow>> {
    return super.getAll(BASE_URL + "tv/popular", params);
  }
}
