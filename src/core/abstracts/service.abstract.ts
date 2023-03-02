import axios from "axios";
import { Observable, from, map } from "rxjs";
import { IResponse } from "../models/Response";
import { API_KEY, BASE_URL } from "./../../index";
import { Lang } from "./../../shared/lang/index";
import {
  httpRequestInterceptor,
  httpErrorInterceptor,
  httpResponseInterceptor,
} from "../interceptors/http.interceptors";

export abstract class AbstractService<Resource = unknown> {
  protected readonly http = this.updateHttp(localStorage.getItem("lang"));

  protected abstract prefixUrl(): string;

  constructor() {
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
        params: { ...params, language: localStorage.getItem("lang") },
      })
    ).pipe(map((res) => res.data as IResponse<Resource>));
  }

  public getWithBaseConfig<T>(
    url = this.prefixUrl(),
    params?: { [x: string]: any }
  ): Observable<T> {
    params = { ...params, language: localStorage.getItem("lang") };
    return from(this.http.get(url, { params })).pipe(map((data) => data.data));
  }

  public get<T>(
    url = this.prefixUrl(),
    params?: { [x: string]: any }
  ): Observable<T> {
    params = { ...params, language: localStorage.getItem("lang") };
    return from(this.http.get(url, { params, headers: {} })).pipe(
      map((data) => data.data)
    );
  }

  public post<T, B>(
    url = this.prefixUrl(),
    params?: { [x: string]: any },
    body?: B
  ): Observable<T> {
    params = { ...params, language: localStorage.getItem("lang") };
    return from(this.http.post(url, body, { params, headers: {} })).pipe(
      map((data) => data.data)
    );
  }

  public delete<T, B>(
    url = this.prefixUrl(),
    params?: { [x: string]: any },
    body?: B
  ): Observable<T> {
    params = { ...params, language: localStorage.getItem("lang") };
    return from(this.http.delete(url, { params, data: body })).pipe(
      map((data) => data.data)
    );
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
