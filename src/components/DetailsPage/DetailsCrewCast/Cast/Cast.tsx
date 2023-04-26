import { t } from "i18next";
import { ReactElement, useState } from "react";
import { logos } from "../../../../assets/icons/icons";
import { Cast } from "../../../../core/models/Credits";
import { Person } from "../../../../core/models/Person";
import { PersonService } from "../../../../core/services/person.service";
import { DateUtils } from "../../../../shared/utils/date";
import { Modal } from "../../../Modal/Modal";
import './Cast.scss';
import { CastCrewList } from "./CastCrewList/CastCrewList";
import { CastCrewPerson } from "./CastCrewPerson/CastCrewPerson";
import { CastUtils, ExternalLinkMap } from "./CastUtils";
import { ProfilePresentations } from "./ProfilePresentations/ProfilePresentations";

export function CastDetails(props: { cast: Cast }): ReactElement {
  const [ viewDetails, setViewDetails ] = useState(false);
  const [ details, setDetails ] = useState<Person>();
  const [ externals, setExternals ] = useState<ExternalLinkMap[]>([]);
  const service = new PersonService();

  function findPerson(view = true): void {
    if (details) {
      setDetails(details);
      setViewDetails(view);
      return undefined;
    }
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
          <ProfilePresentations {...details} />
          <div className="info-wrapper">
            <div className="main-content-cast-modal">
              <h2>{details.name} - ({DateUtils.formatDate(details.birthday)}{details.deathday ? ` - ${ DateUtils.formatDate(details.deathday) }` : ''})</h2>
              <label htmlFor={details.biography || '-'}>{details.biography || '-'}</label>
            </div>
            <div className="footer">
              <CastCrewList data={details.combined_credits.cast} type="cast" setViewDetails={setViewDetails} />
              <CastCrewList data={details.combined_credits.crew} type="crew" setViewDetails={setViewDetails} />
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