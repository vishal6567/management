import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Admin } from '../service/admin';
import {Observable} from "rxjs/Observable";
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgModule, Directive} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { AppModule } from '../app.module';
import { RouterModule,Router,Routes } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { AddComponent } from '../add/add.component';
import {AlertService} from '../alert.service';

@NgModule({
  imports: [ BrowserModule,FormsModule ],
  declarations: [ AdminDisplayComponent,AddComponent ],
  bootstrap: [ AdminDisplayComponent ]
})
@Component({
  selector: 'app-admin-display',
  templateUrl: './admin-display.component.html',
  styleUrls: ['./admin-display.component.css']
})
export class AdminDisplayComponent implements OnInit {
  currentUser: Admin;
  admins: Admin[];
  admin: Admin;

  
    cmp_name: string;
    id: any;
    name: string;
    email: string;
    mobile: number;
    gender: string;
    image: any;
    address: string;
    username: string;
    password: string;

  constructor(private userService:UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertService:AlertService ) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
     }
     getAdmin(): void {
      this.userService.getAdmin()
          .subscribe(
              resultArray =>{ this.admins = resultArray
                this.alertService.success('Admin Detail successfully', true);},
              error => console.log("Error :: " + error)
          )
    }
    deleteAdmin(deleteAdminId: number) {
      if (confirm("Are you sure you want to delete ?")) {
        this.userService.deleteAdmin(deleteAdminId).subscribe(
           data => {
            console.log("sucess",data);
            this.alertService.success('Delete successfully', true); 
           },
           error => {
             console.log("Error deleting employee!");
             this.alertService.error("DATA not Deleted",error)
             return Observable.throw(error);
           }
        );
        this.getAdmin();
      }
    }

  ngOnInit() {
    this.getAdmin()
  }

}
