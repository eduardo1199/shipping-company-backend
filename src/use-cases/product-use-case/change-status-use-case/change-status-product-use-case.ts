import { IProductRepository } from '@/repositories/products/product-repository'
import { Product, ProductStatus } from '@prisma/client'

interface ChangeStatusProductUseCaseRequest {
  status: ProductStatus
  productId: string
}

interface ChangeStatusProductUseCaseResponse {
  product: Product
}

export class changeStatusProductUseCase {
  constructor(private ProductRepository: IProductRepository) {}

  async execute({
    status,
    productId,
  }: ChangeStatusProductUseCaseRequest): Promise<ChangeStatusProductUseCaseResponse> {
    const findProduct = await this.ProductRepository.findProductById(productId)

    if (!findProduct) {
      throw new Error('No such product found!')
    }

    const product = await this.ProductRepository.changeProductStatus({
      status,
      productId,
    })

    return {
      product,
    }
  }
}
