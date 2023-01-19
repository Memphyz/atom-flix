import { API_KEY, BASE_URL, getLang } from '../..';
import {
     httpErrorInterceptor,
     httpRequestInterceptor
} from '../interceptors/HttpInterceptors';
import { httpResponseInterceptor } from './../interceptors/HttpInterceptors';
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

     protected readonly http = axios.create(this.baseConfig);
     protected readonly httpNoParams = axios.create();

     constructor() {
          this.http.interceptors.request.use(httpRequestInterceptor, httpErrorInterceptor);
          this.http.interceptors.response.use(httpResponseInterceptor, httpErrorInterceptor)
          this.httpNoParams.interceptors.response.use(httpResponseInterceptor, httpErrorInterceptor)
          this.httpNoParams.interceptors.request.use(httpRequestInterceptor, httpErrorInterceptor);
     }

     public getAll(url: string, params = { page: 1 }): Observable<IResponse<Model>> {
          return from(this.http.get(url, { params: { ...params, language: getLang() } })).pipe(map((res) => res.data as IResponse<Model>))
     }

     public getWithBaseConfig<T>(url: string, params?: { [x: string]: any }): Observable<T> {
          return from(this.http.get(url, { params })).pipe(map(data => data.data))
     }

     public get<T>(url: string, params?: { [x: string]: any }): Observable<T> {
          return from(this.httpNoParams.get(url, { params, headers: {} })).pipe(map(data => data.data))
     }

     public post<T, B>(url: string, params?: { [x: string]: any }, body?: B): Observable<T> {
          return from(this.httpNoParams.post(url, body, { params, headers: {} })).pipe(map(data => data.data))
     }

     public delete<T, B>(url: string, params?: { [x: string]: any }, body?: B): Observable<T> {
          return from(this.httpNoParams.delete(url, { params, data: body })).pipe(map(data => data.data));
     }

}