import { ReactElement, useEffect, useState } from 'react';
import { List } from '../../components/List/List';
import { TrendingWeek } from '../../components/Trending/TrendingWeek';
import { TvShowOnTheAir } from '../../components/TvShow/TvOnTheAir';
import { TvShowPopular } from '../../components/TvShow/TvShowPopular';
import { TvShowTopRated } from '../../components/TvShow/TvShowTopRated';
import { TvShowService } from '../../core/services/tv-show.service';
import './tvshow.scss';
import { t } from 'i18next';

export function TvShow(): ReactElement {
  const tvShowService = new TvShowService();

  return (
    <div className="main-home-content tv-show">
      <div className="latest-wrapper placeholder">
        <h3>{t('TV_SHOW_DESCRIPTION') as string}</h3>
      </div>
      <List component={TrendingWeek} id="trending-content-tv" title={t('TRENDING_WEEK') as string} customComponentProps={{
        mediaType: 'tv', timeWindow: 'week', orientation: 'landscape',
        title: 'name'
      }} />
      <List component={TvShowPopular} id="lastest_tv-show" title={t('TOP_RATED') as string} />
      <List component={TvShowTopRated} id="airing-today" title={t('TOP_RATED') as string} />
      <List component={TvShowOnTheAir} id="on-the-air" title={t('ON_AIR') as string} />
    </div>
  )
}