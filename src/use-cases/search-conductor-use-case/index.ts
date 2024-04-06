import { IConductorRepository } from '@/repositories/conductor/conductor-repository'
import { Conductor } from '@prisma/client'

interface SearchConductorsCaseRequest {
  search: string
  page: number
}

interface SearchConductorsCaseResponse {
  conductors: Conductor[]
}

export class SearchConductorsCase {
  constructor(private conductorRepository: IConductorRepository) {}

  async execute(
    data: SearchConductorsCaseRequest,
  ): Promise<SearchConductorsCaseResponse> {
    const { search, page } = data

    const conductors = await this.conductorRepository.findSearch(search, page)

    return {
      conductors,
    }
  }
}
