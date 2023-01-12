import { API_KEY, BASE_URL, getLang } from '../..';
import { IResponse } from './../models/Response';
import axios from 'axios';
import { from, map, Observable } from 'rxjs';

export abstract class AbstractService<Model> {

     private readonly baseConfig = {
          baseURL: BASE_URL,
          params: {
               api_key: API_KEY,
               language: getLang()
          }
     }
     protected readonly http = axios.create(this.baseConfig)

     public getAll(url: string, params = { page: 1, size: 20 }): Observable<IResponse<Model>> {
          return from(this.http.get(url, { params })).pipe(map((res) => res.data as IResponse<Model>))
     }
}