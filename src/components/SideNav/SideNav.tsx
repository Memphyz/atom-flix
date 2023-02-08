import './SideNav.scss';
import { icons } from '../../assets/icons/icons';
import { SideNavItem } from '../../core/models/SideNavIcon';
import classNames from 'classnames';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { debounceTime, fromEvent } from 'rxjs';

class SideNav extends Component {
     public width = window.innerWidth;

     private readonly icons: SideNavItem[] = [
          new SideNavItem('ACCOUNT', icons.account),
     ]

     public activate = false;

     public componentDidMount(): void {
          fromEvent(window, 'resize').pipe(debounceTime(500)).subscribe(() =>
               this.setState(() =>
                    this.width = window.innerWidth
               )
          )
     }

     public render() {
          return (
               <>
                    {this.width > 992 ?
                         <div className='sidenav-content'>
                              <div className="item">
                                   <Link className='logo' to='/'>
                                        <div className='logo-image' />
                                   </Link>
                              </div>

                              <div className="navigations">
                                   {
                                        this.icons.map((item, i) => (
                                             <div className="item" key={i}>
                                                  <div className="icon" style={{
                                                       WebkitMaskImage: `url(${item.icon})`
                                                  }} />
                                                  <Link to='/favoritos' className='link'>{item.getTranslated()}</Link>
                                             </div>
                                        ))
                                   }
                              </div>
                         </div> :
                         <div className="bottom-bar">
                              <div className="navigations">
                                   {
                                        this.icons.map((item, i) => (
                                             <div className={
                                                  classNames({
                                                       'item-wrapper': true,
                                                       active: i === 0 && this.activate
                                                  })
                                             }>
                                                  <div className="details"></div>
                                                  <Link to='/favoritos' className='no-link'>
                                                       <div className="item" key={i} item-index={i}>
                                                            <div className="icon" style={{
                                                                 WebkitMaskImage: `url(${item.icon})`
                                                            }} />
                                                       </div>
                                                       <div className="name">{item.getTranslated()}</div>
                                                  </Link>
                                             </div>
                                        ))
                                   }
                              </div>
                         </div>
                    }
               </>
          )
     }
}

export default SideNav;