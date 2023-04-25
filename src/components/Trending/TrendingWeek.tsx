import { ReactElement } from "react";
import { TrendingService } from "../../core/services/trending.service";
import { CardList } from "../CardList/CardList";
import { ITrending } from "../../core/models/Trending";

export function TrendingWeek(props: {
  listContainerId: string;
  mediaType: 'all' | 'movie' | 'tv' | 'person',
  timeWindow: 'day' | 'week',
  orientation?: 'portait' | 'landscape'
  title?: 'title' | 'name'
}): ReactElement {
  const service = new TrendingService();
  return (
    (!props.orientation || props.orientation === 'portait') ? <CardList<ITrending>
      title={props.title || props.mediaType === 'tv' ? 'name' : 'title'}
      backgroundImageSuffix="poster_path"
      width={190}
      height={280}
      type="tv"
      otherRequestParams={{ media_type: props.mediaType, time_window: props.timeWindow }}
      backgroundImage="https://www.themoviedb.org/t/p/w220_and_h330_face/"
      getAll={service.getTrending.bind(service)}
      listContainerId={props.listContainerId}
    />
      : <CardList<ITrending>
        title={props.title || props.mediaType === 'tv' ? 'name' : 'title'}
        backgroundImageSuffix="backdrop_path"
        width={430}
        height={243}
        widthDetailsMultiplier={1.2}
        type="movie"
        otherRequestParams={{ media_type: props.mediaType, time_window: props.timeWindow }}
        backgroundImage="https://www.themoviedb.org/t/p/w533_and_h300_bestv2/"
        getAll={service.getTrending.bind(service)}
        listContainerId={props.listContainerId}
      />
  );
}