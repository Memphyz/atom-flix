import { TvShow } from "../models/TvShow/TvShow";
import { BASE_URL } from "./../../index";
import { Observable, tap } from "rxjs";
import { AbstractService } from "../abstracts/service.abstract";
import { IResponse } from "../models/Response";
import { Video } from "../models/Video";
import { WatchProviders } from "../models/WatchProviders";
import { ExternalIDs } from "../models/ExternalIds";
import { Keywords } from "../models/Keywords";
import { Credits } from "../models/Credits";
import { Recomendations } from "../models/Recomendations";
import { MovieList } from "../models/Movie/MovieList";
import { SimilarMovies } from "../models/Movie/SimilarMovies";
import { TvShowSimilar } from "../models/TvShow/TvShowSimilar";
import { TvShowDetails } from "../models/TvShow/TvShowDetails";
import { Images } from "../models/ObjectImages";
import { ModelVideo } from "../models/ModelVideo";

export class TvShowService extends AbstractService<TvShow> {
  protected prefixUrl(): string {
    return "tv";
  }

  public getAllPopular(params?: {
    page: number;
  }): Observable<IResponse<TvShow>> {
    return super.getAll(BASE_URL + "tv/popular", params);
  }

  public getById(id: string | number): Observable<TvShowDetails> {
    return super
      .getById(id)
      .pipe(
        this.assign<TvShowDetails, Images>(
          "id",
          "images",
          this.getImages.bind(this)
        ),
        this.assign<TvShowDetails, ModelVideo>(
          "id",
          "videos",
          this.getVideos.bind(this)
        ),
        this.assign<TvShowDetails, ExternalIDs>(
          "id",
          "external_ids",
          this.getExternalIDs.bind(this)
        ),
        this.assign<TvShowDetails, Credits>(
          "id",
          "credits",
          this.getCredits.bind(this)
        ),
        this.assign<TvShowDetails, Keywords>(
          "id",
          "keywords",
          this.getKeywords.bind(this)
        ),
        this.assign<TvShowDetails, Recomendations>(
          "id",
          "recomendations",
          this.getRecomendations.bind(this)
        ),
        this.assign<TvShowDetails, WatchProviders>(
          "id",
          "watch_providers",
          this.getWatchProviders.bind(this)
        ),
        this.assign<TvShowDetails, TvShowSimilar>(
          "id",
          "similar",
          this.getSimilarTvShow.bind(this)
        )
      );
  }

  public getSimilarTvShow(
    id: string | number,
    params?: { page: number }
  ): Observable<TvShowSimilar> {
    return this.get(this.prefixUrl() + `/${id}/similar`, params);
  }

  public getRecomendations(
    id: string | number,
    params?: { page: number }
  ): Observable<Recomendations> {
    return this.get(this.prefixUrl() + `/${id}/recommendations`, params);
  }

  public getCredits(id: string | number): Observable<Credits> {
    return this.get(this.prefixUrl() + `/${id}/credits`);
  }

  public getKeywords(id: string | number): Observable<Keywords> {
    return this.get(this.prefixUrl() + `/${id}/keywords`);
  }

  public getWatchProviders(id: string | number): Observable<WatchProviders> {
    return this.get(this.prefixUrl() + `/${id}/watch/providers`);
  }

  public getExternalIDs(id: string | number): Observable<ExternalIDs> {
    return this.get(this.prefixUrl() + `/${id}/external_ids`);
  }

  public getVideos(id: number): Observable<Video> {
    return this.get(BASE_URL + `tv/${id}/videos`);
  }
  public getImages(id: number): Observable<Images> {
    return this.get(BASE_URL + `tv/${id}/images`);
  }
}
