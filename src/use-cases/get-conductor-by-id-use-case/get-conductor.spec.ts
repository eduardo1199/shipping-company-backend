import { InMemoryConductorRepository } from '@/repositories/conductor/in-memory-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetConductorByIdUseCase } from '.'
import { NotExistEntityWithId } from '@/errors/module/not-find-error'

let conductorRepository: InMemoryConductorRepository
let getConductorByIdUseCase: GetConductorByIdUseCase

describe('Get conductor use case', () => {
  beforeEach(() => {
    conductorRepository = new InMemoryConductorRepository()
    getConductorByIdUseCase = new GetConductorByIdUseCase(conductorRepository)
  })

  it('should be able to find conductor with id', async () => {
    const conductorCreated = await conductorRepository.create({
      cat_hab: 1,
      cpf: '545465465465',
      email: 'test@gmail.com',
      file_id: '6546511dwa65d1a8sc',
      name: 'jonhdoe',
      register: new Date(),
    })

    const { conductor } = await getConductorByIdUseCase.execute({
      id: conductorCreated.id,
    })

    expect(conductor.id).toEqual(conductorCreated.id)
  })

  it('should be able not find conductor if not exist', async () => {
    await conductorRepository.create({
      cat_hab: 1,
      cpf: '545465465465',
      email: 'test@gmail.com',
      file_id: '6546511dwa65d1a8sc',
      name: 'jonhdoe',
      register: new Date(),
    })

    await expect(() =>
      getConductorByIdUseCase.execute({
        id: '65a1d6a8c1a984cwa9f8a4',
      }),
    ).rejects.toBeInstanceOf(NotExistEntityWithId)
  })
})
