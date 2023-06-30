import { environment } from './../../../../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CardItem } from '../types/card-item';
import { BehaviorSubject, catchError, combineLatest, Observable, of, pluck, switchMap, debounceTime, takeUntil, finalize, delay } from 'rxjs';
import {ProductDetail} from "../types/product-detail";
import {ResponseAPINoContent} from "../../../../../../common/types/response-api";
@Injectable({
  providedIn: 'root'
})
export class DetailProductServiceService {
  private readonly BASE_URL = environment.server;
  isLoading$ = new BehaviorSubject(false);
  isProductsByCategory = new BehaviorSubject(false);
  dataDetail = new BehaviorSubject<any>([]);
  listDataCard = new BehaviorSubject<CardItem[]>([]);
  carts = new BehaviorSubject<ProductDetail[]>([]);
  intoMoney: number = 0;
  address: string = '';
  transportFee: number = 30000;
  freeShip: number = 0;
  urlVNPay = new BehaviorSubject<string>('')
  totalQuantityProduct = new BehaviorSubject<number>(0);
  size = new BehaviorSubject<string>('')
  constructor(private http: HttpClient) {

  }
  getDetailProduct(id: number){
    return this.http.get(`${this.BASE_URL}/productDetails/geProductDetailById/${id}`);
  }
  updateTotalProduct(){
    this.totalQuantityProduct.next(this.carts.value.reduce((total, item) => {
      return total + item.quantity_product;
      console.log(this.totalQuantityProduct.value);
    }, 0));
  }
  getDetailProductBySize(id: number, size: string){
    return this.http.get<ResponseAPINoContent<ProductDetail[]>>(`${this.BASE_URL}/productDetails/getBySize/${id}/${size}`);
  }
}
