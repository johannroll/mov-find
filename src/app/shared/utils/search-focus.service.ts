import { Injectable, WritableSignal, computed, inject, signal } from "@angular/core";
import { MoviesService } from "../../Services/MoviesService/movies.service";
import { MatDrawer, MatDrawerToggleResult } from "@angular/material/sidenav";

export interface FocusState {
    value: boolean;
}

@Injectable({
    providedIn: 'root'
})

export class SearchFocusService {
    movieService = inject(MoviesService)
    constructor() {
        this.listenToFocusEvents();
      }

      isFocused: boolean = false;
    
      private listenToFocusEvents() {
        document.addEventListener('focus', this.handleFocus, true);
        document.addEventListener('blur', this.handleBlur, true);
      }
    
      private handleFocus = (event: FocusEvent) => {
        
        const target = event.target as HTMLElement;
        if (target && target.matches('input.search__input')) {
         this.isFocused = true;
        console.log('Focus event on specific input:', target);
         this.movieService.searchState.update((state) => ({
            ...state,
            formFocus: true
         }))
        }
      };

      private handleBlur = (event: FocusEvent) => {
       
        const target = event.target as HTMLElement;
    
        if (target && target.matches('input.search__input')) {
            this.isFocused = false;
          console.log('Blur event on specific input:', target);
          this.movieService.searchState.update((state) => ({
            ...state,
            formFocus: false
         }))
        }
      };

      removeFocus() {
        const element = document.getElementById('searchInput') as HTMLElement;
            if (this.isFocused) {
                setTimeout(() => {
                    console.log('movie detail route and Focus true');
                    element.blur();
                }, 0)
            }
      }
    
      ngOnDestroy(): void {
        document.removeEventListener('focus', this.handleFocus, true);
        document.addEventListener('blur', this.handleBlur, true);
      }
}