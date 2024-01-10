export class SameWithCatHab extends Error {
  constructor(entity: string) {
    super(`Already exist ${entity} with cateira de habilitação`)
  }
}
