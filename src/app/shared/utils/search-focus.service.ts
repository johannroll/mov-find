import { Injectable, inject } from "@angular/core";
import { MoviesService } from "../../Services/MoviesService/movies.service";
import { MatDrawer, MatDrawerToggleResult } from "@angular/material/sidenav";

@Injectable({
    providedIn: 'root'
})

export class SearchFocusService {
    movieService = inject(MoviesService)
    doCument = inject(Document)
    constructor() {
        this.listenToFocusEvents();
      }
    
      private listenToFocusEvents() {
        document.addEventListener('focus', this.handleFocus, true);
        document.addEventListener('blur', this.handleBlur, true);
      }
    
      private handleFocus = (event: FocusEvent) => {
        const target = event.target as HTMLElement;
    
        if (target && target.matches('input.search__input')) {
          console.log('Focus event on specific input:', target);
         this.movieService.searchState.update((state) => ({
            ...state,
            formFocus: true
         }))
        //  const drawer : MatDrawer = this.document.querySelector('#drawer');
        //  if (drawer !== null) {
        //      drawer.close();
        //  }

        }
      };

      private handleBlur = (event: FocusEvent) => {
        const target = event.target as HTMLElement;
    
        if (target && target.matches('input.search__input')) {
          console.log('Blur event on specific input:', target);
          this.movieService.searchState.update((state) => ({
            ...state,
            formFocus: false
         }))
        }
      };
    
      ngOnDestroy(): void {
        document.removeEventListener('focus', this.handleFocus, true);
        document.addEventListener('blur', this.handleBlur, true);
      }
}