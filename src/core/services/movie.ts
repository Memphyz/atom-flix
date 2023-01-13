import { AbstractService } from '../abstracts/service';
import { IMovie } from '../models/Movie';

interface IParams {
     page: number;
     lang?: 'pt-BR' | 'en-US';
}

export class MovieService extends AbstractService<IMovie> {

     public getAllPlaying(params = { page: 1 }) {
          return super.getAll('/movie/now_playing', params)
     }

     public getAllTopRating(params = { page: 1 }) {
          return super.getAll('/movie/top_rated', params)
     }
}