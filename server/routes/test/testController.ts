import { Request, Response } from 'express'
import TestView from './testView'
import ControllerUtils from '../../utils/controllerUtils'
import FindAndReferService from '../../services/findAndReferService'

export default class TestController {
  constructor(private readonly findAndReferService: FindAndReferService) {}

  async showTestPage(req: Request, res: Response): Promise<void> {
    const dummy = await this.findAndReferService.getDummy(res.locals.user.token, '1')
    const view = new TestView(dummy)

    ControllerUtils.renderWithLayout(res, view)
  }
}
