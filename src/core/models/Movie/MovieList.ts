export interface Result {
  description: string;
  favorite_count: number;
  id: number;
  item_count: number;
  iso_639_1: string;
  list_type: string;
  name: string;
  poster_path: string;
}

export interface MovieList {
  id: number;
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}
