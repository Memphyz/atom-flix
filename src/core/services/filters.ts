import { API_KEY, BASE_URL } from '../..';
import { AbstractService } from '../abstracts/service';
import { getLang } from './../..';
import { Genre } from './../models/MovieDetails';
import { map } from 'rxjs';

export class FilterService extends AbstractService<unknown> {


     public getAllMovieGenres() {
          return this.get(BASE_URL + '/genre/movie/list', { api_key: API_KEY, language: getLang() }).pipe(map(res => (res as { genres: Genre[] }).genres))
     }

}