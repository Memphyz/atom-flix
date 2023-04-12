import { Observable } from "rxjs";
import { AbstractService } from "../abstracts/service.abstract";
import { Credits } from "../models/Credits";
import { ExternalIDs } from "../models/ExternalIds";
import { Keywords } from "../models/Keywords";
import { ModelVideo } from "../models/ModelVideo";
import { IMovie } from "../models/Movie/Movie";
import {
  MovieDetail,
  MovieDetailsLists,
  MovieDetailsSimilar,
} from "../models/Movie/MovieDetails";
import { Images } from "../models/ObjectImages";
import { Recomendations } from "../models/Recomendations";
import { IResponse } from "../models/Response";
import { WatchProviders } from "../models/WatchProviders";

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

  public getLastest(): Observable<IMovie> {
    return this.get("/movie/latest");
  }

  public getTopRated(params: {
    page: number;
    region?: string;
  }): Observable<IResponse<IMovie>> {
    return this.get("/movie/top_rated", params);
  }

  public getById(id: string | number): Observable<MovieDetail> {
    return super.getById(id, {
      append_to_response:
        "videos,images,credits,account_states,changes,external_ids,lists,keywords,recommendations,release_dates,reviews,similar",
    }) as Observable<MovieDetail>;
  }

  public getSimilar(
    id: string | number,
    params?: { page: number }
  ): Observable<MovieDetailsSimilar> {
    return this.get(this.prefixUrl() + `/${ id }/similar`, params);
  }

  public getLists(
    id: string | number,
    params?: { page: number }
  ): Observable<MovieDetailsLists> {
    return this.get(this.prefixUrl() + `/${ id }/lists`, params);
  }

  public getRecomendations(
    id: string | number,
    params?: { page: number }
  ): Observable<Recomendations> {
    return this.get(this.prefixUrl() + `/${ id }/recommendations`, params);
  }

  public getImages(id: string | number): Observable<Images> {
    return this.get(this.prefixUrl() + `/${ id }/images`);
  }

  public getCredits(id: string | number): Observable<Credits> {
    return this.get(this.prefixUrl() + `/${ id }/credits`);
  }

  public getKeywords(id: string | number): Observable<Keywords> {
    return this.get(this.prefixUrl() + `/${ id }/keywords`);
  }

  public getWatchProviders(id: string | number): Observable<WatchProviders> {
    return this.get(this.prefixUrl() + `/${ id }/watch/providers`);
  }

  public getExternalIDs(id: string | number): Observable<ExternalIDs> {
    return this.get(this.prefixUrl() + `/${ id }/external_ids`);
  }

  public getVideos(id: string | number): Observable<ModelVideo> {
    return this.get(this.prefixUrl() + `/${ id }/videos`);
  }
}
