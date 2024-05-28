import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselComponent } from './carousel/carousel.component';
import { VideoheaderComponent } from './videoheader/videoheader.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomeComponent } from './home/home.component';
import { DiscoverComponent } from './discover/discover.component';
import { TownListComponent } from './features/town/town-list/town-list.component';
import { TownCardComponent } from './features/town/town-card/town-card.component';
import { LoadingComponent } from './features/loading/loading.component';
import { TownComponent } from './town/town.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { AppAdminComponent } from './admin/app-admin/app-admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarouselComponent,
    VideoheaderComponent,
    LoginPageComponent,
    HomeComponent,
    TownComponent,
    DiscoverComponent,
    TownListComponent,
    TownCardComponent,
    LoadingComponent,
    RegisterPageComponent,
    AppAdminComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'csrf_token',
      headerName: 'X-CSRF-Token',
    }),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
