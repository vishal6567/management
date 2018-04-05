import { Routes, RouterModule } from '@angular/router';

import { DisplayComponent } from './display/display.component';
import { AdminAddComponent } from './admin-add/admin-add.component';
import { AddComponent } from './add/add.component';
import { LoginComponent } from './login/login.component';
import {  AuthGuard } from './_guards/auth.guards';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { EditComponent }  from './edit/edit.component';
import { AdminDisplayComponent } from './admin-display/admin-display.component';
import {AdminEditComponent} from './admin-edit/admin-edit.component';
import { HomeComponent } from './home/home.component';
import { ChagePasswordComponent} from './chage-password/chage-password.component'
const employeesRoutes: Routes = [
    { path: 'home',component: HomeComponent ,canActivate: [AuthGuard],pathMatch: 'full' },
    { path: '', component: LoginComponent },
    { path: 'add', component: AddComponent,canActivate: [AuthGuard]},
    { path: 'nav-bar', component: NavBarComponent,canActivate: [AuthGuard]},
    { path: 'admin-add', component: AdminAddComponent,canActivate: [AuthGuard]},
    { path: 'display', component: DisplayComponent,canActivate: [AuthGuard]},
    { path: 'addmindisplay', component: AdminDisplayComponent,canActivate: [AuthGuard]},
    { path: 'edit/:id', component: EditComponent ,canActivate: [AuthGuard]},
    { path: 'change', component: ChagePasswordComponent ,canActivate: [AuthGuard]},
    { path: 'editadmin/:id', component: AdminEditComponent ,canActivate: [AuthGuard]},
    //{ path: 'edit/id', component: EditComponent },
    //{ path: 'display/new', component: AddComponent},
    { path: '**', redirectTo: '' }
  ];  
  
  
  export const usersRouting = RouterModule.forRoot(employeesRoutes);