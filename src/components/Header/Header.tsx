import './Header.scss';
import { Router } from '../..';
import { LangSupportType, Language } from '../../assets/langs/lang';
import { AccountService } from '../../core/services/account';
import { randomHex, upperFirstLetter, user } from '../../shared/utils';
import { withRouter } from '../../shared/withFns';
import { Select } from 'antd';
import { Component, ReactNode } from 'react';
import { Link, NavigateFunction } from 'react-router-dom';

class Header extends Component<{ hide?: boolean, navigate: NavigateFunction }> {

     private readonly accountService = new AccountService();

     private user = user();

     private handleLang(lang: LangSupportType, ...params): void {
          localStorage.setItem('lang', lang);
          Language.onChange.next(lang);
          this.setState(() => Language.LANG = Language.getCurrentLang(lang));
     }

     private handleLogout(): void {
          this.accountService.logout().subscribe(() => Router.navigate('/login'))
     }

     private getUsernamePlaceholder(): string {
          !this.user && (this.user = user());
          return upperFirstLetter(this.user?.username).replace(/[^A-Z]/g, '')
     }

     public componentDidMount(): void {
          Router.fn = this.props.navigate;
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
                              <div className="left-content">
                                   <Link className="logo-wrapper no-link" to='/'>
                                        <div className="logo"></div>
                                        <div className="name">Atom Flix</div>
                                   </Link>
                              </div>
                              <div className="right-content">
                                   <div className="item">
                                        {select}
                                   </div>

                                   <div className="item user">
                                        <div className="user-round" out-label={Language.LANG.LOGOUT} onClick={this.handleLogout.bind(this)}>
                                             {this.user && this.user.avatar.tmdb.avatar_path ?
                                                  <img src={this.user.avatar.tmdb.avatar_path} alt='user_avatar' />
                                                  :
                                                  <div className="avatar-placeholder" style={{
                                                       backgroundColor: randomHex()
                                                  }} avatar-name={this.getUsernamePlaceholder()}>
                                                  </div>
                                             }
                                        </div>
                                   </div>
                              </div>
                         </div>
                    }
               </>
          )
     }
}

export default withRouter(Header);