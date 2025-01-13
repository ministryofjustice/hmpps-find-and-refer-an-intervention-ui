import type { SystemToken } from '@hmpps-auth'
import config, { ApiConfig } from '../config'
import type { HmppsAuthClient, RestClientBuilderWithoutToken } from '../data'
import RestClient from '../data/restClient'

export interface DummyData {
  dummyId: number
  dummyDescription: string
  dummyDate: string
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
}
