import crsInterventionDetailsFactory from '../../../testutils/factories/crsInterventionDetails'
import CrsDetailsPresenter from './crsDetailsPresenter'

describe(`crsSummaryList`, () => {
  it('returns a summary list object with the correct data', async () => {
    const crsDetails = crsInterventionDetailsFactory.build()

    const presenter = new CrsDetailsPresenter('backLink', crsDetails)

    const expectedResult = [
      {
        key: 'Type',
        lines: ['Commissioned Rehabilitative Services'],
      },
      {
        key: 'Location',
        lines: ['Cleveland', 'Durham', 'Northumbria'],
        listStyle: 1,
      },
      {
        key: 'Service Categories',
        lines: ['Emotional Wellbeing', 'Family and Significant Others', 'Lifestyle and Associates', 'Social Inclusion'],
        listStyle: 1,
      },
      {
        key: 'Provider',
        lines: ['Home Trust'],
      },
      {
        key: 'Gender',
        lines: ['Male or Female'],
      },
    ]

    expect(presenter.crsDetailsSummaryList()).toStrictEqual(expectedResult)
  })
})
