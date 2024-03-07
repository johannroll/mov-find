import { Component, computed, inject, signal } from "@angular/core";
import { WatchlistService } from "./data-access/watchlist.service";
import { WatchlistListComponent } from "./ui/watchlist-list.component";
import { MatIconModule } from "@angular/material/icon";
import { Location } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";


@Component({
    standalone: true,
    selector: 'app-watchlist',
    imports: [WatchlistListComponent, MatIconModule, MatButtonModule],
    template: `
        <button mat-mini-fab color="accent" class="btn-back" (click)="back().back()">
            <mat-icon>arrow_back</mat-icon>
        </button>
        <div class="container">
            <app-watchlist-list 
                [watchlistItems]="items()"
                (delete)="watchlistService.remove$.next($event)"
            ></app-watchlist-list>
        </div>
    `,
    styles: [``]
})

export default class WatchlistComponent {
    private location = inject(Location)
    watchlistService = inject(WatchlistService)

    items = computed(() =>
            this.watchlistService.watchlistItems()           
    );

    back = signal(this.location);
}