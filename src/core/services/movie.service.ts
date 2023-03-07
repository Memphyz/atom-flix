import { Observable } from "rxjs";
import { AbstractService } from "../abstracts/service.abstract";
import { Keywords } from "../models/Keywords";
import { IMovie } from "../models/Movie/Movie";
import { MovieCredits } from "../models/Movie/MovieCredits";
import { MovieDetail } from "../models/Movie/MovieDetails";
import { MovieExtarnalIDs } from "../models/Movie/MovieExternalIds";
import { MovieList } from "../models/Movie/MovieList";
import { MovieVideo } from "../models/Movie/MovieVideos";
import { SimilarMovies } from "../models/Movie/SimilarMovies";
import { Images } from "../models/ObjectImages";
import { IResponse } from "../models/Response";
import { MovieRecomendations } from "../models/Movie/MovieRecomendations";
import { MovieWatchProviders } from "../models/Movie/MovieWatchProviders";

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

  public getById(id: string | number): Observable<MovieDetail> {
    return super
      .getById(id)
      .pipe(
        this.assign<MovieDetail, Images>(
          "id",
          "images",
          this.getImages.bind(this)
        ),
        this.assign<MovieDetail, MovieVideo>(
          "id",
          "videos",
          this.getVideos.bind(this)
        ),
        this.assign<MovieDetail, MovieList>(
          "id",
          "lists",
          this.getLists.bind(this)
        ),
        this.assign<MovieDetail, MovieExtarnalIDs>(
          "id",
          "external_ids",
          this.getExternalIDs.bind(this)
        ),
        this.assign<MovieDetail, MovieCredits>(
          "id",
          "credits",
          this.getCredits.bind(this)
        ),
        this.assign<MovieDetail, Keywords>(
          "id",
          "keywords",
          this.getKeywords.bind(this)
        ),
        this.assign<MovieDetail, MovieRecomendations>(
          "id",
          "recomendations",
          this.getRecomendations.bind(this)
        ),
        this.assign<MovieDetail, MovieWatchProviders>(
          "id",
          "watch_providers",
          this.getWatchProviders.bind(this)
        ),
        this.assign<MovieDetail, SimilarMovies>(
          "id",
          "similar_movies",
          this.getSimilarMovies.bind(this)
        )
      );
  }

  public getSimilarMovies(
    id: string | number,
    params?: { page: number }
  ): Observable<SimilarMovies> {
    return this.get(this.prefixUrl() + `/${id}/similar`, params);
  }

  public getLists(
    id: string | number,
    params?: { page: number }
  ): Observable<MovieList> {
    return this.get(this.prefixUrl() + `/${id}/lists`, params);
  }

  public getRecomendations(
    id: string | number,
    params?: { page: number }
  ): Observable<MovieRecomendations> {
    return this.get(this.prefixUrl() + `/${id}/recommendations`, params);
  }

  public getImages(id: string | number): Observable<Images> {
    return this.get(this.prefixUrl() + `/${id}/images`);
  }

  public getCredits(id: string | number): Observable<MovieCredits> {
    return this.get(this.prefixUrl() + `/${id}/credits`);
  }

  public getKeywords(id: string | number): Observable<Keywords> {
    return this.get(this.prefixUrl() + `/${id}/keywords`);
  }

  public getWatchProviders(
    id: string | number
  ): Observable<MovieWatchProviders> {
    return this.get(this.prefixUrl() + `/${id}/watch/providers`);
  }

  public getExternalIDs(id: string | number): Observable<MovieExtarnalIDs> {
    return this.get(this.prefixUrl() + `/${id}/external_ids`);
  }

  public getVideos(id: string | number): Observable<MovieVideo> {
    return this.get(this.prefixUrl() + `/${id}/videos`);
  }
}
