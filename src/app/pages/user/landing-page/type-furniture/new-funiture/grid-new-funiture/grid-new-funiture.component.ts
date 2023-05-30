import { DestroyService } from './../../../../../../common/service/destroy.service';
import {ResponseAPIContent, ResponseAPINoContent} from './../../../../../../common/types/response-api';
import { CardItem } from './../types/card-item';
import { NewFunitureService } from './../services/new-funiture-service.service';
import { Component, OnInit } from '@angular/core';
import { GridFunitureModule } from '../modules/grid-funiture-module';
import { DataSorting } from '../data/sorting';
import { SUCCESS } from 'src/app/common/constant/http-status';
import { PayloadProduct } from '../types/payload-product';
import { Pageable } from 'src/app/common/types/pageable';
import {delay, finalize, takeUntil, BehaviorSubject, Observable, combineLatest, switchMap, forkJoin} from 'rxjs';
import { NzTableSortOrder } from 'ng-zorro-antd/table';
import {Category} from "../types/category";
import {HttpClient} from "@angular/common/http";
import { environment } from './../../../../../../../environments/environment.prod';
import {Form, FormBuilder, FormGroup} from "@angular/forms";
import {SearchForm} from "../types/search-funiture";

@Component({
  selector: 'app-grid-new-funiture',
  templateUrl: './grid-new-funiture.component.html',
  styleUrls: ['./grid-new-funiture.component.scss'],
  standalone: true,
  imports: [GridFunitureModule],
  providers: [DestroyService]
})
export class GridNewFunitureComponent implements OnInit {
  private readonly BASE_URL = environment.server;
  listSorting = DataSorting;
  searchForm!: FormGroup;
  listDataCard: CardItem[] = [];
  sort$ = new BehaviorSubject<{ key: string; order: NzTableSortOrder }>({
    key: 'updated_date',
    order: 'desc',
  });
  totalPage = 0;
  showDropDown = false;
  vm$!: Observable<ResponseAPIContent<CardItem[]>>;
  constructor(
    public service: NewFunitureService,
    private destroy$: DestroyService,
    private http: HttpClient,
    private fb: FormBuilder,

) { }
  ngOnInit() {
    this.vm$ = this.service.search().pipe(
      takeUntil(this.destroy$),
    )
    this.getListProduct()
  }
  initData() {
    forkJoin([ this.service.getListCategory()],
      ( listProduct) => {
        return {
          // colors: listColor,
          categories: listProduct
        }
      }
    ).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (res) => {
        // res.colors.errorCode === SUCCESS &&
        if (res.categories.errorCode === SUCCESS) {
          // this.listColor = res.colors.data;
          // this.pushControlToFormArray(res.colors.data);
          // this.listCategory = res.categories.data;
        }
      }
    })
  }

  loadForm() {
    this.searchForm = this.fb.nonNullable.group<SearchForm>({
      branch: this.fb.nonNullable.control(''),
      category: this.fb.nonNullable.control(''),
      // minPrice: this.fb.nonNullable.control(this.minMax[0].toString()),
      // maxPrice: this.fb.nonNullable.control(this.minMax[1].toString()),
      // colors: this.fb.nonNullable.array<ColorArr[]>([])
    })
  }
  onSort(value: { key: string, label: string }) {
    switch (value.key) {
      case "lowToHight": {
        this.service.sort$.next({ key: 'price', order: 'asc' });
        break;
      }
      case "hightToLow": {
        this.service.sort$.next({ key: 'price', order: 'desc' });
        break;
      }
      case "asc": {
        this.service.sort$.next({ key: 'name', order: 'asc' });
        break;
      }
      case "desc": {
        this.service.sort$.next({ key: 'name', order: 'desc' });
        break;
      }
      default:
        break;
    }
  }
  getListProduct() {
    return this.http.get<ResponseAPINoContent<CardItem[]>>('http://localhost:8090/api/productDetails/getAllProductDetails').subscribe((res)=>{{
      if(res){
        this.listDataCard = res.data;
      }
    }});
  }
}
