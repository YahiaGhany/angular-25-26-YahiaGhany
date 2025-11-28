import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
// 1. On importe withFetch ici
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    
    // 2. On l'active ici :
    provideHttpClient(withFetch()) 
  ]
};