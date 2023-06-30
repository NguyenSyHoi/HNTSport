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
  address: string = '';
  constructor(
    private router: Router,
    public detailProduct: DetailProductServiceService) {
  }
  ngOnInit(): void {
    this.totalPrice();
  }
  minus(item: ProductDetail){
    item.quantity_product--;
    this.detailProduct.carts.value.forEach((product: ProductDetail) =>{
      if(item.id == product.id && item.product.id == product.product.id){
        product.quantity_product = item.quantity_product;
      }
    })
    this.detailProduct.updateTotalProduct();
    this.detailProduct.intoMoney -= item.product.price;
  }
  plus(item: ProductDetail){
    item.quantity_product++;
    this.detailProduct.carts.value.forEach((product: ProductDetail) =>{
      if(item.id == product.id && item.product.id == product.product.id){
        product.quantity_product = item.quantity_product;
      }
    })
    this.detailProduct.updateTotalProduct();
    this.detailProduct.intoMoney += item.product.price;
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
      if((cart.id !== this.detailProduct.carts.value[i].id &&
        (cart.product.id == this.detailProduct.carts.value[i].product.id || cart.product.id !== this.detailProduct.carts.value[i].product.id))){
        this.listProductsCart.push(this.detailProduct.carts.value[i]);
        this.router.navigate(['/cart']);
      }
    }
    this.detailProduct.carts.next(this.listProductsCart);
    this.totalPrice();
    this.detailProduct.updateTotalProduct();
    Swal.fire(
      {
        title: 'Xóa thành công!',
        icon: 'success'
      }
    );
  }

  deleteAllCart(){
    Swal.fire({
      title: 'Bạn có chắc chắn muốn tất cả sản phẩm khỏi giỏ hàng không?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xoá tất cả khỏi giỏ hàng',
      cancelButtonText: 'Quay lại',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.confirmDeleteAll()
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
      }
    })
  }
  confirmDeleteAll(){
    this.detailProduct.carts.next([]);
    this.detailProduct.totalQuantityProduct.next(0);
    this.detailProduct.intoMoney = 0;
    this.router.navigate(['/cart']);
    this.detailProduct.updateTotalProduct();
    Swal.fire(
      {
        title: 'Xóa thành công!',
        icon: 'success'
      }
    );
  }
  totalPrice(){
    this.detailProduct.intoMoney = 0;
    for(let i = 0; i< this.detailProduct.carts.value.length; i++){
      this.detailProduct.intoMoney += this.detailProduct.carts.value[i].product.price * this.detailProduct.carts.value[i].quantity_product;
    }
  }
  makePayment(){
    this.detailProduct.address = this.address;
    this.router.navigate(['/payment'])
  }
}
