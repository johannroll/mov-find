import { Injectable, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import {MatSnackBar} from '@angular/material/snack-bar';
import { WatchlistService } from "../../watchlist/data-access/watchlist.service";

@Injectable({
    providedIn: 'root'
})

export class SnackbarService {
    snackbar = inject(MatSnackBar);
    watchlistService = inject(WatchlistService)

    displaySnackbarMessage(message: string, movieId: string) {
        let snackbarRef = this.snackbar.open(message, 'Undo', { 
            duration: 3000,
            panelClass: ['custom-snackbar', 'snackbar-success'], 
        });

        console.log(movieId);

        snackbarRef.onAction().subscribe(() => {
            this.handleUndoAction(movieId);
        });
    }

    private handleUndoAction(movieId: string) {
        this.watchlistService.remove$.next(movieId)
        console.log('Undo action triggered');
    }

}