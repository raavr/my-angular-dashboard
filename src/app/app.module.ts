import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, PreloadAllModules } from '@angular/router';

import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { NoContentComponent } from './no-content';
import { NavbarModule } from './navbar';
import { ResourcesModule } from './resources';

const APP_SERVICE_PROVIDERS = [

];

const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  ...APP_SERVICE_PROVIDERS
];

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    NoContentComponent
  ],
  imports: [ 
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules }),
    NavbarModule,
    ResourcesModule
  ],
  providers: [
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {

}

