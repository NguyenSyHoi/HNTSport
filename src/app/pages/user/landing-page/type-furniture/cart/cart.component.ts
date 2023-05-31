import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CartModule} from "./cart-module";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone:true,
  imports: [CartModule, FormsModule]
})
export class CartComponent implements OnInit{
  listProduct = [
    { name: 'Product 1', image: 'product1.jpg', price: 10.99, quantity: 3 },
    { name: 'Product 2', image: 'product2.jpg', price: 19.99, quantity: 2 },
    // Thêm các sản phẩm khác vào đây
  ];
  ngOnInit(): void {
  }

}
