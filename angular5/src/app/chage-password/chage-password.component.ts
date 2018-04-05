import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import { AppModule } from '../app.module';
import 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { NgForm } from '@angular/forms';
import {RouterModule,Router,Routes,ActivatedRoute} from "@angular/router";
import { FormsModule } from '@angular/forms';
import { DisplayComponent } from '../display/display.component';
import { NgModule, Directive} from '@angular/core';
import { AlertService } from '../alert.service';
import { AuthoService } from '../autho.service';
import { UserService } from '../user.service';
import {Pass} from '../service/pass';

@Component({
  selector: 'app-chage-password',
  templateUrl: './chage-password.component.html',
  styleUrls: ['./chage-password.component.css']
})
@NgModule({
  imports: [ BrowserModule,FormsModule ],
  declarations: [ ChagePasswordComponent ],
  bootstrap: [ ChagePasswordComponent ],
  
})
export class ChagePasswordComponent implements OnInit {
 users: FormGroup;
  pass: Pass[] = [];
  register: any = {};
 
  constructor(formBuilder: FormBuilder,private route: ActivatedRoute,
    private router: Router,
    private alertService:AlertService,
    private authoService:AuthoService,
    private userService:UserService) { }

    createPass() {
   
      this.userService.createPass(this.register).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/logout']);
          this.alertService.success('change password successful', true);
        },
        error => {
          console.log("error add");
          this.alertService.error("DATA Not Sucess",error);
          //return Observable.throw(error);
        }
      );
    }//end admin
    getPass(): void{
      this.userService.getPass()
          .subscribe(
              resultArray => 
              {this.pass = resultArray },
              error => console.log("Error :: " + error)
        
          )
        
    } //end id
  ngOnInit() {
    this.getPass()
  }
 

}
