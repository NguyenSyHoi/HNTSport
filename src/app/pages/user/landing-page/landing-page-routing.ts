
import { Route } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { LandingPageComponent } from "./landing-page.component";
import { DetailFunitureComponent } from "./type-furniture/detail-funiture/detail-funiture.component";
import { NewFunitureComponent } from "./type-furniture/new-funiture/new-funiture.component";
import {CartComponent} from "./type-furniture/cart/cart.component";
import {GridNewFunitureComponent} from "./type-furniture/new-funiture/grid-new-funiture/grid-new-funiture.component";
import {PaymentComponent} from "./type-furniture/payment/payment.component";
export const routes: Route[] = [
  {
    path: '',
    component: LandingPageComponent,
    children: [
      {
        path: '',
        component: NewFunitureComponent
      },
      {
        path: 'products',
        component: GridNewFunitureComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'detail',
        component: DetailFunitureComponent
      },
      {
        path: 'cart',
        component: CartComponent
      },
      {
        path: 'payment',
        component: PaymentComponent
      }
    ]
  }
]
