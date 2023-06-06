import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { listCard } from './data-card';
import { FunitureModule } from './modules/funiture-module';
import {NewFunitureService} from "./services/new-funiture-service.service";
import {DetailProductServiceService} from "./services/detail-product-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-funiture',
  templateUrl: './new-funiture.component.html',
  styleUrls: ['./new-funiture.component.scss'],
  standalone: true,
  imports: [FunitureModule]
})
export class NewFunitureComponent implements OnInit {
  listCard = listCard;
  constructor(
    public newFunitureService: NewFunitureService,
    public detailFunitureService: DetailProductServiceService,
    private router:Router,
  ) { }

  ngOnInit() {
  }
  showProductsByCategory(item: any){
    this.newFunitureService.getProductsByCategory(item.type).subscribe(res =>{
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
