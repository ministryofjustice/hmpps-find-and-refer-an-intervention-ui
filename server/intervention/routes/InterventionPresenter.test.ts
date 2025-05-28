import { randomUUID, UUID } from 'crypto'
import interventionDetailsFactory from '../../../testutils/factories/interventionDetails'
import { InterventionType } from '../../models/InterventionCatalogueItem'
import InterventionDetails, { PDU } from '../../models/InterventionDetails'
import InterventionPresenter from './interventionPresenter'

describe(`text`, () => {
  it(`returns the title of the intervention for page heading`, async () => {
    const interventionDetails = interventionDetailsFactory.community().build()
    const presenter = new InterventionPresenter('backlink-uri', interventionDetails, 'custody')

    expect(presenter.text.pageHeading).toEqual('Horizon')
  })
})

describe(`interventionSummaryList`, () => {
  it('returns a summarylist object with the correct data, ACP, community', async () => {
    const interventionDetails = interventionDetailsFactory.community().build()

    const presenter = new InterventionPresenter('backlink-uri', interventionDetails, 'community')

    const expectedResult = [
      {
        key: 'Gender',
        lines: ['Male'],
      },
      {
        key: 'Type',
        lines: ['Accredited Programmes'],
      },
      {
        key: 'Risk criteria',
        lines: ['OVP: score 20+', 'If OVP not available, then OGRS3: score 25+', 'Low risk on SARA'],
        listStyle: 1,
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

  it('returns a summarylist object with the correct data, ACP, custody', async () => {
    const interventionDetails = interventionDetailsFactory.build()

    const presenter = new InterventionPresenter('backlink-uri', interventionDetails, 'custody')

    const expectedResult = [
      {
        key: 'Gender',
        lines: ['Male'],
      },
      {
        key: 'Type',
        lines: ['Accredited Programmes'],
      },
      {
        key: 'Risk criteria',
        lines: ['OVP: score 20+', 'If OVP not available, then OGRS3: score 25+', 'Low risk on SARA'],
        listStyle: 1,
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
    ]

    expect(presenter.interventionSummaryList()).toStrictEqual(expectedResult)
  })

  it('returns a summarylist object with the correct data, CRS, community', async () => {
    const interventionDetails = interventionDetailsFactory.CRS().community().build()

    const presenter = new InterventionPresenter('backlink-uri', interventionDetails, 'community')

    const expectedResult = [
      {
        key: 'Gender',
        lines: ['Male'],
      },
      {
        key: 'Type',
        lines: ['Commissioned Rehabilitative Services'],
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

  it('returns a summarylist object with the correct data, CRS, custody', async () => {
    const interventionDetails = interventionDetailsFactory.CRS().custody().build()

    const presenter = new InterventionPresenter('backlink-uri', interventionDetails, 'custody')

    const expectedResult = [
      {
        key: 'Gender',
        lines: ['Male'],
      },
      {
        key: 'Type',
        lines: ['Commissioned Rehabilitative Services'],
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

  it('returns a summarylist object with the correct data, SI, community', async () => {
    const interventionDetails = interventionDetailsFactory.SI().community().build()

    const presenter = new InterventionPresenter('backlink-uri', interventionDetails, 'community')

    const expectedResult = [
      {
        key: 'Gender',
        lines: ['Male'],
      },
      {
        key: 'Type',
        lines: ['Structured Interventions'],
      },
      {
        key: 'Risk criteria',
        lines: ['OVP: score 20+', 'If OVP not available, then OGRS3: score 25+', 'Low risk on SARA'],
        listStyle: 1,
      },
      {
        key: 'Needs',
        lines: ['Thinking, Behaviours and Attitudes'],
      },
      {
        key: 'Age group',
        lines: ['18-30'],
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

  it('returns a summarylist object with the correct data, Toolkits, community', async () => {
    const interventionDetails = interventionDetailsFactory.TOOLKITS().community().build()

    const presenter = new InterventionPresenter('backlink-uri', interventionDetails, 'community')

    const expectedResult = [
      {
        key: 'Gender',
        lines: ['Male'],
      },
      {
        key: 'Type',
        lines: ['Toolkits'],
      },
      {
        key: 'Risk criteria',
        lines: ['OVP: score 20+', 'If OVP not available, then OGRS3: score 25+', 'Low risk on SARA'],
        listStyle: 1,
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

  it('returns a summarylist object with the correct data, Toolkits, custody', async () => {
    const interventionDetails = interventionDetailsFactory.TOOLKITS().community().build()

    const presenter = new InterventionPresenter('backlink-uri', interventionDetails, 'custody')

    const expectedResult = [
      {
        key: 'Gender',
        lines: ['Male'],
      },
      {
        key: 'Type',
        lines: ['Toolkits'],
      },
      {
        key: 'Risk criteria',
        lines: ['OVP: score 20+', 'If OVP not available, then OGRS3: score 25+', 'Low risk on SARA'],
        listStyle: 1,
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

  it('returns a summarylist object without optional fields when they are not available', async () => {
    const interventionDetails = interventionDetailsFactory.build({
      riskCriteria: null,
      suitableForPeopleWithLearningDifficulties: null,
      equivalentNonLdcProgramme: null,
      timeToComplete: null,
      sessionDetails: null,
    })

    const presenter = new InterventionPresenter('backlink-uri', interventionDetails, 'custody')

    const expectedResult = [
      {
        key: 'Gender',
        lines: ['Male'],
      },
      {
        key: 'Type',
        lines: ['Accredited Programmes'],
      },
      {
        key: 'Format',
        lines: ['Group'],
      },
    ]

    expect(presenter.interventionSummaryList()).toStrictEqual(expectedResult)
  })
})

describe(`getLocationsInCustodyTableArgs`, () => {
  it('returns a TableArgs object with the correct data', async () => {
    const interventionDetails = interventionDetailsFactory.custody().build()
    const presenter = new InterventionPresenter('backlink-uri', interventionDetails, 'custody')

    const expectedResult = {
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
      rows: [
        [
          {
            html: `<a href='#'>London</a>`,
          },
          {
            text: 'A',
          },
          {
            text: 'London',
          },
        ],
        [
          {
            html: `<a href='#'>Manchester</a>`,
          },
          {
            text: 'M',
          },
          {
            text: 'Manchester',
          },
        ],
      ],
    }

    expect(presenter.getLocationsInCustodyTableArgs()).toStrictEqual(expectedResult)
  })
})

describe(`generateCommunityRow`, () => {
  it('For CRS intervention returns a link for a row', async () => {
    const interventionId: UUID = randomUUID()
    const interventionDetails: InterventionDetails = interventionDetailsFactory.community().build()
    const pdu: PDU = { id: 'durham', pduName: 'Durham' }
    const presenter = new InterventionPresenter('backlink-uri', interventionDetails, 'community')
    presenter.generateCommunityRow(randomUUID(), pdu, 'CRS' as InterventionType)
    const expectedResult = `<a href=/crsDetails/${interventionId}/${pdu.id}/community>${pdu.pduName}</a>`

    expect(presenter.generateCommunityRow(interventionId, pdu, 'CRS')).toStrictEqual(expectedResult)
  })
  it('For non-CRS intervention return non hyperlinked pdu', async () => {
    const interventionId: UUID = randomUUID()
    const interventionDetails: InterventionDetails = interventionDetailsFactory.community().build()
    const pdu: PDU = { id: 'durham', pduName: 'Durham' }
    const presenter = new InterventionPresenter('backlink-uri', interventionDetails, 'community')
    presenter.generateCommunityRow(randomUUID(), pdu, 'ACP' as InterventionType)
    const expectedResult = pdu.pduName

    expect(presenter.generateCommunityRow(interventionId, pdu, 'ACP')).toStrictEqual(expectedResult)
  })
})
