import { createRef, CSSProperties, ReactElement, SyntheticEvent, useEffect, useState } from 'react';
import { icons } from '../../assets/icons/icons';
import { Navigation } from '../../core/models/Navigation';
import { Lang } from '../../shared/lang';
import './Header.scss';
import { router } from "../../App";
import { Search } from '../Search/Search';
import { className } from '../../shared/utils/classname';

export function Header(props: {
  children?: ReactElement | string;
}): ReactElement {
  const [ LANG, setLang ] = useState(Lang.LANG);
  const [ search, setSearch ] = useState('');
  const navigations: Navigation[] = [
    {
      icon: icons.home,
      text: LANG.HOME,
      link: "/",
    },
    {
      icon: icons.movie,
      text: LANG.MOVIES,
      link: "/movies",
    },
    {
      icon: icons.tvShow,
      text: LANG.TV_SHOW,
      link: "/tvshow",
    }
  ];
  const header = createRef<HTMLHeadElement>();

  useEffect((): void => {
    Lang.langListener().subscribe((lang) => {
      setLang(lang);
    });
  }, []);

  const updateColors: () => void = (): void => {
    if (!header.current?.style) {
      return undefined;
    }
    const { scrollTop } = document.getElementById("root") as HTMLDivElement;
    const diff = scrollTop * 0.004;
    const textColor = diff > 1 ? 255 : 255 * diff;
    header.current.style.setProperty("--opacity", (diff > 1 ? 1 : diff) + "");
    header.current.style.setProperty("--text-color-rgba", textColor + "");
  };

  useEffect((): void => {
    document.getElementById("root")!.addEventListener("scroll", (): void => {
      updateColors();
    });
    updateColors();
  }, [ header ]);

  function updateSearch(event: SyntheticEvent<HTMLInputElement>): void {
    setSearch(event.target[ 'value' ])
  }


  return (
    <header ref={header} className={className({
      'remove-opacity': search
    })}>
      <div className="content-header">
        <div className="left-container">
          <div className="logo-wrapper" onClick={() => router.next("/")}>
            <div className="logo" />
            <label translate="no" htmlFor="AtomFlix">
              AtomFlix
            </label>
          </div>
          {navigations.map((nav, i) => (
            <div className="item" key={i} onClick={() => router.next(nav.link)}>
              <div
                className="icon"
                style={{ WebkitMaskImage: `url(${ nav.icon })` }}
              />
              <label htmlFor={nav.text}>{nav.text}</label>
            </div>
          ))}
        </div>
        <div className="right-container">
          <div className="search-wrapper">
            <input type="text" onChange={updateSearch} maxLength={120} className='rounded search' placeholder={LANG.SEARCH} />
            <div className="search-icon"></div>
            <Search search={search} />
          </div>
        </div>
      </div>
    </header>
  );
}
