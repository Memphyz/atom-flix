import { AbstractService } from '../abstracts/service';
import { API_KEY, BASE_URL } from './../..';
import { AccountLoginBody } from './../models/AccountLoginBody';
import { AccountRequestToken } from './../models/AccountRequestToken';
import { Observable } from 'rxjs';

export class AccountService extends AbstractService<any> {

     public getFavorites() {
          return this.get(BASE_URL + 'account/616a28bb6728a8008cada7f6/favorite/movies', this.baseConfig.params)
     }

     public getRequestToken(): Observable<AccountRequestToken> {
          return this.get<AccountRequestToken, unknown>(BASE_URL + 'authentication/token/new', { api_key: API_KEY })
     }

     public login(body: AccountLoginBody): Observable<AccountRequestToken> {
          return this.get<AccountRequestToken, AccountLoginBody>(BASE_URL + 'authentication/token/validate_with_login', { api_key: API_KEY }, body)
     }
}