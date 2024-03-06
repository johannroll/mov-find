import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatButtonModule } from '@angular/material/button'
import { MatMenuModule } from '@angular/material/menu'




export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withViewTransitions()), importProvidersFrom(HttpClientModule, LazyLoadImageModule, MatButtonModule, MatMenuModule), provideAnimationsAsync()]
};
