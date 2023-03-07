import { ReactElement } from "react";
import { MovieService } from "../../core/services/movie.service";
import { IMovie } from "../../core/models/Movie/Movie";
import { CardList } from "../CardList/CardList";

export function PopularMovies(props: {
  listContainerId: string;
}): ReactElement {
  const service = new MovieService();
  return (
    <CardList<IMovie>
      title="title"
      backgroundImageSuffix="poster_path"
      width={430}
      height={243}
      widthDetailsMultiplier={1.2}
      backgroundImage="	https://www.themoviedb.org/t/p/w533_and_h300_bestv2/"
      getAll={service.getNowPlaying.bind(service)}
      listContainerId={props.listContainerId}
    />
  );
}
