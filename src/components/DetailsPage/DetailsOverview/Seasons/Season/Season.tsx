import { ReactElement, useEffect, useState } from 'react';
import { EpisodeDetails } from '../../../../../core/models/Episode';
import { TvShowService } from '../../../../../core/services/tv-show.service';
import { className } from '../../../../../shared/utils/classname';
import { DateUtils } from '../../../../../shared/utils/date';
import { Episode, Season as TvSeason } from './../../../../../core/models/TvShow/TvShowDetails';
import './Season.scss';
import { Modal } from '../../../../Modal/Modal';

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
            <Modal open={!!details} onClose={() => setDetails(null)}>
              <> {episode?.details?.name}</>
            </Modal>
          </div>)}
        </div>
      </div>
    </div>
  </div>)
}