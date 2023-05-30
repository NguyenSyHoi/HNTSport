import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NewFunitureService } from './pages/user/landing-page/type-furniture/new-funiture/services/new-funiture-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone:true,
  imports:[CommonModule,RouterModule,NzBackTopModule,NzSpinModule,NzIconModule]
})
export class AppComponent {
  isLoading = this.service.getLoading();
  constructor(private service: NewFunitureService) { }
}
