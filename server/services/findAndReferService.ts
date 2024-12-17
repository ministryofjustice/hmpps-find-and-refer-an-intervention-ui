import { ApiConfig } from '../config'
import RestClient from '../data/restClient'

export interface DummyData {
  dummyId: number
  dummyDescription: string
  dummyDate: string
}

export default class FindAndReferService {
  constructor(private readonly config: ApiConfig) {}

  createRestClient(token: string): RestClient {
    return new RestClient('Find and Refer Service API Client', this.config, token)
  }

  async getDummy(token: string, id: string): Promise<DummyData> {
    const restClient = this.createRestClient(token)
    return (await restClient.get({
      path: `/dummy/${id}`,
      headers: { Accept: 'application/json' },
    })) as DummyData
  }
}
