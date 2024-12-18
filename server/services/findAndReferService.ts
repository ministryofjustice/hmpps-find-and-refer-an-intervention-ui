import config from '../config'
import RestClient from '../data/restClient'

export interface DummyData {
  dummyId: number
  dummyDescription: string
  dummyDate: string
}

export default class FindAndReferService {
  constructor() {}

  createRestClient(token: string): RestClient {
    return new RestClient('Find and Refer Service API Client', config.apis.findAndReferService, token)
  }

  async getDummy(token: string, id: string): Promise<DummyData> {
    const restClient = this.createRestClient(token)
    return (await restClient.get({
      path: `/dummy/${id}`,
      headers: { Accept: 'application/json' },
    })) as DummyData
  }
}
