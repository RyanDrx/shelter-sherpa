import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MediaMatcher } from '@angular/cdk/layout';
import { RouterModule, Routes } from '@angular/router';

import { routes } from './modules/routes.module';
import { MaterialModule } from './modules/material.module';

import { ProfileService } from './services/profile.service';
import { SearchService } from './services/search.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { EmergencyScreenComponent } from './emergency-screen/emergency-screen.component';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { HighlightPipe } from './pipes/highlight.pipe';
import { SearchBoxComponent } from './search/search-box.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidenavComponent,
    EmergencyScreenComponent,
    SearchComponent,
    ProfileComponent,
    SearchResultsComponent,
    SearchBoxComponent,
    HighlightPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  entryComponents: [SearchComponent],
  providers: [MediaMatcher, ProfileService, SearchService],
  bootstrap: [AppComponent]
})
export class AppModule {}
