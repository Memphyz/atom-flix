import { ReactElement } from "react";
import { ITvShow } from "../../core/models/TvShow/TvShow";
import { TvShowService } from "../../core/services/tv-show.service";
import { CardList } from "../CardList/CardList";

export function TvShowTopRated(props: {
  listContainerId: string;
  type?: 'tv' | 'movie'
}): ReactElement {
  const service = new TvShowService();

  return (
    <CardList<ITvShow>
      title="name"
      backgroundImageSuffix="poster_path"
      width={430}
      height={243}
      type={props.type || 'movie'}
      widthDetailsMultiplier={1.2}
      backgroundImage="	https://www.themoviedb.org/t/p/w533_and_h300_bestv2/"
      getAll={service.getTopRated.bind(service)}
      listContainerId={props.listContainerId}
    />
  );
}