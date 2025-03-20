export default class InterventionsUtils {
  static formatGenderText(allowsMale: boolean, allowsFemale: boolean): string {
    if (allowsMale && allowsFemale) {
      return 'Male or Female'
    }
    if (allowsMale && !allowsFemale) {
      return 'Male'
    }
    return 'Female'
  }

  static mapInterventionTypeToFriendlyString(interventionType: string) {
    enum InterventionTypes {
      SI = 'Structured Interventions',
      ACP = 'Accredited Programmes',
      CRS = 'Commissioned Rehabilitative Services',
      TOOL = 'Toolkits',
    }
    return InterventionTypes[interventionType.toUpperCase()] !== undefined
      ? InterventionTypes[interventionType.toUpperCase()]
      : ''
  }
}
