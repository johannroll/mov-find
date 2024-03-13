import { Injectable, computed, inject, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { NavigationEnd, Router, RouterEvent, Event } from "@angular/router";
import { BehaviorSubject, filter, tap } from "rxjs";

export interface UrlState {
    route: string | null
}

@Injectable({
    providedIn: 'root'
})

export class RouteNameService {
    router = inject(Router)
    state = signal<UrlState>({
        route: null
    })
    
    currentRoute = computed(() => this.state().route)
    
    route$ = new BehaviorSubject<string>('');

    constructor() {
        this.router.events.pipe(
            filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd),
            takeUntilDestroyed() 
        ).subscribe((event: NavigationEnd) => {
             this.route$.next(event.urlAfterRedirects);
        });
    
        this.route$.pipe(takeUntilDestroyed(), tap((route) => console.log(route))).subscribe(route => {
            this.state.update((state) => ({
            ...state,
            route: route.split('/')[1]
            }));
        });
    }
}
