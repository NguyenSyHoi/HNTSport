import { NzTableSortOrder } from "ng-zorro-antd/table";

export interface Pageable {
  page: number;
  pageSize: number;
  sort: string;
  order:NzTableSortOrder;
}
