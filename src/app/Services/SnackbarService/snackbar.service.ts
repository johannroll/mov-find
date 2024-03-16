import { Injectable, inject } from "@angular/core";
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
            panelClass: ['custom-snackbar', 'snackbar-error'], 
        });

        snackbarRef.onAction().subscribe(() => {
            this.handleUndoAction(movieId);
        });
    }

    displaySuccess(message: string) {
        this.snackbar.open(message, '', { 
            duration: 3000,
            panelClass: ['custom-snackbar', 'snackbar-success'], 
        });
    }

    displayError(error: string) {
        this.snackbar.open(error, '', {  
            duration: 3000,
            panelClass: ['custom-snackbar', 'snackbar-error'], 
        });
    }

    dismissSnackbar() {
        this.snackbar.dismiss();
    }

    private handleUndoAction(movieId: string) {
        this.watchlistService.remove$.next(movieId)
        console.log('Undo action triggered');
    }

}