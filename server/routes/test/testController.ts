import { Request, Response } from 'express'
import FindAndReferService from '../../services/findAndReferService'
import ControllerUtils from '../../utils/controllerUtils'
import TestView from './testView'

export default class TestController {
  constructor(private readonly findAndReferService: FindAndReferService) {}

  async showTestPage(req: Request, res: Response): Promise<void> {
    const { username } = req.user
    const dummy = await this.findAndReferService.getDummy('1', username)
    const view = new TestView(dummy)

    ControllerUtils.renderWithLayout(res, view)
  }
}
