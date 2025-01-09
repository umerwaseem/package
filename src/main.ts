/// <reference types="@angular/localize" />
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { AppModule } from './app/app.module';

/* bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
 */

  
platformBrowserDynamic().bootstrapModule(AppModule)
.catch(err => console.error(err));
