import { Injectable, computed, effect, inject, signal } from "@angular/core";
import { StorageService } from "../../Services/StorageService/storage.service";
import { Movie, RemoveMovie } from "../../shared/interfaces/movie";
import { Subject } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";


export interface WatchlistState {
    watchlistItems: Movie[];
    loaded: boolean;
    error: string | null;
}

@Injectable({
    providedIn: 'root'
})

export class WatchlistService {
    storageService = inject(StorageService)
    private state = signal<WatchlistState>({
        watchlistItems: [],
        loaded: false,
        error: null
    })

    private watchlistItemsLoaded$ = this.storageService.loadWatchlist();

    watchlistItems = computed(() => this.state().watchlistItems);
    loaded = computed(() => this.state().loaded);

    add$ = new Subject<Movie>();
    remove$ = new Subject<RemoveMovie>();

    constructor() {
        this.add$.pipe(takeUntilDestroyed()).subscribe((movie) =>
            this.state.update((state) => ({
                ...state,
                    watchlistItems: [
                        ...state.watchlistItems,
                        movie,
                    ],

            }))
        );

        this.remove$.pipe(takeUntilDestroyed()).subscribe((id) =>
            this.state.update((state) => ({
                ...state,
                watchlistItems: state.watchlistItems.filter((item) => item.id !== id),           
            }))
        );

        this.watchlistItemsLoaded$.pipe(takeUntilDestroyed()).subscribe({
            next: (watchlistItems) => 
                this.state.update((state) => ({
                    ...state,
                    watchlistItems,
                    loaded: true,
                })),
            error: (err) =>  this.state.update((state) => ({ ...state, error: err }))
        })

        effect(() => {
            if (this.loaded()) {
                this.storageService.saveWatchlist(this.watchlistItems());
            }
        });

    }
}