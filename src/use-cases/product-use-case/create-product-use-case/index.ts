import { IProductRepository } from '@/repositories/products/product-repository'
import { Product } from '@prisma/client'

interface CreateProductUseCaseRequest {
  name: string
  weight: number
  price: number
  userId: string
  conductorId: string
}

interface CreateProductUseCaseResponse {
  product: Product
}

export class createProductUseCase {
  constructor(private ProductRepository: IProductRepository) {}

  async execute({
    conductorId,
    name,
    price,
    userId,
    weight,
  }: CreateProductUseCaseRequest): Promise<CreateProductUseCaseResponse> {
    const product = await this.ProductRepository.create({
      conductor_id: conductorId,
      name,
      price,
      user_id: userId,
      weight,
    })

    return { product }
  }
}
