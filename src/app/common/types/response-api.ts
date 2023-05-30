
export interface ResponseBase {
  errorCode: string;
  message: string;
}
export interface DataPagination<T> {
  data: Content<T>
}
export interface DataNoPagination<T> {
  data: T
}
export interface Content<T> {
  content: T,
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number
}
export type ResponseAPIContent<T> = ResponseBase & DataPagination<T>;
export type ResponseAPINoContent<T> = ResponseBase & DataNoPagination<T>;
