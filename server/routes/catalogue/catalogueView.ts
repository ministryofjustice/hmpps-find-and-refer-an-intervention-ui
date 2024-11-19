import CataloguePresenter from './cataloguePresenter'

export default class CatalogueView {
  constructor(private readonly presenter: CataloguePresenter) {}

  // private get summaryListArgs() {
  //   return ViewUtils.summaryListArgs(this.presenter.serviceUserSummary)
  // }

  get renderArgs(): [string, Record<string, unknown>] {
    return [
      'catalogue/catalogue',
      {
        presenter: this.presenter,
        // summaryListArgs: this.summaryListArgs,
      },
    ]
  }
}
