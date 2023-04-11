import { tap } from "rxjs";
import { AbstractService } from "../abstracts/service.abstract";
import { IResponse } from "../models/Response";
import { ITrending } from "../models/Trending";

export class TrendingService extends AbstractService<ITrending> {
  protected prefixUrl(): string {
    return 'trending';
  }

  public getTrending(config?: {
    media_type: 'all' | 'movie' | 'tv' | 'person',
    time_window: 'day' | 'week',
    page?: number
  }) {
    return super.get<IResponse<ITrending>>(this.prefixUrl() + `/${ config.media_type }/${ config.time_window }`, { page: config.page })
  }

}