import { type RequestHandler, Router } from 'express'

import asyncMiddleware from '../middleware/asyncMiddleware'
import type { Services } from '../services'
import CatalogueController from '../catalogue/routes/catalogueController'
import TestController from './test/testController'
import InterventionController from '../intervention/routes/interventionController'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function routes({ auditService, findAndReferService }: Services): Router {
  const router = Router()
  const get = (path: string | string[], handler: RequestHandler) => router.get(path, asyncMiddleware(handler))
  // const post = (path: string, handler: RequestHandler): Router => router.post(path, asyncMiddleware(handler))

  const catalogueController = new CatalogueController(findAndReferService)
  const interventionController = new InterventionController(findAndReferService)
  const testController = new TestController(findAndReferService)

  get('/', async (req, res, next) => {
    if (res.locals?.user.isPrisonUser) {
      res.redirect('/interventions/custody')
      return
    }
    if (res.locals?.user.isCommunityUser) {
      res.redirect('/interventions/community')
      return
    }
    res.redirect('/authError')
  })

  get('/interventions/community', async (req, res, next) => {
    await catalogueController.showCommunityPage(req, res)
  })

  get('/interventions/custody', async (req, res, next) => {
    await catalogueController.showCustodyPage(req, res)
  })

  // post('/', async (req, res, next) => {
  //   await catalogueController.showCataloguePage(req, res)
  // })

  get('/intervention/:id', async (req, res, next) => {
    await interventionController.showInterventionPage(req, res)
  })

  get('/test', async (req, res, next) => {
    await testController.showTestPage(req, res)
  })

  return router
}
