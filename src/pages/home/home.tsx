import { ReactElement, SyntheticEvent, useEffect, useState } from "react";
import { Skeleton } from "../../components/Skeleton/Skeleton";
import { Lang } from "../../shared/lang";
import "./home.scss";
import { TvShowPopular } from "../../components/TvShow/TvShowPopular";
import { MovieService } from "../../core/services/movie.service";
import { PopularMovies } from "../../components/Movies/PopularMovies";
import { TopRatedMovies } from "../../components/Movies/TopRatedMovies";

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
          <div className="cards" id="tvseries">
            <TvShowPopular listContainerId={"tvseries"} />
          </div>
        </div>
        <div className="list">
          <h3>{LANG.TOP_RATED}</h3>
          <div className="cards" id="lastest_movies">
            <TopRatedMovies listContainerId={"lastest_movies"} />
          </div>
        </div>
        <div className="list">
          <h3>{LANG.POPULAR_MOVIES}</h3>
          <div className="cards" id="popular_movies">
            <PopularMovies listContainerId={"popular_movies"} />
          </div>
        </div>
      </div>
    </div>
  );
}
