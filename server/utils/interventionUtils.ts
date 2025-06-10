import RiskCriteria from '../models/RiskCriteria'

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
      TOOLKITS = 'Toolkits',
    }
    return InterventionTypes[interventionType.toUpperCase()] !== undefined
      ? InterventionTypes[interventionType.toUpperCase()]
      : ''
  }

  // The Criminogenic Needs Score (cnScoreGuide) has been excluded from this list as it should not be displayed alongside the risk criteria.
  static formatRiskCriteriaObject(riskCriteria: RiskCriteria) {
    return [
      riskCriteria.ovpGuide,
      riskCriteria.ogrsScoreGuide,
      riskCriteria.ogpGuide,
      riskCriteria.ospDcIccCombinationGuide,
      riskCriteria.ospScoreGuide,
      riskCriteria.extremismRiskGuide,
      riskCriteria.saraPartnerScoreGuide,
      riskCriteria.saraOtherScoreGuide,
      riskCriteria.pnaGuide,
      riskCriteria.rsrGuide,
      riskCriteria.roshLevel?.toString(),
    ].filter((item): item is string => item !== undefined)
  }
}
