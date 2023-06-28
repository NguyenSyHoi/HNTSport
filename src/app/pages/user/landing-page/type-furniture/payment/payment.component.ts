import {Component, OnInit} from '@angular/core';
import {PaymentModule} from "./payment-module";
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import {DestroyService} from "../../../../../common/service/destroy.service";
import {Route, Router} from "@angular/router";
import {DetailProductServiceService} from "../new-funiture/services/detail-product-service.service";
import {NzRadioModule} from "ng-zorro-antd/radio";
import {FormsModule} from "@angular/forms";
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  standalone: true,
  imports: [PaymentModule, NzRadioModule, FormsModule],
  providers: [DestroyService]

})
export class PaymentComponent implements OnInit{
  paymentCash: boolean = true;
  constructor(
    public router: Router,
    public detailProduct: DetailProductServiceService
  ) {
  }
  ngOnInit(): void {
  }
  goToHome(){
    this.router.navigate(['/']);
  }
  VNPay(){

  }
}
