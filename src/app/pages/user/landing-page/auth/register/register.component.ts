import {Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {RegisterModule} from './register-module';
import {RegisterForm} from './types/register';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [RegisterModule]
})
export class RegisterComponent implements OnInit {
  showPassword = false;
  registerForm!: FormGroup<RegisterForm>;

  constructor(private router: Router,
              private fb: FormBuilder,
              private http: HttpClient,
              private notification: NzNotificationService
  ) {
    this.loadForm();
  }


  ngOnInit() {
  }

  loadForm() {
    this.registerForm = this.fb.nonNullable.group<RegisterForm>({
      firstName: this.fb.nonNullable.control('',),
      // [Validators.required]
      lastName: this.fb.nonNullable.control('',),
      // [Validators.required]
      email: this.fb.nonNullable.control('', [Validators.required]),
      password: this.fb.nonNullable.control('', [Validators.required]),
    })
  }

  register() {
    const url = 'http://localhost:8090/api/account/addAccount';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = {user: this.registerForm.controls['email'], pass: this.registerForm.controls['password']};

    this.http.post(url, body, {headers}).subscribe(
      (response) => {
        this.router.navigate(['/login']);
        this.notification.success('Thông báo', "Đăng ký tài khoản thành công!")
      },
      (error) => {
        this.notification.error('Thông báo', "Đăng ký tài khoản không thành công! Mời xem lại thông tin đăng ký!")
      }
    );
  }
  login(){
    this.router.navigate(['/login']);
  }
}
