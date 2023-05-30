import { ProductManageComponent } from './product-manage/product-manage.component';
import { AdminComponent } from './admin.component';
import { Routes } from '@angular/router';
export const route: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path:'',
        component:ProductManageComponent
      }
    ]
  }
]
