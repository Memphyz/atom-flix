import { ReactElement, useEffect, useState } from "react";
import { Cast } from "../../../../core/models/Credits";
import { Modal } from "../../../Modal/Modal";
import { PersonService } from "../../../../core/services/person.service";
import { Lang } from "../../../../shared/lang";
import { Person } from "../../../../core/models/Person";
import './Cast.scss'
import { PTBR } from "../../../../shared/lang/pt-br";
import { DateUtils } from "../../../../shared/utils/date";

export function CastDetails(props: { cast: Cast, LANG: typeof PTBR }): ReactElement {
  const [ viewDetails, setViewDetails ] = useState(false);
  const [ cacheDetails, setCacheDetails ] = useState<Record<string, Person>>({});
  const [ details, setDetails ] = useState<Person>();
  const service = new PersonService();

  useEffect(() => console.log(cacheDetails), [ cacheDetails ])

  useEffect(() => {
    Lang.langListener().subscribe(findPerson.bind(undefined, viewDetails))
  }, [])

  function findPerson(view = true): void {
    const cached = cacheDetails && cacheDetails[ Lang.currentLang ];
    console.log(cached, cacheDetails)
    if (cached) {
      setViewDetails(view);
      setDetails(cached);
      return undefined;
    }
    service.getDetails(props.cast.id).subscribe((person): void => {
      const newCache = cacheDetails;
      newCache[ Lang.currentLang ] = person;
      setCacheDetails(newCache);
      setDetails(person);
      setViewDetails(view);
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