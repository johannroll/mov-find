import { Injectable, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import {MatSnackBar} from '@angular/material/snack-bar';
import { WatchlistService } from "../../watchlist/data-access/watchlist.service";
import { HttpErrorResponse } from "@angular/common/http";
import { NetworkConnectionService } from "../../shared/utils/network-connection.service";

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

        snackbarRef.onAction().subscribe(() => {
            this.handleUndoAction(movieId);
        });
    }

    displayError(error: string) {
        this.snackbar.open(error, 'Dismiss', {  duration: 3000});
    }

    private handleUndoAction(movieId: string) {
        this.watchlistService.remove$.next(movieId)
        console.log('Undo action triggered');
    }

}