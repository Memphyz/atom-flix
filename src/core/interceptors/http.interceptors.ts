import { loaderService } from "../..";

export const httpRequestInterceptor = (config) => {
  loaderService.next(true);
  return config;
};

export const httpResponseInterceptor = (config) => {
  loaderService.next(false);
  return config;
};

export const httpErrorInterceptor = (error) => {
  loaderService.next(false);
  return Promise.reject(error);
};
