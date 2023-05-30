export class PaginationModel {
  total: number;
  pageSize: number;
  pageIndex: number;
  sortField: string;
  direction: string;

  // Khi bấm sort trên bảng sẽ trả list các cột
  sort: string[] = []

  constructor(pageIndex: number = 1, pageSize: number = 10, total: number = 0, sortField: string = '', direction: string = 'DESC') {
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.total = total;
    this.direction = direction;
    this.sortField = sortField;
  }
}
