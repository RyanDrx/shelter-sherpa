
import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { GridComponent } from '../grid/grid.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'grid', component: GridComponent },
];

