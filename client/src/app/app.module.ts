// Decorators
import { NgModule } from '@angular/core';

// Modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MyCommonModule } from './components/common/my-common.module';
import { SharedModule } from './core/shared/shared.module';
import { AppRoutingModule } from './app.routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/landing/home/home.component';

// Interceptors
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { SuccessInterceptor } from './core/interceptors/success.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      newestOnTop: false
    }),
    ModalModule.forRoot(),
    MyCommonModule,
    SharedModule,
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
