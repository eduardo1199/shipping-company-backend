import { InMemoryConductorRepository } from '@/repositories/conductor/in-memory-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateConductorUseCase } from '.'
import { SameWithCPF } from '@/errors/module/same-cpf-error'
import { SameWithEmail } from '@/errors/module/same-email-error'
import { SameWithCatHab } from '@/errors/use-case/same-cat-hab-error'

let conductorRepository: InMemoryConductorRepository
let createConductorUseCase: CreateConductorUseCase

describe('Create conductor use case', () => {
  beforeEach(() => {
    conductorRepository = new InMemoryConductorRepository()
    createConductorUseCase = new CreateConductorUseCase(conductorRepository)
  })

  it('should be able to create conductor use case', async () => {
    const { conductor } = await createConductorUseCase.execute({
      cat_hab: 3151351,
      cpf: '6516984198452',
      email: 'test@example',
      file_id: '54654654d5aw1da5c1aw56c1a5sca',
      name: 'Jonh Doe',
      register: new Date(),
    })

    expect(conductor.id).toEqual(expect.any(String))
  })

  it('should not be able to create conductor with same cpf twice', async () => {
    await createConductorUseCase.execute({
      cat_hab: 3151351,
      cpf: '6516984198452',
      email: 'test@example',
      file_id: '54654654d5aw1da5c1aw56c1a5sca',
      name: 'Jonh Doe',
      register: new Date(),
    })

    await expect(() =>
      createConductorUseCase.execute({
        cat_hab: 3151351,
        cpf: '6516984198452',
        email: 'test@example',
        file_id: '54654654d5aw1da5c1aw56c1a5sca',
        name: 'Jonh Doe',
        register: new Date(),
      }),
    ).rejects.toBeInstanceOf(SameWithCPF)
  })

  it('should not be able to create conductor with same email twice', async () => {
    await createConductorUseCase.execute({
      cat_hab: 3151351,
      cpf: '6516984198452',
      email: 'test@example',
      file_id: '54654654d5aw1da5c1aw56c1a5sca',
      name: 'Jonh Doe',
      register: new Date(),
    })

    await expect(() =>
      createConductorUseCase.execute({
        cat_hab: 3151351,
        cpf: '65165168461641',
        email: 'test@example',
        file_id: '54654654d5aw1da5c1aw56c1a5sca',
        name: 'Jonh Doe',
        register: new Date(),
      }),
    ).rejects.toBeInstanceOf(SameWithEmail)
  })

  it('should not be able to create conductor with same email cat_hab', async () => {
    await createConductorUseCase.execute({
      cat_hab: 3151351,
      cpf: '6516984198452',
      email: 'test@example',
      file_id: '54654654d5aw1da5c1aw56c1a5sca',
      name: 'Jonh Doe',
      register: new Date(),
    })

    await expect(() =>
      createConductorUseCase.execute({
        cat_hab: 3151351,
        cpf: '65165168461641',
        email: 'test1@example',
        file_id: '54654654d5aw1da5c1aw56c1a5sca',
        name: 'Jonh Doe',
        register: new Date(),
      }),
    ).rejects.toBeInstanceOf(SameWithCatHab)
  })
})
