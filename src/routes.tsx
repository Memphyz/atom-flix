import './routes.scss';
import Header from './components/Header/header';
import Home from './pages/home/Home';
import Filme from './pages/movie/Movie';
import { Component, ReactNode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default class RoutesApp extends Component {

     public render(): ReactNode {
          return (
               <BrowserRouter>
                    <Header />
                    <main>
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