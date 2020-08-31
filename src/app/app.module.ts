import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {appReducers} from './store/app.reducers';
import {EffectsModule} from '@ngrx/effects';
import {GithubEffects} from './store/github/github.effects';
import {environment} from '../environments/environment';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import { GithubRepositoryComponent } from './components/github-repository/github-repository.component';
import { MainContainerComponent } from './containers/main-container/main-container.component';
import { GithubItemContainerComponent } from './containers/github-item-container/github-item-container.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    GithubRepositoryComponent,
    MainContainerComponent,
    GithubItemContainerComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([GithubEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
