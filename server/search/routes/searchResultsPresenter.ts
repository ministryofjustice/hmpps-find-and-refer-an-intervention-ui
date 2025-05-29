import ServiceUserDetails from '../../models/serviceUserDetails'
import { SummaryListItem } from '../../utils/summaryList'
import DateUtils from '../../utils/dateUtils'

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
      const ageYears = DateUtils.age(this.serviceUserDetails.dob)
      const ageMonths = DateUtils.ageMonths(this.serviceUserDetails.dob)
      const ageMonthsStr = ageMonths === 1 ? `, ${ageMonths} month` : `, ${ageMonths} months`
      summary.push({
        key: 'Date of birth',
        lines: [
          `${DateUtils.formattedDate(this.serviceUserDetails.dob)} (${ageYears} years${ageMonths === 0 ? '' : ageMonthsStr} old)`,
        ],
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
    if (this.serviceUserDetails.currentPdu && this.serviceUserDetails.setting) {
      if (this.serviceUserDetails.setting.toUpperCase() === 'CUSTODY') {
        summary.push({
          key: 'Current Prison',
          lines: [this.serviceUserDetails.currentPdu],
        })
      } else {
        summary.push({
          key: 'Current PDU',
          lines: [this.serviceUserDetails.currentPdu],
        })
      }
    }
    return summary
  }
}
