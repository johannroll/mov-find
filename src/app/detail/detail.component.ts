import { Component, OnInit, ViewChild, WritableSignal, computed, inject, signal } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { MoviesService } from "../Services/MoviesService/movies.service";
import { CommonModule, NgOptimizedImage } from "@angular/common";

import { toSignal } from "@angular/core/rxjs-interop";
import { YouTubePlayer } from "@angular/youtube-player";
import { SafePipe } from "../shared/utils/safe.pipe";
import { KeyValuePipe, Location } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SnackbarService } from "../Services/SnackbarService/snackbar.service";
import { WatchlistService } from "../watchlist/data-access/watchlist.service";



@Component({
    selector: 'app-detail',
    standalone : true,
    styles: [
        `
        .movie-detail-container {
            display: flex;
            max-width: 800px;
            width: 100%;
            margin: 2rem 1rem 1rem;
            gap: 20px;
        }

        .movie-description {
            margin-left: 5px;
            margin-right: 5px; 
            padding-left: 12px;
            padding-right: 12px;
            font-weight: 300;
            font-size: 0.9rem;
            color: rgb(215, 215, 215);
        }

        .released, .rating, .language, .cast-text {
            padding-left: 12px;
            padding-right: 12px;
            padding-bottom: 5px;
        }
        
        .cast-text {
            padding-top: 1rem;
            font-size: 1.2rem;
        }

        .movie-details {
            max-width: 430px;
           
        }

        .detail-heading {
            display: flex;
            align-items: baseline;
            gap: 15px;

        }

        .bold {
            font-weight: 600;
        }

        .genre {
            font-size: 0.9rem;
            color: rgb(215, 215, 215);
        }


        .image {
            width: 100%;
            max-width: 350px;
            object-fit: cover;
            box-shadow: 0px 3px 15px 3px rgb(0, 0, 0, 0.4);
        }

        .provider {
            margin-left: 10px;
            border-radius: 10px;
        }

        .provider:hover {
            cursor: pointer;
        }

        .cast {
            display: flex;  
            padding: 5px 2px;
           
        }
        
        .actor {
            height: 100px;
            width: 100px;

        }

        .actor-img {
            border-radius: 2px;
            box-shadow: 0  3px 5px rgb(0,0,0,0.4);
            transition: all 0.2s ease;
            object-fit: cover;
        }

        .actor-img:hover {
            cursor: pointer;
            transform: scale(1.04);
        }

        .actor-name {
            font-size: 0.85rem;
            font-weight: 300;
            inline-size: 16ch;
            overflow-wrap: break-word; 
            color: rgb(215,215,215);
            margin-top: -7px;
        }

        .video-container {
            max-width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding-top: 2rem;
            padding-bottom: 2rem;
            margin-bottom: 2rem;
            overflow-y: auto;       

        }

        .loader-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem 1rem;
        }

        .select-container {
            max-width: 100%;
            display: flex;
            justify-content: space-between;
            margin-top: 1.5rem;
            
        }

        mat-form-field {
            
            margin-left: 12px;
            margin-top: 5px;
            max-width: 100%;    
        }


        .mat-mdc-text-field-wrapper {
            height: 40px;
           
        }

        .carousel-wrapper {
            width: 100%;
        }

        .slick-slider {
            max-width: 800px;
            width: 80%;
            margin-inline: auto; 
            margin-bottom: 2rem;
        }


        .slide {
            padding: 0px 2px;
        }
        
        .slide a {
            padding: 1px;
        }

        @media (max-width: 824px) {
            .movie-detail-container {
                display: flex;
                flex-direction: column;
            }

            .image {
                align-self: center;
            }

            .select-container {
                justify-content: space-evenly;
                padding-left: 15px;
                padding-right: 15px;
            }

            .movie-detail-container {
               width: 100%;
            }

            .movie-details {
                max-width: none;
                width: 100%;
              
            }

            .provider-container {
                margin-top: 1rem;
                
                justify-content: center;
                display: flex;
                gap: 12px;
                flex-wrap: wrap;  
            }

            .provider {
                margin-left: 0px;
            }
           
        }

        @media (max-width: 472px) {
            .select-container {
                flex-direction: column;

            }

            mat-form-field {
                margin-right: 13px;
            }

            .slick-slider {
                
                width: 70%;
                
            }

            
        }
        `
    ],
    template:`
        <button mat-mini-fab color="accent" class="btn-back" (click)="back().back()">
            <mat-icon>arrow_back</mat-icon>
        </button>
        @if (movieService.movieDetailState().loading && !movieService.error()) {
            <div class="loader-wrapper">
                <div class="loader"></div>
            </div>
        } @else {
            @if (watchlistService.isMovieOnWatchlist(movieService.movieDetail()[0].id)) {
                <button mat-fab color="warn" class="btn-favorite" (click)="watchlistService.remove$.next(movieService.movieDetail()[0].id)">
                    <mat-icon>favorite</mat-icon>
                </button>
            } @else {
                <button mat-fab color="none" class="btn-favorite" (click)="watchlistService.add$.next(movieService.movieDetail()[0])">
                    <mat-icon>favorite</mat-icon>
                </button>
            }
             
        <div class="container">
                <!-- <h1>{{ movie.title }}</h1> -->
                <div class="movie-detail-container">
                    
                    <img class="image" priority  [ngSrc]="movieService.movieDetail()[0].poster_path !== null ? 'https://image.tmdb.org/t/p/w500/' + movieService.movieDetail()[0].poster_path : 'https://fakeimg.pl/600x750?text=No+image'" width="300" height="500">
                    <div class="movie-details">
                        <p class="released">
                            @if (movieService.movieDetail()[0].status === "Released") {
                                <span class="bold">Released</span>&nbsp;&nbsp;
                                {{ movieService.movieDetail()[0].release_date.substring(0, 4) }} &nbsp;
                            } @else {
                                <span class="bold">{{ movieService.movieDetail()[0].status }}</span>&nbsp;&nbsp;
                                {{ movieService.movieDetail()[0].release_date }} &nbsp;
                            } 
                            <span class="genre">
                                @for (genre of movie().genres; track $index) {
                                    @if ($index === movie().genres.length -1) {
                                        {{ genre.name.trim() }}
                                    } @else {
                                        {{ genre.name.trim() }} /
                                    }
                                }
                                &nbsp;({{ movieService.movieDetail()[0].runtime }} minutes)
                            </span>
                        </p>
                        <p class="rating"><span class="bold">Rating</span> {{ +movieService.movieDetail()[0].vote_average / 10 * 100 | number:'2.2-2'  }} <span class="genre">({{ movieService.movieDetail()[0].vote_count }})</span></p>
                        <p class="language"><span class="bold">Language </span> {{ getLanguageName(movieService.movieDetail()[0].original_language) }}</p>
                        <p class="movie-description">{{ movieService.movieDetail()[0].overview }}</p>
                       
                            <div class="select-container">
                                <mat-form-field color="accent" secondary appearance="outline">
                                    <mat-label>Select Country</mat-label>
                                    <mat-select (selectionChange)="country.set(countrySelected($event.value))" #selectRef>
                                        @if ((movieService.movieDetail()[3].results | json) === '{}') {
                                            <mat-option>None</mat-option>
                                        }
                                        @for (country of movieService.movieDetail()[3].results | keyvalue; track country.key) {
                                        <mat-option [value]="country.key">{{ getCountryName(country.key) }}</mat-option>
                                        }
                                    </mat-select>
                                </mat-form-field>
                                @if (country() !== null) {
                                <mat-form-field color="accent" class="type" appearance="outline">
                                    <mat-label>Provider type</mat-label>
                                    <mat-select (selectionChange)="type.set(providerTypeSelected($event.value))">
                                        @if ((movieService.movieDetail()[3].results | json) === '{}') {
                                            <mat-option>None</mat-option>
                                        }
                                        @for (countryProviderType of movieService.movieDetail()[3].results[country()] | keyvalue; track countryProviderType.key) {
                                            @if (countryProviderType.key !== 'link') {
                                                <mat-option [value]="countryProviderType.key">{{ countryProviderType.key }}</mat-option>
                                            }
                                        }
                                    </mat-select>
                                </mat-form-field>
                                }
                            </div>
                            @if (movieService.movieDetail()[3].results.length != {} && movieService.movieDetail()[3].results != undefined && country() !== null && type() !== null) {
                        
                                <span class="provider-container">
                                    @for (provider of movieService.movieDetail()[3].results[country()][type()]; track $index) {
                                        <img class="provider" ngSrc="https://image.tmdb.org/t/p/original{{provider.logo_path}}" width="50" height="50" />
                                    }
                                </span>

                            } 
                        
                    </div>
                    
                </div>
                <p class="cast-text">Cast</p>
                <div class="carousel-wrapper">
                    <ngx-slick-carousel class="carousel"
                        #slickModal="slick-carousel"
                        [config]="slideConfig"
                        (init)="slickInit($event)"
                        (breakpoint)="breakpoint($event)"
                        (afterChange)="afterChange($event)"
                        (beforeChange)="beforeChange($event)">
                        @for (actor of movieService.movieDetail()[1]?.cast; track actor.id) {
                            @if (actor.order < 10) {
                                <div ngxSlickItem class="slide">
                                    <a routerLink="/actor/{{actor.id}}">
                                        <img (click)="movieService.actorId$.next(actor.id)" class="actor-img" priority [ngSrc]="actor.profile_path !== null ? 'https://image.tmdb.org/t/p/w300/' + actor.profile_path : 'https://fakeimg.pl/600x750?text=No+image'" width="120" height="180"/>
                                    </a>
                                    <div class="actor-name">{{ actor.name }}</div>
                                </div>
                                }
                            }
                    </ngx-slick-carousel>
                </div>
                <div class="video-container">
                @if (!movieService.movieDetailState().loading) {  
                    @if(movieService.movieDetail()[2].results.length > 0) {
                        @if (movieService.movieDetail()[2].results.length > 2) {
                            <youtube-player id="video-player" [videoId]="movieService.movieDetail()[2]?.results[movieService.movieDetail()[2]?.results.length - 2]?.key"
                                width="500"
                                height="250"
                                suggestedQuality="hd1080"> 
                            </youtube-player>
                        } @else if (movieService.movieDetail()[2].results.length <= 2) {
                            <youtube-player id="video-player" [videoId]="movieService.movieDetail()[2]?.results[0]?.key"
                                width="500"
                                height="250"
                                suggestedQuality="hd1080"> 
                            </youtube-player>
                        } 
                    } @else {
                        <p>No video available</p>
                    }
                }
                </div>
            </div>
        }
        `,
    imports: [
        RouterLink, 
        CommonModule, 
        NgOptimizedImage, 
        YouTubePlayer, 
        SafePipe, 
        KeyValuePipe,
        MatFormFieldModule, 
        MatSelectModule, 
        MatInputModule,
        MatButtonModule,
        MatIconModule, 
        FormsModule,
        SlickCarouselModule
    ],
})

