export default class CataloguePresenter {
  constructor() {} // private readonly dashboardOriginPage?: string // private readonly intervention: Intervention, // private readonly referral: SentReferral,

  readonly text = {
    confirmationText: 'This referral has been cancelled',
    headingText: 'What you need to do next',
    whatHappensNextText: `You need to contact the service provider outside the service to let them know about the change.`,
  }

  // readonly myCasesHref = this.dashboardOriginPage || '/probation-practitioner/dashboard'

  // readonly serviceUserSummary: SummaryListItem[] = [
  //   {
  //     key: 'Name',
  //     lines: [PresenterUtils.fullName(this.referral.referral.serviceUser)],
  //   },
  //   {
  //     key: 'Referral number',
  //     lines: [this.referral.referenceNumber],
  //   },
  //   {
  //     key: 'Type of referral',
  //     lines: [utils.convertToProperCase(this.intervention.contractType.name)],
  //   },
  // ]
}
