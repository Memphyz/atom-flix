import { ReactElement, useEffect, useState } from "react";
import { Skeleton } from "../../components/Skeleton/Skeleton";
import { Lang } from "../../shared/lang";
import "./home.scss";
import { TvShowPopular } from "../../components/TvShow/TvShowPopular";

export function Home(): ReactElement {
  const [LANG, setLang] = useState(Lang.LANG);

  useEffect(() => {
    Lang.langListener().subscribe((lang) => {
      setLang(lang);
    });
  }, []);

  return (
    <div className="main-home-content">
      <div className="banner">
        <div className="content">
          <label htmlFor={LANG.WELCOME_ATOM_FLIX}>
            {LANG.WELCOME_ATOM_FLIX}
          </label>
          <h3>{LANG.APPLICATION_DESC_HOME}</h3>
        </div>
      </div>
      <div className="content-movie-wrapper">
        <div className="tv-on-air list">
          <h3>{LANG.POPULAR_TV_SHOW}</h3>
          <div className="cards">
            <TvShowPopular />
          </div>
        </div>
      </div>
    </div>
  );
}
