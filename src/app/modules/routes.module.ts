import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { EmergencyScreenComponent } from '../emergency-screen/emergency-screen.component';
import { SearchComponent } from '../search/search.component';
import { ProfileComponent } from '../profile/profile.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'profile', component: ProfileComponent },
];
