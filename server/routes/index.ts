import { type RequestHandler, Router } from 'express'

import CatalogueController from '../catalogue/routes/catalogueController'
import CrsDetailsController from '../crsDetails/routes/crsDetailsController'
import InterventionController from '../intervention/routes/interventionController'
import asyncMiddleware from '../middleware/asyncMiddleware'
import SearchController from '../search/routes/searchController'
import type { Services } from '../services'
import InterventionLandingPageController from '../home/routes/interventionsLandingPageController'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function routes({ auditService, findAndReferService }: Services): Router {
  const router = Router()
  const get = (path: string | string[], handler: RequestHandler) => router.get(path, asyncMiddleware(handler))
  const post = (path: string, handler: RequestHandler): Router => router.post(path, asyncMiddleware(handler))

  const catalogueController = new CatalogueController(findAndReferService)
  const interventionController = new InterventionController(findAndReferService)
  const crsDetailsController = new CrsDetailsController(findAndReferService)
  const searchController = new SearchController(findAndReferService, auditService)
  const interventionLandingPageController = new InterventionLandingPageController()

  get('/', async (req, res, next) => {
    res.redirect('/enter-crn-or-prison-number')
  })

  get('/interventions', async (req, res, next) => {
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

  get('/intervention/:id/:setting', async (req, res, next) => {
    await interventionController.showInterventionPage(req, res)
  })

  get('/crsDetails/:id/:pduId/:setting', async (req, res, next) => {
    await crsDetailsController.showCrsDetailsPage(req, res)
  })

  get('/enter-crn-or-prison-number', async (req, res, next) => {
    await searchController.searchByCrnOrPrisonNumber(req, res)
  })

  get('/interventions-homepage', async (req, res) => {
    await interventionLandingPageController.showHomePage(req, res)
  })

  post('/enter-crn-or-prison-number', async (req, res) => {
    await searchController.searchByCrnOrPrisonNumber(req, res)
  })

  return router
}
