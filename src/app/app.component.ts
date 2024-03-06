import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, RouterOutlet, Router, RouterLink } from '@angular/router';
import { MoviesService } from './Services/MoviesService/movies.service';
import { MatButtonModule } from '@angular/material/button'
import { MatMenuModule } from '@angular/material/menu'
import { MatIconModule } from '@angular/material/icon';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink, MatButtonModule, MatMenuModule,  MatIconModule],
  template: `

    <div class="toolbar">
      
        <ul class="nav-items">
          <li>
            <a mat-button routerLink="/home" (click)="movieService.scrollState.set({ scrollTo: this.movieService.scrollToTop})">Home</a>
          </li>
          <li>
            <button mat-button [matMenuTriggerFor]="categories">Categories</button>
            <mat-menu class="category-menu" #categories="matMenu">
              @for(item of movieService.movielist(); track $index) {
                <button routerLink="/home" (click)="movieService.movielist$.next(item)"  mat-menu-item>{{ movieService.formatString(item) }}</button>
              }
            </mat-menu>
          </li>
          <li>
            <button mat-button [matMenuTriggerFor]="genres">Genres</button>
            <mat-menu class="genre-menu" #genres="matMenu">
              @for(genre of movieService.genres(); track genre.id) {
                <button routerLink="/home" (click)="movieService.genre$.next(genre)" mat-menu-item>{{ genre.name }}</button>
              }
            </mat-menu>
          </li>
          <li>
              <button  routerLink="/watchlist" mat-icon-button>
                <mat-icon>favorite</mat-icon>
              </button>
          </li>
          @if (movieService.state().genre === null) {
            <li class="selection">
               <h1>{{ movieService.selection() }}</h1> 
            </li>
          } @else {
            <li class="selection">
               <h1>{{ movieService.genre() }}</h1> 
            </li>
          }
        </ul>
      
    </div>
  
    <div id="content" class="content">
      <router-outlet/>
    </div>

  `,
  styles: [`

    .toolbar {
      padding-top: env(safe-area-inset-top);
      padding-left: env(safe-area-inset-left);
      position: fixed;
      display: flex;
      align-items: center;
      padding: 5px 15px;
      width: 100%;
      z-index: 1000;
      top: 0px;
      height: 60px;
      box-shadow: 0 2px 6px 2px rgb(0,0,0,0.2);
      background: rgb(58,58,58, 0.89);
      backdrop-filter: blur(10px); 
    }

    .nav-items {
      width: 100%;
      display: flex;
      align-items: center;
      padding: 5px 10px 5px 0px;
    }
    
    .nav-items li {
      margin-right: 15px;
    }

    .content {
      padding-top: 100px;
    }

    .selection {
      padding-right: 10px;
      margin-inline: auto;
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
    transition: all 0.2s ease;
}

  .btn-back:hover {
      transform: scale(1.05);
  }

  ::ng-deep .genre-menu { 
      width: 180px;
      height: 300px; 
  }

  ::ng-deep .category-menu { 
      width: 180px;
      
  } 

  @media (max-width: 500px) {
    .toolbar {
      padding-left: 4px;
    }

    .nav-items li {
      margin-right: 4px;
    }
    
    .selection h1 {
      font-size: 1rem;
     
    }

    .selection {
     text-align: center;
     padding-right: 0px;
    }

    .content {
      padding-top: 80px;
    }
  }
  
  `],
})
export class AppComponent {
  movieService = inject(MoviesService)
    

}
