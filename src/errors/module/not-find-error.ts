export class NotExistEntityWithId extends Error {
  constructor(entity: string) {
    super(`Not find ${entity} with that id`)
  }
}
