import { Observable } from "rxjs";
import { AbstractService } from "../abstracts/service.abstract";
import { IMovie } from "../models/Movie";
import { IResponse } from "../models/Response";

export class MovieService extends AbstractService<IMovie> {
  protected prefixUrl(): string {
    return "movie";
  }

  public getNowPlaying(params: {
    page: number;
    region?: string;
  }): Observable<IResponse<IMovie>> {
    return this.get("/movie/now_playing", params);
  }

  public getLastest(): Observable<IResponse<IMovie>> {
    return this.get("/movie/latest");
  }

  public getTopRated(params: {
    page: number;
    region?: string;
  }): Observable<IResponse<IMovie>> {
    return this.get("/movie/top_rated", params);
  }
}
