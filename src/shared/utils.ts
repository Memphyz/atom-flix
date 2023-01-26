import { AccountDetails } from './../core/models/AccountDetails';
import { decrypt, encrypt } from './crypto';
import { FormGroup } from 'react-reactive-form';

export function isLogged(): boolean {
     return !!sessionStorage.getItem('session_id')
}

export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}/


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

export function markAllFieldsAsTouchedAndDirty(form: FormGroup): void {
     const each = (form: FormGroup) => {
          Object.entries(form.controls || {}).forEach(([key, _value]) => {
               form.get(key).markAsDirty();
               form.get(key).markAsTouched();
               if ((form.get(key) as FormGroup).controls) {
                    each(form.get(key) as FormGroup);
               }
          })
     }
     each(form);
     console.log(form)
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