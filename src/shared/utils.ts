import { Router } from '..';
import { AccountDetails } from './../core/models/AccountDetails';
import { AverageColor } from './../core/models/AverageColor';
import { decrypt, encrypt } from './crypto';
import { FastAverageColor } from 'fast-average-color';
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
export const user = (user?: AccountDetails, guest?: boolean, redirectTo?: string): AccountDetails => {
     if (user) {
          sessionStorage.setItem('me', encrypt(user));
          sessionStorage.setItem('ROLE', encrypt(guest ? 'GUEST' : 'USER'))
     }
     redirectTo !== undefined && redirectTo !== null && Router.navigate(redirectTo)
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

export function formatDate(date: Date): string {
     if (!date) {
          return '';
     }
     return new Intl.DateTimeFormat(localStorage.getItem('lang')!).format(date)
}

export function convertMinuteToHour(minutes: number): { hour: number, minute: number } {
     const hourMinute = { hour: 0, minute: 0 }
     hourMinute.hour = Math.floor(minutes / 60);
     hourMinute.minute = minutes % 60;
     return hourMinute;
}

export function getAverageColor(url: string, fn: (color: AverageColor) => void): void {
     var xhr = new XMLHttpRequest();
     xhr.onload = function () {
          var reader = new FileReader();
          reader.onloadend = function () {
               const fac = new FastAverageColor();
               fac.getColorAsync(reader.result as string).then(fn)
          }
          reader.readAsDataURL(xhr.response);
     };
     xhr.open('GET', 'https://cors-anywhere.herokuapp.com/' + url);
     xhr.responseType = 'blob';
     xhr.send();
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