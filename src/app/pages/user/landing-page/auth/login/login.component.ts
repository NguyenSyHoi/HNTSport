import {Router, RouterLink} from '@angular/router';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {LoginModule} from './login-module';
import {LoginForm} from './types/login';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {NzNotificationModule, NzNotificationService} from 'ng-zorro-antd/notification';
import {NewFunitureService} from "../../type-furniture/new-funiture/services/new-funiture-service.service";
import {ResponseAPIContent, ResponseAPINoContent} from "../../../../../common/types/response-api";
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [LoginModule, RouterLink]
})
export class LoginComponent implements OnInit {
  showPassword = false;
  forgotPassword = false;
  email = '';
  pass = '';
  emailForgot = new FormControl<string>('');
  // init form in constructor
  loginForm!: FormGroup<LoginForm>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private notification: NzNotificationService,
    public newFunitureService: NewFunitureService
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
    const body = {user: this.email, pass: this.pass};

    this.http.post<ResponseAPINoContent<any>>(url, body, {headers}).subscribe(
      (response) => {
        console.log(response.data)
        if (response.data){
          this.notification.success('Thông báo', "Đăng nhập thành công!")
          this.newFunitureService.isLogin.next(true);
          this.router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/login']);
          });
          this.newFunitureService.userName.next(this.email);
          console.log(this.newFunitureService.isLogin.value);
        }else {
          this.notification.error('Thông báo', "Sai tài khoản hoặc mật khẩu! Vui lòng kiểm tra lại!")
          this.newFunitureService.isLogin.next(false);
          console.log(this.newFunitureService.isLogin.value);

        }
      },
      (error) => {
        // this.notification.error('Thông báo', "Sai tài khoản hoặc mật khẩu! Vui lòng kiểm tra lại!")
        // this.newFunitureService.isLogin.next(false);
      }
    );
  }
  logOut(){
    Swal.fire({
      title: 'Bạn có chắc chắn muốn đăng xuất không?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đăng xuất',
      cancelButtonText: 'Quay lại',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.confirmLogout()
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
      }
    })

  }
  confirmLogout(){
    this.newFunitureService.isLogin.next(false);
    this.router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/login']);
    });
    this.notification.info('Thông báo', 'Bạn đã đăng xuất khỏi tài khoản!')
    // Swal.fire(
    //   {
    //     title: 'Xóa thành công!',
    //     icon: 'success'
    //   }
    // );
  }

}
