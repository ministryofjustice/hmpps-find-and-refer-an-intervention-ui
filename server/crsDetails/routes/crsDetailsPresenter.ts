import CrsInterventionDetails from '../../models/CrsInterventionDetails'
import { ListStyle, SummaryListItem } from '../../utils/summaryList'
import InterventionsUtils from '../../utils/interventionUtils'

export default class CrsDetailsPresenter {
  constructor(
    readonly backlinkUri: string | null,
    readonly crsDetails: CrsInterventionDetails,
  ) {}

  crsDetailsSummaryList(): SummaryListItem[] {
    const summary: SummaryListItem[] = []
    if (this.crsDetails.interventionType) {
      summary.push({
        key: 'Type',
        lines: [InterventionsUtils.mapInterventionTypeToFriendlyString(this.crsDetails.interventionType)],
      })
    }
    if (this.crsDetails.pccRegions && this.crsDetails.pccRegions.length > 0) {
      summary.push({
        key: 'Location',
        lines: this.crsDetails.pccRegions,
        listStyle: this.crsDetails.pccRegions.length > 1 ? ListStyle.bulleted : undefined,
      })
    }
    if (this.crsDetails.serviceCategories && this.crsDetails.serviceCategories.length > 0) {
      summary.push({
        key: 'Service Categories',
        lines: this.crsDetails.serviceCategories,
        listStyle: this.crsDetails.serviceCategories.length > 1 ? ListStyle.bulleted : undefined,
      })
    }
    if (this.crsDetails.provider) {
      summary.push({
        key: 'Provider',
        lines: [this.crsDetails.provider],
      })
    }
    if (this.crsDetails.minAge && this.crsDetails.maxAge) {
      summary.push({
        key: 'Age group',
        lines: [`${this.crsDetails.minAge}-${this.crsDetails.maxAge}`],
      })
    }
    summary.push({
      key: 'Gender',
      lines: [InterventionsUtils.formatGenderText(this.crsDetails.allowsMales, this.crsDetails.allowsFemales)],
    })

    return summary
  }
}
