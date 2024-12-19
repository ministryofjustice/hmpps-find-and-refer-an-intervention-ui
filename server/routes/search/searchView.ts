import SearchPresenter from './searchPresenter'

export default class SearchView {
  constructor(private readonly presenter: SearchPresenter) {}

  private get randomData() {
    return { reference: 'reference data', number: 9, moreInfo: this.presenter.text.moreInfoText }
  }

  get renderArgs(): [string, Record<string, unknown>] {
    return [
      'search/search',
      {
        presenter: this.presenter,
        randomData: this.randomData,
      },
    ]
  }
}
