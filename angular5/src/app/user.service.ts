import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Employee } from './user';
import { Admin} from './service/admin';
import { Pass} from './service/pass';
import 'rxjs/add/operator/map';
import 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import {Observable} from "rxjs/Observable";
import { Resolve } from '@angular/router/src/interfaces';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable()
export class UserService {
  private _getURL = "http://localhost:3000";
  

  constructor(private http: Http) { }
  getEmployees(): Observable<Employee[]> {
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http
        .get(this._getURL+'/',options)
          .map(res => {
              return <Employee[]>res.json();
          })
        
  }
  getPass(): Observable<Pass[]> {
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http
        .get(this._getURL+'/pass',options)
          .map(res => {
              return <Pass[]>res.json();
          })
        
  }
  createPass(newPass:Pass):Observable<Pass[]> {

    console.log(newPass)
      return this.http.post(this._getURL+'/cha_pass', newPass )
      .map((res:Response) => res.json())
      .catch((error:any) =>Observable.throw(error.json().error || 'server error'));
          
    }
  createEmployee(newEmployee:Employee):Observable<Employee[]> {

  console.log(newEmployee)
    return this.http.post(this._getURL+'/add', newEmployee )
    .map((res:Response) => res.json())
    .catch((error:any) =>Observable.throw(error.json().error || 'server error'));
        
  }
  geteditId(id:number): Observable<Employee[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });
    return this
            .http
            .get(this._getURL+'/edit/'+id,options)
            .map(res => {console.log(res);
              return <Employee[]>res.json();
            })
  }
  updateEmployee(editEmployees:any,id): Observable<Employee[]> {
  
  //let headers = new Headers({ 'Content-Type': 'application/json' });
  //let options = new RequestOptions({ headers: headers });
  
      console.log(editEmployees)
      return this.http
      .put(this._getURL+'/edit/'+id,editEmployees)
        .map((res: Response) => res.json()
      );
  }


  deleteEmployee(id: number) {
  return this.http.delete( this._getURL+'/delete/'+id );
  }
  //admin

  //get admin
  getAdmin(): Observable<Admin[]> {
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http
        .get(this._getURL+'/admindisplay',options)
          .map(res => {
              return <Admin[]>res.json();
          })
        
  }//end get
  //admin create
  createAdmin(newEmployee:Admin): Observable<Admin[]> {

    console.log(newEmployee)
      return this.http.post(this._getURL+'/adminadd', newEmployee )
      .map((res:Response) => res.json())
      .catch((error:any) =>Observable.throw(error.json().error || 'server error'));
          
    }//end create
    deleteAdmin(id: number) {
      return this.http.delete( this._getURL+'/deleteAdmin/'+id );
    }
    getAdmineditId(id:number): Observable<Admin[]> {
      let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
      return this
              .http
              .get(this._getURL+'/editadmin/'+id,options)
              .map(res => {console.log(res);
                return <Admin[]>res.json();
              })
    }
    updateAdmin(editAdmins:any,id): Observable<Admin[]> {
        console.log(editAdmins)
        return this.http
        .put(this._getURL+'/editadmin/'+id,editAdmins)
          .map((res: Response) => res.json()
        );
    }
   
   /* postFile(fileToUpload: File): Observable<boolean> {
     console.log(fileToUpload)
      const formData: FormData = new FormData();
      formData.append('fileKey', fileToUpload, fileToUpload.name);
      return this.http
        .post(this._getURL+'/image', fileToUpload )
        .map(() =>{return true});
        
     }
    */
  /*getEmployeeById(empId: number): Observable<Employee[]> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    
      return this.http
        .get(this._getURL+'/edit/id'+empId,options)
          .map(res => {console.log(res);
            return <Employee[]>res.json();
        })
    }*/
    
  
}
