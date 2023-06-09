import { Component } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { AuthResponseData } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode = true;
  // isLoading = false;
  error: string = null;

  constructor(private authSetvice: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    // console.log(form.value);
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    // this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authSetvice.login(email, password);
    } else {
      authObs = this.authSetvice.signUp(email, password);
    }

    authObs.subscribe(
      (resData) => {
        console.log(resData);
        this.router.navigate(['/receipes']);
      },
      (errorMessage) => {
        // switch (errorRes.error.error.message) {
        //   case 'Email Exits':
        this.error = errorMessage;
        // }

        // this.isLoading = false;
      }
    );

    form.reset();
  }
}
