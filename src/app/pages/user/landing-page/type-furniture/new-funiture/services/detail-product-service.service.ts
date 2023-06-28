import { environment } from './../../../../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CardItem } from '../types/card-item';
import { BehaviorSubject, catchError, combineLatest, Observable, of, pluck, switchMap, debounceTime, takeUntil, finalize, delay } from 'rxjs';
import {ProductDetail} from "../types/product-detail";
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
  transportFee: number = 30000;
  freeShip: number = 0;
  totalQuantityProduct = new BehaviorSubject<number>(0);
  constructor(private http: HttpClient) {

  }
  getDetailProduct(id: number){
    return this.http.get(`${this.BASE_URL}/productDetails/geProductDetailById/${id}`);
  }
  updateTotalProduct(){
    this.totalQuantityProduct.next(this.carts.value.reduce((total, item) => {
      return total + item.product.quantity_product;
    }, 0));
  }
}
