import { Component, OnInit, Input } from '@angular/core';
import { PaginationModel } from '../models/pagination-model';
import { TableModule } from './table-module';
import { ConfigColumnModel, TableModel } from '../types/table-model';

@Component({
  selector: 'app-table-common',
  templateUrl: './table-common.component.html',
  styleUrls: ['./table-common.component.scss'],
  standalone: true,
  imports: [TableModule],
})
export class TableCommonComponent implements OnInit {
  isCheckedAll = false;
  indeterminate = false;
  keyWordItemCheck!: string;
  @Input() dataSource!: any[];
  @Input() isLoading = false;
  @Input() isCheckBox = false;
  @Input() setOfCheckedId = new Set<number | string>();
  @Input() pagination: PaginationModel = new PaginationModel();
  @Input() columnData: ConfigColumnModel[] = [];
  @Input() showPagination = true;
  @Input() showPageSizeChange = true;
  @Input() action: any;
  constructor() { }

  ngOnInit() {
  }
  onAllChecked(checked: boolean): void {
    // lọc ra key cần check trong list data

  }
  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }
  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }
  refreshCheckedStatus(): void {
    // const listOfEnabledData = this.listOfCurrentPageData.filter(({ disabled }) => !disabled);
    // this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id));
    // this.indeterminate = listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
  }
}
