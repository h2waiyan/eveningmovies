import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private apiService: ApiService) { }

  // username = new FormControl('msitt')
  // password = new FormControl('')

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required,]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)])
  })

  login() {
    console.log(this.loginForm);
    this.apiService.login(this.loginForm.value).subscribe({
      next: (data: any) => {
        console.log(data);
        if (data['status'] == 'success') {
          this.cookieService.set('token', data['token']);
          this.router.navigateByUrl("home");
        }
      },
      error: (error: HttpErrorResponse) => {
        alert("User doesn't exist or password is invalid")
        this.loginForm.reset();
        console.log(error)
      }
    })
    // this.username.setValue("-----");
    // alert(this.loginForm.value);
  }
}
