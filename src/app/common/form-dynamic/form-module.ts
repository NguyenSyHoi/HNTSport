import { StyleErrorDirective } from 'src/app/common/directives/style-error.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CommonModule } from '@angular/common';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { ShowErrorComponent } from '../show-error/show-error.component';
export const FormModule = [
  CommonModule,
  NzInputModule,
  NzCheckboxModule,
  NzRadioModule,
  NzButtonModule,
  NzFormModule,
  ReactiveFormsModule,
  NzSelectModule ,
  NgxTrimDirectiveModule,
  NzDatePickerModule,
  ShowErrorComponent,
  StyleErrorDirective
]
