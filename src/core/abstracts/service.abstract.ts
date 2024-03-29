import axios from "axios";
import { Observable, OperatorFunction, from, map, mergeMap } from "rxjs";
import { IResponse } from "../models/Response";
import { API_KEY, BASE_URL } from "./../../index";
import {
  httpRequestInterceptor,
  httpErrorInterceptor,
  httpResponseInterceptor,
} from "../interceptors/http.interceptors";
import { IMovie } from "../models/Movie/Movie";
import i18next from "i18next";

export abstract class AbstractService<Resource = unknown> {
  protected readonly http = this.updateHttp(i18next.language);

  protected abstract prefixUrl(): string;

  constructor () {
    this.http.interceptors.request.use(
      httpRequestInterceptor,
      httpErrorInterceptor
    );
    this.http.interceptors.response.use(
      httpResponseInterceptor,
      httpErrorInterceptor
    );
  }

  public getAll(
    url = this.prefixUrl(),
    params = { page: 1 }
  ): Observable<IResponse<Resource>> {
    return from(
      this.http.get(url, {
        params: { ...params, language: i18next.language },
      })
    ).pipe(map((res) => res.data as IResponse<Resource>));
  }

  public getWithBaseConfig<T>(
    url = this.prefixUrl(),
    params?: { [ x: string ]: any }
  ): Observable<T> {
    params = { ...params, language: i18next.language };
    return from(this.http.get(url, { params })).pipe(map((data) => data.data));
  }

  public get<T>(
    url = this.prefixUrl(),
    params?: { [ x: string ]: any }
  ): Observable<T> {
    params = { ...params, language: i18next.language };
    return from(this.http.get(url, { params, headers: {} })).pipe(
      map((data) => data.data)
    );
  }

  public post<T, B>(
    url = this.prefixUrl(),
    params?: { [ x: string ]: any },
    body?: B
  ): Observable<T> {
    params = { ...params, language: i18next.language };
    return from(this.http.post(url, body, { params, headers: {} })).pipe(
      map((data) => data.data)
    );
  }

  public delete<T, B>(
    url = this.prefixUrl(),
    params?: { [ x: string ]: any },
    body?: B
  ): Observable<T> {
    params = { ...params, language: i18next.language };
    return from(this.http.delete(url, { params, data: body })).pipe(
      map((data) => data.data)
    );
  }

  public getById(
    id: number | string,
    params?: Record<string, any>
  ): Observable<unknown> {
    return this.get<unknown>(
      this.prefixUrl() + "/" + id,
      params
    ) as unknown as Observable<unknown>;
  }

  public getUpcoming(params: { page?: number }): Observable<IResponse<IMovie>> {
    return this.get(this.prefixUrl() + '/upcoming', params);
  }

  protected assign<T extends Record<string, any>, R>(
    idField: keyof T,
    fillField: keyof T,
    request: (data: any) => Observable<R>
  ) {
    return mergeMap((response: T) =>
      request(response[ idField ]).pipe(
        map((requestRespose) =>
          Object.assign(response, { [ fillField ]: requestRespose })
        )
      )
    ) as OperatorFunction<any, any>;
  }

  private updateHttp(lang) {
    return axios.create({
      baseURL: BASE_URL,
      params: {
        api_key: API_KEY,
      },
    });
  }
}
