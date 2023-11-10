import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CarouselComponent } from './carousel/carousel.component';
import { VideoheaderComponent } from './videoheader/videoheader.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarouselComponent,
    VideoheaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
