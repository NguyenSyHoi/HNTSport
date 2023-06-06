import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HeaderModule} from './header-module';
import {DetailProductServiceService} from "../type-furniture/new-funiture/services/detail-product-service.service";
import {NzBadgeModule} from "ng-zorro-antd/badge";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [HeaderModule, NzBadgeModule]
})
export class HeaderComponent implements OnInit {
  totalQuantityProduct: number = 0

  constructor(
    private router: Router,
    public detailProduct: DetailProductServiceService
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

}
