export default class SearchPresenter {
  constructor(private readonly sampleText: string) {}

  readonly text = {
    title: `Enter the person's CRN`,
    moreInfoText: this.sampleText,
    headingText: 'Some heading text',
  }
}
