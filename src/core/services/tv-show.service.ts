import { TvShow } from "./../models/TvShow";
import { BASE_URL } from "./../../index";
import { Observable, tap } from "rxjs";
import { AbstractService } from "../abstracts/service.abstract";
import { IResponse } from "../models/Response";
import { Video } from "../models/Video";

export class TvShowService extends AbstractService<TvShow> {
  protected prefixUrl(): string {
    return "tv";
  }

  public getAllPopular(params?: {
    page: number;
  }): Observable<IResponse<TvShow>> {
    return super.getAll(BASE_URL + "tv/popular", params);
  }

  public getVideos(id: number): Observable<Video> {
    return this.get(BASE_URL + `tv/${id}/videos`);
  }
  public getImages(id: number): Observable<Video> {
    return this.get(BASE_URL + `tv/${id}/images`);
  }
}
