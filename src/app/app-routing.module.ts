import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {AuthGuard} from './guards/auth/auth.guard';
import {HomeComponent} from './components/home/home.component';
import {CityComponent} from './components/city/city.component';
import {StreetComponent} from './components/street/street.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'session/login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'city/add-new', component: CityComponent, canActivate: [AuthGuard]},
  {path: 'street/add-new', component: StreetComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
