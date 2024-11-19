import { Request, Response } from 'express'
import CataloguePresenter from './cataloguePresenter'
import CatalogueView from './catalogueView'
import ControllerUtils from '../../utils/controllerUtils'

export default class CatalogueController {
  constructor() {}

  async showCancellationConfirmationPage(req: Request, res: Response): Promise<void> {
    const presenter = new CataloguePresenter('sample text')
    const view = new CatalogueView(presenter)

    await ControllerUtils.renderWithLayout(res, view)
  }
}
