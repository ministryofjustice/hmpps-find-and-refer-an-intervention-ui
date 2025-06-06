import { Express } from 'express'
import request from 'supertest'
import FindAndReferService from '../../services/findAndReferService'
import InterventionCatalogueItem from '../../models/InterventionCatalogueItem'
import interventionCatalogueItemFactory from '../../../testutils/factories/interventionCatalogueItem'
import pageFactory from '../../../testutils/factories/page'
import { Page } from '../../shared/models/pagination'
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

describe(`GET /interventions`, () => {
  it('calls api to get all interventions', async () => {
    const interventionCatalogueItem = interventionCatalogueItemFactory.build()
    const interventionCatalogueItemPage: Page<InterventionCatalogueItem> = pageFactory
      .pageContent([interventionCatalogueItem])
      .build() as Page<InterventionCatalogueItem>
    findAndReferService.getInterventionsCatalogue.mockResolvedValue(interventionCatalogueItemPage)
    await request(app).get(`/`).expect(302)
  })
})

describe(`GET /interventions/community`, () => {
  it('calls api to get all interventions', async () => {
    const interventionCatalogueItem = interventionCatalogueItemFactory.build()
    const interventionCatalogueItemPage: Page<InterventionCatalogueItem> = pageFactory
      .pageContent([interventionCatalogueItem])
      .build() as Page<InterventionCatalogueItem>
    findAndReferService.getInterventionsCatalogue.mockResolvedValue(interventionCatalogueItemPage)
    return request(app)
      .get('/interventions/community')
      .expect(200)
      .expect(res => {
        expect(res.text).toContain('Search results for community')
      })
  })
})

describe(`GET /interventions/custody`, () => {
  it('calls api to get all interventions', async () => {
    const interventionCatalogueItem = interventionCatalogueItemFactory.build()
    const interventionCatalogueItemPage: Page<InterventionCatalogueItem> = pageFactory
      .pageContent([interventionCatalogueItem])
      .build() as Page<InterventionCatalogueItem>
    findAndReferService.getInterventionsCatalogue.mockResolvedValue(interventionCatalogueItemPage)
    return request(app)
      .get('/interventions/custody')
      .expect(200)
      .expect(res => {
        expect(res.text).toContain('Search results for custody')
      })
  })
})
