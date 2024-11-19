import CataloguePresenter from './cataloguePresenter'

export default class CatalogueView {
  constructor(private readonly presenter: CataloguePresenter) {}

  private get randomData() {
    return { reference: 'reference data', number: 9, moreInfo: this.presenter.text.moreInfoText }
  }

  get renderArgs(): [string, Record<string, unknown>] {
    return [
      'catalogue/catalogue',
      {
        presenter: this.presenter,
        randomData: this.randomData,
      },
    ]
  }
}
