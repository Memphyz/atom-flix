import { loaderService } from '../..';


export const httpRequestInterceptor = (config) => {
     loaderService.show();
     return config;
}

export const httpResponseInterceptor = (config) => {
     loaderService.hide()
     return config;
}


export const httpErrorInterceptor = (error) => Promise.reject(error)