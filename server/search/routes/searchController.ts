import { Request, Response } from 'express'
import FindAndReferService from '../../services/findAndReferService'
import SearchPresenter from './searchPresenter'
import ControllerUtils from '../../utils/controllerUtils'
import SearchView from './searchView'
import SearchByIdentifierForm from './SearchByIdentifierForm'
import { FormValidationError } from '../../utils/formValidationError'
import SearchResultsPresenter from './searchResultsPresenter'
import SearchResultsView from './searchResultsView'
import AuditService from '../../services/auditService'
import ServiceUserDetails from '../../models/serviceUserDetails'

export default class SearchController {
  constructor(
    private readonly findAndReferService: FindAndReferService,
    private readonly auditService: AuditService,
  ) {}

  async searchByCrnOrPrisonNumber(req: Request, res: Response): Promise<void> {
    const { username } = req.user
    let formError: FormValidationError | null = null
    let userInputData = null

    if (req.method === 'POST') {
      const data = await new SearchByIdentifierForm(req).data()
      await this.auditService.logSearchServiceUser({
        who: username,
        details: { identifier: data.paramsForUpdate },
      })
      if (data.error) {
        res.status(400)
        formError = data.error
        userInputData = req.body
      } else {
        let serviceUserDetails: ServiceUserDetails
        try {
          serviceUserDetails = await this.findAndReferService.getServiceUser(username, data.paramsForUpdate)
        } catch (error) {
          if (error.status === 404) {
            formError = {
              errors: [
                {
                  formFields: ['search-by-crn'],
                  errorSummaryLinkedField: 'search-by-crn',
                  message: `No person with CRN or prison number ${req.body['search-by-crn']} found`,
                },
              ],
            }
          } else if (error.status === 403) {
            formError = {
              errors: [
                {
                  formFields: ['search-by-crn'],
                  errorSummaryLinkedField: 'search-by-crn',
                  message: `You are not authorised to view this person’s details. Either contact your system administrator or enter a different CRN or prison number`,
                },
              ],
            }
          } else {
            throw error
          }
        }
        if (serviceUserDetails) {
          const presenter = new SearchResultsPresenter(req.originalUrl, serviceUserDetails)
          const view = new SearchResultsView(presenter)
          return ControllerUtils.renderWithLayout(res, view)
        }
      }
    }
    const presenter = new SearchPresenter(`/`, formError, userInputData)
    const view = new SearchView(presenter)
    return ControllerUtils.renderWithLayout(res, view)
  }
}
