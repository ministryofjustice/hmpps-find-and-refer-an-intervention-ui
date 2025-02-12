import { SummaryListItem } from '../../utils/summaryList'

export default class InterventionPresenter {
  constructor() {}

  readonly text = {
    pageHeading: 'Intervention name',
  }

  interventionSummaryList(): SummaryListItem[] {
    const summary: SummaryListItem[] = [
      {
        key: 'Needs',
        lines: [
          [
            'Accommodation',
            'Education, training and employability',
            'Financial management and income',
            'Relationships',
            'Lifestyle and associates',
            'Drug misuse',
            'Alcohol misuse',
            'Emotional wellbeing',
            'Thinking and behaviour',
            'Attitudes',
          ].join(', '),
        ],
      },
      {
        key: 'Type',
        lines: ['Lorem ipsum'],
      },
      {
        key: 'Gender',
        lines: ['Male or Female'],
      },
      {
        key: 'Age group',
        lines: ['xx-xx years old'],
      },
      {
        key: 'Risk criteria',
        lines: ['Lorem ipsum available for some interventions'],
      },
      {
        key: 'Suitable for people with learning disabilities or challenges (LDC)',
        lines: ['Yes/No'],
      },
      {
        key: 'Equivalent non-LDC programme',
        lines: ['Lorem ipsum'],
      },
      {
        key: 'Format',
        lines: ['Group, one-to-one'],
      },
      {
        key: 'Attendance type',
        lines: ['In person, online'],
      },
    ]
    return summary
  }
}
