import CatalogueFilter from './catalogueFilter'
import CataloguePresenter from './cataloguePresenter'
import { Page } from '../../shared/models/pagination'
import InterventionCatalogueItem from '../../models/InterventionCatalogueItem'
import pageFactory from '../../../testutils/factories/page'
import interventionCatalogueItemFactory from '../../../testutils/factories/interventionCatalogueItem'

describe(`filters.`, () => {
  describe(`intervention type`, () => {
    it('set to true if set in filter', async () => {
      const filter = new CatalogueFilter()
      filter.interventionType = ['ACP', 'CRS', 'SI', 'TOOLKITS', 'ROIF', 'CFO']

      const presenter = new CataloguePresenter(
        {
          content: [],
          totalElements: 9,
          totalPages: 2,
          size: 5,
          number: 0,
          numberOfElements: 5,
        },
        filter,
        'gender-checkbox=Male&page=2',
        'community',
      )
      presenter.typeOptions.forEach(i => expect(i).toMatchObject({ value: i.value, checked: true }))
    })

    it('set to false if not in filter', async () => {
      const filter = new CatalogueFilter()

      const presenter = new CataloguePresenter(
        {
          content: [],
          totalElements: 9,
          totalPages: 2,
          size: 5,
          number: 0,
          numberOfElements: 5,
        },
        filter,
        '',
        'community',
      )
      presenter.typeOptions.forEach(i => expect(i).toMatchObject({ checked: false }))
    })

    it('only sets checked to true is passed in', async () => {
      const filter = new CatalogueFilter()
      filter.interventionType = ['ACP', 'CRS']

      const presenter = new CataloguePresenter(
        {
          content: [],
          totalElements: 9,
          totalPages: 2,
          size: 5,
          number: 0,
          numberOfElements: 5,
        },
        filter,
        'gender-checkbox=Male&page=2',
        'community',
      )

      const expectedResult = [
        {
          value: 'ACP',
          text: 'Accredited Programmes',
          checked: true,
        },
        {
          value: 'CRS',
          text: 'Commissioned Rehabilitative Services',
          checked: true,
        },
        {
          value: 'SI',
          text: 'Structured Interventions',
          checked: false,
        },
        {
          value: 'TOOLKITS',
          text: 'Toolkits',
          checked: false,
        },
      ]

      expect(presenter.typeOptions).toMatchObject(expectedResult)
    })
  })
})

describe(`generateFilterPane`, () => {
  it('should return the correct filter pane object for filters supplied', async () => {
    const testObject = {
      filter: { interventionType: ['ACP'], gender: ['Male'], programmeName: 'Building' } as CatalogueFilter,
      expectedResult: {
        heading: {
          text: 'Selected filters',
        },
        clearLink: {
          text: 'Clear filters',
          href: `/interventions/community`,
        },
        categories: [
          {
            heading: {
              text: 'Programme name',
            },
            items: [
              {
                href: '/interventions/community?gender-checkbox=Male&type-checkbox=ACP',
                text: 'Building',
              },
            ],
          },
          {
            heading: {
              text: 'Gender',
            },
            items: [
              {
                href: '/interventions/community?search-by-programme-name-input=Building&type-checkbox=ACP',
                text: 'Male',
              },
            ],
          },
          {
            heading: {
              text: 'Type',
            },
            items: [
              {
                href: '/interventions/community?search-by-programme-name-input=Building&gender-checkbox=Male',
                text: 'Accredited Programmes',
              },
            ],
          },
        ],
      },
    }

    const presenter = new CataloguePresenter(
      {
        content: [],
        totalElements: 9,
        totalPages: 2,
        size: 5,
        number: 0,
        numberOfElements: 5,
      },
      testObject.filter,
      'search-by-programme-name-input=Building&gender-checkbox=Male&type-checkbox=ACP',
      'community',
    )
    expect(presenter.generateFilterPane()).toEqual(testObject.expectedResult)
  })

  it('should return the correct filter pane object when no filters supplied', async () => {
    const testObject = {
      filter: { interventionType: undefined, gender: undefined } as CatalogueFilter,
      expectedResult: null,
    }

    const presenter = new CataloguePresenter(
      {
        content: [],
        totalElements: 9,
        totalPages: 2,
        size: 5,
        number: 0,
        numberOfElements: 5,
      },
      testObject.filter,
      '',
      'community',
    )
    expect(presenter.generateFilterPane()).toEqual(testObject.expectedResult)
  })
})

