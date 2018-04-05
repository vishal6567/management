import { Component, OnInit, group, Input, Output } from '@angular/core';
import { UserService } from '../user.service';
import { Employee } from '../user';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import {Observable} from "rxjs/Observable";
import {BrowserModule} from '@angular/platform-browser';
import { AppModule } from '../app.module';
import 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {RouterModule,Router,Routes,ActivatedRoute} from "@angular/router";
import { FormsModule } from '@angular/forms';
import { DisplayComponent } from '../display/display.component';
import { NgModule, Directive} from '@angular/core';
import {AlertService} from '../alert.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

@NgModule({
  imports: [ BrowserModule,FormsModule ],
  declarations: [ AddComponent ],
  bootstrap: [ AddComponent ],
  
})
export class AddComponent implements OnInit {
  employeeForm: FormGroup;
  private newEmployee :Employee[] = [];
  register : any = {};
  
  
  constructor(formBuilder: FormBuilder,
    private __userService: UserService,
    private router: Router,
    private route: ActivatedRoute,private alertService:AlertService,
  ) { }
    createEmployee() {
    

      this.__userService.createEmployee(this.register).subscribe(
        data => {
          console.log("data",data);
         this.router.navigate(['/display']);
         this.alertService.success('Registration successful', true);
        },
        error => {
          console.log("error add");
          this.alertService.error("DATA Not Sucess",error);
          return Observable.throw(error);
         //this.loading = false;
        }
      );
      //this.router.navigate(['/display'])
    
    }
  ngOnInit() {
  }

}
