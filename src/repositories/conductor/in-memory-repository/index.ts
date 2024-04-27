import { Conductor, Prisma } from '@prisma/client'
import { IConductorRepository } from '../conductor-repository'
import { randomUUID } from 'crypto'

export class InMemoryConductorRepository implements IConductorRepository {
  public conductors: Conductor[] = []

  async create(data: Prisma.ConductorUncheckedCreateInput) {
    const id = randomUUID()
    const user_id = randomUUID()

    const conductorData: Conductor = {
      ...data,
      register: new Date(),
      created_at: new Date(),
      id,
      user_id,
    }

    this.conductors.push(conductorData)

    return conductorData
  }

  async update(data: Prisma.ConductorUncheckedCreateInput) {
    this.conductors = this.conductors.map((conductorData) => {
      if (conductorData.id === data.id) {
        return {
          id: conductorData.id,
          name: data.name ? (data.name as string) : conductorData.name,
          cpf: data.cpf ? (data.cpf as string) : conductorData.cpf,
          email: data.email ? (data.email as string) : conductorData.email,
          cat_hab: data.cat_hab
            ? (data.cat_hab as number)
            : conductorData.cat_hab,
          register: data.register
            ? (data.register as Date)
            : conductorData.register,
          created_at: data.created_at
            ? (data.created_at as Date)
            : conductorData.created_at,
          file_id: data.file_id
            ? (data.file_id as string)
            : conductorData.file_id,
          user_id: conductorData.user_id,
        }
      } else {
        return conductorData
      }
    })

    const findUpdateConductor = this.conductors.find(
      (conductor) => conductor.id === data.id,
    )

    return findUpdateConductor!
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

  async findSearch(search: string, page: number) {
    const perPage = 10

    const conductors = this.conductors
      .filter((conductor) => conductor.name.includes(search))
      .slice((page - 1) * perPage, perPage * page)

    return conductors
  }
}
