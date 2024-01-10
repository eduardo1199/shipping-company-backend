import { Conductor, Prisma } from '@prisma/client'

export interface IConductorRepository {
  create(data: Prisma.ConductorCreateInput): Promise<Conductor>
  findByCPF(cpf: string): Promise<Conductor | null>
  findByEmail(email: string): Promise<Conductor | null>
  findByCatHab(cat_hab: number): Promise<Conductor | null>
}
