import { Routes } from '@angular/router';
export const APP_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/user/landing-page/landing-page-routing').then(m => m.routes)
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin-routing').then(m => m.route)
  }
]

