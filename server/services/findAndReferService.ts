import type { SystemToken } from '@hmpps-auth'
import config, { ApiConfig } from '../config'
import type { HmppsAuthClient, RestClientBuilderWithoutToken } from '../data'
import RestClient from '../data/restClient'
import { Page } from '../shared/models/pagination'
import InterventionCatalogueItem from '../models/InterventionCatalogueItem'

export interface DummyData {
  dummyId: number
  dummyDescription: string
  dummyDate: string
}

export interface PaginationParams {
  // Page number to retrieve -- starts from 1
  page?: number
  // Number of elements in a page
  size?: number
  // Sort by property, defaults to ascending order. If descending is required then add ',DESC' at the end of the property you want sorted i.e. ['$PROPERTY_NAME,DESC']
  sort?: string[]
}

export default class FindAndReferService {
  constructor(private readonly hmppsAuthClientBuilder: RestClientBuilderWithoutToken<HmppsAuthClient>) {}

  createRestClient = (token: Express.User['token'] | SystemToken): RestClient =>
    new RestClient('Find and Refer Service API Client', config.apis.findAndReferService as ApiConfig, token)

  async getDummy(id: string, username: Express.User['username']): Promise<DummyData> {
    const hmppsAuthClient = this.hmppsAuthClientBuilder()
    const systemToken = await hmppsAuthClient.getSystemClientToken(username)
    const restClient = this.createRestClient(systemToken)

    return (await restClient.get({
      path: `/dummy/${id}`,
      headers: { Accept: 'application/json' },
    })) as DummyData
  }

  async getInterventionsCatalogue(
    username: Express.User['username'],
    paginationParams: PaginationParams,
  ): Promise<Page<InterventionCatalogueItem>> {
    const hmppsAuthClient = this.hmppsAuthClientBuilder()
    const systemToken = await hmppsAuthClient.getSystemClientToken(username)
    const restClient = this.createRestClient(systemToken)
    return (await restClient.get({
      path: `/interventions`,
      headers: { Accept: 'application/json' },
      query: { ...paginationParams },
    })) as Page<InterventionCatalogueItem>
  }
}
