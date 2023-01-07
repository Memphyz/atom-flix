import './header.scss';
import { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
     render() {
          return (
               <header>
                    <div className="item">

                         <Link className='logo' to='/'>
                              <div className='logo-image' />
                         </Link>
                    </div>

                    <div className="navigations">
                         <div className="item">
                              <div className="icon" icon='/../../assets/icons/favorite.svg' />
                              <Link to='/favoritos' className='link'>Favoritos</Link>
                         </div>
                    </div>
               </header>
          )
     }
}

export default Header;