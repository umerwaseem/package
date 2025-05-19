/* import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';

import { AppRoutingModule } from "./app-routing.module";


import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ToastrModule } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(AppRoutingModule),
    provideAnimations(),
    provideAnimationsAsync(),
    importProvidersFrom(
      BrowserAnimationsModule,
      ToastrModule.forRoot(),
      RouterModule.forRoot(AppRoutingModule, {
        scrollPositionRestoration: 'top'
      })
    )
  ]
};
 */