import { ReactElement, useEffect, useState } from "react";
import { TvShow } from "../../core/models/TvShow";
import { TvShowService } from "../../core/services/tv-show.service";
import { Lang } from "../../shared/lang";
import { PTBR } from "../../shared/lang/pt-br";
import { Cards } from "../Card/Card";
import "./TvShowPopular.scss";

export function TvShowPopular(): ReactElement {
  const service = new TvShowService();
  const [list, setList] = useState<TvShow[]>([]);
  const [details, setDetails] = useState<TvShow>();
  const [LANG, setLang] = useState<typeof PTBR>(Lang.LANG);

  useEffect(() => {
    fetch();
    Lang.langListener().subscribe(() => {
      setLang(Lang.LANG);
      fetch();
    });
  }, []);

  const fetch = () => {
    service.getAllPopular().subscribe((data) => setList(data.results));
  };

  const getDetails = (id: number) => {
    const cached = list.find((cache) => cache.id === id);
    setDetails(cached);
  };

  return (
    <Cards
      items={list}
      title="name"
      backgroundImageSuffix="poster_path"
      width={120}
      height={180}
      onMouseOver={getDetails}
      backgroundImage="https://www.themoviedb.org/t/p/w220_and_h330_face/"
    >
      <div className="details">
        <div
          className="backdrop"
          style={{
            backgroundImage: `url(https://www.themoviedb.org/t/p/w533_and_h300_bestv2${details?.backdrop_path})`,
          }}
        />
        <h3 className="title">{details?.name}</h3>
        {details?.overview && (
          <div className="overview">
            <label htmlFor={`${details?.name} ${LANG.SYNOPSIS}`}>
              {details?.overview}
            </label>
          </div>
        )}
      </div>
    </Cards>
  );
}
