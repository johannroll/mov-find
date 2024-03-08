import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () =>
            import('./home/home.component'),
    },
    {
        path: 'detail/:id',
        loadComponent: () =>
            import('./detail/detail.component'),
            
    },
    {
        path: 'actor/:actorId',
        loadComponent: () =>
        import('./actor/actor.component'),
    },
    {
        path: 'watchlist',
        loadComponent: () =>
        import('./watchlist/watchlist.component'),
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: '**', 
        redirectTo: 'home', 
    },
];
