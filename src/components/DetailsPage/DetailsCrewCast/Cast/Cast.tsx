import { CSSProperties, ReactElement, useEffect, useState } from "react";
import { Cast } from "../../../../core/models/Credits";
import { Person } from "../../../../core/models/Person";
import { PersonService } from "../../../../core/services/person.service";
import { DateUtils } from "../../../../shared/utils/date";
import { Modal } from "../../../Modal/Modal";
import './Cast.scss';
import i18next from "i18next";
import { CastUtils, ExternalLinkMap } from "./CastUtils";
import { icons, logos } from "../../../../assets/icons/icons";

export function CastDetails(props: { cast: Cast }): ReactElement {
  const [ viewDetails, setViewDetails ] = useState(false);
  const [ cacheDetails, setCacheDetails ] = useState<Record<string, Person>>({});
  const [ details, setDetails ] = useState<Person>();
  const [ externals, setExternals ] = useState<ExternalLinkMap[]>([]);
  const service = new PersonService();

  useEffect(() => {
    findPerson(viewDetails);
  }, [])

  function findPerson(view = true): void {
    const cached = cacheDetails && cacheDetails[ i18next.language ];
    if (cached) {
      setViewDetails(view);
      setDetails(cached);
      return undefined;
    }
    service.getDetails(props.cast.id).subscribe((person): void => {
      const newCache = cacheDetails;
      newCache[ i18next.language ] = person;
      setCacheDetails(newCache);
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
            <h2>{details.name} - ({DateUtils.formatDate(details.birthday)}{details.deathday ? ` - ${ DateUtils.formatDate(details.deathday) }` : ''})</h2>
            <label htmlFor={details.biography || '-'}>{details.biography || '-'}</label>
            <div className="footer">
              {externals?.length ? <div className="externals">
                {externals.map((external) => (
                  <div className={`external-id ${ external.type }`}>
                    <a target="_parent" rel="noreferrer" href={external.link}><div className="icon" style={{ backgroundImage: `url(${ logos[ external.type ] })` }} />
                      <span>{external.type[ 0 ].toLocaleUpperCase() + external.type.slice(1)}</span></a>
                  </div>
                ))}
              </div> : null}
            </div>
          </div>
        </div>}
      </Modal>
      <figure>
        <img src={`https://www.themoviedb.org/t/p/w138_and_h175_face${ props.cast.profile_path }`} alt={`cast from ${ props.cast.name }`} loading="lazy" decoding="async" />
      </figure>
      <div className="cast-info-wrapper">
        <label className="name">{props.cast.name}</label>
        <label className="department">{props.cast.known_for_department}</label>
        {props.cast.character && <label className="character">{props.cast.character}</label>}
      </div>
    </div>
  );
}