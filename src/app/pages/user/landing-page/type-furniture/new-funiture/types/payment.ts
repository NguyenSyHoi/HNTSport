import * as stream from "stream";

export interface Bill {
  amount: number,
  customer: string,
  phone: string,
  email: string,
  andress: string,
  note: string | null,
  payMethod: string
}
