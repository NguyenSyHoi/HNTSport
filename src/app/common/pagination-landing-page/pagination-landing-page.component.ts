import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@Component({
  selector: 'app-pagination-landing-page',
  templateUrl: './pagination-landing-page.component.html',
  styleUrls: ['./pagination-landing-page.component.scss'],
  standalone:true,
  imports: [CommonModule, NzPaginationModule, TranslocoModule]
})
export class PaginationLandingPageComponent implements OnInit {
  @Input() pageIndex = 1;
  @Input() pageSize = 5;
  @Output() pageSizeChange: EventEmitter<number> = new EventEmitter();
  @Output() pageIndexChange: EventEmitter<number> = new EventEmitter()
  @Input() total = 0;
  @Input() pageSizeOptions = [5, 10, 20, 30, 50, 100];
  fromRecord = 1;
  toRecord = 5;
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pageIndex']?.currentValue || changes['pageSize']?.currentValue) {
      this.calculatorNumberShowRecord()
    }
    if (changes['total'] && changes['total'].currentValue) {
      this.calculatorNumberShowRecord()
    }
  }


  onPageIndexChange(event: number): void {
    this.pageIndexChange.emit(event);
    console.log('index',event);

    this.calculatorNumberShowRecord()
  }

  onPageSizeChange(event: number): void {
    this.pageSizeChange.emit(event);
    console.log('val',event);
    this.calculatorNumberShowRecord()
  }

  calculatorNumberShowRecord(): void {
    this.fromRecord = (this.pageIndex - 1) * this.pageSize + 1

    let lastRecord = this.pageIndex * this.pageSize
    if (lastRecord > this.total) {
      this.toRecord = lastRecord - (lastRecord - this.total)
    } else {
      this.toRecord = lastRecord
    }
  }

}
