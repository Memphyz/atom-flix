import './Header.scss';
import { Language } from '../../assets/langs/lang';
import { DropdownItem } from '../../core/models/DropdownItem';
import { AccountService } from '../../core/services/account';
import { isLogged, randomHex, upperFirstLetter, user } from '../../shared/utils';
import { Dropdown } from '../Dropdown/Dropdown';
import { Select } from 'antd';
import { Component, ReactNode } from 'react';
import { Link } from 'react-router-dom';

export class Header extends Component<{ hide?: boolean }> {

     private readonly accountService = new AccountService();

     private user = user();
     private dropdownItems: DropdownItem[] = [
          { text: Language.LANG.LOGOUT, icon: 'off', onClick: this.handleLogout.bind(this) }
     ]

     private handleLang(lang: 'pt-BR' | 'en-US', ...params): void {
          localStorage.setItem('lang', lang);
          Language.onChange.next(lang);
          this.setState(() => Language.LANG = Language.getCurrentLang(lang));
     }

     private handleLogout(): void {
          this.accountService.logout().subscribe()
     }

     private getUsernamePlaceholder(): string {
          return upperFirstLetter(this.user.username).replace(/[^A-Z]/g, '')
     }

     public render(): ReactNode {
          const select = (<Select
               onSelect={this.handleLang.bind(this) as any}
               id='language'
               style={{ maxWidth: 135 }}
               value={localStorage.getItem('lang') || window.navigator.language}
               options={[
                    {
                         label: Language.LANG.PORTUGUESE,
                         value: 'pt-BR'
                    },
                    {
                         label: Language.LANG.ENGLISH,
                         value: 'en-US'
                    }
               ]}
          ></Select>)
          return (
               <>
                    {this.props.hide ?
                         <div className="hide-header">
                              {select}
                         </div>
                         : <div className="top-content">
                              <div className="item">
                                   {select}
                              </div>

                              <div className="item user">
                                   {isLogged() ?
                                        // Logged content
                                        <Dropdown items={this.dropdownItems} topPx={20} leftPx={-148}>
                                             <div className="user-round">
                                                  {this.user && this.user.avatar.tmdb.avatar_path ?
                                                       <img src={this.user.avatar.tmdb.avatar_path} alt='user_avatar' />
                                                       :
                                                       <div className="avatar-placeholder" style={{
                                                            backgroundColor: randomHex()
                                                       }} avatar-name={this.getUsernamePlaceholder()}>
                                                       </div>
                                                  }
                                             </div>
                                        </Dropdown>
                                        // Login btn
                                        :
                                        <div className='login-out'>
                                             <Link to='/login' className='no-link'>
                                                  <button>{Language.LANG.SIGN_IN}</button>
                                             </Link>
                                             <Link to='/register' className='no-link'>
                                                  <button>{Language.LANG.SIGN_UP}</button>
                                             </Link>
                                        </div>
                                   }
                              </div>
                         </div>}
               </>
          )
     }
}