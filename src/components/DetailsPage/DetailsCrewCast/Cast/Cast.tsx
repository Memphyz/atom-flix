import { ReactElement, useEffect, useState } from "react";
import { logos } from "../../../../assets/icons/icons";
import { Cast } from "../../../../core/models/Credits";
import { Cast as CombinedCast } from "../../../../core/models/CombinedCredits";
import { Person } from "../../../../core/models/Person";
import { PersonService } from "../../../../core/services/person.service";
import { DateUtils } from "../../../../shared/utils/date";
import { ItemCard } from "../../../Card/Card";
import { Modal } from "../../../Modal/Modal";
import './Cast.scss';
import { CastUtils, ExternalLinkMap } from "./CastUtils";
import { t } from "i18next";
import { CastCrewPerson } from "./CastCrewPerson/CastCrewPerson";

export function CastDetails(props: { cast: Cast }): ReactElement {
  const [ viewDetails, setViewDetails ] = useState(false);
  const [ details, setDetails ] = useState<Person>();
  const [ externals, setExternals ] = useState<ExternalLinkMap[]>([]);
  const service = new PersonService();

  useEffect(() => {
    findPerson(viewDetails);
  }, [])

  function findPerson(view = true): void {
    service.getDetails(props.cast.id).subscribe((person): void => {
      setDetails(person);
      setViewDetails(view);
      setExternals(CastUtils.createExternalLinks(person))
    })
  }

  return props.cast && (
    <div className="cast-item" onClick={() => findPerson()}>
      <Modal open={viewDetails} onClose={() => setViewDetails(false)}>
        {details && <div className="details-modal">
          <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${ details.profile_path }`} alt={`${ details.name } profile img`} />
          <div className="info-wrapper">
            <div className="main-content-cast-modal">
              <h2>{details.name} - ({DateUtils.formatDate(details.birthday)}{details.deathday ? ` - ${ DateUtils.formatDate(details.deathday) }` : ''})</h2>
              <label htmlFor={details.biography || '-'}>{details.biography || '-'}</label>
            </div>
            <div className="footer">
              {(details.combined_credits?.cast?.length || details.combined_credits?.crew?.length) && <div className="combined-credits">
                {details.combined_credits.cast?.length && <>
                  <h3>{t('CAST') as string}</h3>
                  <div className="combined-credits-list">
                    {details.combined_credits.cast.map((cast, icast) => <CastCrewPerson onclick={() => setViewDetails(false)} cast={cast} media_type={cast.media_type as any} subtitle={cast.character} key={icast} title={cast.media_type === 'movie' ? 'title' : 'name'} />)}
                  </div>
                </>}
              </div>}
              {externals?.length ? <div className="externals">
                {externals.map((external, i) => (
                  <div key={i} className={`external-id ${ external.type }`}>
                    <a href={external.link} target="_blank" rel="noreferrer" onClick={() => window.open(external.link)}><div className="icon" style={{ backgroundImage: `url(${ logos[ external.type ] })` }} />
                      <span>{external.type[ 0 ].toLocaleUpperCase() + external.type.slice(1)}</span></a>
                  </div>
                ))}
              </div> : null}
            </div>
          </div>
        </div>}
      </Modal>
      <figure>
        {props.cast.profile_path ? <img src={`https://www.themoviedb.org/t/p/w138_and_h175_face${ props.cast.profile_path }`} alt={`cast from ${ props.cast.name }`} loading="lazy" decoding="async" /> : <div className="profile-placeholder" />}
      </figure>
      <div className="cast-info-wrapper">
        <label className="name">{props.cast.name}</label>
        <label className="department">{props.cast.known_for_department}</label>
        {props.cast.character && <label className="character">{props.cast.character}</label>}
      </div>
    </div>
  );
}