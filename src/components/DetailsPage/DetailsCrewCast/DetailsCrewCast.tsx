import { t } from 'i18next';
import { ReactElement, useState } from 'react';
import { CommonDetails } from '../../../core/models/CommonDetails';
import { CastDetails } from './Cast/Cast';
import './DetailsCrewCast.scss';
import { className } from '../../../shared/utils/classname';

export function DetailsCrewCast(props: {
  commonDetails: CommonDetails;
}): ReactElement {

  const [ show, setShow ] = useState(false);

  return (
    <div className={className({
      credits: true,
      show
    })}>
      {props.commonDetails?.credits.cast?.length && <>
        <h3 onClick={() => setShow(!show)}>{t('CAST') as string}</h3>
        <div className={className({ cast: true })}>
          {props.commonDetails.credits.cast.map((cast, i) =>
            <CastDetails cast={cast} key={i} />
          )}
        </div>
      </>
      }
    </div>)
}