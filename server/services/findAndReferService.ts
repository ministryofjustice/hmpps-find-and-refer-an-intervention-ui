import type { SystemToken } from '@hmpps-auth'
import config, { ApiConfig } from '../config'
import type { HmppsAuthClient, RestClientBuilderWithoutToken } from '../data'
import RestClient from '../data/restClient'
import { Page } from '../shared/models/pagination'
import InterventionCatalogueItem from '../models/InterventionCatalogueItem'
import InterventionDetails from '../models/InterventionDetails'
import CrsInterventionDetails from '../models/CrsInterventionDetails'
import ServiceUserDetails from '../models/serviceUserDetails'

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

export interface CatalogueFilterParams {
  allowsMales?: boolean
  allowsFemales?: boolean
  interventionType?: string[]
  programmeName?: string
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
    filter: CatalogueFilterParams,
    setting: string,
  ): Promise<Page<InterventionCatalogueItem>> {
    const hmppsAuthClient = this.hmppsAuthClientBuilder()
    const systemToken = await hmppsAuthClient.getSystemClientToken(username)
    const restClient = this.createRestClient(systemToken)

    const filterQuery: Record<string, unknown> = { ...filter }

    return (await restClient.get({
      path: `/interventions/${setting}`,
      headers: { Accept: 'application/json' },
      query: { ...paginationParams, ...filterQuery },
    })) as Page<InterventionCatalogueItem>
  }

  async getInterventionsDetails(username: Express.User['username'], id: string): Promise<InterventionDetails> {
    const hmppsAuthClient = this.hmppsAuthClientBuilder()
    const systemToken = await hmppsAuthClient.getSystemClientToken(username)
    const restClient = this.createRestClient(systemToken)

    return (await restClient.get({
      path: `/interventions/details/${id}`,
      headers: { Accept: 'application/json' },
    })) as InterventionCatalogueItem
  }

  async getCRSDetails(
    username: Express.User['username'],
    interventionId: string,
    pduId: string,
  ): Promise<CrsInterventionDetails> {
    const hmppsAuthClient = this.hmppsAuthClientBuilder()
    const systemToken = await hmppsAuthClient.getSystemClientToken(username)
    const restClient = this.createRestClient(systemToken)

    return (await restClient.get({
      path: `/intervention/${interventionId}/pdu/${pduId}`,
      headers: { Accept: 'application/json' },
    })) as CrsInterventionDetails
  }

  async getServiceUser(
    username: Express.User['username'],
    searchTerm: Partial<{ crn: string }> | Partial<{ prisonId: string }>,
  ): Promise<ServiceUserDetails> {
    const hmppsAuthClient = this.hmppsAuthClientBuilder()
    const systemToken = await hmppsAuthClient.getSystemClientToken(username)
    const restClient = this.createRestClient(systemToken)
    return (await restClient.get({
      path: `/service-user`,
      headers: { Accept: 'application/json' },
      query: { ...searchTerm },
    })) as ServiceUserDetails
  }
}
