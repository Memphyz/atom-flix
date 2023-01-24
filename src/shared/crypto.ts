import { CRYPT_KEY } from './..';
import * as CryptoJS from 'crypto-js';

export const encrypt = (data: any): string => {
     return CryptoJS.AES.encrypt(JSON.stringify(data), CRYPT_KEY).toString();
}

export const decrypt = (crypt: string) => {
     if (!crypt) {
          return crypt;
     }
     const bytes = CryptoJS.AES.decrypt(crypt, CRYPT_KEY);
     return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
}