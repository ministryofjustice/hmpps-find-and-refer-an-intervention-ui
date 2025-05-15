import ServiceUserDetails from '../../models/serviceUserDetails'
import { SummaryListItem } from '../../utils/summaryList'

export default class SearchResultsPresenter {
  constructor(
    readonly backlinkUri: string | null,
    readonly serviceUserDetails: ServiceUserDetails,
  ) {}

  crnDetailsSummaryList(): SummaryListItem[] {
    const summary: SummaryListItem[] = []
    if (this.serviceUserDetails.name) {
      summary.push({
        key: 'Name',
        lines: [this.serviceUserDetails.name],
      })
    }
    if (this.serviceUserDetails.crn) {
      summary.push({
        key: 'CRN',
        lines: [this.serviceUserDetails.crn],
      })
    }
    if (this.serviceUserDetails.dob) {
      summary.push({
        key: 'Date of birth',
        lines: [this.serviceUserDetails.dob],
      })
    }
    if (this.serviceUserDetails.ethnicity) {
      summary.push({
        key: 'Ethnicity',
        lines: [this.serviceUserDetails.ethnicity],
      })
    }
    if (this.serviceUserDetails.gender) {
      summary.push({
        key: 'Gender',
        lines: [this.serviceUserDetails.gender],
      })
    }
    if (this.serviceUserDetails.setting) {
      summary.push({
        key: 'Setting',
        lines: [this.serviceUserDetails.setting],
      })
    }
    if (this.serviceUserDetails.currentPdu) {
      summary.push({
        key: 'Current PDU',
        lines: [this.serviceUserDetails.currentPdu],
      })
    }
    return summary
  }
}
