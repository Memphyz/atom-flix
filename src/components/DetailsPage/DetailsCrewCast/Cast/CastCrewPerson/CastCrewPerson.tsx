import { ReactElement } from 'react';
import './CastCrewPerson.scss'
import { ItemCard } from '../../../../Card/Card';
import { Cast, Crew } from '../../../../../core/models/CombinedCredits';
import { t } from 'i18next';

export function CastCrewPerson(props: {
  media_type: 'tv' | 'movie',
  cast: Cast | Crew,
  title: 'name' | 'title',
  subtitle: string,
  onclick: () => void
}): ReactElement {
  const CONFIG = {
    movie: t('MOVIE') as string,
    tv: (t('TV_SHOW') as string),
  }
  return (
    <ItemCard<Cast | Crew> onclick={props.onclick} pill={CONFIG[ props.media_type ]} widthDetailsMultiplier={2.5} title={props.title as any} type={props.media_type as any} item={props.cast} backgroundImage="https://www.themoviedb.org/t/p/w220_and_h330_face/" backgroundImageSuffix="poster_path" width={160} height={240} subtitle={props.subtitle} >
      <div className="details-combined-wrapper">
        <div className="details-combined-cast" style={{ backgroundImage: `url(	https://www.themoviedb.org/t/p/w533_and_h300_bestv2${ props.cast.backdrop_path })` }}>
          <div className="info-combined-cast">
            <div className="overview-combined-cast">
              <span>{props.cast.overview}</span>
            </div>
            <label>{props.cast[ props.title ]}</label>
          </div>
        </div>
      </div>
    </ItemCard>
  )
}