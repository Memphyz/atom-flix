import { Observable } from "rxjs";
import { AbstractService } from "../abstracts/service.abstract";
import { Credits } from "../models/Credits";
import { ExternalIDs } from "../models/ExternalIds";
import { Keywords } from "../models/Keywords";
import { Images } from "../models/ObjectImages";
import { Recomendations } from "../models/Recomendations";
import { IResponse } from "../models/Response";
import { TvShow } from "../models/TvShow/TvShow";
import { TvShowDetails, TvShowSimilar } from "../models/TvShow/TvShowDetails";
import { Video } from "../models/Video";
import { WatchProviders } from "../models/WatchProviders";
import { BASE_URL } from "./../../index";

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
    return super.getById(id, {
      append_to_response:
        "videos,images,credits,aggregate_credits,account_states,changes,content_ratings,episode_groups,external_ids,keywords,recommendations,reviews,screened_theatrically,similar",
    }) as Observable<TvShowDetails>;
  }

  public getSimilar(
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
