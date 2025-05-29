import type { Express } from 'express'
import request from 'supertest'
import { appWithAllRoutes } from './routes/testutils/appSetup'
import FindAndReferService from './services/findAndReferService'

let app: Express

jest.mock('./services/findAndReferService')
const findAndReferService = new FindAndReferService(null) as jest.Mocked<FindAndReferService>

beforeEach(() => {
  app = appWithAllRoutes({})
})

afterEach(() => {
  jest.resetAllMocks()
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
        expect(res.text).toContain('Cannot read properties of undefined')
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
        expect(res.text).not.toContain('Cannot read properties of undefined')
      })
  })
})
