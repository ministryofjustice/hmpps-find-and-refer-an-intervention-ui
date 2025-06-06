import SearchPresenter from './searchPresenter'
import { InputArgs } from '../../utils/govukFrontendTypes'
import ViewUtils from '../../utils/viewUtils'

export default class SearchView {
  constructor(private readonly presenter: SearchPresenter) {}

  private readonly backLinkArgs = {
    text: 'Back',
    href: this.presenter.backlinkUri,
  }

  private get searchByCrnInputArgs(): InputArgs {
    return {
      id: 'search-by-crn',
      name: 'search-by-crn',
      label: {
        text: null,
      },
      classes: 'govuk-input--width-20',
      value: this.presenter.fields.searchByCrn.value,
      errorMessage: ViewUtils.govukErrorMessage(this.presenter.fields.searchByCrn.errorMessage),
    }
  }

  get renderArgs(): [string, Record<string, unknown>] {
    return [
      'search/search',
      {
        presenter: this.presenter,
        backLinkArgs: this.backLinkArgs,
        searchByCrnInputArgs: this.searchByCrnInputArgs,
        errorSummary: ViewUtils.govukErrorSummaryArgs(this.presenter.errorSummary, 'search-error-summary'),
      },
    ]
  }
}
