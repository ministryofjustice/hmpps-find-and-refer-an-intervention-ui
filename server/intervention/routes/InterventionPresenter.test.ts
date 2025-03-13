import InterventionPresenter from './interventionPresenter'
import interventionDetailsFactory from '../../../testutils/factories/interventionDetails'

describe(`text`, () => {
  it(`returns the title of the intervention for page heading`, async () => {
    const interventionDetails = interventionDetailsFactory.community().build()
    const presenter = new InterventionPresenter('backlink-uri', interventionDetails)

    expect(presenter.text.pageHeading).toEqual('Horizon')
  })
})

describe(`interventionSummaryList`, () => {
  it('returns a summarylist object with the correct data', async () => {
    const interventionDetails = interventionDetailsFactory.community().build()

    const presenter = new InterventionPresenter('backlink-uri', interventionDetails)

    const expectedResult = [
      {
        key: 'Gender',
        lines: ['Male'],
      },
      {
        key: 'Type',
        lines: ['ACP'],
      },
      {
        key: 'Risk criteria',
        lines: ['Medium, high or very high', 'Yes'],
      },
      {
        key: 'Needs',
        lines: ['Thinking, Behaviours and Attitudes'],
      },
      {
        key: 'Suitable for people with learning disabilities or challenges (LDC)',
        lines: ['Yes'],
      },
      {
        key: 'Equivalent non-LDC programme',
        lines: ['Kaizen'],
      },
      {
        key: 'Time to complete',
        lines: ['At least 6 Months'],
      },
      {
        key: 'Format',
        lines: ['Group'],
      },
      {
        key: 'Attendance type',
        lines: ['In Person'],
      },
    ]

    expect(presenter.interventionSummaryList()).toStrictEqual(expectedResult)
  })

  it('returns a summarylist object without optional fields when they are not available', async () => {
    const interventionDetails = interventionDetailsFactory.build({
      suitableForPeopleWithLearningDifficulties: null,
      equivalentNonLdcProgramme: null,
      timeToComplete: null,
      sessionDetails: null,
    })

    const presenter = new InterventionPresenter('backlink-uri', interventionDetails)

    const expectedResult = [
      {
        key: 'Gender',
        lines: ['Male'],
      },
      {
        key: 'Type',
        lines: ['ACP'],
      },
      {
        key: 'Risk criteria',
        lines: ['Medium, high or very high', 'Yes'],
      },
      {
        key: 'Needs',
        lines: ['Thinking, Behaviours and Attitudes'],
      },
      {
        key: 'Format',
        lines: ['Group'],
      },
      {
        key: 'Attendance type',
        lines: ['In Person'],
      },
    ]

    expect(presenter.interventionSummaryList()).toStrictEqual(expectedResult)
  })
})

describe(`genderText`, () => {
  it(`returns 'Male' if only allowsMale is true`, async () => {
    const interventionDetails = interventionDetailsFactory.community().build()
    const presenter = new InterventionPresenter('backlink-uri', interventionDetails)

    expect(presenter.genderText(true, false)).toEqual('Male')
  })

  it(`returns 'Female' if only allowsFemale is true`, async () => {
    const interventionDetails = interventionDetailsFactory.community().build()
    const presenter = new InterventionPresenter('backlink-uri', interventionDetails)

    expect(presenter.genderText(false, true)).toEqual('Female')
  })

  it(`returns ''Male or Female'' if both allowsMale and allowsFemale are true`, async () => {
    const interventionDetails = interventionDetailsFactory.community().build()
    const presenter = new InterventionPresenter('backlink-uri', interventionDetails)

    expect(presenter.genderText(true, true)).toEqual('Male or Female')
  })
})