export default class DetailComponent {
    private route = inject(ActivatedRoute)
    private location = inject(Location)
    movieService = inject(MoviesService)
    snackbarService = inject(SnackbarService)
    watchlistService = inject(WatchlistService)

    params = toSignal(this.route.paramMap);
    back = signal(this.location);

    // moviedetail = computed(() =>  this.movieService.movieDetailId$.next(Number(this.params()?.get('id'))));
    
    movie = computed(() => this.movieService.movieDetail()[0]);

    // movieGenres = computed(() => this.movieService.getMovieGenres(this.movie()?.genre_ids))

   country = signal<any>(null);
   type = signal<any>(null);


   ngAfterViewInit() {
       window.scrollTo(0, 0);
       if (this.params()?.get('id') !== null) {
           this.movieService.movieDetailId$.next(Number(this.params()?.get('id')))
       }
   }

    countrySelected(selection: any) {
       return selection.toString();
    }

    providerTypeSelected(selection: any) {
       return selection.toString();
    }

    getCountryName(countryCode: any): string | undefined {
        const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
        return regionNames.of(countryCode);
    }

    getLanguageName(languageCode: any): string | undefined {
        const languageNames = new Intl.DisplayNames(['en'], { type: 'language' });
        return languageNames.of(languageCode);
    }

    //Carousel

    slideConfig = {
        slidesToShow: 5,
        slidesToScroll: 2,
        infinite: false,
        dots: false,
        arrows: true,
        draggable: true,
        accessibility: false,
        responsive: [
            {
                breakpoint: 800,
                settings: {
                slidesToShow: 4,
                dots: false,
                arrows: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                slidesToShow: 4,
                dots: false,
                arrows: false
                }
            },
            {
                breakpoint: 620,
                settings: {
                slidesToShow: 3,
                dots: false,
                arrows: false
                }
            },
            {
                breakpoint: 620,
                settings: {
                slidesToShow: 3,
                dots: false,
                arrows: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                slidesToShow: 2,
                dots: false,
                arrows: false
                }
            }
        ]
    };
  
    slickInit(e: any) {
        console.log('slick initialized');
    }
    
    breakpoint(e: any) {
        console.log('breakpoint');
    }
    
    afterChange(e: any) {
        console.log('afterChange');
    }
    
    beforeChange(e: any) {
        console.log('beforeChange');
    }
       
}

