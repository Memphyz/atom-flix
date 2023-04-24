import { ReactElement, useEffect, useMemo, useState } from 'react';
import { List } from '../../components/List/List';
import { PopularMovies } from '../../components/Movies/PopularMovies';
import { TopRatedMovies } from '../../components/Movies/TopRatedMovies';
import { UpcomingMovies } from '../../components/Movies/Upcoming';
import { Skeleton } from '../../components/Skeleton/Skeleton';
import { TrendingWeek } from '../../components/Trending/TrendingWeek';
import { IMovie } from '../../core/models/Movie/Movie';
import { MovieService } from '../../core/services/movie.service';
import { className } from '../../shared/utils/classname';
import './movies.scss';
import { t } from 'i18next';

export function Movies(): ReactElement {
  const [ latest, setLatest ] = useState<IMovie>(null);
  const movieService = useMemo(() => new MovieService(), []);

  useEffect(() => {
    movieService.getLastest().subscribe(setLatest)
  }, [ movieService ]);

  return (
    <div className="main-home-content">
      <Skeleton activated={!latest} classElements='latest-wrapper'>
        <div className={className({
          "latest-wrapper": true,
          placeholder: !latest?.backdrop_path
        })}>
          <h3>{t('MOVIES_DESCRIPTION') as string}</h3>
        </div>
      </Skeleton>
      <List component={TopRatedMovies} id="lastest_movies" title={t('TOP_RATED') as string} />
      <List component={PopularMovies} id="popular_movies" title={t('POPULAR_MOVIES') as string} />
      <List component={TrendingWeek} id="trending-content-movie" title={t('MOVIES_TRENDING_WEEK') as string} customComponentProps={{ mediaType: 'movie', timeWindow: 'week' }} />
      <List component={UpcomingMovies} id="upcoming-movie" title={t('UPCOMING_MOVIE') as string} />
    </div>
  )
}