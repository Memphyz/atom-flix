import { ReactElement, useEffect, useState } from 'react';
import { EpisodeDetails } from '../../../../../core/models/Episode';
import { TvShowService } from '../../../../../core/services/tv-show.service';
import { className } from '../../../../../shared/utils/classname';
import { DateUtils } from '../../../../../shared/utils/date';
import { Modal } from '../../../../Modal/Modal';
import { Episode, Season as TvSeason } from './../../../../../core/models/TvShow/TvShowDetails';
import { DetailsSeasonPresentation } from './DetailsSeasonPresentation/DetailsSeasonPresentation';
import './Season.scss';
import { toHoursAndMinutes } from '../../../../../shared/utils/commons';
import { t } from 'i18next';
import { Average } from '../../../../Average/Average';

export function Season(season: TvSeason & { tvId: number, episodeMap: Map<number, (Episode & { details?: EpisodeDetails })[]>, onFindEpisodes: (episodes: Episode[]) => void }): ReactElement {

  const service = new TvShowService();
  const [ details, setDetails ] = useState<EpisodeDetails>(null)

  useEffect(() => {
    if (season.episodeMap.has(season.id)) {
      return undefined;
    }
    service.getEpisodes({
      tvId: season.tvId,
      seasonNumber: season.season_number
    }).subscribe((group) => {
      season.onFindEpisodes(group.episodes);
    })
  }, []);

  function getEpisodeDetail(number: number): void {
    const detailsEpisode = season.episodeMap.get(season.id).find(episodes => episodes.episode_number === number)?.details;
    if (detailsEpisode) {
      setDetails(detailsEpisode)
      return undefined
    }
    service.getEpisodeDetails({
      tvId: season.tvId,
      seasonNumber: season.season_number,
      episodeNumber: number
    }).subscribe((episode) => {
      const epsBkp = season.episodeMap.get(season.id);
      epsBkp.find(ep => ep.episode_number === number).details = episode;
      season.episodeMap.set(season.id, epsBkp);
      setDetails(episode)
    })
  }

  function getTime(runtime: number): string {
    const { hours, minutes } = toHoursAndMinutes(runtime);
    return hours ? `${ hours }h ● ${ minutes }m` : `${ minutes }m`;
  }

  return (<div className="season">
    <div className={className({
      overview: true,
    })}>
      <div className="date">{season.air_date ? DateUtils.formatDate(season.air_date) : '-'}</div>
      <span>{season.overview}</span>
      <div className='episodes-wrapper'>
        <div className="episodes-container">
          {season.episodeMap.get(season.id)?.map((episode) => <div className='episode-wrapper' key={episode.id} onClick={() => getEpisodeDetail(episode.episode_number)}>
            <div className='episode-container' style={{ backgroundImage: `url(https://www.themoviedb.org/t/p/w355_and_h200_multi_faces${ episode.still_path })` }}>
            </div>
            <div className="episode-data">
              <label htmlFor={`${ episode.name } season ${ season.name }`}>{episode.name}</label>
              <span>{episode.overview}</span>
            </div>
            <Modal open={details?.id === episode.id} onClose={() => setDetails(null)}>
              {details && <div className="episode-details-container">
                <div className="average">
                  <Average average={details.vote_average} />
                </div>
                <DetailsSeasonPresentation {...details} />
                <div className="details-episode-overview-data">
                  <h3>{details.name} <span>{getTime(details.runtime)}</span></h3>
                  <div className="details-episode-overview-wrapper">
                    <label htmlFor="overview" className='details-episode-overview'>{details.overview}</label>
                  </div>
                  <br />
                  <h3>{t('CREW') as string}</h3>
                  <div className="crew-episode-wrapper">
                    {details.crew.map((crew) => <div className='crew-episode'>
                      <img src={crew.profile_path ? `https://www.themoviedb.org/t/p/w138_and_h175_face${ crew.profile_path }` : null} alt={`${ crew.name } photo`} />
                      <div className="crew-data">
                        <label htmlFor={crew.name}>{crew.name}</label>
                        <span>{crew.department}</span>
                      </div>
                    </div>)}
                  </div>
                </div>
              </div>}
            </Modal>
          </div>)}
        </div>
      </div>
    </div>
  </div>)
}