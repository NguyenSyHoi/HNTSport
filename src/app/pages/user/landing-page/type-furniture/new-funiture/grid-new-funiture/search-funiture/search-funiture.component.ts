import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { SUCCESS } from 'src/app/common/constant/http-status';
import { takeUntil, debounceTime, switchMap, distinctUntilChanged, Observable, filter, BehaviorSubject, map, max, forkJoin, combineLatest, finalize, startWith, of, catchError } from 'rxjs';
import { DestroyService } from './../../../../../../../common/service/destroy.service';
import { NewFunitureService } from './../../services/new-funiture-service.service';
import { Util } from './../../../../../../../utils/functions';
import { Component, OnInit } from '@angular/core';
import { DataCategory } from '../../data/category';
import { DataWallPaper } from '../../data/data-wallpaper';
import { DataSeatCapacity } from '../../data/data-seat-capacity';
import { SearchModule } from './search-module';
import { Color, ColorArr } from 'src/app/common/models/color';
import { ResponseAPINoContent } from 'src/app/common/types/response-api';
import { SearchForm } from '../../types/search-funiture';
import { Category } from '../../types/category';
import { NzTableSortOrder } from 'ng-zorro-antd/table';
import { Pageable } from 'src/app/common/types/pageable';
import { PayloadProduct } from '../../types/payload-product';
// import { ResponseApi } from 'src/app/common/types/response-api';
@Component({
  selector: 'app-search-funiture',
  templateUrl: './search-funiture.component.html',
  styleUrls: ['./search-funiture.component.scss'],
  standalone: true,
  imports: [SearchModule],
  providers: [DestroyService]
})
export class SearchFunitureComponent implements OnInit {
  listCategory: Category[] = [];
  searchForm!: FormGroup<SearchForm>;
  listColor: Color[] = [];
  priceValue = 985400;
  minMax: number[] = [0, 985400];
  colorInput = new FormControl<string>('');
  constructor(private service: NewFunitureService,
    private fb: FormBuilder,
    private destroy$: DestroyService) {
    this.loadForm();
  }
  ngOnInit() {
    // this.searchColorByName();
    this.initData();
    // this.emitData();
  }
  // emitData() {
  //   // this.minprice.valueChanges.pipe(
  //   //   startWith(null)
  //   // ).subscribe(res => {
  //   //   this.service.minPrice$.next(res);
  //   // })
  //   // this.maxprice.valueChanges.pipe(
  //   //   startWith(null)
  //   // ).subscribe(res => {
  //   //   this.service.maxPrice$.next(res);
  //   // })
  //   this.colorsArr.valueChanges.pipe(
  //     startWith([])
  //   ).subscribe(res => {
  //     let names: string[] = [];
  //     for (let i = 0; i < res.length; i++) {
  //       if (res[i].checked) {
  //         names.push(res[i].name);
  //       }
  //     }
  //     this.service.colortArr$.next(names);
  //   })
  // }
  get category(): FormControl {
    return this.searchForm.controls.category;
  }
  // get minprice(): FormControl {
  //   return this.searchForm.controls.minPrice;
  // }
  // get maxprice(): FormControl {
  //   return this.searchForm.controls.maxPrice;
  // }

  // serchByCondition() {
  //   const observable = {
  //     minPrice: this.minPrice.valueChanges.pipe(startWith(null)),
  //     maxPrice: this.maxPrice.valueChanges.pipe(startWith(null)),
  //     colors: this.colorsArr.valueChanges.pipe(startWith([]))
  //   }
  // }
  initData() {
    forkJoin([ this.service.getListCategory()],
      ( listCategory) => {
        return {
          // colors: listColor,
          categories: listCategory
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
          this.listCategory = res.categories.data;
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
  // searchColorByName() {
  //   this.colorInput.valueChanges.pipe(
  //     debounceTime(500),
  //     distinctUntilChanged(),
  //   ).subscribe({
  //     next: (res) => {
  //       if (res) {
  //         let dataSearch = this.listColor.filter((item: Color) => item.name.includes(res.trim()));
  //         this.colorsArr.clear();
  //         this.pushControlToFormArray(dataSearch || this.listColor);
  //       }
  //     }
  //   })
  // }
  // pushControlToFormArray(data: Color[] | ColorArr[]) {
  //   data.forEach(item => {
  //     this.colorsArr.push(new FormGroup({ name: new FormControl(item.name), quantity: new FormControl(item.quantity), checked: new FormControl(false) }));
  //   })
  // }
  // get colorsArr(): FormArray {
  //   return this.searchForm.controls['colors'];
  // }
  // changeSlider(val: number[]) {
  //   this.minMax = val;
  //   this.service.minPrice$.next(val[0]);
  //   this.service.maxPrice$.next(val[1]);
  // }
  // get minPrice(): FormControl {
  //   return this.searchForm.controls.minPrice
  // }
  // get maxPrice(): FormControl {
  //   return this.searchForm.controls.maxPrice
  // }
  // applyPrice() {
  //   if (this.maxPrice.value) {
  //     this.minMax = [this.minMax[0], +this.maxPrice.value.replace(/^0+/, "")]
  //     this.maxPrice.patchValue(this.maxPrice.value.replace(/^0+/, ""));
  //     this.service.maxPrice$.next(this.maxPrice.value);
  //   } else {
  //     this.minMax[1] = 98540;
  //     this.maxPrice.patchValue(985400);
  //     this.service.maxPrice$.next(this.maxPrice.value);
  //   }
  //   if (this.minPrice.value) {
  //     // replace all number zero 00000235 => 235
  //     this.minMax = [+this.minPrice.value.replace(/^0+/, ""), this.minMax[1]];
  //     this.minPrice.patchValue(this.minPrice.value.replace(/^0+/, ""));
  //     this.service.minPrice$.next(this.minPrice.value);
  //   } else {
  //     this.minMax[0] = 0;
  //     this.minPrice.patchValue(0)
  //     this.service.minPrice$.next(this.minPrice.value);
  //   }
  // }
  onlyNumber(event: any) {
    return Util.onlyNumber(event);
  }
}
