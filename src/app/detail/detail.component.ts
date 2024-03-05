import { Component, OnInit, ViewChild, WritableSignal, computed, inject, signal } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { MoviesService } from "../Services/MoviesService/movies.service";
import { Movie } from "../shared/interfaces/movie";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { map, tap } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";
import { YouTubePlayer } from "@angular/youtube-player";
import { NgxYoutubePlayerModule, YouTubePlayerRef, YoutubePlayerComponent, YoutubePlayerService } from "ngx-youtube-player";
import { VgCoreModule} from "@videogular/ngx-videogular/core"
import { VgControlsModule} from "@videogular/ngx-videogular/controls"
import { VgOverlayPlayModule} from "@videogular/ngx-videogular/overlay-play"
import { VgBufferingModule} from "@videogular/ngx-videogular/buffering"
import { SafePipe } from "../shared/utils/safe.pipe";
import { KeyValuePipe } from "@angular/common";
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelect, MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { SlickCarouselModule } from 'ngx-slick-carousel';


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
            padding-left: 12px;
            padding-right: 12px;
            font-weight: 300;
            font-size: 0.9rem;
            color: rgb(215, 215, 215);
        }

        .released, .rating, .language, .cast-text {
            padding-left: 12px;
            padding-right: 12px;
        } 

        .btn-back {
            position: fixed;
            top: 90px;
            width: 100px;
            align-self: flex-start;
            margin: 0rem 12px;
            padding: 10px;
            border-radius: 5px;
            border: none;
            color: azure;
            background: teal;
            transition: all 0.2s ease;
            box-shadow: 0 2px 4px 2px rgb(0, 0, 0, 0.2);
            z-index: 10;
        }

        .btn-back:hover {
            transform: scale(1.05);
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
            box-shadow: 0px 2px 10px 2px rgb(0, 0, 0, 0.4);
        }

        .provider {
            margin-right: 10px;
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
            width: 60px;
           
           

        }

        .actor-img {
            border-radius: 5px;
            box-shadow: 0  3px 5px rgb(0,0,0,0.4);
            transition: all 0.2s ease;
        }

        .actor-img:hover {
            cursor: pointer;
            transform: scale(1.04);
        }

        .actor-name {
            font-size: 0.85rem;
            font-weight: 300;
            inline-size: 10ch;
            overflow-wrap: break-word; 
            color: rgb(215,215,215);
        }

        .video-container {
            max-width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding-top: 2rem;
            padding-bottom: 2rem;
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
            
        }

        mat-form-field {
            margin-right: 3px;
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
            width: 83%;
            margin-inline: auto;
           
           
        }

        @media (max-width: 750px) {
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
                padding-left: 12px;
                padding-right: 12px;
            }

           
        }

        @media (max-width: 472px) {
            .select-container {
                flex-direction: column;
            }

            mat-form-field {
                margin-right: 0px;
            }

            .movie-details {
               
            }

        }
        `
    ],
    template:`
        <button class="btn-back" routerLink="/home">Back</button>
        <div class="container">
            @if (movie(); as movie) {
                <!-- <h1>{{ movie.title }}</h1> -->
                <div class="movie-detail-container">
                    
                    <img class="image" priority  ngSrc="https://image.tmdb.org/t/p/w500/{{ movie.poster_path }}" width="300" height="450">
                    <div class="movie-details">
                        <p class="released"><span class="bold">Released </span>{{ movie.release_date.substring(0, 4) }} &nbsp;&nbsp;
                            <span class="genre">
                                @for (genre of movieGenres(); track $index) {
                                    @if ($index === movieGenres().length -1) {
                                        {{ genre.name.trim() }}
                                    } @else {
                                        {{ genre.name.trim() }} /
                                    }
                                }
                            </span>
                        </p>
                        <p class="rating"><span class="bold">Rating</span> {{ +movie.vote_average / 10 * 100 | number:'2.2-2'  }} <span class="genre">({{ movie.vote_count }})</span></p>
                        <p class="language"><span class="bold">Language </span> {{ getLanguageName(movie.original_language) }}</p>
                        <p class="movie-description">{{ movie.overview }}</p>
                        @if (movieService.movieDetailState().loading) {
                            <div class="loader-wrapper">
                                <div class="loader"></div>
                            </div>
                        } @else {
                            <div class="select-container">
                                <mat-form-field secondary appearance="outline">
                                    <mat-label>Select Country</mat-label>
                                    <mat-select (selectionChange)="country.set(countrySelected($event.value))" #selectRef>
                                        @if ((movieService.movieDetail()[2].results | json) === '{}') {
                                            <mat-option>None</mat-option>
                                        }
                                        @for (country of movieService.movieDetail()[2].results | keyvalue; track country.key) {
                                        <mat-option [value]="country.key">{{ getCountryName(country.key) }}</mat-option>
                                        }
                                    </mat-select>
                                </mat-form-field>
                                @if (country() !== null) {
                                <mat-form-field class="type" appearance="outline">
                                    <mat-label>Provider type</mat-label>
                                    <mat-select (selectionChange)="type.set(providerTypeSelected($event.value))">
                                        @if ((movieService.movieDetail()[2].results | json) === '{}') {
                                            <mat-option>None</mat-option>
                                        }
                                        @for (countryProviderType of movieService.movieDetail()[2].results[country()] | keyvalue; track countryProviderType.key) {
                                            @if (countryProviderType.key !== 'link') {
                                                <mat-option [value]="countryProviderType.key">{{ countryProviderType.key }}</mat-option>
                                            }
                                        }
                                    </mat-select>
                                </mat-form-field>
                                }
                            </div>
                            @if (movieService.movieDetail()[2].results.length != {} && movieService.movieDetail()[2].results != undefined && country() !== null && type() !== null) {
                        
                                <span class="provider-container">
                                    @for (provider of movieService.movieDetail()[2].results[country()][type()]; track $index) {
                                        <img class="provider" ngSrc="https://image.tmdb.org/t/p/original{{provider.logo_path}}" width="40" height="40" />
                                    }
                                </span>

                            } 
                            <p class="cast-text">Cast</p>
                            <!-- <span class="cast">
                                @for (actor of movieService.movieDetail()[0]?.cast; track actor.id) {
                                    @if (actor.order < 8) {
                                        <div class="actor" >
                                            <a routerLink="/actor/{{actor.id}}">
                                                <img (click)="movieService.actorId$.next(actor.id)" class="actor-img" priority [ngSrc]="actor.profile_path !== null ? 'https://image.tmdb.org/t/p/w300/' + actor.profile_path : 'https://fakeimg.pl/600x750?text=No+image'" width="75" height="105"/>
                                            </a>
                                        </div>
                                    }
                                }
                            </span> -->
                            <div class="carousel-wrapper">
                                <ngx-slick-carousel class="carousel"
                                    #slickModal="slick-carousel"
                                    [config]="slideConfig"
                                    (init)="slickInit($event)"
                                    (breakpoint)="breakpoint($event)"
                                    (afterChange)="afterChange($event)"
                                    (beforeChange)="beforeChange($event)">
                                    @for (actor of movieService.movieDetail()[0]?.cast; track actor.id) {
                                        @if (actor.order < 10) {
                                            <div ngxSlickItem class="slide">
                                                    <a routerLink="/actor/{{actor.id}}">
                                                        <img (click)="movieService.actorId$.next(actor.id)" class="actor-img" priority [ngSrc]="actor.profile_path !== null ? 'https://image.tmdb.org/t/p/w300/' + actor.profile_path : 'https://fakeimg.pl/600x750?text=No+image'" width="75" height="105"/>
                                                    </a>
                                                    <div class="actor-name">{{ actor.name }}</div>
                                                </div>
                                            }
                                        }
                                </ngx-slick-carousel>
                            </div>
                        }
                    </div>
                    
                </div>
                <div class="video-container">
                @if (!movieService.movieDetailState().loading) {  
                    @if(movieService.movieDetail()[1].results.length > 0) {
                        @if (movieService.movieDetail()[1].results.length > 2) {
                            <youtube-player id="video-player" [videoId]="movieService.movieDetail()[1]?.results[movieService.movieDetail()[1]?.results.length - 2]?.key"
                                width="500"
                                height="250"
                                suggestedQuality="hd1080"> 
                            </youtube-player>
                        } @else if (movieService.movieDetail()[1].results.length <= 2) {
                            <youtube-player id="video-player" [videoId]="movieService.movieDetail()[1]?.results[0]?.key"
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
            }
        </div>
        `,
    imports: [
        RouterLink, 
        CommonModule, 
        NgOptimizedImage, 
        YouTubePlayer, 
        VgCoreModule, 
        VgControlsModule, 
        VgOverlayPlayModule, 
        VgBufferingModule, 
        SafePipe, 
        KeyValuePipe,
        MatFormFieldModule, 
        MatSelectModule, 
        MatInputModule, 
        FormsModule,
        SlickCarouselModule
    ],
})

export default class DetailComponent {
    private route = inject(ActivatedRoute)
    movieService = inject(MoviesService)

    params = toSignal(this.route.paramMap);

    url = "https://www.youtube.com/embed/";

    // moviedetail = computed(() =>  this.movieService.movieDetailId$.next(Number(this.params()?.get('id'))));
    
    movie = computed(() => this.movieService.movies()
        .find((movie) => movie.id == this.params()?.get('id'))
    );

    movieGenres = computed(() => this.movieService.getMovieGenres(this.movie()?.genre_ids))

   country = signal<any>(null);
   type = signal<any>(null);

   ngAfterViewInit() {
      
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


    getFirstTrailer(videos: any[]) {
        return videos.find((video) => video.name === 'Official Trailer');
    }

    //Carousel

    slideConfig = {"slidesToShow": 4, "slidesToScroll": 2};
  
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

