import CataloguePresenter from './cataloguePresenter'
import CatalogueFilter from './catalogueFilter'

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
      filter.interventionType = ['ACP', 'CRS', 'SI', 'TOOL', 'ROIF', 'CFO']

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
          value: 'TOOL',
          text: 'Toolkits',
          checked: false,
        },
      ]

      expect(presenter.typeOptions).toMatchObject(expectedResult)
    })
  })
})
