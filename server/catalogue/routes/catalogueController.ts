import { Request, Response } from 'express'
import CataloguePresenter from './cataloguePresenter'
import CatalogueView from './catalogueView'
import ControllerUtils from '../../utils/controllerUtils'
import FindAndReferService from '../../services/findAndReferService'
import CatalogueFilter from './catalogueFilter'

export default class CatalogueController {
  constructor(private readonly findAndReferService: FindAndReferService) {}

  async showCommunityPage(req: Request, res: Response): Promise<void> {
    await this.showCataloguePage(req, res, 'community')
  }

  async showCustodyPage(req: Request, res: Response): Promise<void> {
    await this.showCataloguePage(req, res, 'custody')
  }

  async showCataloguePage(req: Request, res: Response, setting: string): Promise<void> {
    const { username } = req.user
    const pageNumber = req.query.page

    if (pageNumber === undefined) {
      req.session.filterParams = req.originalUrl.split('?').pop()
    }

    const filter = CatalogueFilter.fromRequest(req)

    const interventionCatalogueItems = await this.findAndReferService.getInterventionsCatalogue(
      username,
      {
        page: pageNumber ? Number(pageNumber) - 1 : 0,
        size: 1,
      },
      filter.params,
      setting,
    )
    req.session.originPage = req.originalUrl

    const presenter = new CataloguePresenter(interventionCatalogueItems, filter, req.session.filterParams, setting)
    const view = new CatalogueView(presenter)

    ControllerUtils.renderWithLayout(res, view)
  }
}
