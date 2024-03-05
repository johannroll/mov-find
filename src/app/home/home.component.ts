import { Component, NgModule, OnInit, computed, inject, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { MoviesService } from "../Services/MoviesService/movies.service";
import { ReactiveFormsModule, FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { CommonModule, JsonPipe, NgOptimizedImage } from "@angular/common";
import { toSignal } from "@angular/core/rxjs-interop"
import { map, tap } from "rxjs/operators";
import { Lazy } from "swiper";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { Subject } from "rxjs";

export interface ScrollState {
    scroll: number
}

@Component({
    selector: 'app-home',
    standalone : true,
    styles: [`

        .card {
            width: 300px;
            display: flex;
            margin: 1rem;
            flex-direction: column;
            align-items: center;
            background: rgb(58,58,58);
            box-shadow: 0px 2px 10px 2px rgb(0, 0, 0, 0.4);
            transition: all 0.2s ease;
        }

        .card:hover {
            cursor: pointer;
            transform: scale(1.03);
            z-index: 0;
        }

        
        .image {
            width: 300px;
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
            padding: 5px;
            border: none;
            

        }

        @media (max-width: 1000px) {
            .movie-list {
                grid-template-columns: repeat(2, 1fr); 
            }
        }


        @media (max-width: 700px) {
            .movie-list {
                grid-template-columns: 1fr; 
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

        `
    ],
    template:`
        <div  class="container">
            <!-- <h1>{{ movieService.listChoice() }}</h1> -->
            <div  class="movie-list"  infiniteScroll (scrolled)="movieService.state().genre ? movieService.paginationGenre$.next(movieService.lastKnownMovie()) : movieService.pagination$.next(movieService.lastKnownMovie())">
                @for (movie of movieService.movies(); track $index)
                {
                    <div class="card" routerLink="/detail/{{movie.id}}" (click)="movieService.scrollState.set({ scrollTo: scrollPosition() })">
                        @if($index < 4) {
                            <img priority class="image" ngSrc="https://image.tmdb.org/t/p/w500/{{ movie.poster_path }}" width="300" height="450"  >
                        } @else {
                            <img class="image" ngSrc="https://image.tmdb.org/t/p/w500/{{ movie.poster_path }}" width="300" height="450" (click)="this.movieService.movieDetailId$.next(+movie.id)" >
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
    imports: [RouterLink, ReactiveFormsModule, JsonPipe, NgOptimizedImage, InfiniteScrollModule],

})

export default class HomeComponent {
    public movieService = inject(MoviesService);
    
    ngAfterViewInit() {
        window.scrollTo(0, this.movieService.scroll());  
    }
    
    scrollPosition() {
        return window.scrollY + 650;
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