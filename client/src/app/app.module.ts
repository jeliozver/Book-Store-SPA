// Decorators
import { NgModule } from '@angular/core';

// Modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MyCommonModule } from './components/common/my-common.module';
import { AppRoutingModule } from './app.routing.module';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/landing/home/home.component';

// Interceptors
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { SuccessInterceptor } from './core/interceptors/success.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';

// Directives
import { MustMatchDirective } from './core/shared/must-match.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MustMatchDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      newestOnTop: false
    }),
    MyCommonModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SuccessInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
