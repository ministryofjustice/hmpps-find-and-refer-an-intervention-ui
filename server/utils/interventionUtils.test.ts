import InterventionsUtils from './interventionUtils'

describe(`formatGenderText`, () => {
  it('returns the correct text', async () => {
    const testValues = [
      { male: true, female: true, output: 'Male or Female' },
      { male: true, female: false, output: 'Male' },
      { male: false, female: true, output: 'Female' },
    ]
    testValues.forEach(test => expect(InterventionsUtils.formatGenderText(test.male, test.female)).toEqual(test.output))
  })
})

describe(`mapInterventionTypeToFriendlyString`, () => {
  it('returns the correct mapping', async () => {
    const testValues = [
      { input: 'ACP', output: 'Accredited Programmes' },
      { input: 'SI', output: 'Structured Interventions' },
      { input: 'CRS', output: 'Commissioned Rehabilitative Services' },
      { input: 'TOOLKITS', output: 'Toolkits' },
      { input: '', output: '' },
      { input: 'OTHER', output: '' },
    ]
    testValues.forEach(test =>
      expect(InterventionsUtils.mapInterventionTypeToFriendlyString(test.input)).toEqual(test.output),
    )
  })
})
