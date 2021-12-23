import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { CityComponent } from './components/city/city.component';
import { StreetComponent } from './components/street/street.component';
import { TechnologyComponent } from './components/technology/technology.component';
import { LocationComponent } from './components/location/location.component';
import { MapComponent } from './components/map/map.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'session/login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'city/add-new', component: CityComponent, canActivate: [AuthGuard] },
  { path: 'street/add-new', component: StreetComponent, canActivate: [AuthGuard] },
  { path: 'technology/add-new', component: TechnologyComponent, canActivate: [AuthGuard] },
  { path: 'location/add-new', component: LocationComponent, canActivate: [AuthGuard] },
  { path: 'map/show-points', component: MapComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
 })],
  exports: [RouterModule]
 })
export class AppRoutingModule {   }
