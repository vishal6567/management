import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import { Employee } from '../user';
import {Observable} from "rxjs/Observable";
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import {RouterModule,Router,Routes,ActivatedRoute} from "@angular/router";
import { AlertService} from '../alert.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  edit: any;
  editEmployees: Employee[];
  employee: Employee;
  
  editcmp_id: any;
  editcmp_name: any;
  editemail: any;
  editphone: any;
  editaddress: any;
  editstate: any;
  editcountry: any;
  
  employeeForm: FormGroup;


  constructor(private _userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService:AlertService) { }
    
    updateEmployee(editEmployee,id) {
    
      const editEmployees ={
        cmp_id: this.editcmp_id,
        cmp_name: this.editcmp_name,
        email: this.editemail,
        phone: this.editphone,
        address: this.editaddress,
        state: this.editstate,
        country: this.editcountry
      }
        this._userService.updateEmployee(editEmployees,id).subscribe(
          data => {
            console.log(data);
            this.router.navigate(['/display']);
            this.alertService.success('Update successful', true);
          },
          error => {
            console.error("Error updating employee!");
            this.alertService.error("Update Not Sucess",error);
            return Observable.throw(error);
          }
        ); 
     
    }
  //get id

  
  ngOnInit() {
    
    var id = this.route.params.subscribe(params => {
      var id = params['id'];
      if (id){
        
        this._userService.geteditId(id)
        .subscribe(
          employees =>{ this.editEmployees = employees  
          this.editcmp_id =  employees[0].cmp_id
          this.editcmp_name = employees[0].cmp_name
          this.editemail = employees[0].email
          this.editphone = employees[0].phone
          this.editaddress = employees[0].address
          this.editstate = employees[0].state 
          this.editcountry = employees[0].country
          this.editEmployees.push(this.employee = employees[0])
          data => {}
        })
        
        this.editcmp_id = id
       
      }
    });
    /*this.route.params.subscribe(params => {console.log(params['id'])
      this.edit = this._userService.geteditId(params['id']).subscribe(res => {
        this.edit = res;
      });
    });*/

  }

}
