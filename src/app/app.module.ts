import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import {AuthGuard} from './guards/auth/auth.guard';
import { HomeComponent } from './components/home/home.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { FocusInvalidInputDirective } from './components/toolbar/focus-invalid-input.directive';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {MatExpansionModule} from '@angular/material/expansion';
import {Locales} from './helpers/locales';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import { StreetComponent } from './components/street/street.component';
import { CityComponent } from './components/city/city.component';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import { CitiesTableComponent } from './components/city/cities-table/cities-table.component';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { StreetsTableComponent } from './components/street/streets-table/streets-table.component';

registerLocaleData(localePl, 'pl');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ToolbarComponent,
    FocusInvalidInputDirective,
    StreetComponent,
    CityComponent,
    CitiesTableComponent,
    StreetsTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatExpansionModule,
    HttpClientModule,
    NgxDatatableModule,
    MatSelectModule,
    MatAutocompleteModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pl'},
    AuthGuard,
    { provide: MatPaginatorIntl, useValue: Locales.paginatorPl() },
    CookieService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
