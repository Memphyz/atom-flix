import { ReactElement } from 'react';
import { CommonDetails } from '../../../core/models/CommonDetails';
import { PTBR } from '../../../shared/lang/pt-br';
import { CastDetails } from './Cast/Cast';
import './DetailsCrewCast.scss';

export function DetailsCrewCast(props: {
  commonDetails: CommonDetails;
  LANG: typeof PTBR;
}): ReactElement {
  return (
    <div className="credits">
      {props.commonDetails?.credits.cast?.length && <>
        <h3>{props.LANG.CAST}</h3>
        <div className="cast">
          {props.commonDetails.credits.cast.map((cast, i) =>
            <CastDetails cast={cast} LANG={props.LANG} key={i} />
          )}
        </div>
      </>
      }
    </div>)
}