import { NotExistEntityWithId } from '@/errors/module/not-find-error'
import { IConductorRepository } from '@/repositories/conductor/conductor-repository'
import { Conductor } from '@prisma/client'

interface GetConductorByIdUseCaseRequest {
  id: string
}

interface GetConductorByIdUseCaseResponse {
  conductor: Conductor
}

export class GetConductorByIdUseCase {
  constructor(private conductorRepository: IConductorRepository) {}

  async execute(
    data: GetConductorByIdUseCaseRequest,
  ): Promise<GetConductorByIdUseCaseResponse> {
    const { id } = data

    const conductor = await this.conductorRepository.findById(id)

    if (!conductor) {
      throw new NotExistEntityWithId('Conductor')
    }

    return {
      conductor,
    }
  }
}
