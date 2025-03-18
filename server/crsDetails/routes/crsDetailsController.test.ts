import { Express } from 'express'
import request from 'supertest'
import FindAndReferService from '../../services/findAndReferService'
import { appWithAllRoutes } from '../../routes/testutils/appSetup'
import crsInterventionDetailsFactory from '../../../testutils/factories/crsInterventionDetails'

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

describe(`GET /crsDetails`, () => {
  it('calls api to get all interventions', async () => {
    const crsInterventionDetails = crsInterventionDetailsFactory.build()
    findAndReferService.getCRSDetails.mockResolvedValue(crsInterventionDetails)
    return request(app)
      .get('/crsDetails/123/456/community')
      .expect(200)
      .expect(res => {
        expect(res.text).toContain(`${crsInterventionDetails.npsRegion}: ${crsInterventionDetails.title}`)
      })
  })
})
