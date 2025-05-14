import SearchResultsPresenter from './searchResultsPresenter'
import { SummaryListItem } from '../../utils/summaryList'
import { SummaryListArgs } from '../../utils/govukFrontendTypes'
import ViewUtils from '../../utils/viewUtils'

export default class SearchResultsView {
  constructor(private readonly presenter: SearchResultsPresenter) {}

  private readonly backLinkArgs = {
    text: 'Back',
    href: this.presenter.backlinkUri,
  }

  static summary(items: SummaryListItem[]): SummaryListArgs {
    return {
      ...ViewUtils.summaryListArgs(items),
    }
  }

  get renderArgs(): [string, Record<string, unknown>] {
    return [
      'search/searchResults',
      {
        presenter: this.presenter,
        backLinkArgs: this.backLinkArgs,
        summaryListArgs: SearchResultsView.summary,
      },
    ]
  }
}
