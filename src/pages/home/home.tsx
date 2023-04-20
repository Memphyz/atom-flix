import { ReactElement, useEffect, useState } from "react";
import { List } from "../../components/List/List";
import { PopularMovies } from "../../components/Movies/PopularMovies";
import { TopRatedMovies } from "../../components/Movies/TopRatedMovies";
import { TvShowPopular } from "../../components/TvShow/TvShowPopular";
import "./home.scss";
import { TrendingWeek } from "../../components/Trending/TrendingWeek";
import { UpcomingMovies } from "../../components/Movies/Upcoming";
import { TvShowOnTheAir } from "../../components/TvShow/TvOnTheAir";
import { TvShowTopRated } from "../../components/TvShow/TvShowTopRated";
import { t } from "i18next";
import { languageChange } from "../..";

export function Home(): ReactElement {

  useEffect(() => {
    languageChange.subscribe(console.log)
  }, [])

  return (
    <div className="main-home-content">
      <div className="banner">
        <div className="content">
          <label htmlFor={t('WELCOME_ATOM_FLIX') as string}>
            {t('WELCOME_ATOM_FLIX') as string}
          </label>
          <h3>{t('APPLICATION_DESC_HOME') as string}</h3>
        </div>
      </div>
      <div className="content-movie-wrapper">
        <List component={TvShowPopular} id="tvseries" title={t('POPULAR_TV_SHOW') as string} customClass="tv-on-air" />
        <List component={TopRatedMovies} id="lastest_movies" title={t('TOP_RATED_MOVIE') as string} />
        <List component={TrendingWeek} id="trending-content-tv" title={t('TV_SHOW_TRENDING_WEEK') as string} customComponentProps={{ mediaType: 'tv', timeWindow: 'week' }} />
        <List component={PopularMovies} id="popular_movies" title={t('POPULAR_MOVIES') as string} />
        <List component={TrendingWeek} id="trending-content-movie" title={t('MOVIES_TRENDING_WEEK') as string} customComponentProps={{ mediaType: 'movie', timeWindow: 'week' }} />
        <List component={UpcomingMovies} id="upcoming-movie" title={t('UPCOMING_MOVIE') as string} />
        <List component={TvShowOnTheAir} id="on-the-air" title={t('ON_AIR') as string} />
        <List component={TvShowTopRated} id="airing-today" title={t('TOP_RATED_TV_SHOW') as string} />
      </div>
    </div>
  );
}
