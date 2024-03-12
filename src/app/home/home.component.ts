import { Component, NgModule, OnInit, computed, inject, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { MoviesService } from "../Services/MoviesService/movies.service";
import { ReactiveFormsModule, FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { CommonModule, JsonPipe, NgOptimizedImage } from "@angular/common";
import { toSignal } from "@angular/core/rxjs-interop"
import { map, tap } from "rxjs/operators";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { Subject } from "rxjs";
import { MatIconModule } from "@angular/material/icon";
import { WatchlistService } from "../watchlist/data-access/watchlist.service";
import { MatButtonModule } from "@angular/material/button";
import { stopPropagation } from "../shared/utils/stop-propagation.directive";

export interface ScrollState {
    scroll: number
}

@Component({
    selector: 'app-home',
    standalone : true,
    styles: [`

        .card {
            position: relative;
            width: 320px;
            display: flex;
            margin: 1rem 1rem;
            flex-direction: column;
            align-items: center;
            background: rgb(58,58,58);
            box-shadow: 0px 3px 15px 3px rgb(0, 0, 0, 0.4);
            transition: all 0.2s ease;
        }

        .card:hover {
            cursor: pointer;
            transform: scale(1.03);
            z-index: 0;
        }

        
        .image {
            width: 320px;
            object-fit: cover;
        }

        .title {
            width: 100%;
            background: black;
            text-align: center;
        }

        .movie-list {
            margin-top: 1rem;
            margin-bottom: 3rem;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            place-items: center; 
            padding: 5px;
            border: none;
            place-items: center; 
            

        }

        @media (max-width: 1050px) {
            .movie-list {
                grid-template-columns: repeat(2, 1fr); 
            }
        }


        @media (max-width: 720px) {
            .movie-list {
                grid-template-columns: 250px 250px; 
            }
            .card {
                width: 240px;
                height: 350px;
                margin: 1rem 0rem;
                
            }

            .image {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

        }
        @media (max-width: 530px) {
            .movie-list {
                grid-template-columns: 200px 200px;
               
            }
            .card {
                width: 180px;
                height: 260px;
                margin: 1rem 0rem;
                
            }

            .image {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

        }

        @media (max-width: 425px) {
            .movie-list {
                grid-template-columns: 180px 180px;
               
            }
            .card {
                width: 165px;
                height: 235px;
                margin: 1rem 0rem;
                
            }

            .image {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

        }

        
        
        .movie-list-item {
            text-wrap: no-wrap;
            margin: 3px 0px;
            text-align: center;
            padding: 6px;
            border-radius: 5px;
            background-color: salmon;
            color: azure;
            text-decoration: none;
                
        }

       
        .form {
            display: flex;
            flex-direction: column;
            width: 300px;
            margin-top: 4rem;
            background: rgb(58,58,58);
            padding: 2rem 2rem 2rem;
            border-radius: 5px;
        }

        .form-heading {
            margin: 0rem 0rem 2rem;
            text-align: center;
        }

        .form input {
            margin-bottom: 10px;
            text-align: center;
            border: none;
            outline: none;
            padding: 10px 5px;
            border-radius: 5px;
        }

        .btn-back {
            
            margin: 1rem;
            padding: 10px;
            border-radius: 5px;
            border: none;
            color: azure;
            background: teal;
            transition: all 0.2s ease;
        }

        .btn-back:hover {
            transform: scale(1.05);
        }

        .btn-favorite-home {
            position: absolute !important;
            bottom: 5px;
            right: 0px;
            align-self: center;
            margin: 0rem 5px;
            border: none;
            z-index: 10;
        }

        `
    ],
    template:`
        <div  class="container">
            <!-- <h1>{{ movieService.listChoice() }}</h1> -->
            <div  class="movie-list"  infiniteScroll (scrolled)="movieService.state().genre ? movieService.paginationGenre$.next(movieService.lastKnownMovie()) : movieService.pagination$.next(movieService.lastKnownMovie())">
                @for (movie of movieService.movies(); track $index)
                {
                    <div class="card" routerLink="/detail/{{movie.id}}" (click)="movieService.scrollState.set({ scrollTo: scrollPosition() })">
                        @if($index < 2) {
                            <img priority class="image" [ngSrc]="movie.poster_path !== null ? 'https://image.tmdb.org/t/p/w500/' + movie.poster_path : 'https://fakeimg.pl/600x750?text=No+image'" width="300" height="500">
                        } @else {
                            <img class="image" [ngSrc]="movie.poster_path !== null ? 'https://image.tmdb.org/t/p/w500/' + movie.poster_path : 'https://fakeimg.pl/600x750?text=No+image'" width="300" height="500" (click)="this.movieService.movieDetailId$.next(+movie.id)" >
                        }
                        @if (watchlistService.isMovieOnWatchlist(movie.id)) {
                            <button mat-mini-fab color="warn" class="btn-favorite-home" stopPropagation (click)="watchlistService.remove$.next(movie.id)">
                                <mat-icon>favorite</mat-icon>
                            </button>
                        } @else {
                            <button mat-mini-fab color="none" class="btn-favorite-home" stopPropagation (click)="watchlistService.add$.next(movie)">
                                <mat-icon>favorite</mat-icon>
                            </button>
                        }
                    </div>     
                }
            </div>
            @if (movieService.loading()) {  
                <div class="loader"></div>
            } 
            <!-- <div >
                <form class="form" [formGroup]="myForm" (ngSubmit)="handleSubmit()">
                  
                    <h3 class=form-heading>User Details</h3>
                   
                    <input formControlName="firstName" type="text" placeholder="First name" />
                    <input formControlName="lastName" type="text" placeholder="Last name"/>
                    <input formControlName="email" type="email" placeholder="Email"/>
                    <button class="btn-back" type="submit">Submit</button>
                </form>
            </div> -->

            <!-- <div>
                <ul class=form>
                    @for (post of redditData(); track post.permalink)
                    {
                        <li>{{post.data.title}}</li>
                    }
                </ul>
            </div> -->
        </div>
        `,
    imports: [RouterLink, ReactiveFormsModule, JsonPipe, NgOptimizedImage, InfiniteScrollModule, MatIconModule, MatButtonModule, stopPropagation],

})

export default class HomeComponent {
    public movieService = inject(MoviesService);
    public watchlistService = inject(WatchlistService)
    
    ngAfterViewInit() {
        window.scrollTo(0, this.movieService.scroll());  
    }
    
    scrollPosition() {
        return window.scrollY;
    }

    // private fb = inject(FormBuilder);

    // title = 'Home page'
    // myForm = this.fb.group({
    //     firstName: ['', [Validators.required, Validators.minLength(3)]],
    //     lastName: ['', [Validators.required, Validators.minLength(3)]],
    //     email: ['', [Validators.required, Validators.email]],
    // });

    // handleSubmit() {
    //     console.log("Form is valid", this.myForm.valid);
    //     console.log(this.myForm.value);
        
    // }
   
}