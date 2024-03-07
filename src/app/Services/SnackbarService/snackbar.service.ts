import { Injectable, inject } from "@angular/core";
import {MatSnackBar} from '@angular/material/snack-bar';
import { Movie } from "../../shared/interfaces/movie";

@Injectable({
    providedIn: 'root'
})

export class SnackbarService {
    snackbar = inject(MatSnackBar);

    displaySnackbarMessage(message: string, movieId: string) {
        this.snackbar.open(message, 'Undo', { 
            duration: 3000,
            panelClass: ['custom-snackbar', 'snackbar-success'], 
        });
    }
}