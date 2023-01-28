import { AbstractService } from '../abstracts/service';
import { IMovie } from '../models/Movie';
import { MovieDetail } from '../models/MovieDetails';
import { API_KEY, BASE_URL } from './../..';
import { getLang } from './../..';
import { Observable } from 'rxjs';

export class MovieService extends AbstractService<IMovie> {

     public getAllPlaying(params = { page: 1 }) {
          return super.getAll('/movie/now_playing', params)
     }

     public getAllTopRating(params = { page: 1 }) {
          return super.getAll('/movie/top_rated', params)
     }

     public getDetail(id: number): Observable<MovieDetail> {
          return this.get(BASE_URL + 'movie/' + id, { api_key: API_KEY, language: getLang() })
     }
}