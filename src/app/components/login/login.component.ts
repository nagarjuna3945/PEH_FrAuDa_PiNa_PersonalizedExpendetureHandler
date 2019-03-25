import { Component } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertMessageComponent } from '../common/alert-message/alert-message.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: String = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private alertMessageComponent: AlertMessageComponent
  ) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['', Validators.required ]
    });
  }

  login(value) {
    this.authService.login(value)
    .then(res => {
      console.log(res);
      this.router.navigate(['/spend']);
      this.alertMessageComponent.openSnackBar('ログインに成功しました ✌️');
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.alertMessageComponent.openSnackBar('ログインに失敗しました 😱');
    });
  }
}
