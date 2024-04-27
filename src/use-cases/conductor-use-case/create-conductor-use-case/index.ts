import { SameWithCPF } from '@/errors/module/same-cpf-error'
import { SameWithEmail } from '@/errors/module/same-email-error'
import { SameWithCatHab } from '@/errors/use-case/same-cat-hab-error'
import { IConductorRepository } from '@/repositories/conductor/conductor-repository'
import { Conductor } from '@prisma/client'

interface CreateConductorUseCaseRequest {
  name: string
  cpf: string
  email: string
  cat_hab: number
  register: Date
  file_id: string
  user_id: string
}

interface CreateConductorUseCaseResponse {
  conductor: Conductor
}

export class CreateConductorUseCase {
  constructor(private conductorRepository: IConductorRepository) {}

  async execute(
    data: CreateConductorUseCaseRequest,
  ): Promise<CreateConductorUseCaseResponse> {
    const { cpf, email, cat_hab } = data

    const conductorWithSameCPF = await this.conductorRepository.findByCPF(cpf)

    if (conductorWithSameCPF) {
      throw new SameWithCPF('Conductor')
    }

    const conductorWithSameEmail =
      await this.conductorRepository.findByEmail(email)

    if (conductorWithSameEmail) {
      throw new SameWithEmail('Conductor')
    }

    const conductorWithSameCatHab =
      await this.conductorRepository.findByCatHab(cat_hab)

    if (conductorWithSameCatHab) {
      throw new SameWithCatHab('Conductor')
    }

    const conductor = await this.conductorRepository.create(data)

    return {
      conductor,
    }
  }
}
