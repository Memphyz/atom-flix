import './routes.scss';
import Header from './components/Header/header';
import Filme from './pages/Filme/filme';
import Home from './pages/Home/Home';
import { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

class RoutesApp extends Component {
     render() {
          return (
               <BrowserRouter>
                    <Header />
                    <main>
                         <div className="page-content">
                              <Routes>
                                   <Route path='/' element={<Home />} />
                                   <Route path='/filme/:id' element={<Filme />} />
                              </Routes>
                         </div>
                    </main>
               </BrowserRouter>
          )
     }
}

export default RoutesApp;