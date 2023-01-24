import './SideNav.scss';
import { icons } from '../../assets/icons/icons';
import { Language } from '../../assets/langs/lang';
import { Component } from 'react';
import { Link } from 'react-router-dom';

class SideNav extends Component {

     render() {
          return (
               <div className='sidenav-content'>
                    <div className="item">
                         <Link className='logo' to='/'>
                              <div className='logo-image' />
                         </Link>
                    </div>

                    <div className="navigations">
                         <div className="item">
                              <div className="icon" style={{
                                   WebkitMaskImage: `url(${icons.favorite})`
                              }} />
                              <Link to='/favoritos' className='link'>{Language.LANG.FAVORITES}</Link>
                         </div>
                    </div>
               </div>
          )
     }
}

export default SideNav;