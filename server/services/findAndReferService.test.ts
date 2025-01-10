import config from '../config'
import { HmppsAuthClient } from '../data'
import RestClient from '../data/restClient'
import InMemoryTokenStore from '../data/tokenStore/inMemoryTokenStore'
import MockRestClient from '../testutils/mockRestClient'
import FindAndReferService from './findAndReferService'

// wraps mocking API around the class exported by the module
jest.mock('../data/restClient')
jest.mock('../data/hmppsAuthClient')

// This will likely have to be changed to redis client once implemented
const tokenStore = new InMemoryTokenStore() as jest.Mocked<InMemoryTokenStore>
const systemToken = 'TEST_SYSTEM_TOKEN'
const username = 'TEST_USERNAME'

const hmppsAuthClient = new HmppsAuthClient(tokenStore) as jest.Mocked<HmppsAuthClient>
const hmppsAuthClientBuilder = jest.fn()
const restClientMock = new MockRestClient(config.apis.findAndReferService) as jest.Mocked<RestClient>
const findAndReferService = new FindAndReferService(hmppsAuthClientBuilder)

beforeEach(() => {
  jest.resetAllMocks()

  hmppsAuthClientBuilder.mockReturnValue(hmppsAuthClient)
  hmppsAuthClient.getSystemClientToken.mockResolvedValue(systemToken)
  findAndReferService.createRestClient = jest.fn().mockReturnValue(restClientMock)
})

describe('Find and Refer Service', () => {
  it('should call get dummy data with the correct params', async () => {
    const result = await findAndReferService.getDummy('12345', username)
    expect(hmppsAuthClientBuilder).toHaveBeenCalled()
    expect(hmppsAuthClient.getSystemClientToken).toHaveBeenCalledWith(username)
    expect(restClientMock.get).toHaveBeenCalledWith({ headers: { Accept: 'application/json' }, path: '/dummy/12345' })
  })
})
