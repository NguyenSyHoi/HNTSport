import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HeaderModule} from './header-module';
import {DetailProductServiceService} from "../type-furniture/new-funiture/services/detail-product-service.service";
import {NzBadgeModule} from "ng-zorro-antd/badge";
import {NewFunitureService} from "../type-furniture/new-funiture/services/new-funiture-service.service";
import {FormsModule} from "@angular/forms";
import {ResponseAPINoContent} from "../../../../common/types/response-api";
import {CardItem} from "../type-furniture/new-funiture/types/card-item";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [HeaderModule, NzBadgeModule, FormsModule]
})
export class HeaderComponent implements OnInit {
  totalQuantityProduct: number = 0;
  contentSearch: string = '';
  constructor(
    private router: Router,
    public detailProduct: DetailProductServiceService,
    public newFunitureService: NewFunitureService,
    public http: HttpClient
  ) {
  }

  ngOnInit() {
  }

  home() {
    this.router.navigate(['/']);
  }

  login() {
    this.router.navigate(['/login']);
  }

  cart() {
    this.router.navigate(['/cart']);
  }
  eSearch() {
    if( this.contentSearch == ''){
      this.getListProduct();
    }else{
      this.newFunitureService.getProductsByName(this.contentSearch).subscribe(res=>{
        if (res.data.length > 0){
          console.log(res.data);
          this.detailProduct.listDataCard.next(res.data)
        }else {
          this.detailProduct.listDataCard.next([]);
        }
      });
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/']);
      });
    }
  }
  getListProduct() {
    return this.http.get<ResponseAPINoContent<CardItem[]>>('http://localhost:8090/api/productT/getAllProducts').subscribe((res)=>{{
      if(res){
        if(this.detailProduct.isProductsByCategory.value){
          this.detailProduct.listDataCard.value;
        }else{
          this.detailProduct.listDataCard.next(res.data);
        }
      }
    }});
  }
}
