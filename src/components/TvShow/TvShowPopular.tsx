import { ReactElement, useEffect, useState } from "react";
import "./TvShowPopular.scss";
import { TvShowService } from "../../core/services/tv-show.service";
import { Cards } from "../Card/Card";
import { TvShow } from "../../core/models/TvShow";

export function TvShowPopular(): ReactElement {
  const service = new TvShowService();
  const [list, setList] = useState<TvShow[]>([]);

  useEffect(() => {
    service.getAllPopular().subscribe((data) => setList(data.results));
  }, []);

  return (
    <Cards
      items={list}
      title="name"
      backgroundImageSuffix="poster_path"
      width={120}
      height={180}
      backgroundImage="https://www.themoviedb.org/t/p/w220_and_h330_face/"
    />
  );
}
