import { SummaryListItem } from '../../utils/summaryList'
import InterventionDetails, { PDU } from '../../models/InterventionDetails'
import InterventionsUtils from '../../utils/interventionUtils'

export default class InterventionPresenter {
  constructor(
    readonly backlinkUri: string | null,
    readonly intervention: InterventionDetails,
  ) {}

  readonly text = {
    pageHeading: this.intervention.title,
    custodyLocationDescription: 'Select a prison to contact the programme team or make a referral.',
    communityLocationDescription: 'Select a community location to contact the programme team or make a referral.',
  }

  interventionSummaryList(): SummaryListItem[] {
    const summary: SummaryListItem[] = [
      {
        key: 'Gender',
        lines: [InterventionsUtils.formatGenderText(this.intervention.allowsMales, this.intervention.allowsFemales)],
      },
      {
        key: 'Type',
        lines: [this.intervention.interventionType],
      },
    ]
    if (this.intervention.riskCriteria) {
      summary.push({
        key: 'Risk criteria',
        lines: this.intervention.riskCriteria,
      })
    }
    summary.push({
      key: 'Needs',
      lines: [this.intervention.criminogenicNeeds.join(', ')],
    })

    if (this.intervention.suitableForPeopleWithLearningDifficulties) {
      summary.push({
        key: 'Suitable for people with learning disabilities or challenges (LDC)',
        lines: [this.intervention.suitableForPeopleWithLearningDifficulties ? 'Yes' : 'No'],
      })
    }
    if (this.intervention.equivalentNonLdcProgramme) {
      summary.push({
        key: 'Equivalent non-LDC programme',
        lines: [this.intervention.equivalentNonLdcProgramme],
      })
    }
    if (this.intervention.timeToComplete) {
      summary.push({
        key: 'Time to complete',
        lines: [this.intervention.timeToComplete],
      })
    }
    if (this.intervention.deliveryFormat) {
      summary.push({
        key: 'Format',
        lines: this.intervention.deliveryFormat,
      })
    }
    if (this.intervention.attendanceType) {
      summary.push({
        key: 'Attendance type',
        lines: this.intervention.attendanceType,
      })
    }
    return summary
  }

  generateCRSLocationUrl(interventionId: string, location: PDU) {
    return `<a href=/crsDetails/${interventionId}/pdu/${location.id}>${location.pduName}</a>`
  }
}
