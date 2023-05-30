import { NzGridModule } from 'ng-zorro-antd/grid';
import { PaginationComponent } from './../pagination/pagination.component';
import { TranslocoModule } from '@ngneat/transloco';
import { CommonModule } from "@angular/common";
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
export const TableModule = [
  CommonModule,
  NzTableModule,
  NzCheckboxModule,
  TranslocoModule,
  NzToolTipModule,
  PaginationComponent,
  NzGridModule,
]
