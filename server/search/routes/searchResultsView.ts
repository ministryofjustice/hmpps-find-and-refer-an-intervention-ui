import SearchResultsPresenter from './searchResultsPresenter'

export default class SearchResultsView {
  constructor(private readonly presenter: SearchResultsPresenter) {}

  private readonly backLinkArgs = {
    text: 'Back',
    href: this.presenter.backlinkUri,
  }

  get renderArgs(): [string, Record<string, unknown>] {
    return [
      'search/searchResults',
      {
        presenter: this.presenter,
        backLinkArgs: this.backLinkArgs,
      },
    ]
  }
}
