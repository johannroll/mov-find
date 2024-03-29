import { Component, ElementRef, ViewChild, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterOutlet, Router, RouterLink } from '@angular/router';
import { MoviesService } from './Services/MoviesService/movies.service';
import { MatButtonModule } from '@angular/material/button'
import { MatMenuModule } from '@angular/material/menu'
import { MatIconModule } from '@angular/material/icon';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';
import { MatLabel } from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {AsyncPipe, Location} from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTabsModule } from '@angular/material/tabs'
import { StorageService } from './Services/StorageService/storage.service';
import { SearchbarComponent } from './shared/ui/searchbar/searchbar.component';
import { SnackbarService } from './Services/SnackbarService/snackbar.service';
import { NetworkConnectionService } from './shared/utils/network-connection.service';
import { RouteNameService } from './shared/utils/route-name.service';
import { SearchFocusService } from './shared/utils/search-focus.service';
import { stopPropagation } from './shared/utils/stop-propagation.directive';


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
    SearchbarComponent,
    stopPropagation,
    

  ],
  template: `

    <div class="toolbar">
        @if (routeService.currentRoute() !== 'home') {
          <button class="back-btn-toolbar"  disableRipple mat-icon-button (click)="back().back()">
              <mat-icon>arrow_back</mat-icon>
          </button>
        }
        @if (!movieService.formFocus() && routeService.currentRoute() === 'home') {
          <button class="menu-button" mat-icon-button (click)="drawer.toggle()">
            <mat-icon>menu</mat-icon>
          </button>
        }
        @if (routeService.currentRoute() === 'home') {

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
        }  
          @if (routeService.currentRoute() === 'home') {
            <div class="searchbar-wrapper searchbar-margin" [class.searchbar-open]="movieService.formFocus()">
              <app-searchbar
              [searchFormControl]="movieService.searchFormControl"
              [searchResults]="movieService.searchResults()"
              (closeMenu)="drawer.close()"
              ></app-searchbar>
              @if (movieService.formFocus()) {
                  <button class="close-searchbar" disableRipple [class.hide-cnacel-btn]="!movieService.formFocus()" mat-button (pointerdown)="updateFormFocusState()">cancel</button>
              }
            </div>
          }
          @if (!movieService.formFocus()) {
            <ul class="nav-items category">
              @if (routeService.currentRoute() === 'detail' || routeService.currentRoute() === 'actor') {
                <li class="selection">
                   <h3>{{ movieService.movieDetail()[0]?.title }}</h3>
                </li>
              } @else {
                @if (movieService.state().genre === null && routeService.currentRoute() !== 'watchlist') {
                  <li class="selection">
                     <h1>{{ movieService.selection() }}</h1>
                  </li>
                }  @else if(routeService.currentRoute() !== 'watchlist') {
                  <li class="selection">
                     <h1>{{ movieService.genre() }}</h1>
                  </li>
                }
                 @if (routeService.currentRoute() === 'watchlist') {
                  <li class="selection">
                     <h1>Watchlist</h1>
                  </li>
                }

              }
            </ul>
          }
    </div>
  
    <mat-drawer-container hasBackdrop="true"  [class.full-height]="movieService.drawerOpen() === true" (backdropClick)="close()">
      <mat-drawer stopPropagation id="drawer" #drawer mode="push">
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
      box-shadow: 0px 3px 30px 3px rgb(230,230,230,0.2);
      background: rgb(58,58,58);
    }

    .back-btn-toolbar {
      margin-right: auto;
    }

    .searchbar-wrapper {
      display: flex;
      align-items: center;
      margin-right: auto;
      
    }
    
    .searchbar-open {
      width: 100%;
    }

    .close-searchbar {
      margin-left: 15px;
    }

    .search-menu {
      width: 320px;
    }

    #drawer {
      position: fixed;
      width: 215px;
      margin-top: 66px;
      padding-top: 1rem;
    }

    .full-height {
      height: 100%;
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
      display: flex;
      align-items: center;
      padding: 5px 0px 5px 0px;
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
      padding-right: 15px;
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

  .hide-cancel-btn {
    display: none;
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

  @media (max-width: 765px) {
    .selection h1 {
      font-size: 1.2rem;
    }

    .searchbar-margin {
      justify-content: space-evenly;

    }

    .close-searchbar {
      margin-left: 0px;
    }
  }

  @media (max-width: 615px) {
    .selection h1 {
      font-size: 1.2rem;
    }
  }

  @media (max-width: 712px) {
    .selection h1 {
      font-size: 1.125rem;
    }

    .menu-button {
      display: block;
    }

    .hide {
      display: none;
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
     padding-right: 10px;
    }

    .content {
      padding-top: 80px;
      overflow-wrap: break-word;
    }

  }
  
  `],
})
export class AppComponent {
  location = inject(Location)
  movieService = inject(MoviesService)
  storageService = inject(StorageService)
  snackbarService = inject(SnackbarService)
  activatedRoute = inject(ActivatedRoute)
  networkService = inject(NetworkConnectionService)
  routeService = inject(RouteNameService)
  router = inject(Router)
  searchFocusService = inject(SearchFocusService)
  @ViewChild('drawer') drawer!: MatDrawer;
  @ViewChild('drawer') drawerElement!: ElementRef;
  @ViewChild('searchbar') searchbar!: ElementRef;

  params = toSignal(this.activatedRoute.paramMap);

  paramId = computed(() => this.params()?.get('id'));

  back = signal(this.location);

  stateCtrl = new FormControl('');
  filteredStates!: Observable<any[]>;
  private destroy$ = new Subject<void>();


  panelOpenState: boolean = false;
  drawerOpen: boolean = false;
  
  constructor() {
    this.networkService.checkConnection$.pipe(takeUntilDestroyed(), tap((status) => console.log('Network status: ', status))).subscribe((online) => {
      this.networkService.state.update((state) => ({
          ...state,
          online: online,
          connectionCount: state.connectionCount + 1
      }))
    })

    
    effect(() => {
    });
    const error = this.movieService.error();
    
    if (error != null) {
      this.snackbarService.displayError(error);
    }
    
    effect(() => {
      const network = this.networkService.isOnline();
      
      if (!network) {
        this.snackbarService.displayError('No internet connection');
      }
      
      if (network && this.networkService.state().connectionCount > 1) {
        this.snackbarService.dismissSnackbar();
        this.snackbarService.displaySuccess('Connection restored');
        location.reload();
      }
    })

    effect(() => {
      if (this.movieService.formFocus()) {
        this.drawer.close()
      }
    })
  }
  
  ngAfterViewInit() {
    this.drawer.openedChange.pipe(takeUntil(this.destroy$)).subscribe((isOpen) => {
      console.log('Drawer state changed. Is open:', isOpen);
      this.movieService.setDrawerState(isOpen);
    });
  };

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  close() {
    this.drawer.close();
  }

  updateFormFocusState() {
    this.movieService.searchFormControl.setValue('');
    this.movieService.searchState.update((state) => ({...state, formFocus: false }))
  }
}
