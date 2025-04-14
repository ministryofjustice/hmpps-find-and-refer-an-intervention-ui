import { Request, Response } from 'express'
import FindAndReferService from '../../services/findAndReferService'
import CrsDetailsPresenter from './crsDetailsPresenter'
import ControllerUtils from '../../utils/controllerUtils'
import CrsDetailsView from './crsDetailsView'

export default class CrsDetailsController {
  constructor(private readonly findAndReferService: FindAndReferService) {}

  async showCrsDetailsPage(req: Request, res: Response): Promise<void> {
    const { id, pduId, setting } = req.params
    const { username } = req.user

    const crsDetails = await this.findAndReferService.getCRSDetails(username, id, pduId)
    const presenter = new CrsDetailsPresenter(`/intervention/${id}/${setting}`, crsDetails)
    const view = new CrsDetailsView(presenter)
    await ControllerUtils.renderWithLayout(res, view)
  }
}
