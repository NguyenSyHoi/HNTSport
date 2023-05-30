import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ShowErrorComponent } from './../../../../../common/show-error/show-error.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
export const LoginModule  = [
  CommonModule,
  NzFormModule,
  NzInputModule,
  NzButtonModule,
  ShowErrorComponent,
  NzIconModule,
  FormsModule,
  ReactiveFormsModule,
  NzNotificationModule
]
