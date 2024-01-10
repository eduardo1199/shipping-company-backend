export class SameWithCPF extends Error {
  constructor(entity: string) {
    super(`Already exist ${entity} with cpf`)
  }
}
