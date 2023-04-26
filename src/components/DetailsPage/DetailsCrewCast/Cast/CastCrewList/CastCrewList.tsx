import { ReactElement, useState } from 'react';
import './CastCrewList.scss';
import { Cast, Crew } from '../../../../../core/models/CombinedCredits';
import { t } from 'i18next';
import { CastCrewPerson } from '../CastCrewPerson/CastCrewPerson';
import { className } from '../../../../../shared/utils/classname';

export function CastCrewList(props: { data: (Crew | Cast)[], type: 'crew' | 'cast', setViewDetails: (value: boolean) => void }): ReactElement {

  const [ show, setShow ] = useState(false);

  return (props.data?.length) && <div className={className({
    'combined-credits': true,
    show
  })}>
    <div className="collapse-combined" onClick={() => setShow(!show)}>
      <h3>{t('CAST') as string}</h3>
    </div>
    <div className={className({
      'combined-credits-list': true,
      show
    })}>
      {props.data.map((cast, icast) => <CastCrewPerson onclick={() => props.setViewDetails(false)} cast={cast} media_type={cast.media_type as any} subtitle={props.type === 'cast' ? cast[ 'character' ] : cast[ 'department' ]} key={icast} title={cast.media_type === 'movie' ? 'title' : 'name'} />)}
    </div>
  </div>
}