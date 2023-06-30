export interface ProductDetail {
  id: number
  image: string | null
  size: string
  quantify: number
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
  quantity_product: number
  status: string
  isActive: number
  image_overlay: string | null
  createdDate: string | null
  updatedDate: string | null
  createdBy: string | null
  updatedBy: string | null
}
