import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, computed, effect, inject, signal } from "@angular/core";
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";
import { EMPTY, Observable, Subject, forkJoin } from "rxjs";
import { catchError, concatMap, debounceTime, distinctUntilChanged, filter, map, startWith, switchMap, takeUntil, tap } from "rxjs/operators";
import { Movie } from "../../shared/interfaces/movie";
import { TmdbResponse, WatchProviderResponse } from "../../shared/interfaces/tmdbResponse";
import { Genre } from "../../shared/interfaces/genre";
import { GenresResponse } from "../../shared/interfaces/genreResponse";
import { FormControl } from "@angular/forms";
import { NavigationEnd, NavigationStart, Router } from "@angular/router";
import { SnackbarService } from "../SnackbarService/snackbar.service";

export interface MoviesState {
  movies: Movie[];
  genres: Genre[];
  loading: boolean;
  lastKnownMovie: string | null;
  page: number;
  error: string | null;
  genre: string | null;
}

export interface MovieDetailState {
  data: any[];
  loading: boolean;
}

export interface ActorState {
  data: any | null;
  loading: boolean;

}

export interface SearchState {
  results: Movie[];
  loading: boolean;
  formFocus: boolean;
}

export interface ScrollState {
  scrollTo: number;
}

export interface DrawerState {
  open: boolean;
}

export interface CountryInfo {
  countryName: string;
  [key: string]: any;
}


@Injectable({
    providedIn: 'root',
    
})

export class MoviesService {
router = inject(Router)
snackbarService = inject(SnackbarService)
currentRoute = computed(() => this.router.url);

// initial drawer state
drawerState = signal<DrawerState>({
  open: false
})

