import { IProductRepository } from '@/repositories/products/product-repository'
import { Product } from '@prisma/client'

interface SearchProductsFromUserUseCaseRequest {
  userId: string
  conductorId: string
  search: string
  page: number
}

interface SearchProductsFromUserUseCaseResponse {
  products: Product[]
}

export class getProductsFromUserUseCase {
  constructor(private ProductRepository: IProductRepository) {}

  async execute({
    userId,
    conductorId,
    search,
    page,
  }: SearchProductsFromUserUseCaseRequest): Promise<SearchProductsFromUserUseCaseResponse> {
    const products = await this.ProductRepository.searchProductsFromUser({
      conductorId,
      search,
      userId,
      page,
    })

    return { products }
  }
}
