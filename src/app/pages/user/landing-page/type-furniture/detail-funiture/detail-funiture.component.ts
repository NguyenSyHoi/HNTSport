import {Component, OnInit} from '@angular/core';
import {DetailFunitureModule} from './detail-module';
import {DetailProductServiceService} from "../new-funiture/services/detail-product-service.service";
import {FormsModule} from "@angular/forms";
import {ProductDetail} from "../new-funiture/types/product-detail";
import Swal from "sweetalert2";
import {RouterLink} from "@angular/router";
@Component({
  selector: 'app-detail-funiture',
  templateUrl: './detail-funiture.component.html',
  styleUrls: ['./detail-funiture.component.scss'],
  standalone: true,
  imports: [DetailFunitureModule, FormsModule, RouterLink]
})
export class DetailFunitureComponent implements OnInit {
  listProductSimilar = [
    {key: '1', name: 'New Decor'},
    {key: '2', name: 'Rectangular Rugs'},
    {key: '3', name: 'Rugs'},
    {key: '4', name: 'What\'s New At 2Modern'},
    {key: '5', name: 'Women Designers'},
  ]
  quantity: number = 1;

  constructor(
    public detailProduct: DetailProductServiceService) {
  }

  ngOnInit() {
  }

  minus() {
    if (this.quantity != 1) {
      this.quantity--;
    }
  }

  plus() {
    if (this.quantity != 100000) {
      this.quantity++;
    }
  }

  // addToCard(product: ProductDetail) {
  //   if (this.detailProduct.carts.value.length == 0) {
  //     product.product.quantity_product = this.quantity;
  //     this.detailProduct.carts.value.push(product);
  //   } else {
  //     let lengthCart = this.detailProduct.carts.value.length;
  //     for (let i = 0; i < lengthCart; i++) {
  //       if (product.id == this.detailProduct.carts.value[i].id && product.product.id == this.detailProduct.carts.value[i].product.id) {
  //         this.detailProduct.carts.value[i].product.quantity_product += this.quantity;
  //       } else {
  //         product.product.quantity_product = this.quantity;
  //         this.detailProduct.carts.value.push(product);
  //       }
  //     }
  //   }
  //   this.detailProduct.totalQuantityProduct.next(this.detailProduct.carts.value.reduce((total, item) => {
  //     return total + item.product.quantity_product;
  //   }, 0));
  //   // this.notification.success('Thành công','Thêm vào giỏ hàng thành công!')
  // }
  addToCard(product: ProductDetail) {
    if (this.detailProduct.carts.value.length === 0) {
      product.product.quantity_product = this.quantity;
      this.detailProduct.carts.value.push(product);
    } else {
      let found = false;
      for (let i = 0; i < this.detailProduct.carts.value.length; i++) {
        if (product.id === this.detailProduct.carts.value[i].id && product.product.id === this.detailProduct.carts.value[i].product.id) {
          this.detailProduct.carts.value[i].product.quantity_product += this.quantity;
          found = true;
          break;
        }
      }
      if (!found) {
        product.product.quantity_product = this.quantity;
        this.detailProduct.carts.value.push(product);
      }
    }
    this.detailProduct.updateTotalProduct();
    Swal.fire({
      title: 'Thêm vào giỏ hàng thành công!',
      text: 'Tiếp tục mua hàng nào!',
      icon: "success",
    })
  }

  // getDataDetail(){
  //   return this.detailProduct.getDetailProduct().subscribe((res: any) => {
  //     this.detailProduct.dataDetail.next(res.data[0]);
  //   })
  // }
}
