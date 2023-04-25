import { CombinedCredits } from "./CombinedCredits"
import { Credits } from "./Credits"
import { ExternalIDs } from "./ExternalIds"

export interface Person {
  adult: boolean
  also_known_as: string[]
  biography: string
  birthday: string
  deathday: any
  gender: number
  homepage: any
  id: number
  imdb_id: string
  known_for_department: string
  name: string
  place_of_birth: string
  popularity: number
  profile_path: string
  combined_credits: CombinedCredits;
  external_ids: ExternalIDs
  images: Images
  tagged_images: TaggedImages
}

export interface Images {
  profiles: Profile[]
}

export interface TaggedImages {
  page: number
  results: TaggedIMG[]
  total_pages: number
  total_results: number
}

export interface TaggedIMG {
  aspect_ratio: number
  file_path: string
  height: number
  id: string
  iso_639_1?: string
  vote_average: number
  vote_count: number
  width: number
  image_type: string
  media: Media
  media_type: string
}

export interface Media {
  adult?: boolean
  backdrop_path?: string
  id: number
  title?: string
  original_language?: string
  original_title?: string
  overview: string
  poster_path?: string
  media_type: string
  genre_ids?: number[]
  popularity?: number
  release_date?: string
  video?: boolean
  vote_average: number
  vote_count: number
  name?: string
  air_date?: string
  episode_number?: number
  production_code?: string
  runtime?: number
  season_number?: number
  show_id?: number
  still_path?: string
}

export interface Profile {
  aspect_ratio: number
  height: number
  iso_639_1: any
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}