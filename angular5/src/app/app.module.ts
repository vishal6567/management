import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Directive } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {Observable} from "rxjs/Observable";
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import {RouterModule,Router,Routes} from "@angular/router";

import { AppComponent } from './app.component';
import { DisplayComponent } from './display/display.component';
import { AddComponent } from './add/add.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { EditComponent } from './edit/edit.component';
import { LoginComponent } from './login/login.component';
import { usersRouting } from './app.routing';
import { AlertComponent } from './_directive/alert.component';

import {UserService} from './user.service';
import { AlertService} from './alert.service';
import { AuthoService } from './autho.service';
import { AuthGuard } from './_guards/auth.guards';
import { AdminAddComponent } from './admin-add/admin-add.component';
import { AdminDisplayComponent } from './admin-display/admin-display.component';
import { AdminEditComponent } from './admin-edit/admin-edit.component';
import { ChagePasswordComponent } from './chage-password/chage-password.component';
import { HomeComponent } from './home/home.component';


/*const employeesRoutes: Routes = [
  { path: '',redirectTo: '/display', pathMatch: 'full' },
  { path: 'display', component: DisplayComponent },
  { path: 'display/new', component: AddComponent},
  { path: 'display/:id', component: EditComponent}
];*/


@NgModule({
  declarations: [
    AppComponent,
    DisplayComponent,
    AddComponent,
    NavBarComponent,
    EditComponent,
    LoginComponent,
    AlertComponent,
    AdminAddComponent,FileSelectDirective,
    AdminDisplayComponent,
    AdminEditComponent,
    ChagePasswordComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    usersRouting 
  ],
  providers: [UserService,AlertService,AuthoService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
