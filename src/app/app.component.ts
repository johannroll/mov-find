import { Component, ElementRef, OnInit, ViewChild, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, RouterOutlet, Router, RouterLink } from '@angular/router';
import { MoviesService } from './Services/MoviesService/movies.service';
import { MatButtonModule } from '@angular/material/button'
import { MatMenuModule } from '@angular/material/menu'
import { MatIconModule } from '@angular/material/icon';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, map, tap } from 'rxjs';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';
import { MatLabel } from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {AsyncPipe} from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTabsModule } from '@angular/material/tabs'


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatButtonModule,
    MatMenuModule, 
    MatIconModule,
    MatSidenavModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatOption,
    MatLabel,
    MatAutocompleteModule,
    AsyncPipe,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatToolbarModule,
    MatTabsModule,

  ],
  template: `

    <div class="toolbar">
      
        <button class="menu-button" mat-icon-button (click)="drawer.toggle()">
          <mat-icon>menu</mat-icon>
        </button>
     
        <button mat-icon-button (click)="openSearch()">
          <mat-icon>search</mat-icon>
        </button>
     
        <ul class="nav-items hide">
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
          </ul>
          <ul class="nav-items category">
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

    <!-- <mat-toolbar class="search-block mat-elevation-z4" [class.active]="toggleSearch">
      <mat-toolbar-row style="padding: 0 5px;">
        <button class="search-icon" mat-icon-button disabled>
          <mat-icon>search</mat-icon>
        </button>
        <input class="search-control" type="text" placeholder="Search" [(ngModel)]="searchText" #searchbar>
        <button mat-button mat-icon-button (click)="searchClose()">
          <mat-icon>close</mat-icon>
        </button> 
      </mat-toolbar-row>
    </mat-toolbar> -->

    
  
    <mat-drawer-container hasBackdrop="true"  (backdropClick)="close()">
      <mat-drawer id="drawer" #drawer mode="push">
        <ul class="nav-items-drawer">
          <li>
            <a mat-button routerLink="/home" (click)="movieService.scrollState.set({ scrollTo: this.movieService.scrollToTop}); drawer.toggle()">Home</a>
          </li>  
          <li>
            <mat-accordion>
              <mat-expansion-panel class="mat-elevation-z0" (opened)="panelOpenState = true"
                                  (closed)="panelOpenState = false">
                <mat-expansion-panel-header>
                  <mat-panel-title>
                    Categories
                  </mat-panel-title>
                  <mat-panel-description>
                   
                  </mat-panel-description>
                </mat-expansion-panel-header>
                  @for(item of movieService.movielist(); track $index) {
                    <button routerLink="/home" (click)="movieService.movielist$.next(item); drawer.toggle()"  mat-menu-item>{{ movieService.formatString(item) }}</button>
                  }
              </mat-expansion-panel>
              <mat-expansion-panel class="mat-elevation-z0" (opened)="panelOpenState = true"
                                  (closed)="panelOpenState = false">
                <mat-expansion-panel-header>
                  <mat-panel-title>
                    Genres
                  </mat-panel-title>
                  <mat-panel-description>
                   
                  </mat-panel-description>
                </mat-expansion-panel-header>
                  @for(genre of movieService.genres(); track genre.id) {
                  <button routerLink="/home" (click)="movieService.genre$.next(genre); drawer.toggle()" mat-menu-item>{{ genre.name }}</button>
                  }
              </mat-expansion-panel>
            </mat-accordion>
          </li>
          <li class="watchlist">
              <button (click)="drawer.toggle()"  routerLink="/watchlist" mat-button>
                  Watchlist
                  <mat-icon>favorite</mat-icon>
              </button>
          </li>
        </ul>
      </mat-drawer>
        <mat-drawer-content id="content" class="content"> 
          <router-outlet/>
      </mat-drawer-content> 
    </mat-drawer-container>

  `,
  styles: [`

    .toolbar {
      position: fixed;
      display: flex;
      align-items: center;
      padding: 5px 15px;
      width: 100%;
      z-index: 1000;
      top: 0px;
      height: 60px;
      box-shadow: 0px 10px 40px 5px rgb(240,240,240,0.2);
      background: rgb(58,58,58, 0.8);
      backdrop-filter: blur(12px); 
    }

    #drawer {
      position: fixed;
      width: 215px;
      margin-top: 68px;
      padding-top: 1rem;
      
    }

    :host ::ng-deep .mat-drawer-shown {
    background-color: rgba(0, 0, 0, 0.1);
    }

    mat-drawer {
      padding: 12px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .nav-items {
      width: 100%;
      display: flex;
      align-items: center;
      padding: 5px 10px 5px 0px;
    }

    .search-list-item {
        padding-top: 23px;
        padding-left: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: auto;
    }

    .nav-items-drawer {
      max-width: 215px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 5px 10px 5px 0px;
    }
    
    .nav-items li {
      margin-right: 15px;
    }

    .nav-items-drawer li {
      margin-bottom: 7px;
    }

    .accordian-menu {
      box-shadow: none;
    }

    .watchlist {
      margin-top: 5px;
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
  
  .menu-button {
      display: none;
    }

  @media (max-width: 615px) {
    .selection h1 {
      font-size: 1.5rem;
    }
  }

  @media (max-width: 575px) {
    .selection h1 {
      font-size: 1.125rem;
    }
  }

  @media (max-width: 545px) {
    .toolbar {
      padding-left: 5px;
    }

    .nav-items li {
      margin-right: 10px;
    }

    .selection {
     text-align: center;
     padding-right: 0px;
    }

    .content {
      padding-top: 80px;
    }

    .menu-button {
      display: block;
    }

    .hide {
      display: none;
    }
  }
  
  `],
})
export class AppComponent {
  movieService = inject(MoviesService)
  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild('searchbar') searchbar!: ElementRef;

  stateCtrl = new FormControl('');
  filteredStates!: Observable<any[]>;


  panelOpenState: boolean = false;
    
  close() {
    this.sidenav.close();
  }

  searchText = '';

  toggleSearch: boolean = false;

  openSearch() {
    this.toggleSearch = true;
    this.searchbar.nativeElement.focus();
  }
  searchClose() {
    this.searchText = '';
    this.toggleSearch = false;
  }

}
