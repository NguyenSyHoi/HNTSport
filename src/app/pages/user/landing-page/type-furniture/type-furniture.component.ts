import { Component, OnInit } from '@angular/core';
import { ListFurniture } from './constants/list-furniture';
import { TypeFurnitureModule } from './type-furniture-module';

@Component({
  selector: 'app-type-furniture',
  templateUrl: './type-furniture.component.html',
  styleUrls: ['./type-furniture.component.scss'],
  standalone: true,
  imports: [TypeFurnitureModule]
})
export class TypeFurnitureComponent implements OnInit {
  listFurniture = ListFurniture;
  constructor() { }

  ngOnInit() {
  }

}
