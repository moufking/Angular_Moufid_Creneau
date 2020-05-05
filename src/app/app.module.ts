import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { ItuneListService } from './shared/itune_music.service';
import { MusicListComponent } from './music-list/music-list.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { LibraryComponent } from './library/library.component';
import { MusicComponent } from './music/music.component';
import { AppConfigModule } from './app-config/app-config.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    MusicListComponent,
    HeaderComponent,
    LibraryComponent,
    MusicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppConfigModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatCardModule


  ],
  providers: [
    ItuneListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
