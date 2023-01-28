import './routes.scss';
import { Router, routerEvents } from '.';
import { Language } from './assets/langs/lang';
import Header from './components/Header/Header';
import SideNav from './components/SideNav/SideNav';
import { AuthRouteComponent } from './core/guards/AuthContext/AuthContext';
import Login from './pages/account/login/Login';
import Home from './pages/home/Home';
import Filme from './pages/movie/Movie';
import classNames from 'classnames';
import { Component, ReactNode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { toast } from 'react-toastify';
import { filter, interval } from 'rxjs';

const HIDE_HEADERS = ['login', 'register', 'recovery']

export default class RoutesApp extends Component {

     public isLogin = Boolean(this.hideHeaders);
     public currentPath = '';

     public componentDidMount(): void {
          interval().pipe(filter(() => this.currentPath !== window.location.pathname)).subscribe(() => {
               this.currentPath = window.location.pathname;
               this.setState(() => this.isLogin = Boolean(this.hideHeaders));
               setTimeout(() => {
                    if (this.isLogin && sessionStorage.getItem('me')) {
                         toast(Language.LANG.ALREADY_LOGGED);
                         Router.navigate('/');
                    }
               }, 300);
               routerEvents.next(this.currentPath);
          })
     }

     public get hideHeaders(): boolean {
          return !!HIDE_HEADERS.some((url) => window.location.pathname.split('/').filter((path) => path).shift()?.includes(url)!);
     }

     public render(): ReactNode {
          return (
               <BrowserRouter>
                    {!this.isLogin ? <SideNav /> : null}
                    <main>
                         <Header hide={this.isLogin} />

                         <div className={classNames({
                              'page-content': !this.isLogin
                         })}>
                              <Routes>
                                   <Route path='' element={
                                        <AuthRouteComponent role='GUEST'>
                                             <Home />
                                        </AuthRouteComponent>
                                   } />
                                   <Route path='/movie/:id' element={
                                        <AuthRouteComponent role='GUEST'>
                                             <Filme />
                                        </AuthRouteComponent>
                                   } />
                                   <Route path='/login' element={<Login />} />
                              </Routes>
                         </div>
                    </main>
               </BrowserRouter>
          )
     }
}