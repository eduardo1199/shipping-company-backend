export class SameWithEmail extends Error {
  constructor(entity: string) {
    super(`Already exist ${entity} with email`)
  }
}
