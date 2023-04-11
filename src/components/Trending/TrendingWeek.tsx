import { ReactElement } from "react";
import { TrendingService } from "../../core/services/trending.service";
import { CardList } from "../CardList/CardList";
import { ITrending } from "../../core/models/Trending";

export function TrendingWeek(props: {
  listContainerId: string;
  mediaType: 'all' | 'movie' | 'tv' | 'person',
  timeWindow: 'day' | 'week'
}): ReactElement {
  const service = new TrendingService();
  return (
    <CardList<ITrending>
      title="title"
      backgroundImageSuffix="poster_path"
      width={190}
      height={280}
      type="tv"
      otherRequestParams={{ media_type: props.mediaType, time_window: props.timeWindow }}
      backgroundImage="https://www.themoviedb.org/t/p/w220_and_h330_face/"
      getAll={service.getTrending.bind(service)}
      listContainerId={props.listContainerId}
    />
  );
}