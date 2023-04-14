import { createRef, CSSProperties, ReactElement, useEffect, useState } from 'react';
import { icons } from '../../assets/icons/icons';
import { Navigation } from '../../core/models/Navigation';
import { Lang } from '../../shared/lang';
import './Header.scss';
import { router } from "../../App";

export function Header(props: {
  children?: ReactElement | string;
}): ReactElement {
  const [ LANG, setLang ] = useState(Lang.LANG);
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
    },
    {
      icon: icons.person,
      text: LANG.PEOPLE,
      link: "/",
    },
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

  return (
    <header ref={header}>
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
          <input type="text" left-icon style={{ '--left-icon': 'search' } as CSSProperties} maxLength={120} className='rounded' placeholder={LANG.SEARCH} />
        </div>
      </div>
    </header>
  );
}
