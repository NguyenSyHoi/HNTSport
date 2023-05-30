import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzNotificationModule } from 'ng-zorro-antd/notification';

export const RegisterModule = [
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  NzInputModule,
  NzButtonModule,
  NzIconModule,
  NzFormModule,
  NzNotificationModule
]
