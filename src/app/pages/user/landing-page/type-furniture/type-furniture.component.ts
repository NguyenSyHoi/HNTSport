import { Component, OnInit } from '@angular/core';
import { ListFurniture } from './constants/list-furniture';
import { TypeFurnitureModule } from './type-furniture-module';
import {NewFunitureService} from "./new-funiture/services/new-funiture-service.service";
import {DetailProductServiceService} from "./new-funiture/services/detail-product-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-type-furniture',
  templateUrl: './type-furniture.component.html',
  styleUrls: ['./type-furniture.component.scss'],
  standalone: true,
  imports: [TypeFurnitureModule]
})
export class TypeFurnitureComponent implements OnInit {
  listFurniture = ListFurniture;
  constructor(
    public newFunitureService: NewFunitureService,
    public detailFunitureService: DetailProductServiceService,
    public router: Router
  ) { }

  ngOnInit() {
  }
  showProductsByCategory(category: any){
    this.newFunitureService.getProductsByCategory(category.id).subscribe(res =>{
      if(res.data.length > 0){
        this.detailFunitureService.listDataCard.next(res.data);
        this.detailFunitureService.isProductsByCategory.next(true);
      }else {
        this.detailFunitureService.listDataCard.next([]);
        this.detailFunitureService.isProductsByCategory.next(true);
        console.log(this.detailFunitureService.listDataCard.value);
      }
    })
    this.router.navigateByUrl('/products', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/products']);
    });
  }
}
