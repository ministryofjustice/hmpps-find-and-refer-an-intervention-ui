import { Request, Response } from 'express'
import CataloguePresenter from './cataloguePresenter'
import CatalogueView from './catalogueView'
import ControllerUtils from '../../utils/controllerUtils'
import FindAndReferService from '../../services/findAndReferService'

export default class CatalogueController {
  constructor(private readonly findAndReferService: FindAndReferService) {}

  async showCancellationConfirmationPage(req: Request, res: Response): Promise<void> {
    const presenter = new CataloguePresenter('sample text')
    // const { username } = req.user

    // const data = await this.findAndReferService.getInterventionsCatalogue('1', { page: 1 })
    // const data = await this.findAndReferService.getDummy('1', username)
    // console.log('******', data)
    const view = new CatalogueView(presenter)

    await ControllerUtils.renderWithLayout(res, view)
  }
}
