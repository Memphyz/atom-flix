import './Login.scss';
import { Language } from '../../../assets/langs/lang';
import { Input } from '../../../components/Input/Input';
import { Panda } from '../../../components/Panda/Panda';
import { AccountService } from '../../../core/services/account';
import {
     markAllFieldsAsTouchedAndDirty,
     PASSWORD_REGEX,
     user
} from '../../../shared/utils';
import { withRouter } from '../../../shared/withFns';
import { Component, ReactNode } from 'react';
import { FieldGroup, FormBuilder, Validators } from 'react-reactive-form';
import { NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify';

class Login extends Component<{ navigate?: NavigateFunction }> {

     private readonly accountService = new AccountService();
     private focusPassword: boolean;
     private focusUsername: boolean;
     private readonly form = FormBuilder.group({
          username: [null, [Validators.required, Validators.maxLength(20), Validators.minLength(2)]],
          password: [null, [Validators.required, Validators.minLength(8), Validators.pattern(PASSWORD_REGEX)]]
     })
     private show = true;

     private handleLogin(): void {
          if (this.form.invalid) {
               markAllFieldsAsTouchedAndDirty(this.form);
               toast.warning(Language.LANG.FILL_ALL_FIELDS);
               return undefined;
          }
          this.accountService.login(this.form.value).subscribe({
               next: () => {
                    this.props.navigate && this.props.navigate('/');
                    toast.success(Language.LANG.WELCOME_BACK + ` ${user().username}!`)
               },
               error(err) {
                    toast.error(Language.LANG.USERNAME_OR_PASSWORD_INVALID)
               },
          })
     }

     private handleGuest(): void {
          this.accountService.guest().subscribe()
     }

     public componentDidMount(): void {
          Language.onChange.subscribe(() => {
               this.setState(() => this.updateForm())
          })
     }

     private updateForm(): boolean {
          this.show = false;
          this.show = true;
          return this.show;
     }

     public render(): ReactNode {
          return (<div className="login-page">
               <Panda hide={this.focusPassword} eyeDown={this.focusUsername}>
                    {this.show && <FieldGroup
                         control={this.form}
                         strict={false}
                         render={() => (
                              <form className="login-content">
                                   <Input formControlName='username'
                                        type='text'
                                        placeholder={Language.LANG.USERNAME}
                                        required={true}
                                        onBlur={(): void => this.setState((): boolean => this.focusUsername = false)}
                                        onFocus={(): void => this.setState((): boolean => this.focusUsername = true)}
                                   />
                                   <Input
                                        formControlName='password'
                                        type='password'
                                        onBlur={(): void => this.setState((): boolean => this.focusPassword = false)}
                                        onFocus={(): void => this.setState((): boolean => this.focusPassword = true)} placeholder={Language.LANG.PASSWORD}
                                   />
                                   <div className="buttons">
                                        <button type='button' onClick={this.handleLogin.bind(this)}>{Language.LANG.SIGN_IN}</button>
                                        <button type="button">{Language.LANG.SIGN_UP}</button>
                                        <button type="button" onClick={this.handleGuest.bind(this)}>{Language.LANG.GUEST}</button>
                                   </div>
                              </form>
                         )} />}
               </Panda>
          </div>)
     }
}

export default withRouter(Login);