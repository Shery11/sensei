import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string;

  constructor(private authService: AuthService) {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required)
    });
    this.errorMessage = '';
  }

  loginUser() {
    if (this.loginForm.invalid) return;
    this.authService
      .loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .then(result => {
        if (!result.isValid) this.errorMessage = result.message;
      });
  }

}
