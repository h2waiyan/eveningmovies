import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: String = '';
  password: String = '';

  register(regForm: any) {
    console.log(regForm);
    console.log(regForm.valid);
  }
}
