import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Employee } from '../user';
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
  declarations: [ DisplayComponent,AddComponent ],
  bootstrap: [ DisplayComponent ]
})
@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  employees:Employee[];
  employee: Employee;
  currentUser: Employee;

    cmp_name: string;
    email: string;
    phone: number;
    address: string;
    state : string ;
    country : string;
    
  constructor(private userService:UserService,
                private router: Router,
                private formBuilder: FormBuilder,
                private alertService:AlertService ) {
                  this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
                  
                 }
  getEmployees(): void {
    this.userService.getEmployees()
        .subscribe(
            resultArray => {this.employees = resultArray
              this.alertService.success('Company Detail successfully', true);},
            error => console.log("Error :: " + error)
        )
  }
    // delete employee 
    deleteEmployee(deleteEmployeeId: number) {
      if (confirm("Are you sure you want to delete ?")) {
        this.userService.deleteEmployee(deleteEmployeeId).subscribe(
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
        this.getEmployees();
      }
    }

  ngOnInit() {
    

    this.getEmployees()
  }

}
