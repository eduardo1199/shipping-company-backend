import { Conductor, Prisma } from '@prisma/client'
import { IConductorRepository } from '../conductor-repository'
import { randomUUID } from 'crypto'

export class InMemoryConductorRepository implements IConductorRepository {
  public conductors: Conductor[] = []

  async create(data: Prisma.ConductorCreateInput) {
    const id = randomUUID()

    const conductorData: Conductor = {
      ...data,
      register: new Date(),
      created_at: new Date(),
      id,
    }

    this.conductors.push(conductorData)

    return conductorData
  }

  async findByCPF(cpf: string) {
    const findSameConductorWithCPF = this.conductors.find(
      (conductor) => conductor.cpf === cpf,
    )

    if (!findSameConductorWithCPF) {
      return null
    }

    return findSameConductorWithCPF
  }

  async findByEmail(email: string) {
    const findSameConductorWithEmail = this.conductors.find(
      (conductor) => conductor.email === email,
    )

    if (!findSameConductorWithEmail) {
      return null
    }

    return findSameConductorWithEmail
  }

  async findByCatHab(cat_hab: number) {
    const findSameConductorWithCatHab = this.conductors.find(
      (conductor) => conductor.cat_hab === cat_hab,
    )

    if (!findSameConductorWithCatHab) {
      return null
    }

    return findSameConductorWithCatHab
  }

  async findById(id: string) {
    const findConductorThatId = this.conductors.find(
      (conductor) => conductor.id === id,
    )

    if (!findConductorThatId) {
      return null
    }

    return findConductorThatId
  }
}
