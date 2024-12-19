import { type RequestHandler, Router } from 'express'

import asyncMiddleware from '../middleware/asyncMiddleware'
import type { Services } from '../services'
import { Page } from '../services/auditService'
import CatalogueController from './catalogue/catalogueController'
import TestController from './test/testController'
import SearchController from './search/searchController'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function routes({ auditService, findAndReferService }: Services): Router {
  const router = Router()
  const get = (path: string | string[], handler: RequestHandler) => router.get(path, asyncMiddleware(handler))

  const catalogueController = new CatalogueController()
  const testController = new TestController(findAndReferService)
  const searchController = new SearchController()

  get('/', async (req, res, next) => {
    await auditService.logPageView(Page.EXAMPLE_PAGE, { who: res.locals.user.username, correlationId: req.id })

    res.render('pages/index')
  })

  get('/search', async (req, res, next) => {
    await searchController.showSearchPage(req, res)
  })

  get('/catalogue', async (req, res, next) => {
    await catalogueController.showCancellationConfirmationPage(req, res)
  })

  get('/test', async (req, res, next) => {
    await testController.showTestPage(req, res)
  })

  return router
}
