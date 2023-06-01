import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { listCard } from './data-card';
import { FunitureModule } from './modules/funiture-module';
import {NewFunitureService} from "./services/new-funiture-service.service";

@Component({
  selector: 'app-new-funiture',
  templateUrl: './new-funiture.component.html',
  styleUrls: ['./new-funiture.component.scss'],
  standalone: true,
  imports: [FunitureModule]
})
export class NewFunitureComponent implements OnInit {
  listCard = listCard;
  constructor(
    public newFunitureService: NewFunitureService
  ) { }

  ngOnInit() {
  }
  showProductsByCategory(item: any){
    this.newFunitureService.getProductsByCategory(item.type).subscribe(res =>{
      console.log(res.data);
    })
  }
}
