import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signupForm: FormGroup;
  errorMessage: string;

  constructor(private authService: AuthService) {
    this.signupForm = new FormGroup({
      'displayName': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required)
    });
    this.errorMessage = '';
  }

  signupUser() {
    if (this.signupForm.invalid) return;
    this.authService
      .signupUser(this.signupForm.value)
      .then(result => {
        if (!result.isValid) this.errorMessage = result.message;
      });
  }

}
