import { AbstractService } from '../abstracts/service';
import { IMovie } from '../models/Movie';

export class MovieService extends AbstractService<IMovie> {

     public getAllPlaying(params = { page: 1 }) {
          return super.getAll('/movie/now_playing', params)
     }

     public getAllTopRating(params = { page: 1 }) {
          return super.getAll('/movie/top_rated', params)
     }
}