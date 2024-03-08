import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";


@Component({
    standalone: true,
    selector: 'app-searchbar',
    imports: [MatIconModule,MatButtonModule],
    template: `
         <form action="" class="search">
            <input class="search__input" type="search" placeholder="Search" id="searchInput">

            <div class="search__icon-container">
                <label for="searchInput" class="search__label" aria-label="Search">
                    <svg viewBox="0 0 1000 1000" title="Search"><path fill="currentColor" d="M408 745a337 337 0 1 0 0-674 337 337 0 0 0 0 674zm239-19a396 396 0 0 1-239 80 398 398 0 1 1 319-159l247 248a56 56 0 0 1 0 79 56 56 0 0 1-79 0L647 726z"/></svg>
                </label>

                <button class="search__submit" aria-label="Search">
                    <svg viewBox="0 0 1000 1000" title="Search"><path fill="currentColor" d="M408 745a337 337 0 1 0 0-674 337 337 0 0 0 0 674zm239-19a396 396 0 0 1-239 80 398 398 0 1 1 319-159l247 248a56 56 0 0 1 0 79 56 56 0 0 1-79 0L647 726z"/></svg>
                </button>
            </div>
        </form>
    `,
    styles: [`
       

    `]
})

export class SearchbarComponent {

}