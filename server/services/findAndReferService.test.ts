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

describe('Dummy Endpoint', () => {
  it('should call get dummy data with the correct params', async () => {
    await findAndReferService.getDummy('12345', username)
    expect(hmppsAuthClientBuilder).toHaveBeenCalled()
    expect(hmppsAuthClient.getSystemClientToken).toHaveBeenCalledWith(username)
    expect(restClientMock.get).toHaveBeenCalledWith({ headers: { Accept: 'application/json' }, path: '/dummy/12345' })
  })
})

describe('getInterventionsCatalogue', () => {
  it('should call getInterventionsCatalogue with the correct params with no filter options', async () => {
    await findAndReferService.getInterventionsCatalogue(username, { page: 0, size: 10 }, {}, 'community')
    expect(hmppsAuthClientBuilder).toHaveBeenCalled()
    expect(hmppsAuthClient.getSystemClientToken).toHaveBeenCalledWith(username)
    expect(restClientMock.get).toHaveBeenCalledWith({
      headers: { Accept: 'application/json' },
      path: '/interventions/community',
      query: { page: 0, size: 10 },
    })
  })

  it('should call getInterventionsCatalogue with the correct params when filtering by intervention type', async () => {
    await findAndReferService.getInterventionsCatalogue(
      username,
      { page: 0, size: 10 },
      { interventionType: ['ACP', 'CRS'] },
      'custody',
    )
    expect(hmppsAuthClientBuilder).toHaveBeenCalled()
    expect(hmppsAuthClient.getSystemClientToken).toHaveBeenCalledWith(username)
    expect(restClientMock.get).toHaveBeenCalledWith({
      headers: { Accept: 'application/json' },
      path: '/interventions/custody',
      query: { page: 0, size: 10, interventionType: ['ACP', 'CRS'] },
    })
  })

  it('should call getInterventionsCatalogue with the correct params when filtering by gender', async () => {
    await findAndReferService.getInterventionsCatalogue(
      username,
      { page: 0, size: 10 },
      { allowsMales: true, allowsFemales: true },
      'custody',
    )
    expect(hmppsAuthClientBuilder).toHaveBeenCalled()
    expect(hmppsAuthClient.getSystemClientToken).toHaveBeenCalledWith(username)
    expect(restClientMock.get).toHaveBeenCalledWith({
      headers: { Accept: 'application/json' },
      path: '/interventions/custody',
      query: { page: 0, size: 10, allowsMales: true, allowsFemales: true },
    })
  })

  it('should call getInterventionsCatalogue with the correct params when filtering by a combination of filters', async () => {
    await findAndReferService.getInterventionsCatalogue(
      username,
      { page: 0, size: 10 },
      { interventionType: ['ACP', 'CRS'], allowsMales: true },
      'custody',
    )
    expect(hmppsAuthClientBuilder).toHaveBeenCalled()
    expect(hmppsAuthClient.getSystemClientToken).toHaveBeenCalledWith(username)
    expect(restClientMock.get).toHaveBeenCalledWith({
      headers: { Accept: 'application/json' },
      path: '/interventions/custody',
      query: { page: 0, size: 10, interventionType: ['ACP', 'CRS'], allowsMales: true },
    })
  })

  it('should call getServiceUser with the correct params when a crn is supplied', async () => {
    await findAndReferService.getServiceUser(username, { crn: 'X123456' })
    expect(hmppsAuthClientBuilder).toHaveBeenCalled()
    expect(hmppsAuthClient.getSystemClientToken).toHaveBeenCalledWith(username)
    expect(restClientMock.get).toHaveBeenCalledWith({
      headers: { Accept: 'application/json' },
      path: '/service-user',
      query: { crn: 'X123456' },
    })
  })

  it('should call getServiceUser with the correct params when a prisonId is supplied', async () => {
    await findAndReferService.getServiceUser(username, { prisonId: 'A1234AA' })
    expect(hmppsAuthClientBuilder).toHaveBeenCalled()
    expect(hmppsAuthClient.getSystemClientToken).toHaveBeenCalledWith(username)
    expect(restClientMock.get).toHaveBeenCalledWith({
      headers: { Accept: 'application/json' },
      path: '/service-user',
      query: { prisonId: 'A1234AA' },
    })
  })
})
