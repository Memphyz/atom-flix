import { AbstractService } from '../abstracts/service';
import { IMovie } from '../models/Movie';
import { MovieCredits } from '../models/MovieCredits';
import { MovieDetail } from '../models/MovieDetails';
import { API_KEY, BASE_URL, getLang } from './../..';
import { Keywords } from './../models/Keywords';
import { MovieVideos } from './../models/MovieVideos';
import { mergeMap, Observable, tap } from 'rxjs';

export class MovieService extends AbstractService<IMovie> {

     public getAllPlaying(params = { page: 1 }) {
          return super.getAll('/movie/now_playing', params)
     }

     public getAllTopRating(params = { page: 1 }) {
          return super.getAll('/movie/top_rated', params)
     }

     public getDetail(id: number): Observable<MovieDetail> {
          return this.get<MovieDetail>(BASE_URL + 'movie/' + id, { api_key: API_KEY, language: getLang() })
               .pipe(tap(movie => {
                    this.getCredits(movie.id).pipe(
                         tap(credits => movie.credits = credits),
                         mergeMap((movie) => this.getVideos(movie.id)),
                         tap(videos => movie.videos = videos),
                         mergeMap(() => this.getKeyword(movie.id)),
                         tap((keyword) => movie.keywords = keyword)
                    ).subscribe()
               }))
     }

     public getCredits(movieId: number): Observable<MovieCredits> {
          return this.get<MovieCredits>(BASE_URL + `/movie/${movieId}/credits`, { api_key: API_KEY, language: getLang() })
     }

     public getKeyword(movieId: number): Observable<Keywords> {
          return this.get<Keywords>(BASE_URL + `/movie/${movieId}/keywords`, { api_key: API_KEY, language: getLang() })
     }

     public getVideos(movieId: number): Observable<MovieVideos> {
          return this.get<MovieVideos>(BASE_URL + `/movie/${movieId}/videos`, { api_key: API_KEY, language: getLang() })
     }
}