  // initial scroll state
scrollToTop : number = 0;
scrollState = signal<ScrollState>({
  scrollTo: this.scrollToTop,
})

scroll = computed(() => this.scrollState().scrollTo);

private http = inject(HttpClient)
private options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZjZmNDhmZWQ2NWJkNDNjM2M1MDc0MDEwMDE1Y2M1MSIsInN1YiI6IjY0NTYzOTE3OTFmMGVhMDE3YmNjOWI0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JmQ9hCMyvUNPimkE1x3nIvShYlOLP8O5XfwYy9vOkj0'
    }
  };
   
  //set initial state
  state = signal<MoviesState>({
    movies: [],
    genres: [],
    loading: true,
    lastKnownMovie: null,
    page: 1,
    error: null,
    genre: null
  })

  movieDetailState = signal<MovieDetailState>({
    data: [],
    loading: true,
  })

  actorState = signal<ActorState>({
    data: null,
    loading: true
  })

  searchState = signal<SearchState>({
    results: [],
    loading: true,
    formFocus: false
  })

  #movielists = signal<string[]> ([
    'now_playing',
    'popular',
    'top_rated',
    'upcoming'
  ]);

  movielist = this.#movielists.asReadonly();
  
  // selectors
  movies = computed(() => this.state().movies);
  genres = computed(() => this.state().genres);
  loading = computed(() => this.state().loading);
  lastKnownMovie = computed(() => this.state().lastKnownMovie);
  page = computed(() => this.state().page);
  error = computed(() => this.state().error);
  selection = computed(() => this.listChoice());
  genre = computed(() => this.state().genre);
  movieDetail = computed(() => this.movieDetailState().data);
  laodingDetail = computed(() => this.movieDetailState().loading);
  loadingActor = computed(() => this.actorState().loading);
  actorDetail = computed(() => this.actorState().data);
  searchResults = computed(() => this.searchState().results);
  searchLoading = computed(() => this.searchState().loading);
  formFocus = computed(() => this.searchState().formFocus);
  drawerOpen = computed(() => this.drawerState().open);
  countriesSorted = computed(() => this.sortCountries(this.movieDetailState().data[3]));
   
  //source
  genres$ = this.getGenres();
  pagination$ = new Subject<string | null>();
  paginationGenre$ = new Subject<string | null>();
  genre$ = new Subject<Genre>();
  
  movielist$ = new Subject<string>();
  listChoice = toSignal(this.movielist$.pipe(
    startWith(this.movielist()[0]),
    map((choice) => this.formatString(choice))
  ));

  searchFormControl = new FormControl();

  private searchChanged$ = this.searchFormControl.valueChanges.pipe(
    debounceTime(600),
    distinctUntilChanged(),
    tap(() => this.searchState.update((state) => ({
      ...state,
      results: [],
      loading: true,
    }))),
    switchMap((searchterm) =>  this.fetchSearchResults(searchterm))
  );
  
  private moviesByGenre$ = this.genre$.pipe(
    tap(() => this.state.update((state) => ({
      ...state,
      movies: [],
      page: 1, 
    })) ), 
    switchMap((genre) =>
    this.paginationGenre$.pipe(
      distinctUntilChanged(),
      startWith(null),
      tap(() => {
        this.state.update((state) => ({ 
          ...state, 
          loading: true,
          genre: genre.name,
        }));
      }),
      concatMap((lastKnownMovie) => this.fetchMoviesByGenre(genre.id, this.page()))
    )
  ));

  private error$ = new Subject<string | null>();

  private movies$ = this.movielist$.pipe(
    startWith('now_playing'),
    tap(() => { 
      this.state.update((state) => ({
      ...state,
      lastKnownMovie: null
      }))
    }),
    switchMap((listoption) =>
    this.pagination$.pipe(
      distinctUntilChanged(),
      startWith(null),
      tap(() => {
        this.state.update(state => ({ 
          ...state, 
          loading: true,
          genre: null 
        }));
      }),
      concatMap((lastKnownMovie) => this.fetchMovies(listoption, this.page()))
    )
  ));

  movieDetailId$ = new Subject<number | undefined | null>();

  private movieDetails$ = this.movieDetailId$.pipe(
    tap(() => this.movieDetailState.update((state) => ({ 
      ...state,
      loading: true,
      data: [] 
    }))),
    switchMap((movieId) => {
      return forkJoin([
          this.fetchMovie(movieId),
          this.fetchMovieCast(movieId),
          this.fetchMovieTrailer(movieId),
          this.fetchMovieWatchProviders(movieId)
        ])

    })  
  )

  actorId$ = new Subject<number | undefined | null>();

  private actorDetails$ = this.actorId$.pipe(
    tap(() => this.actorState.update((state) => ({
      ...state,
      data: null,
      loading: true,
    }))),
    switchMap((actorId) => 
      this.fetchActorDetail(actorId)
    )
  )


  constructor() {
    //reducers
    this.movielist$.pipe(takeUntilDestroyed()).subscribe(() => {
      this.state.update((state) => ({
          ...state,
          movies: [],
          loading: true,
          lastKnownMovie: null,
          page: 1,
      }));
    });

    this.genres$.pipe(takeUntilDestroyed()).subscribe((genres) => {
      this.state.update((state) => ({
        ...state,
        genres: [...genres],
      }))
    })

    this.movies$.pipe(takeUntilDestroyed(), tap((value) => console.log("Movies: ",value.lastKnownMovie))).subscribe((response) =>
      
        this.state.update((state) => ({
          ...state,
          movies: [...state.movies, ...response.movies],
          loading: false,
          lastKnownMovie: response.lastKnownMovie,
          page: state.page + 1,
        }))
    );

    this.moviesByGenre$.pipe(takeUntilDestroyed(), tap((value) => console.log("MovieGenre: ",value.lastKnownMovie))).subscribe((response) =>
        this.state.update((state) => ({
          ...state,
          movies: [...state.movies, ...response.movies],
          loading: false,
          lastKnownMovie: response.lastKnownMovie,
          page: state.page + 1,
        }))
    );

    this.movieDetails$.pipe(takeUntilDestroyed(), tap((value) => console.log(value))).subscribe((response) =>
        this.movieDetailState.update((state) => ({
          ...state,
          data: [...response],
          loading: false,
        }))
    );

    this.actorDetails$.pipe(takeUntilDestroyed()).subscribe((response) =>
        this.actorState.update((state) => ({
          ...state,
          data: response,
          loading: false
        }))
    );

    this.searchChanged$.pipe(takeUntilDestroyed()).subscribe((response) =>
        this.searchState.update((state) => ({
          ...state,
          results: [...state.results, ...response.movies],
          loading: false,
        }))
    );

    this.error$.pipe(takeUntilDestroyed()).subscribe((error) =>
      this.state.update((state) => ({
          ...state,
          error,
      }))
    );
  }
  
  private fetchMovies(movielist: string, page: number) {
    return this.http
        .get<TmdbResponse>(`https://api.themoviedb.org/3/movie/${movielist}?language=en-US&page=${page}`, this.options)
        .pipe(
            catchError((err) => {
              this.handleError(err)
              this.state.update((state) => ({
                ...state,
                loading: false
              }))
              return EMPTY}),
            map(( response ) => {
              const movies = response.results
              const lastKnownMovie = movies.length
                ? movies[movies.length -1].title
                : null; 
                return { movies, lastKnownMovie }
              }       
        )) 
  }

  private getGenres() {
    return this.http
      .get<GenresResponse>('https://api.themoviedb.org/3/genre/movie/list?language=en', this.options)
      .pipe(
          catchError((err) => {
            this.handleError(err)
            return EMPTY}),
          map((response) => {
            return response.genres
          })
      )
  }

  private fetchMoviesByGenre(genreId: string, page: number) {
    return this.http
      .get<TmdbResponse>(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genreId}`, this.options)
      .pipe(
        catchError((err) => {
          this.handleError(err)
          this.state.update((state) => ({
            ...state,
            loading: false
          }))
          return EMPTY}),
        map(( response ) => {
          const movies = response.results
          const lastKnownMovie = movies.length
            ? movies[movies.length -1].title
            : null; 
            return { movies, lastKnownMovie }
          }       
        )
      ) 
  }

  private fetchMovie(movieId: number | undefined | null) {
    return this.http
      .get(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, this.options)
      .pipe(
        catchError((err) => {
          this.handleError(err)
          this.movieDetailState.update((state) => ({
            ...state,
            loading: false
          }))
          return EMPTY}),
        map(( response ) => {
              return response
          }
        )
      )
  }

  private fetchMovieCast(movieId: number | undefined | null) {
    return this.http
      .get(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, this.options)
      .pipe(
        catchError((err) => {
          this.handleError(err)
          return EMPTY}),
        map(( response ) => {
              return response
          }
        )
      )
  }

  private fetchMovieWatchProviders(movieId: number | undefined | null) {
    return this.http
      .get<WatchProviderResponse>(`https://api.themoviedb.org/3/movie/${movieId}/watch/providers`, this.options)
      .pipe(
        catchError((err) => {
          this.handleError(err)
          return EMPTY}),
        map(( response ) => {
              this.sortCountries(response)
              return response
          }
        )
      )
  }

  private fetchMovieTrailer(movieId: number | undefined | null) {
    return this.http
    .get(`https://api.themoviedb.org/3/movie/${movieId}/videos`, this.options)
    .pipe(
      catchError((err) => {
        this.handleError(err)
        return EMPTY}),
      map(( response ) => {
            return response
        }
      )
    )
  }

  private fetchActorDetail(actorId: number | undefined | null) {
    return this.http
    .get(`https://api.themoviedb.org/3/person/${actorId}`, this.options)
    .pipe(
      catchError((err) => {
        this.handleError(err)
        this.actorState.update((state) => ({
          ...state,
          loading: false
        }))
        return EMPTY}),
      map(( response ) => {
            return response
        }
      )
    )
  }

  getMovieGenres(genres: number[] | undefined) {
    let movieGenres = <any>[];
    if (genres !== undefined) {
      for (let genre of genres) {
        movieGenres.push(
          this.genres().find((genreName) =>
              +genreName.id === genre)
        )
      }
      return movieGenres

    } else {

      return []
    }
  }

  fetchSearchResults(searchterm: string) {
    return this.http
    .get<TmdbResponse>(`https://api.themoviedb.org/3/search/movie?query=${searchterm}&include_adult=false&language=en-US&page=1`, this.options)
    .pipe(
      catchError((err) => {
        this.handleError(err)
        this.searchState.update((state) => ({
          ...state,
          loading: false
        }))
        return EMPTY}),
      map(( response ) => {
        const movies = response.results
        const lastKnownMovie = movies.length
          ? movies[movies.length -1].title
          : null; 
          return { movies, lastKnownMovie }
        }       
      )) 
  }

  formatString(string: string) {
    return string
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLocaleLowerCase())
    .join(' ');
  }

  private handleError(err: HttpErrorResponse) {
    // Generic error if no cases match
    if (err.url && err.status === 404) {
      this.error$.next('Not found');
    } else if (err.url && err.status === 500) {
      this.error$.next('Server error, please try again');
    } else if (err.url && err.status === 400) {
      this.error$.next('Invalid request')
    }

    if (err) {
      this.movielist$.next('now_playing')
    }
  }

  setDrawerState(booleanValue: boolean) {
    this.drawerState.update((state) => ({
      ...state,
      open: booleanValue
    }))
    console.log(this.drawerOpen());
  }

  sortCountries(watchProvider: any = { results: {} }) {
    const newObject: { [key: string]: CountryInfo } = Object.keys(watchProvider.results).reduce((acc: { [key: string]: CountryInfo }, countryCode) => {
      const countryObject: CountryInfo = { ...watchProvider.results[countryCode], countryName: this.getCountryName(countryCode) };
      
      acc[countryCode] = countryObject;
      return acc;
    }, {});

    const sortedArray = Object.entries(newObject).sort((a, b) => {
      const countryNameA = a[1].countryName.toUpperCase(); 
      const countryNameB = b[1].countryName.toUpperCase();
      return countryNameA.localeCompare(countryNameB);
    });

    const orderedData = sortedArray.map(([key, value]) => ({ key, ...value }));
    return orderedData;
  }

  getCountryName(countryCode: any): string | undefined {
    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
    return regionNames.of(countryCode);
}
}