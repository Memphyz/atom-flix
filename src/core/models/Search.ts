

export interface ISearchPerson {
  adult: boolean
  id: number
  name?: string
  original_name?: string
  media_type: 'tv' | 'person' | 'movie';
  popularity: number
  gender?: number
  known_for_department?: string
  profile_path?: string
  known_for?: ISearch[]
  backdrop_path?: string
  title?: string
  original_language?: string
  original_title?: string
  overview?: string
  poster_path?: string
  genre_ids?: number[]
  release_date?: string
  video?: boolean
  vote_average?: number
  vote_count?: number
  first_air_date?: string
  origin_country?: string[]
}

export interface ISearch {
  adult: boolean
  backdrop_path?: string
  id: number
  title?: string
  original_language: string
  original_title?: string
  overview: string
  poster_path?: string
  media_type: 'tv' | 'person' | 'movie';
  genre_ids: number[]
  popularity: number
  release_date?: string
  video?: boolean
  vote_average: number
  vote_count: number
  name?: string
  original_name?: string
  first_air_date?: string
  origin_country?: string[]
}

export type MultiSearch = ISearch | ISearchPerson;

export interface ISearchFiltered {
  people: ISearchPerson[];
  movies: ISearch[];
  tv: ISearch[];
}

export class ISearch {
  public static filter(results: MultiSearch[]): ISearchFiltered {
    const filtered: ISearchFiltered = {
      movies: [],
      people: [],
      tv: []
    };
    const watchable = [ 'tv', 'movie' ]
    results.forEach((multi) => {
      if (watchable.includes(multi.media_type)) {
        return multi.media_type === 'movie' ? filtered.movies.push(multi as ISearch) : filtered.tv.push(multi as ISearch);
      }
      return filtered.people.push(multi as ISearchPerson);
    })
    return filtered;
  }
}
