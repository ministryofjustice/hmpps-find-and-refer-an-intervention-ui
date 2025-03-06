import CatalogueFilter from './catalogueFilter'
import CataloguePresenter from './cataloguePresenter'

describe(`mapInterventionTypeToFriendlyString`, () => {
  it('returns the correct mapping', async () => {
    const presenter = new CataloguePresenter(
      {
        content: [],
        totalElements: 9,
        totalPages: 2,
        size: 5,
        number: 0,
        numberOfElements: 5,
      },
      new CatalogueFilter(),
      'gender-checkbox=Male',
      'community',
    )
    const testValues = [
      { input: 'ACP', output: 'Accredited Programmes' },
      { input: 'SI', output: 'Structured Interventions' },
      { input: 'CRS', output: 'Commissioned Rehabilitative Services' },
      { input: '', output: '' },
      { input: 'OTHER', output: '' },
    ]
    testValues.forEach(test => expect(presenter.mapInterventionTypeToFriendlyString(test.input)).toEqual(test.output))
  })
})

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
              text: 'Programme Name',
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
