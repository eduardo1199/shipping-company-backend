import { Prisma, Product, ProductStatus } from '@prisma/client'

export interface ChangeProductStatus {
  status: ProductStatus
  productId: string
}

export interface SearchProduct {
  userId: string
  conductorId: string
  search: string
  page: number
}

export interface IProductRepository {
  create(data: Prisma.ProductUncheckedCreateInput): Promise<Product>
  searchProductsFromUser(searchParams: SearchProduct): Promise<Product[]>
  findProductById(productId: string): Promise<Product | null>
  changeProductStatus({
    status,
    productId,
  }: ChangeProductStatus): Promise<Product>
}
