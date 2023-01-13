import './routes.scss';
import { Language } from './assets/langs/lang';
import Header from './components/Header/Header';
import Home from './pages/home/Home';
import Filme from './pages/movie/Movie';
import { Select } from 'antd';
import { Component, ReactNode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default class RoutesApp extends Component {

     public handleLang(lang: 'pt-BR' | 'en-US', ...params): void {
          localStorage.setItem('lang', lang);
          Language.onChange.next(lang);
          this.setState(() => Language.LANG = Language.getCurrentLang(lang));
     }

     public render(): ReactNode {
          return (
               <BrowserRouter>
                    <Header />
                    <main>
                         <div className="top-content">
                              <Select
                                   onSelect={this.handleLang.bind(this) as any}
                                   id='language'
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
                              ></Select>
                         </div>
                         <div className="page-content">
                              <Routes>
                                   <Route path='/' element={<Home />} />
                                   <Route path='/movie/:id' element={<Filme />} />
                              </Routes>
                         </div>
                    </main>
               </BrowserRouter>
          )
     }
}