import { Component, computed, inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { MoviesService } from "../Services/MoviesService/movies.service";
import { JsonPipe } from "@angular/common";
import { Location, NgOptimizedImage } from '@angular/common';


@Component({
    selector: 'app-actor',
    standalone: true,
    styles: [`
         .actor-detail-container {
            display: flex;
            max-width: 800px;
            width: 100%;
            margin: 2rem 1rem 1rem;
            gap: 20px;
        }

        .btn-back {
            position: fixed;
            top: 90px;
            width: 100px;
            align-self: flex-start;
            margin: 0rem 1rem;
            padding: 10px;
            border-radius: 5px;
            border: none;
            color: azure;
            background: teal;
            box-shadow: 0px 2px 4px 2px rgb(0, 0, 0, 0.2);
            transition: all 0.2s ease;
        }

        .btn-back:hover {
            transform: scale(1.05);
        }

        .loader-wrapper {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
    
        }

        .bold {
            font-weight: 600;
        }


        .image {
            width: 100%;
            max-width: 350px;
            object-fit: cover;
            box-shadow: 0px 2px 10px 2px rgb(0, 0, 0, 0.4);
            border-radius: 5px;
        }

        .actor-details {
            margin: 0px 15px;
        }

        .actor-description {
            font-weight: 300;
            font-size: 0.9rem;
            line-height: 1.2;
            letter-spacing: 1.1;
            color: rgb(215,215,215);
            padding: 0px 5px;
        }

        @media (max-width: 750px) {
            .actor-detail-container {
                display: flex;
                flex-direction: column;
            }

            .image {
                align-self: center;
            }
        }

    `],
    template: `
        <button class="btn-back" (click)="back().back()">Back</button>
        <div class="container">
            <div class="actor-detail-container">
                @if (movieService.loadingActor()) {
                    <div class="loader-wrapper">
                        <div class="loader"></div>
                    </div>
                } @else {
            
                        <img class="image" priority  [ngSrc]="actor().profile_path !== null ? 'https://image.tmdb.org/t/p/w500/' + actor().profile_path : 'https://fakeimg.pl/600x750?text=No+image'" width="300" height="450">
                        <div class="actor-details">
                            <h2> {{ actor().name }}</h2>
                            @if (actor().place_of_birth) {
                                <p><span class="bold">Birthplace </span>{{ actor().place_of_birth }}</p>
                            } @else {
                                <p><span class="bold">Birthplace </span>no information</p>
                            }
                            @if (actor().birthday) {
                                <p><span class="bold">Age </span>{{ calculateActorAge(actor().birthday) }}</p>
                            } @else {
                                <p><span class="bold">Age </span>no information</p>
                            }
                            <p><span class="bold">Biography </span></p>
                            @if (actor().biography) {
                                <p class="actor-description">{{ actor().biography }}</p>
                            } @else {
                                <p class="actor-description">no information</p>
                                
                            }
                        </div>
            
                }
            </div>
        </div>
    `,
    imports: [RouterLink, JsonPipe,  NgOptimizedImage]
})

export default class ActorComponent {
    private route = inject(ActivatedRoute)
    private location = inject(Location)
    movieService = inject(MoviesService)

    params = toSignal(this.route.paramMap);
    back = signal(this.location);
    
    actor = computed(() => this.movieService.actorDetail())
    
    ngAfterViewInit() {
        if (this.params()?.get('actorId') !== null) {
            this.movieService.actorId$.next(Number(this.params()?.get('actorId')))
        }
    }
    
    calculateActorAge(birthday: string) {
        const currentDate = new Date();
        const actorBirthdate = new Date(birthday);
        return Math.round(((currentDate.getTime() - actorBirthdate.getTime()) / ((1000 * 3600 * 24)) / 365));

    }
    

}