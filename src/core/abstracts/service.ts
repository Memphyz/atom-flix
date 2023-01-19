import { API_KEY, BASE_URL, getLang } from '../..';
import { IResponse } from './../models/Response';
import axios from 'axios';
import { from, map, Observable } from 'rxjs';

export abstract class AbstractService<Model> {

     protected readonly baseConfig = {
          baseURL: BASE_URL,
          params: {
               api_key: API_KEY,
               language: getLang()
          }
     }
     protected readonly http = axios.create(this.baseConfig)
     protected readonly httpNoParams = axios.create()

     public getAll(url: string, params = { page: 1 }): Observable<IResponse<Model>> {
          return from(this.http.get(url, { params: { ...params, language: getLang() } })).pipe(map((res) => res.data as IResponse<Model>))
     }

     public getWithBaseConfig<T>(url: string, params?: { [x: string]: any }): Observable<T> {
          return from(this.http.get(url, { params })).pipe(map(data => data.data))
     }

     public get<T, B>(url: string, params?: { [x: string]: any }, body?: B): Observable<T> {
          return from(this.httpNoParams.get(url, { params, data: body })).pipe(map(data => data.data))
     }
}