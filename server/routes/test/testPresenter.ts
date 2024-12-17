export default class TestPresenter {
  constructor(private readonly sampleText: string) {}

  readonly text = {
    moreInfoText: this.sampleText,
    headingText: 'Some heading text',
  }
}
