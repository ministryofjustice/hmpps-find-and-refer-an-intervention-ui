import RiskCriteria from './RiskCriteria'

export type InterventionType = 'SI' | 'ACP' | 'CRS' | 'TOOLKITS'
export type DeliveryMethodSetting = 'COMMUNITY' | 'CUSTODY'

export default interface InterventionCatalogueItem {
  id: string
  title: string
  description: string[]
  interventionType: InterventionType
  setting: DeliveryMethodSetting[]
  allowsMales: boolean
  allowsFemales: boolean
  riskCriteria?: RiskCriteria
  attendanceType: string
  deliveryFormat: string
  criminogenicNeeds: string[]
  timeToComplete: string
  suitableForPeopleWithLearningDifficulties: string
  equivalentNonLdcProgramme: string
  minAge: number
  maxAge: number
}
