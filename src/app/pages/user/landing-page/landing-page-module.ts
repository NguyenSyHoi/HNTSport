import {RouterModule} from '@angular/router';
import {TypeFurnitureComponent} from './type-furniture/type-furniture.component';
import {CommonModule} from '@angular/common';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {NzAlertModule} from "ng-zorro-antd/alert";
import {NzButtonModule} from "ng-zorro-antd/button";

export const LandingPageModule = [
  HeaderComponent,
  CommonModule,
  NzIconModule,
  TypeFurnitureComponent,
  RouterModule,
  FooterComponent,
  NzSpinModule,
  NzIconModule,
  NzAlertModule,
  NzButtonModule,
  NzAlertModule,
]
