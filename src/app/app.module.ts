import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { StoreModule } from '@ngrx/store';
// import { reducers, metaReducers } from './reducers';
// import { dahsboardReducer } from './store/dashboard/dashboard.reducer';
import { reducer } from './state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { LoaderInterceptor } from './core/interceptors/loader.interceptor';
import { TokenInterceptor } from './modules/auth/interceptors/token.interceptor';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    StoreModule.forRoot(reducer),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
