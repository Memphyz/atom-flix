import { createRef, ReactElement, useEffect } from 'react';
import { icons } from '../../assets/icons/icons';
import { Navigation } from '../../core/models/Navigation';
import './header.scss';

export function Header(props: { children?: ReactElement | string }): ReactElement {

     const navigations: Navigation[] = [
          {
               icon: icons.home,
               text: 'Home',
               link: ''
          }
     ];
     let header = createRef<HTMLHeadElement>();

     useEffect((): void => {
          window.addEventListener('scroll', (): void => {
               if (!header.current?.style) {
                    return undefined;
               }
               const diff = (window.scrollY || window.pageYOffset) * 0.004;
               const textColor = diff > 1 ? 255 : 255 * diff;
               header.current.style.setProperty('--opacity', (diff > 1 ? 1 : diff) + '');
               header.current.style.setProperty('--text-color-rgba', (textColor) + '');
          })
     }, [header])

     return (<>
          <header ref={header}>
               <div className="content-header">
                    <div className="left-container">
                         {navigations.map(nav => (
                              <div className="item">
                                   <div className="icon" style={{ WebkitMaskImage: `url(${nav.icon})` }} />
                                   <label htmlFor={nav.text}>{nav.text}</label>
                              </div>
                         ))}
                    </div>
                    <div className="right-container"></div>
               </div>
          </header>
          <main>
               {props.children}
          </main>
     </>)
}