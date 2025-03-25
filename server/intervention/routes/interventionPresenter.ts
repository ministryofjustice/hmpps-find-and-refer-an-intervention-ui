import { SummaryListItem } from '../../utils/summaryList'
import InterventionDetails, { CustodyLocation, PDU } from '../../models/InterventionDetails'
import InterventionsUtils from '../../utils/interventionUtils'
import { TableArgs } from '../../utils/govukFrontendTypes'
import { AvailableInterventionDetailsFields, InterventionDetailsFields } from '../../utils/fieldUtils'

export default class InterventionPresenter {
  constructor(
    readonly backlinkUri: string | null,
    readonly intervention: InterventionDetails,
    readonly setting: string,
  ) {}

  readonly text = {
    pageHeading: this.intervention.title,
    custodyLocationDescription: 'Select a prison to contact the programme team or make a referral.',
    communityLocationDescription: 'Select a community location to contact the programme team or make a referral.',
  }

  interventionSummaryList(): SummaryListItem[] {
    const fieldsToShow: AvailableInterventionDetailsFields =
      InterventionDetailsFields[`${this.intervention.interventionType}_${this.setting.toLowerCase()}`]

    const summary: SummaryListItem[] = [
      {
        key: 'Gender',
        lines: [InterventionsUtils.formatGenderText(this.intervention.allowsMales, this.intervention.allowsFemales)],
      },
      {
        key: 'Type',
        lines: [InterventionsUtils.mapInterventionTypeToFriendlyString(this.intervention.interventionType)],
      },
    ]

    if (fieldsToShow.riskCriteria && this.intervention.riskCriteria) {
      summary.push({
        key: 'Risk criteria',
        lines: this.intervention.riskCriteria,
      })
    }

    if (fieldsToShow.criminogenicNeeds && this.intervention.criminogenicNeeds) {
      summary.push({
        key: 'Needs',
        lines: [this.intervention.criminogenicNeeds.join(', ')],
      })
    }

    if (
      fieldsToShow.suitableForPeopleWithLearningDifficulties &&
      this.intervention.suitableForPeopleWithLearningDifficulties
    ) {
      summary.push({
        key: 'Suitable for people with learning disabilities or challenges (LDC)',
        lines: [this.intervention.suitableForPeopleWithLearningDifficulties ? 'Yes' : 'No'],
      })

      if (fieldsToShow.equivalentNonLdcProgramme && this.intervention.equivalentNonLdcProgramme) {
        summary.push({
          key: 'Equivalent non-LDC programme',
          lines: [this.intervention.equivalentNonLdcProgramme],
        })
      }
    }

    if (fieldsToShow.timeToComplete && this.intervention.timeToComplete) {
      summary.push({
        key: 'Time to complete',
        lines: [this.intervention.timeToComplete],
      })
    }

    if (fieldsToShow.deliveryFormat && this.intervention.deliveryFormat) {
      summary.push({
        key: 'Format',
        lines: this.intervention.deliveryFormat,
      })
    }

    if (fieldsToShow.attendanceType && this.intervention.attendanceType) {
      summary.push({
        key: 'Attendance type',
        lines: this.intervention.attendanceType,
      })
    }
    return summary
  }

  getLocationsInCustodyTableArgs(): TableArgs {
    return {
      attributes: {
        'data-module': 'moj-sortable-table',
      },
      head: [
        {
          text: 'Location',
          attributes: {
            'aria-sort': 'ascending',
          },
        },
        {
          text: 'Category',
          attributes: {
            'aria-sort': 'none',
          },
        },
        {
          text: 'County',
          attributes: {
            'aria-sort': 'none',
          },
        },
      ],
      rows: this.generateCustodyTableRows(this.intervention.custodyLocations),
    }
  }

  generateCustodyTableRows(locations: CustodyLocation[]) {
    const locationRows = []
    locations.forEach(location => {
      locationRows.push([
        {
          html: `<a href='#'>${location.prisonName}</a>`,
        },
        {
          text: location.category,
        },
        {
          text: location.county,
        },
      ])
    })
    return locationRows
  }

  generateCRSLocationUrl(interventionId: string, location: PDU) {
    return `<a href=/crsDetails/${interventionId}/${location.id}/${this.setting}>${location.pduName}</a>`
  }
}
