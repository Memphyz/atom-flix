import { t } from 'i18next';
import { ReactElement, useState } from 'react';
import { CommonDetails } from '../../../../core/models/CommonDetails';
import { Season } from './Season/Season';
import { Episode, Season as ISeason } from '../../../../core/models/TvShow/TvShowDetails';
import './Seasons.scss';
import { EpisodeDetails } from '../../../../core/models/Episode';

export function Seasons(commonDetails: CommonDetails): ReactElement {

  const [ season, setSeason ] = useState<ISeason>(null);
  const [ episodes ] = useState<Map<number, (Episode & { details?: EpisodeDetails })[]>>(new Map())

  return <div className="seasons-wrapper">
    <h3>
      {t('SEASONS') as string}
    </h3>
    <div className='seasons-container'>
      <ul>
        {commonDetails?.seasons?.map((season) => <span onClick={() => setSeason(season)} key={season.id}>
          {season.name}
        </span>)}
      </ul>
      {season && <Season {...season} tvId={commonDetails.id} key={season.id} episodeMap={episodes} onFindEpisodes={(eps) => episodes.set(season.id, eps)} />}
    </div>
  </div>
}