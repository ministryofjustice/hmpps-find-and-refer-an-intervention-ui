import { ListStyle, SummaryListItem } from '../../utils/summaryList'
import Pagination from '../../utils/pagination/pagination'
import { Page } from '../../shared/models/pagination'
import InterventionCatalogueItem from '../../models/InterventionCatalogueItem'
import CatalogueFilter from './catalogueFilter'

export default class CataloguePresenter {
  public readonly pagination: Pagination

  constructor(
    private interventionCatalogueItems: Page<InterventionCatalogueItem>,
    readonly filter: CatalogueFilter,
    readonly params: string,
    readonly setting: string,
  ) {
    this.pagination = new Pagination(interventionCatalogueItems, params)
    this.interventionCatalogueItems = interventionCatalogueItems
  }

  interventions = this.interventionCatalogueItems.content

  readonly text = {
    pageHeading: `Search results for ${this.setting}`,
    searchByProgrammeNameInput: {
      heading: 'Search by programme name',
    },
    locationInput: {
      heading: 'Location (works both PDU and prison?)?',
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
      text: 'Accredited Programmes',
      checked: this.filter.interventionType?.includes('ACP') ?? false,
    },
    {
      value: 'CRS',
      text: 'Commissioned Rehabilitative Services',
      checked: this.filter.interventionType?.includes('CRS') ?? false,
    },
    {
      value: 'SI',
      text: 'Structured Interventions',
      checked: this.filter.interventionType?.includes('SI') ?? false,
    },
    {
      value: 'TOOL',
      text: 'Toolkits',
      checked: this.filter.interventionType?.includes('TOOL') ?? false,
    },
  ]

  generateRemoveFilterHref(filterName: string, filterValue: string) {
    const urlToReturn = `/interventions/${this.setting}?${this.params}`
    if (urlToReturn.includes(`&${filterName}=${filterValue}`)) {
      return urlToReturn.replace(`&${filterName}=${filterValue}`, '')
    }
    if (urlToReturn.includes(`?${filterName}=${filterValue}&`)) {
      return urlToReturn.replace(`${filterName}=${filterValue}&`, '')
    }
    return urlToReturn.replace(`?${filterName}=${filterValue}`, '')
  }

  generateFilterPane() {
    const categories = this.generateSelectedFilters()
    if (categories.length !== 0) {
      return {
        heading: {
          text: 'Selected filters',
        },

        clearLink: {
          text: 'Clear filters',
          href: `/interventions/${this.setting}`,
        },

        categories,
      }
    }
    return null
  }

  generateSelectedFilters() {
    const selectedFilters = []
    if (this.filter.gender) {
      const genders = typeof this.filter.gender === 'string' ? [this.filter.gender] : this.filter.gender
      selectedFilters.push({
        heading: {
          text: 'Gender',
        },
        items: genders.map(genderFilter => {
          return {
            href: this.generateRemoveFilterHref('gender-checkbox', genderFilter),
            text: genderFilter,
          }
        }),
      })
    }
    if (this.filter.interventionType) {
      const interventionTypes =
        typeof this.filter.interventionType === 'string' ? [this.filter.interventionType] : this.filter.interventionType
      selectedFilters.push({
        heading: {
          text: 'Type',
        },
        items: interventionTypes.map(interventionTypeFilter => {
          return {
            href: this.generateRemoveFilterHref('type-checkbox', interventionTypeFilter),
            text: this.mapInterventionTypeToFriendlyString(interventionTypeFilter),
          }
        }),
      })
    }
    return selectedFilters
  }

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

  interventionSummaryList(intervention: InterventionCatalogueItem): SummaryListItem[] {
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
    if (intervention.criminogenicNeeds && intervention.criminogenicNeeds.length > 0) {
      summary.push({
        key: 'Needs',
        lines: [intervention.criminogenicNeeds.join(', ')],
        listStyle: ListStyle.noMarkers,
      })
    }
    if (
      intervention.setting.includes('CUSTODY') &&
      intervention.suitableForPeopleWithLearningDifficulties !== undefined
    ) {
      summary.push({
        key: 'Suitable for people with learning disabilities or challenges (LDC)',
        lines: [intervention.suitableForPeopleWithLearningDifficulties ? 'Yes' : 'No'],
      })
    }
    if (intervention.setting.includes('CUSTODY') && intervention.equivalentNonLdcProgramme) {
      summary.push({
        key: 'Equivalent non-LDC programme',
        lines: [intervention.equivalentNonLdcProgramme],
      })
    }
    if (intervention.timeToComplete) {
      summary.push({
        key: 'Time to complete',
        lines: [intervention.timeToComplete],
      })
    }
    if (intervention.deliveryFormat && intervention.deliveryFormat.length > 0) {
      summary.push({
        key: 'Format',
        lines: intervention.deliveryFormat,
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
