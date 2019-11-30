import { AuthCredential } from './../../models/auth-credential.model';
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder
} from '@angular/forms';
import { AuthService } from './../../services/auth/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm: FormGroup;
  private email;
  private password;
  public emailPattern =
    '^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$';
  public error: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      password: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.emailPattern),
        Validators.maxLength(100)
      ])
    });
    this.email = this.loginForm.get('email');
    this.password = this.loginForm.get('password');
  }

  login() {
    if (!this.loginForm.valid) {
      return;
    }

    this.authService.login(this.loginForm.getRawValue()).subscribe(
      (authCredential: AuthCredential) => {
        console.log(authCredential);
        this.router.navigate(['/dashboard']);
      },
      err => {
        console.log(err);
        const { error } = err;
        this.error = error.message;
      }
    );
  }

  // async onLogin() {
  //   if (this.loginForm.valid) {
  //     let response: any = await this.authService.login(this.loginForm.getRawValue());

  //     if (response.error) {
  //       this.error = response.error.error;
  //       return;
  //     }

  //     this.router.navigate(['/dashboard']);
  //   }
  // }
}
