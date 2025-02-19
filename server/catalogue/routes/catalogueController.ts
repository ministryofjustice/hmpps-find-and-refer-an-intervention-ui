import { Request, Response } from 'express'
import CataloguePresenter from './cataloguePresenter'
import CatalogueView from './catalogueView'
import ControllerUtils from '../../utils/controllerUtils'
import FindAndReferService from '../../services/findAndReferService'
import CatalogueFilter from './catalogueFilter'

export default class CatalogueController {
  constructor(private readonly findAndReferService: FindAndReferService) {}

  async showCataloguePage(req: Request, res: Response): Promise<void> {
    const { username } = req.user
    const pageNumber = req.query.page

    if (pageNumber === undefined) {
      req.session.filterParams = req.originalUrl.substring(2, req.originalUrl.length)
    }

    const filter = CatalogueFilter.fromRequest(req)

    const interventionCatalogueItems = await this.findAndReferService.getInterventionsCatalogue(
      username,
      {
        page: pageNumber ? Number(pageNumber) - 1 : 0,
        size: 5,
      },
      filter.params,
    )
    req.session.originPage = req.originalUrl

    const presenter = new CataloguePresenter(interventionCatalogueItems, filter, req.session.filterParams)
    const view = new CatalogueView(presenter)

    ControllerUtils.renderWithLayout(res, view)
  }
}
