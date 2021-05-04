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
  private document;
  private password;
  public error: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      password: new FormControl('', Validators.required),
      document: new FormControl('', [Validators.required])
    });
    this.document = this.loginForm.get('document');
    this.password = this.loginForm.get('password');
  }

  login() {
    if (!this.loginForm.valid) {
      return;
    }

    this.authService.login(this.loginForm.getRawValue()).subscribe(
      (authCredential: AuthCredential) => {
        this.router.navigate(['/dashboard']);
      },
      err => {
        console.log(err);
        const { error } = err;
        this.error = error.message;
      }
    );
  }
}
