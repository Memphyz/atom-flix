import { t } from 'i18next';
import { ReactElement } from 'react';
import { CommonDetails } from '../../../core/models/CommonDetails';
import { CastDetails } from './Cast/Cast';
import './DetailsCrewCast.scss';

export function DetailsCrewCast(props: {
  commonDetails: CommonDetails;
}): ReactElement {
  return (
    <div className="credits">
      {props.commonDetails?.credits.cast?.length && <>
        <h3>{t('CAST') as string}</h3>
        <div className="cast">
          {props.commonDetails.credits.cast.map((cast, i) =>
            <CastDetails cast={cast} key={i} />
          )}
        </div>
      </>
      }
    </div>)
}