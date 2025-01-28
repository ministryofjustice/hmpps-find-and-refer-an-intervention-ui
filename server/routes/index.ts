import { type RequestHandler, Router } from 'express'

import asyncMiddleware from '../middleware/asyncMiddleware'
import type { Services } from '../services'
import CatalogueController from '../catalogue/routes/catalogueController'
import TestController from './test/testController'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function routes({ auditService, findAndReferService }: Services): Router {
  const router = Router()
  const get = (path: string | string[], handler: RequestHandler) => router.get(path, asyncMiddleware(handler))

  const catalogueController = new CatalogueController(findAndReferService)
  const testController = new TestController(findAndReferService)

  // get('/', async (req, res, next) => {
  //   await auditService.logPageView(Page.EXAMPLE_PAGE, { who: res.locals.user.username, correlationId: req.id })
  //
  //   res.render('pages/index')
  // })

  get('/', async (req, res, next) => {
    await catalogueController.showCancellationConfirmationPage(req, res)
  })

  get('/test', async (req, res, next) => {
    await testController.showTestPage(req, res)
  })

  return router
}
