import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Movie, RemoveMovie } from "../../shared/interfaces/movie";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { NgOptimizedImage } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
    standalone: true,
    selector: 'app-watchlist-list',
    imports: [MatIconModule, MatButtonModule,  NgOptimizedImage,RouterLink],
    template: `
        <section>
            <ul class="watchlist">
                @for (item of watchlistItems; track item.id){
                <li >
                    <div class="watchlist-item-container">   
                        <div class="watchlist-item" routerLink="/detail/{{item.id}}">
                            <img class="watchlist-item-image" priority  ngSrc="https://image.tmdb.org/t/p/w500/{{ item.poster_path }}" width="500" height="750">                    
                            <div class="watchlist-item-details">
                                <p>{{ item.title }}</p>
                            </div>
                        </div>
                        <button class="remove-btn" mat-icon-button (click)="delete.emit(item.id)">
                           <mat-icon>
                                cancel
                           </mat-icon>
                        </button>
                    </div>
                </li>
                } @empty {
                <div>
                    <h2>No added movies yet</h2>
                </div>
                }
            </ul>
        </section>
    `,
    styles: [`
        .watchlist {
            max-width: 550px;
            display: flex;
            flex-direction: column;
        }

        .watchlist li {
            margin-bottom: 1rem;
        }

        .watchlist-item-container {
            width: 550px;
            display: grid;
            grid-template-columns:  490px 60px;
            
        }

        .watchlist-item {
            display: flex;
            align-items: center;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.2s ease;
            border: 1px solid rgb(190,190,190, 0.8);
            box-shadow: 2px 2px 10px 2px rgb(0, 0, 0, 0.2);
            
        }

        .watchlist-item:hover {
            transform: scale(1.025);
        }
        
        .watchlist-item-details {
            width: 450px;
            display: flex;
            align-items: center;
            margin-left: 10px;
            font-size: 1rem;
        }
        
        .watchlist-item-image {
            height: 75px;
            width: 450px;
            object-fit: cover;
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
        }

        .remove-btn {
           align-self: center;
           margin: auto;
        }

        @media (max-width: 610px) {
            .watchlist-item-container {
                width: 450px;
                grid-template-columns:  410px 40px;
                
            }
        }

        @media (max-width: 500px) {
            .watchlist-item {
                flex-direction: column;
            }

            .watchlist-item-details {
                width: 300px;
                font-size: 0.9rem;
            }
        
            .watchlist-item-image {
                width: 300px;
                border-top-left-radius: 10px;
                border-top-right-radius: 10px;
                border-bottom-left-radius: 0px;
            }

            .watchlist-item {
                width: 300px;
            }

            .watchlist-item-container {
                width: 350px;
                grid-template-columns:  310px 40px;
                
            }
        }

        @media (max-width: 400px) {
            .watchlist-item {
                flex-direction: column;
            }

            .watchlist-item-details {
                width: 275px;
                font-size: 0.8rem;
            }
        
            .watchlist-item-image {
                width: 275px;
            }

            .watchlist-item {
                width: 275px;
            }

            .watchlist-item-container {
                width: 315px;
                grid-template-columns:  275px 45px;    
            }

            .remove-btn {
                margin-left: 7px;
            }

            .watchlist-item-image {
                height: 90px;
            }
        }
    `]
})

export class WatchlistListComponent {
    @Input({ required: true }) watchlistItems!: Movie[];
    @Output() delete = new EventEmitter<RemoveMovie>();
}