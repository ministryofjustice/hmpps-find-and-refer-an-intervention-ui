import InterventionSummary from '../models/interventionSummary'
import { ListStyle, SummaryListItem } from '../../utils/summaryList'
import Pagination from '../../utils/pagination/pagination'
import { Page } from '../../shared/models/pagination'
import InterventionCatalogueItem from '../../models/InterventionCatalogueItem'

export default class CataloguePresenter {
  public readonly pagination: Pagination

  constructor(private interventionCatalogueItems: Page<InterventionCatalogueItem>) {
    this.pagination = new Pagination(interventionCatalogueItems)
    this.interventionCatalogueItems = interventionCatalogueItems
  }

  interventions = this.interventionCatalogueItems.content

  readonly text = {
    pageHeading: 'Search Results',
    searchByProgrammeNameInput: {
      heading: 'Search by programme name',
    },
    locationInput: {
      heading: 'Location (works both PDU and prison?)?',
    },
    settingRadio: {
      heading: 'Setting',
      items: {
        communityHeading: 'Community',
        custodyHeading: 'Custody',
      },
    },
    genderRadio: {
      heading: 'Gender',
      hint: 'Select all that apply',
      items: {
        maleHeading: 'Male',
        femaleHeading: 'Female',
      },
    },
    needsRadio: {
      heading: 'Needs',
    },
    typeRadio: {
      heading: 'Type',
    },
    formatRadio: {
      heading: 'Format',
      items: {
        oneToOneHeading: '1-2-1',
        groupHeading: 'Group',
      },
    },
    attendanceTypeRadio: {
      heading: 'Attendance Type',
      items: {
        inPersonHeading: 'In Person',
        onlineHeading: 'Online',
      },
    },
  }

  readonly needsOptions = [
    {
      value: 'accommodation',
      text: 'Accommodation',
      checked: false,
    },
    {
      value: 'education-training-employment',
      text: 'Education, training and employment (ETE)',
      checked: false,
    },
    {
      value: 'finance',
      text: 'Finance',
      checked: false,
    },
    {
      value: 'relationships',
      text: 'Relationships',
      checked: false,
    },
    {
      value: 'lifestyle-and-associates',
      text: 'Lifestyle and associates',
      checked: false,
    },
    {
      value: 'drug-misuse',
      text: 'Drug misuse',
      checked: false,
    },
    {
      value: 'alcohol-misuse',
      text: 'Alcohol misuse',
      checked: false,
    },
    {
      value: 'emotional-wellbeing',
      text: 'Emotional wellbeing',
      checked: false,
    },
    {
      value: 'thinking-and-behaviour',
      text: 'Thinking and behaviour',
      checked: false,
    },
    {
      value: 'attitudes',
      text: 'Attitudes',
      checked: false,
    },
  ]

  readonly typeOptions = [
    {
      value: 'ACP',
      text: 'Accredited programme (AcP)',
      checked: false,
    },
    {
      value: 'CRS',
      text: 'Commissioned Rehabilitative Services (CRS)',
      checked: false,
    },
    {
      value: 'creating-future-opportunities',
      text: 'Creating Future Opportunities (CFO)',
      checked: false,
    },
    {
      value: 'regional-outcome-innovation-fund',
      text: 'Regional Outcome Innovation Fund (ROIF)',
      checked: false,
    },
    {
      value: 'SI',
      text: 'Structured interventions',
      checked: false,
    },
    {
      value: 'toolkits',
      text: 'Toolkits',
      checked: false,
    },
  ]

  mapInterventionTypeToFriendlyString(interventionType: string) {
    enum InterventionTypes {
      SI = 'Structured Interventions',
      ACP = 'Accredited Programmes',
      CRS = 'Commissioned Rehabilitative Services',
    }
    return InterventionTypes[interventionType.toUpperCase()] !== undefined
      ? InterventionTypes[interventionType.toUpperCase()]
      : ''
  }

  interventionSummaryList(intervention: InterventionSummary): SummaryListItem[] {
    const summary: SummaryListItem[] = [
      {
        key: 'Gender',
        lines: [
          intervention.allowsMales && !intervention.allowsFemales ? 'Male' : '',
          intervention.allowsFemales && intervention.allowsMales ? ' Male or Female' : '',
          intervention.allowsFemales && !intervention.allowsMales ? 'Female' : '',
        ],
      },
      {
        key: 'Type',
        lines: [this.mapInterventionTypeToFriendlyString(intervention.interventionType)],
      },
    ]
    if (intervention.riskCriteria && intervention.riskCriteria.length > 0) {
      summary.push({
        key: 'Risk criteria',
        lines: intervention.riskCriteria,
        listStyle: intervention.riskCriteria.length > 1 ? ListStyle.bulleted : undefined,
      })
    }
    if (intervention.deliveryFormat && intervention.deliveryFormat.length > 0) {
      summary.push({
        key: 'Format',
        lines: intervention.deliveryFormat,
      })
    }
    if (intervention.setting && intervention.setting.length > 0) {
      summary.push({
        key: 'Setting',
        lines: intervention.setting,
      })
    }
    if (intervention.attendanceType && intervention.attendanceType.length > 0) {
      summary.push({
        key: 'Attendance type',
        lines: intervention.attendanceType,
      })
    }
    return summary
  }
}
