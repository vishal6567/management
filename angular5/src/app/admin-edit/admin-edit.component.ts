import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import { Admin } from '../service/admin';
import {Observable} from "rxjs/Observable";
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import {RouterModule,Router,Routes,ActivatedRoute} from "@angular/router";
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css']
})
export class AdminEditComponent implements OnInit {
  admins: Admin[];
  admin:Admin;

    editid: any;
    editname: string;
    editemail: string;
    editmobile: number;
    editgender: string;
    editaddress: string;
    editusername: string;
   

    adminForm: FormGroup;
  constructor(private _userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService:AlertService) { }

    updateAdmin(editAdmin,id) {
    
      const editAdmins ={
        id: this.editid,
        name: this.editname,
        email: this.editemail,
        mobile: this.editmobile,
        gender: this.editgender,
        address: this.editaddress,
        username: this.editusername,
       
      }
        this._userService.updateAdmin(editAdmins,id).subscribe(
          data => {
            console.log(data);
            this.router.navigate(['/addmindisplay']);
            this.alertService.success('Update successful', true);
          },
          error => {
            console.error("Error updating employee!");
            this.alertService.error("Update Not Sucess",error);
            return Observable.throw(error);
          }
        ); 
     
    }


  ngOnInit() {
    var id = this.route.params.subscribe(params => {
      var id = params['id'];
      if (id){
        
        this._userService.getAdmineditId(id)
        .subscribe(
          _admin =>{ this.admins = _admin  
          this.editid =  _admin[0].id
          this.editname = _admin[0].name
          this.editemail = _admin[0].email
          this.editmobile = _admin[0].mobile
          this.editgender = _admin[0].gender
          this.editaddress = _admin[0].address
          this.editusername = _admin[0].username
          this.admins.push(this.admin = _admin[0])
          data => {}
        })
        
        this.editid = id
       
      }
    });
  }

}
