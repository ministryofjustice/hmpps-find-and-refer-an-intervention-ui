import { Request, Response } from 'express'
import FindAndReferService from '../../services/findAndReferService'
import InterventionPresenter from './interventionPresenter'
import ControllerUtils from '../../utils/controllerUtils'
import InterventionView from './interventionView'

export default class InterventionController {
  constructor(private readonly findAndReferService: FindAndReferService) {}

  async showInterventionPage(req: Request, res: Response): Promise<void> {
    const { username } = req.user
    const { id } = req.params

    const intervention = await this.findAndReferService.getInterventionsDetails(username, id)

    const presenter = new InterventionPresenter(req.session.originPage, intervention)
    const view = new InterventionView(presenter)
    await ControllerUtils.renderWithLayout(res, view)
  }
}
