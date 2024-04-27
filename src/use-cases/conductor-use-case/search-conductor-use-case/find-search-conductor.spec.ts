import { InMemoryConductorRepository } from '@/repositories/conductor/in-memory-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchConductorsCase } from '.'

let conductorRepository: InMemoryConductorRepository
let searchConductorsUseCase: SearchConductorsCase

describe('Get conductor use case', () => {
  beforeEach(() => {
    conductorRepository = new InMemoryConductorRepository()
    searchConductorsUseCase = new SearchConductorsCase(conductorRepository)
  })

  it('should be able to search per page conductors', async () => {
    Array.from({ length: 30 }).forEach((_, index) => {
      conductorRepository.create({
        cat_hab: index,
        cpf: `6516984198452-${index}`,
        email: `${index}-test@example.com`,
        file_id: `${index}-6514651651651654`,
        name: 'Jonh Doe',
        register: new Date(),
      })
    })

    const { conductors } = await searchConductorsUseCase.execute({
      page: 1,
      search: '',
    })

    expect(conductors).toHaveLength(10)
  })

  it('should be able to search conductors', async () => {
    Array.from({ length: 30 }).forEach(async (_, index) => {
      await conductorRepository.create({
        cat_hab: index,
        cpf: `6516984198452-${index}`,
        email: `${index}-test@example.com`,
        file_id: `${index}-6514651651651654`,
        name: `Jonh Doe ${index}`,
        register: new Date(),
      })
    })

    const { conductors } = await searchConductorsUseCase.execute({
      page: 1,
      search: 'Jonh Doe 5',
    })

    expect(conductors).toHaveLength(1)
    expect(conductors).toEqual([
      expect.objectContaining({ name: 'Jonh Doe 5' }),
    ])
  })
})
