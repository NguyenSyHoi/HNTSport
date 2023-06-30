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
  buttons = [
    { id: 1, color: '', colorText: '', size: 'S' },
    { id: 2, color: '', colorText: '', size: 'M' },
    { id: 3, color: '', colorText: '', size: 'L' },
    { id: 4, color: '', colorText: '', size: 'XL' },
    { id: 5, color: '', colorText: '', size: '2XL' },
  ];
  selectedButtonId: number | null = null;
  productDetailSize: any;
  isActiveBtnAddToCart: boolean = false;
  constructor(
    public detailProduct: DetailProductServiceService) {
  }

  ngOnInit() {
    this.selectSize("S", 1)
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
  addToCard(product: ProductDetail, size: string) {
    this.detailProduct.getDetailProductBySize(product.product.id, size).subscribe(res=>{
      this.productDetailSize = res.data;
      this.confirmAddToCard(product);
    })}
  confirmAddToCard(product: ProductDetail){
    if (this.detailProduct.carts.value.length === 0) {
      this.productDetailSize.quantity_product = this.quantity;
      this.detailProduct.carts.value.push(this.productDetailSize);
      console.log(this.detailProduct.carts.value);
    } else {
      let found = false;
      for (let i = 0; i < this.detailProduct.carts.value.length; i++) {
        if (this.productDetailSize.id === this.detailProduct.carts.value[i].id && this.productDetailSize.product.id === this.detailProduct.carts.value[i].product.id) {
          this.detailProduct.carts.value[i].quantity_product += this.quantity;
          found = true;
          break;
        }
      }
      if (!found) {
        this.productDetailSize.quantity_product = this.quantity;
        this.detailProduct.carts.value.push(this.productDetailSize);
      }
    }
    this.detailProduct.updateTotalProduct();
    Swal.fire({
      title: 'Thêm vào giỏ hàng thành công!',
      text: 'Tiếp tục mua hàng nào!',
      icon: "success",
    })
    if (this.detailProduct.totalQuantityProduct){
      this.isActiveBtnAddToCart = true;
    }
  }
  selectSize(size: string, buttonId: number){
    this.detailProduct.size.next(size);
    if (this.selectedButtonId !== null) {
      const previousButton = this.buttons.find(button => button.id === this.selectedButtonId);
      if (previousButton) {
        previousButton.color = ''; // Bỏ tô màu cho button trước đó
        previousButton.colorText = 'black'; // Bỏ tô màu cho button trước đó
      }
    }

    const selectedButton = this.buttons.find(button => button.id === buttonId);
    if (selectedButton) {
      selectedButton.color = '#0F766E'; // Tô màu cho button được chọn
      selectedButton.colorText = 'white'; // Tô màu cho button được chọn
    }
    this.selectedButtonId = buttonId;
  }
}
