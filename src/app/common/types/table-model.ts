export interface TableModel<T> {
  data: T,
  action: any
}
export interface ConfigColumnModel {
  title: string
  propertyName: string
  type?: string
  format?: string
  align: 'left' | 'right' | 'center' | null
  isSort?: boolean
  sortKey?: string
  elementClass?: string
  width?: any,
  isDisPlay?: boolean;
  primaryKey?: boolean;
}
