export default class CataloguePresenter {
  constructor(private readonly sampleText: string) {}

  readonly text = {
    moreInfoText: this.sampleText,
    headingText: 'Some heading text',
  }
}
