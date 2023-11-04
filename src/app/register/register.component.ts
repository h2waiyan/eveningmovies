import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: String = "";
  username: String = '';
  password: String = '';

  constructor(private apiService: ApiService) { }

  register(regForm: any) {
    // console.log(`${this.email} ${this.username} ${this.password}`);

    this.apiService.register(
      this.email,
      this.username,
      this.password
    ).subscribe({
      next: (data: any) => {
        console.log(data);

      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    })
  }
}
