import { loaderService } from "../..";

export const httpRequestInterceptor = (config) => {
  loaderService.next(true);
  document.querySelector("html")!.style.overflow = "hidden";
  return config;
};

export const httpResponseInterceptor = (config) => {
  loaderService.next(false);
  document.querySelector("html")!.style.overflow = "auto";

  return config;
};

export const httpErrorInterceptor = (error) => {
  loaderService.next(false);
  document.querySelector("html")!.style.overflow = "auto";

  return Promise.reject(error);
};
