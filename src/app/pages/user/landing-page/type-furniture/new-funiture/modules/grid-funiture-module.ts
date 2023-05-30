import { CardItemComponent } from './../grid-new-funiture/card-item/card-item.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { CommonModule } from '@angular/common';
import { SearchFunitureComponent } from "../grid-new-funiture/search-funiture/search-funiture.component";
import { PaginationLandingPageComponent } from 'src/app/common/pagination-landing-page/pagination-landing-page.component';

export const GridFunitureModule = [
  SearchFunitureComponent,
  CommonModule,
  PaginationLandingPageComponent,
  NzDropDownModule,
  NzIconModule,
  CardItemComponent,
]
