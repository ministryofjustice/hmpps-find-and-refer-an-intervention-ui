import InterventionPresenter from './interventionPresenter'
import interventionDetailsFactory from '../../../testutils/factories/interventionDetails'

describe(`text`, () => {
  it(`returns the title of the intervention for page heading`, async () => {
    const interventionDetails = interventionDetailsFactory.community().build()
    const presenter = new InterventionPresenter('backlink-uri', interventionDetails, 'custody')

    expect(presenter.text.pageHeading).toEqual('Horizon')
  })
})

// describe(`interventionSummaryList`, () => {
//   it('returns a summarylist object with the correct data', async () => {
//     const interventionDetails = interventionDetailsFactory.community().build()
//
//     const presenter = new InterventionPresenter('backlink-uri', interventionDetails, 'custody')
//
//     const expectedResult = [
//       {
//         key: 'Gender',
//         lines: ['Male'],
//       },
//       {
//         key: 'Type',
//         lines: ['ACP'],
//       },
//       {
//         key: 'Risk criteria',
//         lines: ['Medium, high or very high', 'Yes'],
//       },
//       {
//         key: 'Needs',
//         lines: ['Thinking, Behaviours and Attitudes'],
//       },
//       {
//         key: 'Suitable for people with learning disabilities or challenges (LDC)',
//         lines: ['Yes'],
//       },
//       {
//         key: 'Equivalent non-LDC programme',
//         lines: ['Kaizen'],
//       },
//       {
//         key: 'Time to complete',
//         lines: ['At least 6 Months'],
//       },
//       {
//         key: 'Format',
//         lines: ['Group'],
//       },
//       {
//         key: 'Attendance type',
//         lines: ['In Person'],
//       },
//     ]
//
//     expect(presenter.interventionSummaryList()).toStrictEqual(expectedResult)
//   })
//
//   it('returns a summarylist object without optional fields when they are not available', async () => {
//     const interventionDetails = interventionDetailsFactory.build({
//       suitableForPeopleWithLearningDifficulties: null,
//       equivalentNonLdcProgramme: null,
//       timeToComplete: null,
//       sessionDetails: null,
//     })
//
//     const presenter = new InterventionPresenter('backlink-uri', interventionDetails, 'custody')
//
//     const expectedResult = [
//       {
//         key: 'Gender',
//         lines: ['Male'],
//       },
//       {
//         key: 'Type',
//         lines: ['ACP'],
//       },
//       {
//         key: 'Risk criteria',
//         lines: ['Medium, high or very high', 'Yes'],
//       },
//       {
//         key: 'Needs',
//         lines: ['Thinking, Behaviours and Attitudes'],
//       },
//       {
//         key: 'Format',
//         lines: ['Group'],
//       },
//       {
//         key: 'Attendance type',
//         lines: ['In Person'],
//       },
//     ]
//
//     expect(presenter.interventionSummaryList()).toStrictEqual(expectedResult)
//   })
// })
