import {Component, Inject, Injector, OnInit} from '@angular/core';
import {PaymentModule} from "./payment-module";
import {NzCollapseModule} from 'ng-zorro-antd/collapse';
import {DestroyService} from "../../../../../common/service/destroy.service";
import {Route, Router} from "@angular/router";
import {DetailProductServiceService} from "../new-funiture/services/detail-product-service.service";
import {NzRadioModule} from "ng-zorro-antd/radio";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ResponseAPINoContent} from "../../../../../common/types/response-api";
import {CardItem} from "../new-funiture/types/card-item";
import {NewFunitureService} from "../new-funiture/services/new-funiture-service.service";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  standalone: true,
  imports: [PaymentModule, NzRadioModule, ReactiveFormsModule, FormsModule],
  providers: [DestroyService]

})
export class PaymentComponent implements OnInit {
  paymentCash: boolean = true;
  totalMoneyPayment = 0;
  infoPaymentForMe!: FormGroup;
  infoPaymentForOrther!: FormGroup;
  queryInfoMe = {
    name: '',
    phoneNumber: '',
    address: '',
    email: '',
    note: ''
  };
  queryInfoOrther = {
    name: '',
    phoneNumber: '',
    address: '',
    note: ''
  };

  constructor(
    public router: Router,
    public detailProduct: DetailProductServiceService,
    public newFunitureService: NewFunitureService,
    public http: HttpClient,
    private fb: FormBuilder,
    private notification: NzNotificationService,
    @Inject(Injector) private readonly injector: Injector
  ) {
  }

  ngOnInit(): void {
    this.totalPayment();
  }

  loadInfoMeForm() {
    this.infoPaymentForMe = this.fb.group({
      name: [this.queryInfoMe.name, [Validators.required]],
      phoneNumber: [this.queryInfoMe.phoneNumber, [Validators.required]],
      email: [this.queryInfoMe.email, [Validators.required, Validators.pattern('^[0-9]{7,15}$')]],
      address: [this.queryInfoMe.address, [Validators.email]],
    });
  }

  loadInfoOrtherForm() {
    this.infoPaymentForOrther = this.fb.group({
      nameOrther: [this.queryInfoOrther.name, [Validators.required]],
      phoneNumberOrther: [this.queryInfoOrther.phoneNumber, [Validators.required]],
      addressOrther: [this.queryInfoOrther.address, [Validators.required, Validators.pattern('^[0-9]{7,15}$')]],
    });
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  fnPaymentCash() {
    this.paymentCash = true;
  }

  fnPaymentVNPay() {
    this.paymentCash = false;
  }

  VNPay() {
    this.saveBillDetail()
    this.getUrlVNPay(this.totalMoneyPayment);
  }
  saveBillDetail(){
    for(let i = 0; i < this.detailProduct.carts.value.length; i++){
      const url = 'http://localhost:8090/api/billDetail/addBillDetail';
      const headers = new HttpHeaders({'Content-Type': 'application/json'});
      const body =
        {
          productDetailId: this.detailProduct.carts.value[i].id,
          quantify: this.detailProduct.carts.value[i].quantity_product,
          billID:this.newFunitureService.billId.value,
        };
      this.http.post<ResponseAPINoContent<any>>(url, body, {headers}).subscribe(
        (response) => {
          console.log(response.data)
          if (response.data){
          }else {
          }
        },
        (error) => {

        }
      );
    }
  }
  totalPayment() {
    if (this.detailProduct.intoMoney > 1000000) {
      this.totalMoneyPayment = this.detailProduct.intoMoney + this.detailProduct.freeShip
    } else {
      this.totalMoneyPayment = this.detailProduct.intoMoney + this.detailProduct.transportFee
    }
  }

  getUrlVNPay(totalMoney: number) {
    return this.http.get<ResponseAPINoContent<any>>(`http://localhost:8090/api/payment/create_payment/${totalMoney}`).subscribe((res) => {
      {
        this.detailProduct.urlVNPay.next(res.url);
        console.log(this.detailProduct.urlVNPay.value);
        window.open(this.detailProduct.urlVNPay.value);
      }
    });
  }
  saveInfor(){
    const url = 'http://localhost:8090/api/bill/addBill';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
      const body =
        {
          amount: this.totalMoneyPayment,
          customer: this.queryInfoMe.name,
          phone:this.queryInfoMe.phoneNumber,
          email: this.queryInfoMe.email,
          andress: this.queryInfoMe.address,
          note: this.queryInfoMe.note,
          payMethod: !this.paymentCash ? 'VNPay' : 'Ship code'
        };
    this.http.post<ResponseAPINoContent<any>>(url, body, {headers}).subscribe(
      (response) => {
        console.log(response.data)
        if (response.data){
          this.newFunitureService.billId.next(response.data.id);
          this.notification.success('Thông báo', "Thêm thông tin thành công!")
          this.newFunitureService.isLogin.next(true);
          this.router.navigateByUrl('/payment', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/payment']);
          });
        }else {
          this.notification.error('Thông báo', "Thêm thông tin không thành công! Vui lòng kiểm tra lại!")
        }
      },
      (error) => {

      }
    );
  }
}
