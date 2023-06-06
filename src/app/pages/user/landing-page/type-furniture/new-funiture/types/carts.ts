import * as stream from "stream";

export interface Carts {
  id: number
  image: string | null
  size: string
  quantity: string | null
  price: number
  product: {
    id: number
    productCode: string
    productName: string
    description: string | null
    brand: string
    price: number
    quantity_product: number
    image: string | null
    "category": {
      id: number
      categoryCode: string
      categoryName: string
    }
  }
  status: string
  isActive: number
  image_overlay: string | null
  createdDate: string | null
  updatedDate: string | null
  createdBy: string | null
  updatedBy: string | null
}
