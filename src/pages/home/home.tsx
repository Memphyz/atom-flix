import { ReactElement, useEffect, useState } from "react";
import { List } from "../../components/List/List";
import { PopularMovies } from "../../components/Movies/PopularMovies";
import { TopRatedMovies } from "../../components/Movies/TopRatedMovies";
import { TvShowPopular } from "../../components/TvShow/TvShowPopular";
import { Lang } from "../../shared/lang";
import "./home.scss";
import { TrendingWeek } from "../../components/Trending/TrendingWeek";
import { UpcomingMovies } from "../../components/Movies/Upcoming";

export function Home(): ReactElement {
  const [ LANG, setLang ] = useState(Lang.LANG);

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
        <List component={TvShowPopular} id="tvseries" title={LANG.POPULAR_TV_SHOW} customClass="tv-on-air" />
        <List component={TopRatedMovies} id="lastest_movies" title={LANG.TOP_RATED} />
        <List component={TrendingWeek} id="trending-content-tv" title={LANG.TV_SHOW_TRENDING_WEEK} customComponentProps={{ mediaType: 'tv', timeWindow: 'week' }} />
        <List component={PopularMovies} id="popular_movies" title={LANG.POPULAR_MOVIES} />
        <List component={TrendingWeek} id="trending-content-movie" title={LANG.MOVIES_TRENDING_WEEK} customComponentProps={{ mediaType: 'movie', timeWindow: 'week' }} />
        <List component={UpcomingMovies} id="upcoming-movie" title={LANG.UPCOMING_MOVIE} />
      </div>
    </div>
  );
}
