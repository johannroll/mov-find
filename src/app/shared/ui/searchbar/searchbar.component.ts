import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, inject } from "@angular/core";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import {MatAutocompleteModule, MatAutocompleteTrigger} from '@angular/material/autocomplete';
import { Movie } from "../../interfaces/movie";
import { Router, RouterLink } from "@angular/router";
import { NgOptimizedImage } from "@angular/common";
import { MoviesService } from "../../../Services/MoviesService/movies.service";
import { stopPropagation } from "../../utils/stop-propagation.directive";
import {ProgressSpinnerMode, MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
    standalone: true,
    selector: 'app-searchbar',
    imports: [MatIconModule,MatButtonModule, FormsModule, ReactiveFormsModule, MatAutocompleteModule, RouterLink, NgOptimizedImage, stopPropagation, MatProgressSpinnerModule],
    template: `
       
             <form class="search">
                <input
                    #searchInput
                    [formControl]="searchFormControl"
                    [matAutocomplete]="auto"
                    class="search__input" type="text"
                    placeholder="Search" id="searchInput"
                    [(ngModel)]="searchFormControl.value === null ? '' : searchFormControl.value"
                   
                >
                @if (movieService.formFocus()) {
                    <button disableRipple="true" mat-icon-button color="accent" [class.spinner]="movieService.searchLoading()" class="custom-mat-icon-button" [disabled]="movieService.searchLoading()" (pointerdown)="clearSearch($event); searchResults = []">
                        @if (!movieService.searchLoading()) {
                            <mat-icon>close</mat-icon>
                        }
                    </button>
                } @if (!this.movieService.formFocus() && !movieService.searchLoading()) {
                    <div class="search__icon-container">
                        <label for="searchInput" class="search__label" aria-label="Search">
                            <svg viewBox="0 0 1000 1000" title="Search"><path fill="currentColor" d="M408 745a337 337 0 1 0 0-674 337 337 0 0 0 0 674zm239-19a396 396 0 0 1-239 80 398 398 0 1 1 319-159l247 248a56 56 0 0 1 0 79 56 56 0 0 1-79 0L647 726z"/></svg>
                        </label>
                    </div>
                }
                <mat-autocomplete #auto="matAutocomplete" class="custom-autocomplete" panelWidth="340px" panelClass="custom-autocomplete">
                    @for (movie of searchResults; track $index) {
                    <mat-option [routerLink]="['detail', movie.id]" (click)="this.movieService.movieDetailId$.next(+movie.id); clearSearch($event)" [value]="movie.title" >
                        <div class="search-item-container">
                            <div>
                                @if ($index < 4) {
                                    <img class="search-image" priority [ngSrc]="movie.poster_path !== null ? 'https://image.tmdb.org/t/p/w300/' + movie.poster_path : 'https://fakeimg.pl/600x750?text=No+image'" height="70" width="50">
                                } @else {
                                    <img class="search-image" [ngSrc]="movie.poster_path !== null ? 'https://image.tmdb.org/t/p/w300/' + movie.poster_path : 'https://fakeimg.pl/600x750?text=No+image'" height="70" width="50">
                                }
                            </div>
                            <div>
                                <span> {{ movie.title }}</span>
                                @if (movie.release_date !== '') {
                                    <small> ({{movie.release_date.substring(0,4)}})</small>
                                }
                            </div>
                        </div>
                    </mat-option>
                    } 
                </mat-autocomplete>
            </form>
          
       
        
    `,
    styles: [`
        .searchbar-container {
            display: flex;
            align-items: center;
            justify-items: space-evenly;
        }

        .search-image {
            object-fit: cover;
            border-radius: 4px;
            vertical-align: middle;
            margin: 5px 2px;
        }

        .search-item-container {
            display: flex;
            gap: 10px;
            align-items: center
        }

        .close-searchbar {
            margin-left: 15px;
        }

        .custom-mat-icon-button:hover {
            background-color: transparent !important;
            opacity: 1 !important;
        }

       

    `]
})

export class SearchbarComponent {
    movieService = inject(MoviesService)
    @Input({ required: true }) searchFormControl!: FormControl
    @Input({ required: true }) searchResults! : Movie[]
    @Output() closeMenu = new EventEmitter() 

    @ViewChild('searchInput') searchInput!: ElementRef;
    @ViewChild(MatAutocompleteTrigger) autocompleteTrigger!: MatAutocompleteTrigger;

    clearSearch(event: Event) {
        this.searchFormControl.setValue('');
        event.preventDefault(); 
        // setTimeout(() => 
        //     this.searchInput.nativeElement.focus()
        // , 1);
    }

//   setFocusState(focused: boolean): void {
//     console.log(this.movieService.formFocus());
//     // Optionally, add logic to delay resetting the state to handle instant blur-to-focus transitions between inputs
//     if (focused) {
//       this.movieService.searchState.update((state) => ({
//         ...state,
//           formFocus: true
//       }))
//       this.closeMenu.emit();
//     } else {
//       setTimeout(() => {
//           if (!document.activeElement || document.activeElement.tagName === 'BODY') {
//               this.movieService.searchState.update((state) => ({
//                   ...state,
//                     formFocus: false,
//                 }))
//             }
//       }, 1);     
//     }
//   }

}