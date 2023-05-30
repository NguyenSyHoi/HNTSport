import {Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {LoginModule} from './login-module';
import {LoginForm} from './types/login';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {NzNotificationModule, NzNotificationService} from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [LoginModule]
})
export class LoginComponent implements OnInit {
  showPassword = false;
  forgotPassword = false;
  emailForgot = new FormControl<string>('');
  // init form in constructor
  loginForm!: FormGroup<LoginForm>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private notification: NzNotificationService
  ) {
    this.loadForm();
  }

  ngOnInit() {
  }

  register() {
    this.router.navigate(['/register'])
  }

  loadForm() {
    this.loginForm = this.fb.nonNullable.group<LoginForm>({
      email: this.fb.nonNullable.control('', [Validators.required]),
      password: this.fb.nonNullable.control('', [Validators.required])
    })
  }

  login() {
    const url = 'http://localhost:8090/api/login';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = {user: this.loginForm.controls['email'], pass: this.loginForm.controls['password']};

    this.http.post(url, body, {headers}).subscribe(
      (response) => {
        this.notification.success('Thông báo', "Đăng nhập thành công!")
      },
      (error) => {
        this.notification.error('Thông báo', "Sai tài khoản hoặc mật khẩu! Vui lòng kiểm tra lại!")
      }
    );
  }
}
