import { Request, Response } from 'express'
import CataloguePresenter from './cataloguePresenter'
import CatalogueView from './catalogueView'
import ControllerUtils from '../../utils/controllerUtils'

export default class CatalogueController {
  constructor() {} // private readonly draftsService: DraftsService // private readonly assessRisksAndNeedsService: AssessRisksAndNeedsService, // private readonly hmppsAuthService: HmppsAuthService, // private readonly ramDeliusApiService: RamDeliusApiService, // private readonly interventionsService: InterventionsService,

  async showCancellationConfirmationPage(req: Request, res: Response): Promise<void> {
    // const { user } = res.locals
    // const { accessToken } = user.token

    // const sentReferral = await this.interventionsService.getSentReferral(accessToken, req.params.id)
    // const intervention = await this.interventionsService.getIntervention(
    //   accessToken,
    //   sentReferral.referral.interventionId
    // )
    // const serviceUser = await this.ramDeliusApiService.getCaseDetailsByCrn(sentReferral.referral.serviceUser.crn)

    const presenter = new CataloguePresenter()
    const view = new CatalogueView(presenter)

    await ControllerUtils.renderWithLayout(res, view)
  }
}
