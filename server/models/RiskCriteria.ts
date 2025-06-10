export default interface RiskCriteria {
  cnScoreGuide?: string
  extremismRiskGuide?: string
  saraPartnerScoreGuide?: string
  saraOtherScoreGuide?: string
  ospScoreGuide?: string
  ospDcIccCombinationGuide?: string
  ogrsScoreGuide?: string
  ovpGuide?: string
  ogpGuide?: string
  pnaGuide?: string
  rsrGuide?: string
  roshLevel?: RoshLevel
}

export enum RoshLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  VERY_HIGH = 'VERY HIGH',
}
