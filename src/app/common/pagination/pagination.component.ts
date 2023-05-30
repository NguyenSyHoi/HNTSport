import { TranslocoModule } from '@ngneat/transloco';
import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  standalone: true,
  imports: [CommonModule, NzPaginationModule, TranslocoModule]
})
export class PaginationComponent implements OnInit {
  @Input() pageIndex = 1;
  @Input() pageSize = 10;
  @Output() pageSizeChange: EventEmitter<number> = new EventEmitter();
  @Output() pageIndexChange: EventEmitter<number> = new EventEmitter()
  @Input() total = 0;
  @Input() pageSizeOptions = [5, 10, 20, 30, 50, 100];
  fromRecord = 1;
  toRecord = 10;
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


  onPageIndexChange(event: any): void {
    this.pageIndexChange.emit(event)
    this.calculatorNumberShowRecord()
  }

  onPageSizeChange(event: any): void {
    this.pageSizeChange.emit(event)
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
