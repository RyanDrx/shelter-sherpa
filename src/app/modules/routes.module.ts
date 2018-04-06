import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { EmergencyScreenComponent } from '../emergency-screen/emergency-screen.component';
import { SearchComponent } from '../search/search.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'screen', component: EmergencyScreenComponent },
  { path: 'search', component: SearchComponent }
];
