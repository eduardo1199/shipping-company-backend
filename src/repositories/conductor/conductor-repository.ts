import { Conductor, Prisma } from '@prisma/client'

export interface IConductorRepository {
  create(data: Prisma.ConductorCreateInput): Promise<Conductor>
  update(data: Prisma.ConductorUpdateInput): Promise<Conductor>
  findByCPF(cpf: string): Promise<Conductor | null>
  findByEmail(email: string): Promise<Conductor | null>
  findByCatHab(cat_hab: number): Promise<Conductor | null>
  findById(id: string): Promise<Conductor | null>
  findSearch(search: string, page: number): Promise<Conductor[]>
}
