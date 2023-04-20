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
import './movies.scss';
import { Skeleton } from '../../components/Skeleton/Skeleton';
import { className } from '../../shared/utils/classname';

export function Movies(): ReactElement {
  const [ LANG, setLang ] = useState(Lang.LANG);
  const [ latest, setLatest ] = useState<IMovie>(null);
  const movieService = new MovieService();

  useEffect(() => {
    Lang.langListener().subscribe((lang) => {
      setLang(lang);
    });
    movieService.getLastest().subscribe(setLatest)
  }, []);

  useEffect(() => {
    if (!latest) {
      return undefined;
    }
    movieService.getVideos(latest.id).subscribe(console.log)
  }, [ latest ])

  return (
    <div className="main-home-content">
      <Skeleton activated={!latest} classElements='latest-wrapper'>
        <div className={className({
          "latest-wrapper": true,
          placeholder: !latest?.backdrop_path
        })}>
          <h3>{LANG.MOVIES_DESCRIPTION}</h3>
        </div>
      </Skeleton>
      <List component={TopRatedMovies} id="lastest_movies" title={LANG.TOP_RATED} />
      <List component={PopularMovies} id="popular_movies" title={LANG.POPULAR_MOVIES} />
      <List component={TrendingWeek} id="trending-content-movie" title={LANG.MOVIES_TRENDING_WEEK} customComponentProps={{ mediaType: 'movie', timeWindow: 'week' }} />
      <List component={UpcomingMovies} id="upcoming-movie" title={LANG.UPCOMING_MOVIE} />
    </div>
  )
}