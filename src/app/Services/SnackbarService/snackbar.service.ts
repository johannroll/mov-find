import { Injectable, inject } from "@angular/core";
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})

export class SnackbarService {
    snackbar = inject(MatSnackBar);

    displaySnackbarMessage(message: string) {
        this.snackbar.open(message, '', { 
            duration: 2000,
            panelClass: ['custom-snackbar', 'snackbar-success'], 
        });
    }
}