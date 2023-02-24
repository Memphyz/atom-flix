import { createRef, ReactElement, useEffect, useState } from 'react';
import { icons } from '../../assets/icons/icons';
import { Navigation } from '../../core/models/Navigation';
import { Lang } from '../../shared/lang';
import './Header.scss';

export function Header(props: {
     children?: ReactElement | string;
}): ReactElement {
     const [LANG, setLang] = useState(Lang.LANG);
     const navigations: Navigation[] = [
          {
               icon: icons.home,
               text: LANG.HOME,
               link: "",
          },
     ];
     const header = createRef<HTMLHeadElement>();

     useEffect((): void => {
          Lang.langListener().subscribe((lang) => {
               setLang(lang)
          })
     }, []);

     const updateColors: () => void = (): void => {
          if (!header.current?.style) {
               return undefined;
          }
          const diff = (window.scrollY || window.pageYOffset) * 0.004;
          const textColor = diff > 1 ? 255 : 255 * diff;
          header.current.style.setProperty("--opacity", (diff > 1 ? 1 : diff) + "");
          header.current.style.setProperty("--text-color-rgba", textColor + "");
     };

     useEffect((): void => {
          document.addEventListener("scroll", (): void => {
               updateColors();
          });
          updateColors();
     }, [header]);

     return (
          <header ref={header}>
               <div className="content-header">
                    <div className="left-container">
                         <div className="logo-wrapper">
                              <div className="logo" />
                              <label translate="no" htmlFor="AtomFlix">AtomFlix</label>
                         </div>
                         {navigations.map((nav, i) => (
                              <div className="item" key={i}>
                                   <div
                                        className="icon"
                                        style={{ WebkitMaskImage: `url(${nav.icon})` }}
                                   />
                                   <label htmlFor={nav.text}>{nav.text}</label>
                              </div>
                         ))}
                    </div>
                    <div className="right-container">
                         <button>{LANG.SIGN_IN}</button>
                         <a href='https://www.themoviedb.org/signup' target='_blank'>
                              <button className='outline'>{LANG.SIGN_UP}</button>
                         </a>
                    </div>
               </div>
          </header>
     );
}
