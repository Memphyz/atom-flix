import { ReactElement } from "react";
import { TvShow } from "../../core/models/TvShow";
import { TvShowService } from "../../core/services/tv-show.service";
import { CardList } from "../CardList/CardList";

export function TvShowPopular(props: {
  listContainerId: string;
}): ReactElement {
  const service = new TvShowService();

  return (
    <CardList<TvShow>
      title="name"
      backgroundImageSuffix="poster_path"
      width={190}
      height={280}
      backgroundImage="https://www.themoviedb.org/t/p/w220_and_h330_face/"
      getAll={service.getAllPopular.bind(service)}
      listContainerId={props.listContainerId}
    />
  );
}
