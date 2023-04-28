import { ReactElement, useEffect, useState } from 'react';
import { Episode, Season as TvSeason } from './../../../../../core/models/TvShow/TvShowDetails';
import './Season.scss';
import { TvShowService } from '../../../../../core/services/tv-show.service';
import { DateUtils } from '../../../../../shared/utils/date';
import { ItemCard } from '../../../../Card/Card';
import { className } from '../../../../../shared/utils/classname';

export function Season(season: TvSeason & { tvId: number }): ReactElement {

  const service = new TvShowService();
  const [ episodes, setEpisodes ] = useState<Episode[]>([])


  useEffect(() => {
    if (!season?.overview) {
      console.log(season)
      service.getEpisodes({
        tvId: season.tvId,
        seasonNumber: season.season_number
      }).subscribe((group) => {
        setEpisodes(group.episodes);
        console.log(episodes)
      })
    }
  }, [])

  return (<div className="season">
    <div className="data-season-simple" style={{ backgroundImage: `url(	https://www.themoviedb.org/t/p/w220_and_h330_face${ season.poster_path })` }}>\
      <span>
        {season.name}
      </span>
    </div>
    <div className={className({
      overview: true,
      'direct-eps': !season.overview
    })}>
      <div className="date">{DateUtils.formatDate(season.air_date)}</div>
      {season.overview ? <span>{season.overview}</span> :
        <div className='episodes-wrapper'>
          <div className="episodes-container">
            {episodes?.length ?
              episodes.map((episode) => <ItemCard<Episode> height={80} width={180} title='name' type='tv' backgroundImage='https://www.themoviedb.org/t/p/w355_and_h200_multi_faces' backgroundImageSuffix='still_path' item={episode} widthDetailsMultiplier={0.1} />)
              : null}
          </div>
        </div>}
    </div>
  </div>)
}