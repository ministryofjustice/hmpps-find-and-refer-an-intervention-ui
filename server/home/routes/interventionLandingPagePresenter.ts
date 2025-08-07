export default class InterventionLandingPagePresenter {
  readonly pageHeading = 'Interventions'

  constructor(
    readonly referAndMonitorUrl: string,
    readonly accreditedProgrammesUrl: string,
  ) {}
}
