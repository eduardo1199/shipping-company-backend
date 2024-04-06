import { InMemoryConductorRepository } from '@/repositories/conductor/in-memory-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { UpdateConductorUseCase } from '.'

let conductorRepository: InMemoryConductorRepository
let updateConductorUseCase: UpdateConductorUseCase

describe('Update conductor use case', () => {
  beforeEach(() => {
    conductorRepository = new InMemoryConductorRepository()
    updateConductorUseCase = new UpdateConductorUseCase(conductorRepository)
  })

  it('should be able to update conductor use case', async () => {
    const createdConductor = await conductorRepository.create({
      cat_hab: 3151351,
      cpf: '6516984198452',
      email: 'test@example',
      file_id: '54654654d5aw1da5c1aw56c1a5sca',
      name: 'Jonh Doe',
      register: new Date(),
    })

    const updateConductor = await updateConductorUseCase.execute({
      id: createdConductor.id,
      name: 'Jonh Doe Test',
    })

    expect(createdConductor.name).not.toEqual(updateConductor.conductor.name)
  })
})
