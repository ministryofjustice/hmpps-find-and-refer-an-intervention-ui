import { Request, Response } from 'express'
import CataloguePresenter from './cataloguePresenter'
import CatalogueView from './catalogueView'
import ControllerUtils from '../../utils/controllerUtils'
import FindAndReferService from '../../services/findAndReferService'

export default class CatalogueController {
  constructor(private readonly findAndReferService: FindAndReferService) {}

  async showCancellationConfirmationPage(req: Request, res: Response): Promise<void> {
    const { username } = req.user
    const interventionCatalogueItems = await this.findAndReferService.getInterventionsCatalogue(username, {
      page: 0,
      size: 5,
    })
    const presenter = new CataloguePresenter(interventionCatalogueItems)
    const view = new CatalogueView(presenter)

    await ControllerUtils.renderWithLayout(res, view)
  }
}
