import { ResizeColumnDirective } from './../../../common/directives/resize-column.directive';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
export const ProductManageModule = [
  CommonModule,
  NzTableModule,
  ResizeColumnDirective
]
