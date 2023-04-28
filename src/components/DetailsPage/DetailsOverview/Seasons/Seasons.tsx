import { ReactElement, useState } from 'react';
import './Seasons.scss';
import { CommonDetails } from '../../../../core/models/CommonDetails';
import { t } from 'i18next';
import { className } from '../../../../shared/utils/classname';
import { Season } from './Season/Season';
import { Episode } from '../../../../core/models/TvShow/TvShowDetails';

export function Seasons(commonDetails: CommonDetails): ReactElement {
  const [ show, setShow ] = useState(false);

  return <div className="seasons-wrapper">
    <h3 onClick={() => setShow(!show)}>
      {t('SEASONS') as string}
    </h3>
    <div className={className({
      'seasons-container': true,
      show
    })}>
      {commonDetails?.seasons?.map((season) => <Season {...season} tvId={commonDetails.id} key={season.id} />)}
    </div>
  </div>
}