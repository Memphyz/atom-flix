import { ReactElement, useEffect, useState } from "react";
import { Skeleton } from "../../components/Skeleton/Skeleton";
import { Lang } from "../../shared/lang";
import "./home.scss";

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
        <div className="tests">
          <Skeleton classElements="card" />
        </div>
      </div>
    </div>
  );
}
