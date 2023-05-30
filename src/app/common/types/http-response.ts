export interface HttpResponse<T> {
  errorCode: string;
  data: T,
  success: boolean
}
