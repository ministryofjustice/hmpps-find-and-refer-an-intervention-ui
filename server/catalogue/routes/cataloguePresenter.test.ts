import CataloguePresenter from './cataloguePresenter'

describe(`mapInterventionTypeToFriendlyString`, () => {
  it('returns the correct mapping', async () => {
    const presenter = new CataloguePresenter({
      content: [],
      totalElements: 9,
      totalPages: 2,
      size: 5,
      number: 0,
      numberOfElements: 5,
    })
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
