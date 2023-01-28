import './SideNav.scss';
import { icons } from '../../assets/icons/icons';
import { SideNavItem } from '../../core/models/SideNavIcon';
import { Component } from 'react';
import { Link } from 'react-router-dom';

class SideNav extends Component {

     private readonly icons: SideNavItem[] = [
          new SideNavItem('ACCOUNT', icons.account),
     ]

     public render() {
          return (
               <div className='sidenav-content'>
                    <div className="item">
                         <Link className='logo' to='/'>
                              <div className='logo-image' />
                         </Link>
                    </div>

                    <div className="navigations">
                         {
                              this.icons.map((item) => (
                                   <div className="item">
                                        <div className="icon" style={{
                                             WebkitMaskImage: `url(${item.icon})`
                                        }} />
                                        <Link to='/favoritos' className='link'>{item.getTranslated()}</Link>
                                   </div>
                              ))
                         }
                    </div>
               </div>
          )
     }
}

export default SideNav;