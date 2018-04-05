import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AlertService} from './alert.service';
@Injectable()
export class AuthoService {
    constructor(private http: HttpClient,
                private alertService:AlertService) { }
    login(username: string, password: string) {
        return this.http.post<any>('http://localhost:3000/login/', { username: username, password: password })
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            });
    }
    cha_pass( password: string) {
        return this.http.post<any>('http://localhost:3000/cha_pass/', {password: password })
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
       // this.alertService.success('Loguot successfully', true);
    }
}