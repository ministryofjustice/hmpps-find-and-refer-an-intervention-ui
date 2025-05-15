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
//
// describe(`GET /enter-crn-or-prison-number`, () => {
//   it('can load search by crn page', async () => {
//     return request(app)
//       .get('/enter-crn-or-prison-number')
//       .expect(200)
//       .expect(res => {
//         expect(res.text).toContain(`Enter a CRN or prison number`)
//       })
//   })
// })
//
// describe(`POST /enter-crn-or-prison-number`, () => {
//   it('can search by crn', async () => {
//     const serviceUserDetails = serviceUserDetailsFactory.build()
//     findAndReferService.getServiceUser.mockResolvedValue(serviceUserDetails)
//     return request(app)
//       .post('/enter-crn-or-prison-number')
//       .send({
//         'search-by-crn': 'X123456',
//       })
//       .expect(200)
//       .expect(res => {
//         expect(res.text).toContain(`Confirm Bob's details`)
//       })
//   })
//
//   it('can search by prisonerNumber', async () => {
//     const serviceUserDetails = serviceUserDetailsFactory.build()
//     findAndReferService.getServiceUser.mockResolvedValue(serviceUserDetails)
//     return request(app)
//       .post('/enter-crn-or-prison-number')
//       .send({
//         'search-by-crn': 'A1234AA',
//       })
//       .expect(200)
//       .expect(res => {
//         expect(res.text).toContain(`Confirm Bob's details`)
//       })
//   })
//
//   it('displays the correct error message when input format is invalid', async () => {
//     const serviceUserDetails = serviceUserDetailsFactory.build()
//     findAndReferService.getServiceUser.mockResolvedValue(serviceUserDetails)
//     return request(app)
//       .post('/enter-crn-or-prison-number')
//       .send({
//         'search-by-crn': 'notACrn',
//       })
//       .expect(400)
//       .expect(res => {
//         expect(res.text).toContain(
//           `Enter a CRN or prison number in the correct format, like X123456 for a CRN or D0168GH for a prison number`,
//         )
//       })
//   })
//
//   it('displays the correct error message when input is empty', async () => {
//     const serviceUserDetails = serviceUserDetailsFactory.build()
//     findAndReferService.getServiceUser.mockResolvedValue(serviceUserDetails)
//     return request(app)
//       .post('/enter-crn-or-prison-number')
//       .send({
//         'search-by-crn': '',
//       })
//       .expect(400)
//       .expect(res => {
//         expect(res.text).toContain(`Enter CRN or prison number`)
//       })
//   })
//
//   it('displays the correct error message when no record is returned', async () => {
//     findAndReferService.getServiceUser.mockResolvedValue(null)
//     return request(app)
//       .post('/enter-crn-or-prison-number')
//       .send({
//         'search-by-crn': 'X123456',
//       })
//       .expect(200)
//       .expect(res => {
//         expect(res.text).toContain(`No person with CRN or prison number X123456 found`)
//       })
//   })
// })
