import { Express } from 'express'
import request from 'supertest'
import FindAndReferService from '../../services/findAndReferService'
import { appWithAllRoutes } from '../../routes/testutils/appSetup'
import serviceUserDetailsFactory from '../../../testutils/factories/serviceUserDetails'

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

// temporary test to prevent no test errors whilst the new endpoint is commented out.
describe(`temp`, () => {
  it('temporary test', async () => {
    const serviceUserDetails = serviceUserDetailsFactory.build()
    findAndReferService.getServiceUser.mockResolvedValue(serviceUserDetails)
    return request(app).get('/')
  })
})

// describe(`GET /searchByCrn`, () => {
//   it('can load search by crn page', async () => {
//     return request(app)
//       .get('/search-service-user-by-crn')
//       .expect(200)
//       .expect(res => {
//         expect(res.text).toContain(`Enter a CRN or prison number`)
//       })
//   })
// })
//
// describe(`POST /searchByCrn`, () => {
//   it('can load search by crn page', async () => {
//     const serviceUserDetails = serviceUserDetailsFactory.build()
//     findAndReferService.getServiceUser.mockResolvedValue(serviceUserDetails)
//     return request(app)
//       .post('/search-service-user-by-crn')
//       .send({
//         'search-by-crn': 'X123456',
//       })
//       .expect(200)
//       .expect(res => {
//         expect(res.text).toContain(`Search Results`)
//       })
//   })
// })
