import { Prisma, Product, ProductStatus } from '@prisma/client'
import {
  ChangeProductStatus,
  IProductRepository,
  SearchProduct,
} from '../product-repository'
import { randomUUID } from 'crypto'

export class InMemoryProductRepository implements IProductRepository {
  products: Product[] = []

  async create(data: Prisma.ProductUncheckedCreateInput) {
    const id = randomUUID()

    const createProduct: Product = {
      conductor_id: data.conductor_id,
      id,
      name: data.name,
      price: new Prisma.Decimal(data.price.toString()),
      user_id: data.user_id,
      weight: data.weight,
      status: ProductStatus.ACTIVE,
    }

    this.products.push(createProduct)

    return createProduct
  }

  async getProductsFromUser(userId: string): Promise<Product[]> {
    const filteredProducts: Product[] = this.products.filter(
      (product) => product.user_id === userId,
    )

    return filteredProducts
  }

  async findProductById(productId: string) {
    const findProduct = this.products.find(
      (product) => product.id === productId,
    )

    if (!findProduct) {
      return null
    }

    return findProduct
  }

  async changeProductStatus({ status, productId }: ChangeProductStatus) {
    const changeProductsStatus = this.products.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          status,
        }
      } else {
        return product
      }
    })

    this.products = changeProductsStatus

    const productWasChanged = this.products.find(
      (product) => product.id === productId,
    )

    return productWasChanged!
  }

  async searchProductsFromUser({
    conductorId,
    search,
    userId,
    page,
  }: SearchProduct) {
    const perPage = 10

    const products = this.products
      .filter(
        (product) =>
          product.name.includes(search) &&
          product.user_id.includes(userId) &&
          product.conductor_id.includes(conductorId),
      )
      .slice((page - 1) * perPage, perPage * page)

    return products
  }
}
