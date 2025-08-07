import { Request, Response } from 'express'
import config from '../../config'
import ControllerUtils from '../../utils/controllerUtils'
import InterventionLandingPagePresenter from './interventionLandingPagePresenter'
import InterventionLandingPageView from './interventionLandingPageView'

export default class InterventionLandingPageController {
  async showHomePage(req: Request, res: Response): Promise<void> {
    const referAndMonitorUrl = config.apis.referAndMonitor.url
    const accreditedProgrammesUrl = config.apis.accreditedProgrammes.url
    const presenter = new InterventionLandingPagePresenter(referAndMonitorUrl, accreditedProgrammesUrl)
    const view = new InterventionLandingPageView(presenter)
    await ControllerUtils.renderWithLayout(res, view)
  }
}
