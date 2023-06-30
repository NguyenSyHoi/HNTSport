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
export class NewFunitureService {
  isLogin = new BehaviorSubject<boolean>(false)
  userName = new BehaviorSubject<string>('')
  billId = new BehaviorSubject(null);
  private readonly BASE_URL = environment.server;
  isLoading$ = new BehaviorSubject(false);
  pageIndex$ = new BehaviorSubject(1);
  pageSize$ = new BehaviorSubject(5);
  sort$ = new BehaviorSubject<{ key: string; order: NzTableSortOrder }>({
    key: 'updated_date',
    order: 'desc',
  });
  constructor(private http: HttpClient) {

  }
  search(): Observable<any> {

    return combineLatest({
      // minPrice: this.minPrice$,
      // maxPrice: this.maxPrice$,
      // colors: this.colortArr$,
      page: this.pageIndex$,
      pageSize: this.pageSize$,
      sort: this.sort$
    }
    ).pipe(
      debounceTime(500),
      switchMap(({  page, pageSize, sort }) => {
        let body: Partial<PayloadProduct> = {
          // colors: colors,
          // fromPrice: minPrice,
          // toPrice: maxPrice
          // minPrice, maxPrice, colors,
        }

        let pageable: Pageable = {
          page: page - 1,
          pageSize: pageSize,
          sort: sort.key,
          order: sort.order
        }
        this.isLoading$.next(true);
        return this.searchProduct(body, pageable).pipe(
          catchError(err => of('')),
          finalize(() => this.isLoading$.next(false)),
        );
      }),
    );
  }
  searchProduct(body: Partial<PayloadProduct>, pageable: Pageable): Observable<ResponseAPIContent<CardItem[]>> {
    return this.http.post<ResponseAPIContent<CardItem[]>>(`${this.BASE_URL}/product/search?page=${pageable.page}&size=${pageable.pageSize}&sort=${pageable.sort},${pageable.order}`, body);
  }
  getLoading() {
    return this.isLoading$.asObservable();
  }

  // getListColor(name = '') {
  //   return this.http.get<ResponseAPINoContent<Color[]>>(`${this.BASE_URL}/color/search?name=${name}`);
  // }
  getListCategory() {
    return this.http.get<ResponseAPINoContent<Category[]>>(`${this.BASE_URL}/category/getAllCategory`);
  }
  getProductsByCategory(id: number){
    return this.http.get<ResponseAPINoContent<CardItem[]>>(`${this.BASE_URL}/productT/getProductByCategory/${id}`)
  }
  getProductsByName(name: string){
    return this.http.get<ResponseAPINoContent<CardItem[]>>(`${this.BASE_URL}/productT/getProductByName/${name}`)
  }
  getListProduct() {
    return this.http.get<ResponseAPINoContent<CardItem[]>>('http://localhost:8090/api/productT/getAllProducts');
  }
}
