import { AbstractService } from '../abstracts/service';
import { BASE_URL } from './../..';

export class AccountService extends AbstractService<any> {

     public getFavorites() {
          return this.get(BASE_URL + 'account/616a28bb6728a8008cada7f6/favorite/movies', this.baseConfig.params)
     }
}