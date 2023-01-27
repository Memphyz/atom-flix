import { user } from '../../shared/utils';
import { AbstractService } from '../abstracts/service';
import { AccountSession } from '../models/AccountSession';
import { API_KEY, BASE_URL } from './../..';
import { decrypt, encrypt } from './../../shared/crypto';
import { AccountDetails } from './../models/AccountDetails';
import { AccountLoginBody } from './../models/AccountLoginBody';
import { AccountRequestToken } from './../models/AccountRequestToken';
import { mergeMap, Observable, of, tap } from 'rxjs';

export class AccountService extends AbstractService<any> {

     public getFavorites() {
          return this.get(BASE_URL + 'account/616a28bb6728a8008cada7f6/favorite/movies', this.baseConfig.params)
     }

     public getRequestToken(): Observable<AccountRequestToken> {
          return this.get<AccountRequestToken>(BASE_URL + 'authentication/token/new', { api_key: API_KEY })
     }

     public self() {
          const session_id: string = decrypt(sessionStorage.getItem('session_id')!);
          return this.get<AccountDetails>(BASE_URL + 'account', { api_key: API_KEY, session_id }).pipe(tap())
     }

     public login(body: AccountLoginBody): Observable<AccountDetails> {
          const loginObservable = (token: AccountRequestToken) =>
               this.post<AccountRequestToken, AccountLoginBody>(BASE_URL + 'authentication/token/validate_with_login', { api_key: API_KEY }, { ...body, request_token: token.request_token })

          const createSession = (token: string) => this.post<AccountSession, { request_token: string }>(BASE_URL + 'authentication/session/new', { api_key: API_KEY }, { request_token: token })

          return this.getRequestToken().pipe(
               mergeMap((token) => loginObservable(token)),
               tap((token) => sessionStorage.setItem('expires_at', encrypt(token.expires_at))),
               mergeMap((token) => createSession(token.request_token)),
               tap((session) => sessionStorage.setItem('session_id', encrypt(session.session_id))),
               mergeMap(() => this.self()),
               tap((account) => user(account))
          )
     }

     public guest() {
          return this.get(BASE_URL + 'authentication/guest_session/new', { api_key: API_KEY })
     }

     public logout(): Observable<{ success: boolean }> {
          if (!sessionStorage.getItem('session_id')) {
               return of({ success: false });
          }
          const session_id = decrypt(sessionStorage.getItem('session_id')!);
          sessionStorage.removeItem('session_id');
          sessionStorage.removeItem('expires_at');
          sessionStorage.removeItem('me');
          return this.delete<{ success: boolean }, { session_id: string }>(BASE_URL + 'authentication/session', { api_key: API_KEY }, { session_id });
     }
}