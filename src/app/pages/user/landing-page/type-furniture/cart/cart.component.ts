import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CartModule} from "./cart-module";
import {DetailProductServiceService} from "../new-funiture/services/detail-product-service.service";
import {Router} from "@angular/router";
import {ProductDetail} from "../new-funiture/types/product-detail";
import Swal from "sweetalert2";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone:true,
  imports: [CartModule, FormsModule]
})
export class CartComponent implements OnInit{
  listProductsCart: ProductDetail[] = [];
  swalWithBootstrapButtons: any
  constructor(
    private router: Router,
    public detailProduct: DetailProductServiceService) {
  }
  ngOnInit(): void {
  }
  minus(item: ProductDetail){
    item.product.quantity_product--;
    this.detailProduct.carts.value.forEach((product: ProductDetail) =>{
      if(item.id == product.id && item.product.id == product.product.id){
        product.product.quantity_product = item.product.quantity_product;
      }
    })
    this.detailProduct.updateTotalProduct();
  }
  plus(item: ProductDetail){
    item.product.quantity_product++;
    this.detailProduct.carts.value.forEach((product: ProductDetail) =>{
      if(item.id == product.id && item.product.id == product.product.id){
        product.product.quantity_product = item.product.quantity_product;
      }
    })
    this.detailProduct.updateTotalProduct();
  }

  goToHome(){
    this.router.navigate(['/']);
  }
  deleteProduct(cart: any){
    Swal.fire({
      title: 'Bạn có chắc chắn muốn sản phẩm này khỏi giỏ hàng không?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xoá khỏi giỏ hàng',
      cancelButtonText: 'Quay lại',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.confirmDelete(cart)
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {

      }
    })
  }
  confirmDelete(cart: any){
    this.listProductsCart = [];
    let lengthCarts = this.detailProduct.carts.value.length;
    for(let i = 0; i < lengthCarts; i++){
      if(cart.id !== this.detailProduct.carts.value[i].id &&  cart.product.id !== this.detailProduct.carts.value[i].product.id){
        this.listProductsCart.push(this.detailProduct.carts.value[i]);
        this.router.navigate(['/cart']);
      }
    }
    this.detailProduct.carts.next(this.listProductsCart);
    this.detailProduct.updateTotalProduct();
    Swal.fire(
      {
        title: 'Xóa thành công!',
        icon: 'success'
      }
    );

  }

  deleteAllCart(){
    this.detailProduct.carts.next([]);
    this.detailProduct.totalQuantityProduct.next(0);
    this.router.navigate(['/cart']);
    this.detailProduct.updateTotalProduct();
  }
}
