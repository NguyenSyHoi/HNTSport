import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CardItem } from '../../types/card-item';
import {DetailProductServiceService} from "../../services/detail-product-service.service";

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
  standalone: true,
  imports: [CommonModule]
})

export class CardItemComponent implements OnInit {
  listProductDetail = [];
  constructor(
    private router:Router,
    public detailFunitureService: DetailProductServiceService) { }

  ngOnInit() {
  }
  detailItem(item: CardItem){
      this.detailFunitureService.getDetailProduct(item.id).subscribe((res: any) =>{
        this.detailFunitureService.dataDetail.next(res.data[0])
        console.log(this.detailFunitureService.dataDetail.value);
      })
      this.router.navigate(['/detail']);
  }
}
