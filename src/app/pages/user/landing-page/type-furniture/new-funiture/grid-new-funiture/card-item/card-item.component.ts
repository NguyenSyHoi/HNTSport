import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CardItem } from '../../types/card-item';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class CardItemComponent implements OnInit {
  @Input() listDataCard: CardItem[] = [];
  constructor(private router:Router) { }

  ngOnInit() {
    console.log(this.listDataCard);
  }
  detailItem(item:CardItem){
    this.router.navigate(['/detail'])
  }
}
