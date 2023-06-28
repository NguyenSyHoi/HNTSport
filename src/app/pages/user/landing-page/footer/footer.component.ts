import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InfomationShop } from './data/data-col-1';
import { serviceCustomer } from './data/data-col-2';
import { DataCol3 } from './data/data-col-3';
import { NzInputModule } from 'ng-zorro-antd/input';
import { DataIconSocial } from './data/icon-social';
import { DataFooter } from './data/data-footer';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [CommonModule, NzIconModule, NzInputModule]
})
export class FooterComponent implements OnInit {
  dataCol1 = InfomationShop;
  dataCol2 = serviceCustomer;
  dataCol3 = DataCol3;
  dataFooter = DataFooter;
  listSocial = DataIconSocial;
  constructor() { }

  ngOnInit() {
  }

}
