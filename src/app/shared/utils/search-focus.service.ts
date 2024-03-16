import { Injectable, inject } from "@angular/core";
import { MoviesService } from "../../Services/MoviesService/movies.service";


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
        const element = document.getElementById('searchInput');
            if (element) {
              
                    console.log('movie detail route and Focus true');
                    element.blur();
              
            }
      }
    
      ngOnDestroy(): void {
        document.removeEventListener('focus', this.handleFocus, true);
        document.addEventListener('blur', this.handleBlur, true);
      }
}