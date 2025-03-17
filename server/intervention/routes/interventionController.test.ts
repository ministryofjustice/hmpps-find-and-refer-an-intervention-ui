import { Express } from 'express'
import request from 'supertest'
import FindAndReferService from '../../services/findAndReferService'
import interventionDetailsFactory from '../../../testutils/factories/interventionDetails'
import { appWithAllRoutes } from '../../routes/testutils/appSetup'

jest.mock('../../services/findAndReferService')
jest.mock('../../data/hmppsAuthClient')

const hmppsAuthClientBuilder = jest.fn()
const findAndReferService = new FindAndReferService(hmppsAuthClientBuilder) as jest.Mocked<FindAndReferService>

let app: Express

afterEach(() => {
  jest.resetAllMocks()
})
beforeEach(() => {
  app = appWithAllRoutes({
    services: {
      findAndReferService,
    },
  })
})

describe(`GET //intervention/:id/:setting`, () => {
  it('calls api to get intervention details', async () => {
    const interventionDetails = interventionDetailsFactory.community().build()
    findAndReferService.getInterventionsDetails.mockResolvedValue(interventionDetails)
    return request(app)
      .get('/intervention/123/community')
      .expect(200)
      .expect(res => {
        expect(res.text).toContain(`${interventionDetails.title}`)
      })
  })
})
