import { MovieList } from "./movielist";

export interface MovielistState {
    movielist : MovieList | null;
    loaded: boolean;
}

