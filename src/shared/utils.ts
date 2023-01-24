import { AccountDetails } from './../core/models/AccountDetails';
import { decrypt, encrypt } from './crypto';

export function isLogged(): boolean {
     return !!sessionStorage.getItem('session_id')
}


/**
 * if user parameter is informed, the cryptographed object will be setted on "user" in session storage, else it will just return decrypted object that match with AccountDetails
 *
 * @export
 * @param {AccountDetails} [user]
 * @return {*}  {AccountDetails}
 */
export function user(user?: AccountDetails): AccountDetails {
     if (user) {
          sessionStorage.setItem('me', encrypt(user));
     }
     return decrypt(sessionStorage.getItem('me')!);
}

/**
 * Return random hex color
 *
 * @export
 * @return {*}  {string}
 */
export function randomHex(): string {
     return '#' + ((1 << 24) * Math.random() | 0).toString(16)
}

export function upperFirstLetter(str: string): string {
     return str ? str[0].toUpperCase() + str.slice(1) : '';
}