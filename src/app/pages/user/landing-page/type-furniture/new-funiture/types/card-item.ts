export interface CardItem {
  id: number
  image: string | null
  size: string
  quantify: string
  product: {
    productCode: string
    productName: string
    description: string
    brand: string
    price: number
    category: {
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
