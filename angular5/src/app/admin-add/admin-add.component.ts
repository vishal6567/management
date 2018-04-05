import { Component, OnInit, group, Input, Output,ChangeDetectorRef} from '@angular/core';
import { UserService } from '../user.service';
import { Admin } from '../service/admin';
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
import {AlertService} from '../alert.service';
import {Employee} from '../user';

@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.css']
})
@NgModule({
  imports: [ BrowserModule,FormsModule ],
  declarations: [ AdminAddComponent ],
  bootstrap: [ AdminAddComponent ],
  
})
export class AdminAddComponent implements OnInit {
  employeeForm: FormGroup;
  private newEmployee : Admin [] = [];
  register : any = {};
  cmpid: Employee[]=[];
  model = {  
  image: ''  
  };  
  path = '';  
    public file_srcs: string[] = [];  
    public debug_size_before: string[] = [];  
    public debug_size_after: string[] = []; 

    constructor(formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,private alertService:AlertService,
    private changeDetectorRef: ChangeDetectorRef) {
        
     }
      
     /*fileChange(input) {  
    this.readFiles(input.files);  
    }  
  readFile(file, reader, callback) {  
    reader.onload = () => {  
          callback(reader.result);  
          this.register.image = reader.result;  
          console.log(reader.result);  
      }  
      reader.readAsDataURL(file);  
  }  
  readFiles(files, index = 0) {  
    // Create the file reader  
    let reader = new FileReader();  
    // If there is a file  
    if (index in files) {  
        // Start reading this file  
        this.readFile(files[index], reader, (result) => {  
            // Create an img element and add the image file data to it  
            var img = document.createElement("img");  
            img.src = result;       
            });  
    } else {  
        // When all files are done This forces a change detection  
       this.changeDetectorRef.detectChanges();  
      }  
  }  */
    
     //create admin
    createAdmin() {
   
      this.userService.createAdmin(this.register).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/addmindisplay']);
          this.alertService.success('Registration successful', true);
        },
        error => {
          console.log("error add");
          this.alertService.error("DATA Not Sucess",error);
          //return Observable.throw(error);
        }
      );
    }//end admin
    //get id

    getEmployees(): void{
      this.userService.getEmployees()
          .subscribe(
              resultArray => 
              {this.cmpid = resultArray },
              error => console.log("Error :: " + error)
        
          )
        
    } //end id
  ngOnInit() {
    this.getEmployees()
      }
            
        
}
