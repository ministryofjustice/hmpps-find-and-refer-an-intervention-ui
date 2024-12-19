import InterventionSummary from '../../models/interventionSummary'
import { SummaryListItem } from '../../utils/summaryList'

export default class CataloguePresenter {
  constructor(private readonly sampleText: string) {}

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
      value: 'accredited-programme-',
      text: 'Accredited programme (AcP)',
      checked: false,
    },
    {
      value: 'commissioned-rehabilitative-services',
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
      value: '-structured-interventions',
      text: 'Structured interventions',
      checked: false,
    },
    {
      value: 'toolkits',
      text: 'Toolkits',
      checked: false,
    },
  ]

  readonly fields = {
    // keywords: this.utils.stringValue(
    //     this.ppTeamPhoneNumber!,
    //     'delius-probation-practitioner-team-phone-number'
    // ),
  }

  get interventions(): InterventionSummary[] {
    return [
      this.sampleIntervention('intervention 1'),
      this.sampleIntervention('intervention 2'),
      this.sampleIntervention('intervention 3'),
    ]
  }

  interventionSummaryList(intervention: InterventionSummary): SummaryListItem[] {
    return [
      {
        key: 'Intervention type',
        lines: [intervention.interventionType, 'line 2'],
      },
      {
        key: 'Setting',
        lines: [intervention.setting],
      },
      {
        key: 'Gender',
        lines: [intervention.gender],
      },
      {
        key: 'Min/max age',
        lines: [intervention.ageRestriction],
      },
      {
        key: 'Risk criteria',
        lines: [intervention.riskCriteria],
      },
      {
        key: 'Suitable for people with learning disabilities or challenges (LDC)',
        lines: [intervention.suitableForPeopleWithLearningDisabilitiesOrChallenges],
      },
      {
        key: 'Learning disability catered / intended for',
        lines: [intervention.learningDisabilityCateredIntendedFor],
      },
      {
        key: 'Equivalent non-LDC programme',
        lines: [intervention.equivalentNonLDCProgramme],
      },
      {
        key: 'Attendance type',
        lines: [intervention.attendanceType],
      },
      {
        key: 'Delivery method',
        lines: [intervention.deliveryMethod],
      },
    ]
  }

  sampleIntervention(title: string): InterventionSummary {
    return {
      title,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at sodales mauris, eget pharetra enim. Donec posuere, ante sed luctus rutrum, ipsum urna bibendum velit, elementum lacinia erat nulla nec elit.',
      interventionType: 'Commissioned Rehabilitative Service',
      setting: 'Custody or community',
      gender: 'Male or female',
      ageRestriction: 'xx-xx years old',
      riskCriteria: 'string',
      suitableForPeopleWithLearningDisabilitiesOrChallenges: 'Yes/No',
      learningDisabilityCateredIntendedFor: 'string',
      equivalentNonLDCProgramme: 'string',
      attendanceType: 'one-to-one',
      deliveryMethod: 'In person, online',
    }
  }
}
