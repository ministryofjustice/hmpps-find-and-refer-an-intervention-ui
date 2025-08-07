import InterventionLandingPagePresenter from './interventionLandingPagePresenter'

export default class InterventionLandingPageView {
  constructor(private readonly presenter: InterventionLandingPagePresenter) {}

  get renderArgs(): [string, Record<string, unknown>] {
    return [
      'intervention/index',
      {
        referAndMonitorUrl: this.presenter.referAndMonitorUrl,
        accreditedProgrammesUrl: this.presenter.accreditedProgrammesUrl,
        pageHeading: this.presenter.pageHeading,
      },
    ]
  }
}
