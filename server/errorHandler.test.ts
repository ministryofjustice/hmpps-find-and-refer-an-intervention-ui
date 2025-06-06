import type { Express } from 'express'
import request from 'supertest'
import createError from 'http-errors'
import { appWithAllRoutes } from './routes/testutils/appSetup'
import FindAndReferService from './services/findAndReferService'

let app: Express

jest.mock('./services/findAndReferService')
jest.mock('./data/hmppsAuthClient')

const hmppsAuthClientBuilder = jest.fn()
const findAndReferService = new FindAndReferService(hmppsAuthClientBuilder) as jest.Mocked<FindAndReferService>

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

describe('GET 404', () => {
  it('should render content with stack in dev mode', () => {
    return request(app)
      .get('/unknown')
      .expect(404)
      .expect('Content-Type', /html/)
      .expect(res => {
        expect(res.text).toContain('Page not found')
        expect(res.text).toContain('NotFoundError: Not Found')
      })
  })

  it('should render content without stack in production mode', () => {
    return request(appWithAllRoutes({ production: true }))
      .get('/unknown')
      .expect(404)
      .expect('Content-Type', /html/)
      .expect(res => {
        expect(res.text).toContain('Page not found')
        expect(res.text).not.toContain('NotFoundError: Not Found')
      })
  })
})

describe('GET 500', () => {
  it('should render content with stack in dev mode', () => {
    findAndReferService.getInterventionsCatalogue.mockRejectedValue(new Error('Some problem calling external api!'))
    return request(app)
      .get('/interventions/community')
      .expect(500)
      .expect('Content-Type', /html/)
      .expect(res => {
        expect(res.text).toContain('Sorry, there is a problem with the service')
        expect(res.text).toContain('Some problem calling external api!')
      })
  })

  it('should render content without stack in production mode', () => {
    findAndReferService.getInterventionsCatalogue.mockRejectedValue(new Error('Some problem calling external api!'))
    return request(appWithAllRoutes({ production: true }))
      .get('/interventions/community')
      .expect(500)
      .expect('Content-Type', /html/)
      .expect(res => {
        expect(res.text).toContain('Sorry, there is a problem with the service')
        expect(res.text).not.toContain('Some problem calling external api!')
      })
  })
})

describe('GET 503', () => {
  it('should display correct error when 503 is thrown', () => {
    findAndReferService.getInterventionsCatalogue.mockRejectedValue(createError(503))
    return request(app)
      .get('/interventions/community')
      .expect(503)
      .expect('Content-Type', /html/)
      .expect(res => {
        expect(res.text).toContain('Sorry, the service is unavailable')
        expect(res.text).toContain('Service Unavailable')
      })
  })
})
