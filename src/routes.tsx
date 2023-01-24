import './routes.scss';
import { routerEvents } from '.';
import { Header } from './components/Header/Header';
import SideNav from './components/SideNav/SideNav';
import { Login } from './pages/account/login/Login';
import Home from './pages/home/Home';
import Filme from './pages/movie/Movie';
import { Component, ReactNode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { filter, interval } from 'rxjs';

const HIDE_HEADERS = ['login', 'register', 'recovery']

export default class RoutesApp extends Component {

     public isLogin = this.hideHeaders;
     public currentPath = '';

     public componentDidMount(): void {
          interval().pipe(filter(() => this.currentPath !== window.location.pathname)).subscribe(() => {
               this.currentPath = window.location.pathname;
               this.setState(() => {
                    this.isLogin = this.hideHeaders;
                    console.log(this)
               });
               routerEvents.next(this.currentPath);
          })
     }

     public get hideHeaders(): boolean {
          return !!HIDE_HEADERS.some((url) => window.location.pathname.split('/').filter((path) => path).shift()?.includes(url)!);
     }

     public render(): ReactNode {
          return (
               <BrowserRouter>
                    <SideNav />
                    <main>
                         <Header />
                         <div className="page-content">
                              login: {this.isLogin}
                              <Routes>
                                   <Route path='/' element={<Home />} />
                                   <Route path='/movie/:id' element={<Filme />} />
                                   <Route path='/login' element={<Login />} />
                              </Routes>
                         </div>
                    </main>
               </BrowserRouter>
          )
     }
}