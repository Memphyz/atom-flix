import { ReactElement } from "react";
import { ITvShow } from "../../core/models/TvShow/TvShow";
import { TvShowService } from "../../core/services/tv-show.service";
import { CardList } from "../CardList/CardList";

export function TvShowOnTheAir(props: {
  listContainerId: string;
}): ReactElement {
  const service = new TvShowService();

  return (
    <CardList<ITvShow>
      title="name"
      backgroundImageSuffix="poster_path"
      width={190}
      type="tv"
      height={280}
      backgroundImage="https://www.themoviedb.org/t/p/w220_and_h330_face/"
      getAll={service.getOnTheAir.bind(service)}
      listContainerId={props.listContainerId}
    />
  );
}