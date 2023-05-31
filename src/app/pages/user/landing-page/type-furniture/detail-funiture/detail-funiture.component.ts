import { Component, OnInit } from '@angular/core';
import { DetailFunitureModule } from './detail-module';
import {DetailProductServiceService} from "../new-funiture/services/detail-product-service.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-detail-funiture',
  templateUrl: './detail-funiture.component.html',
  styleUrls: ['./detail-funiture.component.scss'],
  standalone:true,
  imports: [DetailFunitureModule, FormsModule]
})
export class DetailFunitureComponent implements OnInit {
  listProductSimilar = [
    {key:'1',name:'New Decor'},
    {key:'2',name:'Rectangular Rugs'},
    {key:'3',name:'Rugs'},
    {key:'4',name:'What\'s New At 2Modern'},
    {key:'5',name:'Women Designers'},
  ]
  quantity: number = 1;
  constructor(
    public detailProduct: DetailProductServiceService){}

  ngOnInit() {
    this.getDataDetail();
  }
  minus(){
    if(this.quantity != 1){
      this.quantity --;
    }
  }
  plus(){
    if(this.quantity != 100000){
      this.quantity ++;
    }
  }

  addToCard(item: any){
    console.log(item);
  }

  getDataDetail(){
    return this.detailProduct.getDetailProduct().subscribe((res: any) => {
      this.detailProduct.dataDetail.next(res.data[0]);
    })
  }
}
