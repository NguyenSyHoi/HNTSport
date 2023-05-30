import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';

import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";
import { NzCollapseModule } from "ng-zorro-antd/collapse";
import { NzSliderModule } from "ng-zorro-antd/slider";
export const SearchModule = [
  CommonModule,
  NzCollapseModule,
  NzCheckboxModule,
  NzSliderModule,
  FormsModule,
  NzInputModule,
  NzButtonModule,
  ReactiveFormsModule
]
