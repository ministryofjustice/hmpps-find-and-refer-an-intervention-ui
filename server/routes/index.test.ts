import type { Express } from 'express'
import request from 'supertest'
import { appWithAllRoutes, user } from './testutils/appSetup'
import AuditService from '../services/auditService'
import FindAndReferService from '../services/findAndReferService'
import interventionCatalogueItemFactory from '../../testutils/factories/interventionCatalogueItem'
import { Page } from '../shared/models/pagination'
import InterventionCatalogueItem from '../models/InterventionCatalogueItem'
import pageFactory from '../../testutils/factories/page'

jest.mock('../services/auditService')

const auditService = new AuditService(null) as jest.Mocked<AuditService>
jest.mock('../services/findAndReferService')
jest.mock('../data/hmppsAuthClient')

const hmppsAuthClientBuilder = jest.fn()
const findAndReferService = new FindAndReferService(hmppsAuthClientBuilder) as jest.Mocked<FindAndReferService>

let app: Express

beforeEach(() => {
  app = appWithAllRoutes({
    services: {
      auditService,
      findAndReferService,
    },
    userSupplier: () => user,
  })
})

afterEach(() => {
  jest.resetAllMocks()
})

describe('GET /', () => {
  it('should render index page', () => {
    const interventionCatalogueItem = interventionCatalogueItemFactory.build()
    const interventionCatalogueItemPage: Page<InterventionCatalogueItem> = pageFactory
      .pageContent([interventionCatalogueItem])
      .build() as Page<InterventionCatalogueItem>
    findAndReferService.getInterventionsCatalogue.mockResolvedValue(interventionCatalogueItemPage)
    return request(app).get('/').expect(302).expect('Location', '/interventions/community')
  })
})
