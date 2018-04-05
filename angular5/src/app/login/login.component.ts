import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService } from '../alert.service';
import { AuthoService } from '../autho.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private alertService:AlertService,
    private authoService:AuthoService ) { }

  ngOnInit() {
    this.authoService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  login() {
    this.loading = true;
    this.authoService.login(this.model.username, this.model.password)
        .subscribe(
            data => {
                console.log(data);
                this.alertService.success('Login successful', true);
                this.router.navigate(['/home']);
            },
            error => {
                this.alertService.error('UserName and Password Worn? ');
                this.loading = false;
            });
  }

}
