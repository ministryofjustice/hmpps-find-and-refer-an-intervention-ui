import { ApiConfig } from '../config'
import RestClient from '../data/restClient'

export default class MockRestClient extends RestClient {
  constructor(config: ApiConfig) {
    super('', config, '')
  }
}
