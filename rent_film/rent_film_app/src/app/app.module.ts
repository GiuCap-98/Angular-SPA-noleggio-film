import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule} from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { MatMenuModule} from '@angular/material/menu';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule} from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ScrollingModule} from "@angular/cdk/scrolling";
import { LoginComponent } from './login/login.component';
import { DialogModule } from '@angular/cdk/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FilmDetailsComponent } from './film-details/film-details.component';
import { A11yModule } from '@angular/cdk/a11y';
import { MatSelectModule } from '@angular/material/select';
import { RentalListComponent } from './rental-list/rental-list.component';
import { RegistrationComponent } from './registration/registration.component';
import { RentComponent } from './rent/rent.component';
import { DialogComponentComponent } from './dialog-component/dialog-component.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatRadioModule} from '@angular/material/radio';
import { RentDetailsComponent } from './rent-details/rent-details.component';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import { NotFoundComponent } from './not-found/not-found.component';
export function tokenGetter(): string | null {
  return localStorage.getItem('token');
}

const modules = [
  BrowserModule,
  AppRoutingModule,
  GraphQLModule,
  HttpClientModule,
  BrowserAnimationsModule,
  MatSlideToggleModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatFormFieldModule,
  MatInputModule,
  ReactiveFormsModule,
  FormsModule,
  RouterModule,
  ScrollingModule,
  ScrollingModule,
  DialogModule,
  MatFormFieldModule,
  MatPaginatorModule,
  A11yModule,
  MatSelectModule,
  HttpClientModule,
  MatSidenavModule,
  MatCheckboxModule,
  MatRadioModule,
  MatTableModule,
  MatSortModule,
  MatListModule,
  MatDialogModule
];

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    DashboardComponent,
    LoginComponent,
    FilmDetailsComponent,
    RentalListComponent,
    RegistrationComponent,
    RentComponent,
    DialogComponentComponent,
    RentDetailsComponent,
    NotFoundComponent
  ],

  imports: modules,
  bootstrap: [AppComponent]
})
export class AppModule { }