describe(`interventionSummaryList`, () => {
  it('returns a summarylist object with the correct data, ACP, community', async () => {
    const filter = {} as CatalogueFilter
    const interventionCatalogueItem = interventionCatalogueItemFactory.build()
    const interventionCatalogueItemPage: Page<InterventionCatalogueItem> = pageFactory
      .pageContent([interventionCatalogueItem])
      .build() as Page<InterventionCatalogueItem>
    const presenter = new CataloguePresenter(interventionCatalogueItemPage, filter, '', 'community')

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
        lines: ['Medium, high or very high', 'Yes'],
        listStyle: 1,
      },
      {
        key: 'Needs',
        lines: ['Thinking, Behaviours and Attitudes'],
        listStyle: 0,
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

    expect(presenter.interventionSummaryList(interventionCatalogueItem)).toStrictEqual(expectedResult)
  })

  it('returns a summarylist object with the correct data, ACP, custody', async () => {
    const filter = {} as CatalogueFilter
    const interventionCatalogueItem = interventionCatalogueItemFactory.build()
    const interventionCatalogueItemPage: Page<InterventionCatalogueItem> = pageFactory
      .pageContent([interventionCatalogueItem])
      .build() as Page<InterventionCatalogueItem>
    const presenter = new CataloguePresenter(interventionCatalogueItemPage, filter, '', 'custody')

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
        lines: ['Medium, high or very high', 'Yes'],
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

    expect(presenter.interventionSummaryList(interventionCatalogueItem)).toStrictEqual(expectedResult)
  })

  it('returns a summarylist object with the correct data, CRS, community', async () => {
    const filter = {} as CatalogueFilter
    const interventionCatalogueItem = interventionCatalogueItemFactory.CRS().build()
    const interventionCatalogueItemPage: Page<InterventionCatalogueItem> = pageFactory
      .pageContent([interventionCatalogueItem])
      .build() as Page<InterventionCatalogueItem>
    const presenter = new CataloguePresenter(interventionCatalogueItemPage, filter, '', 'community')

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
        key: 'Risk criteria',
        lines: ['Medium, high or very high', 'Yes'],
        listStyle: 1,
      },
      {
        key: 'Needs',
        lines: ['Thinking, Behaviours and Attitudes'],
        listStyle: 0,
      },
      {
        key: 'Attendance type',
        lines: ['In Person'],
      },
    ]

    expect(presenter.interventionSummaryList(interventionCatalogueItem)).toStrictEqual(expectedResult)
  })

  it('returns a summarylist object with the correct data, CRS, custody', async () => {
    const filter = {} as CatalogueFilter
    const interventionCatalogueItem = interventionCatalogueItemFactory.CRS().build()
    const interventionCatalogueItemPage: Page<InterventionCatalogueItem> = pageFactory
      .pageContent([interventionCatalogueItem])
      .build() as Page<InterventionCatalogueItem>
    const presenter = new CataloguePresenter(interventionCatalogueItemPage, filter, '', 'custody')

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
        key: 'Risk criteria',
        lines: ['Medium, high or very high', 'Yes'],
        listStyle: 1,
      },
      {
        key: 'Needs',
        lines: ['Thinking, Behaviours and Attitudes'],
        listStyle: 0,
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

    expect(presenter.interventionSummaryList(interventionCatalogueItem)).toStrictEqual(expectedResult)
  })

  it('returns a summarylist object with the correct data, toolkits, community', async () => {
    const filter = {} as CatalogueFilter
    const interventionCatalogueItem = interventionCatalogueItemFactory.TOOLKIT().build()
    const interventionCatalogueItemPage: Page<InterventionCatalogueItem> = pageFactory
      .pageContent([interventionCatalogueItem])
      .build() as Page<InterventionCatalogueItem>
    const presenter = new CataloguePresenter(interventionCatalogueItemPage, filter, '', 'community')

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
        lines: ['Medium, high or very high', 'Yes'],
        listStyle: 1,
      },
      {
        key: 'Needs',
        lines: ['Thinking, Behaviours and Attitudes'],
        listStyle: 0,
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

    expect(presenter.interventionSummaryList(interventionCatalogueItem)).toStrictEqual(expectedResult)
  })

  it('returns a summarylist object with the correct data, missing data', async () => {
    const filter = {} as CatalogueFilter
    const interventionCatalogueItem = interventionCatalogueItemFactory.missingFields().build()
    const interventionCatalogueItemPage: Page<InterventionCatalogueItem> = pageFactory
      .pageContent([interventionCatalogueItem])
      .build() as Page<InterventionCatalogueItem>
    const presenter = new CataloguePresenter(interventionCatalogueItemPage, filter, '', 'community')

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
      {
        key: 'Attendance type',
        lines: ['In Person'],
      },
    ]

    expect(presenter.interventionSummaryList(interventionCatalogueItem)).toStrictEqual(expectedResult)
  })
})
