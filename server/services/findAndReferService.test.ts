import FindAndReferService from './findAndReferService'
import config from '../config'
import RestClient from '../data/restClient'
import MockRestClient from '../testutils/mockRestClient'

// wraps mocking API around the class exported by the module
jest.mock('../data/restClient')

describe('Find and Refer Service', () => {
  const findAndReferService = new FindAndReferService(config.apis.findAndReferService)
  const restClientMock = new MockRestClient(config.apis.findAndReferService) as jest.Mocked<RestClient>
  findAndReferService.createRestClient = jest.fn().mockReturnValue(restClientMock)

  it('should call get dummy data with the correct params', async () => {
    await findAndReferService.getDummy('secretToken', '12345')
    expect(restClientMock.get).toHaveBeenCalledWith({ headers: { Accept: 'application/json' }, path: '/dummy/12345' })
  })
})
