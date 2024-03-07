import { Injectable, InjectionToken, PLATFORM_ID, inject } from "@angular/core";


import { of } from "rxjs";
import { Movie } from "../../shared/interfaces/movie";


export const LOCAL_STORAGE = new InjectionToken<Storage>(
    'window local storage object',
    {
        providedIn: 'root',
        factory: () => {
            return inject(PLATFORM_ID) === 'browser'
            ? window.localStorage
            : ({} as Storage)
        },
    }
);

@Injectable({
    providedIn: 'root',
})

export class StorageService {
    storage = inject(LOCAL_STORAGE);

    loadWatchlist() {
        const watchlist = this.storage.getItem('watchlist');
        return of(watchlist ? (JSON.parse(watchlist) as Movie[]) : []);
    }

    saveWatchlist(watchlist: Movie[]) {
        this.storage.setItem('watchlist', JSON.stringify(watchlist));
    }
}