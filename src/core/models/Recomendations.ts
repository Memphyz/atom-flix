export interface Result {
  adult: boolean;
  backdrop_path?: any;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  release_date: string;
  poster_path?: any;
  popularity: number;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Recomendations {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}
