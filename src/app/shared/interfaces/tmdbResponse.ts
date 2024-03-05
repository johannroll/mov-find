import { Movie } from "./movie";

export interface TmdbResponse {
    page: number;
    total_pages: number;
    total_results: number;
    results: Movie[];
  }
  