import { createRef, ReactElement, SyntheticEvent, useEffect, useState } from 'react';
import { router } from "../../App";
import { icons } from '../../assets/icons/icons';
import { Navigation } from '../../core/models/Navigation';
import { className } from '../../shared/utils/classname';
import { Search } from '../Search/Search';
import './Header.scss';
import { t } from 'i18next';

export function Header(props: {
  children?: ReactElement | string;
}): ReactElement {
  const [ search, setSearch ] = useState('');
  const inputRef = createRef<HTMLInputElement>();
  const navigations: Navigation[] = [
    {
      icon: icons.home,
      text: t('HOME') as string,
      link: "/",
    },
    {
      icon: icons.movie,
      text: t('MOVIES') as string,
      link: "/movies",
    },
    {
      icon: icons.tvShow,
      text: t('TV_SHOW') as string,
      link: "/tvshow",
    }
  ];
  const header = createRef<HTMLHeadElement>();

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

  function onCloseSearch(): void {
    inputRef.current.value = '';
    setSearch('');
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
            <input ref={inputRef} type="text" onChange={updateSearch} maxLength={120} className='rounded search' placeholder={t('SEARCH') as string} />
            <div className="search-icon"></div>
            <Search search={search} onCloseEvent={onCloseSearch} />
          </div>
        </div>
      </div>
    </header>
  );
}
