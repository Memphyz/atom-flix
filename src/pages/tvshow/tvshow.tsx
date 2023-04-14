import { ReactElement, useEffect, useState } from 'react';
import { List } from '../../components/List/List';
import { PopularMovies } from '../../components/Movies/PopularMovies';
import { TopRatedMovies } from '../../components/Movies/TopRatedMovies';
import { UpcomingMovies } from '../../components/Movies/Upcoming';
import { TrendingWeek } from '../../components/Trending/TrendingWeek';
import { Video } from '../../core/models/ModelVideo';
import { IMovie } from '../../core/models/Movie/Movie';
import { MovieService } from '../../core/services/movie.service';
import { Lang } from '../../shared/lang';
import './tvshow.scss';
import { Skeleton } from '../../components/Skeleton/Skeleton';
import { className } from '../../shared/utils/classname';
import { TvShowService } from '../../core/services/tv-show.service';
import { ITvShow } from '../../core/models/TvShow/TvShow';
import { TvShowPopular } from '../../components/TvShow/TvShowPopular';
import { TvShowAiringToday } from '../../components/TvShow/TvAiringToday';
import { TvShowOnTheAir } from '../../components/TvShow/TvOnTheAir';
import { TvShowTopRated } from '../../components/TvShow/TvShowTopRated';

export function TvShow(): ReactElement {
  const [ LANG, setLang ] = useState(Lang.LANG);
  const tvShowService = new TvShowService();

  useEffect(() => {
    Lang.langListener().subscribe((lang) => {
      setLang(lang);
    });
  }, []);

  return (
    <div className="main-home-content tv-show">
      <div className="latest-wrapper placeholder">
        <h3>{LANG.TV_SHOW_DESCRIPTION}</h3>
      </div>
      <List component={TrendingWeek} id="trending-content-tv" title={LANG.TRENDING_WEEK} customComponentProps={{
        mediaType: 'tv', timeWindow: 'week', orientation: 'landscape',
        title: 'name'
      }} />
      <List component={TvShowPopular} id="lastest_tv-show" title={LANG.TOP_RATED} />
      <List component={TvShowTopRated} id="airing-today" title={LANG.TOP_RATED} />
      <List component={TvShowOnTheAir} id="on-the-air" title={LANG.ON_AIR} />
    </div>
  )
}