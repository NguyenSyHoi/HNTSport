import { environment } from './../../../../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CardItem } from '../types/card-item';
import { BehaviorSubject, catchError, combineLatest, Observable, of, pluck, switchMap, debounceTime, takeUntil, finalize, delay } from 'rxjs';
import { PayloadProduct } from '../types/payload-product';
import { Pageable } from 'src/app/common/types/pageable';
import { Color } from 'src/app/common/models/color';
import { ResponseAPIContent, ResponseAPINoContent, ResponseBase } from 'src/app/common/types/response-api';
import { Category } from '../types/category';
import { NzTableSortOrder } from 'ng-zorro-antd/table';

@Injectable({
  providedIn: 'root'
})
export class DetailProductServiceService {
  private readonly BASE_URL = environment.server;
  isLoading$ = new BehaviorSubject(false);
  dataDetail = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient) {

  }
  getDetailProduct(){
    return this.http.get(`${this.BASE_URL}/productDetails/getAllProductDetails`);
  }
}
