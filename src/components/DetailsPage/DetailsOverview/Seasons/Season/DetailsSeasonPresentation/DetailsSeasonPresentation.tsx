/* eslint-disable jsx-a11y/img-redundant-alt */
import { ReactElement } from 'react';
import { EpisodeDetails } from '../../../../../../core/models/Episode';
import './DetailsSeasonPresentation.scss';

export function DetailsSeasonPresentation(details: EpisodeDetails): ReactElement {
  return <div className="images-presentations">
    <img src={`https://www.themoviedb.org/t/p/w533_and_h300_bestv2${ details.still_path }`} alt={`image presentation from ${ details.name }`} key={details.still_path} decoding='async' loading='lazy' srcSet={`https://www.themoviedb.org/t/p/w533_and_h300_bestv2${ details.still_path }`} />
  </div>
}