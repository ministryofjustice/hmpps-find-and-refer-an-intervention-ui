import { Request, Response } from 'express'
import SearchPresenter from './searchPresenter'
import SearchView from './searchView'
import ControllerUtils from '../../utils/controllerUtils'

export default class SearchController {
  constructor() {}

  async showSearchPage(req: Request, res: Response): Promise<void> {
    const presenter = new SearchPresenter('sample text')
    const view = new SearchView(presenter)

    ControllerUtils.renderWithLayout(res, view)
  }
}
