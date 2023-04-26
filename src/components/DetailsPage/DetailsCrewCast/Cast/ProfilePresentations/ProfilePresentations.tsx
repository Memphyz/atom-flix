import { ReactElement, useEffect } from 'react';
import './ProfilePresentations.scss';
import { Person } from '../../../../../core/models/Person';
import { interval, takeUntil, takeWhile } from 'rxjs';

const IMAGE_INTERVAL_TIME = 3000;
const CONTAINER_ID = 'profile-image-presentation';

export function ProfilePresentations(details: Person): ReactElement {
  useEffect(() => {
    if (details.images.profiles?.length > 1) {
      let index = 0;
      interval(IMAGE_INTERVAL_TIME).pipe(takeWhile(() => !!document.getElementById(CONTAINER_ID))).subscribe(() => {
        const element = document.getElementById(CONTAINER_ID);
        if (index === details.images.profiles?.length) {
          element.scrollTo({ left: 0, behavior: 'smooth' });
          index = 0;
          return undefined;
        }
        element.scrollTo({ left: element.scrollLeft + element.scrollWidth / details.images.profiles.length, behavior: 'smooth' });
        console.log(element.scrollLeft, element.scrollLeft + element.scrollWidth / details.images.profiles.length)
        index++;
      })
    }
  }, [])

  return <div className="profile-images-wrapper">
    <div className="presentation-images-container" id={CONTAINER_ID}>
      {
        details.images.profiles.map((profile) => (
          window.innerWidth > 768 ?
            <img key={profile.file_path} src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${ profile.file_path }`} alt={`${ details.name } profile`} decoding="async" loading="lazy" /> :
            <div key={profile.file_path} style={{ backgroundImage: `url(https://www.themoviedb.org/t/p/w300_and_h450_bestv2${ profile.file_path })` }} />
        ))
      }
    </div>
  </div>
}