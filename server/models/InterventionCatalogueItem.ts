import DeliveryMethodSetting from './DeliveryMethodSetting'

export type InterventionType = 'SI' | 'ACP' | 'CRS'

export default interface InterventionCatalogueItem {
  title: string
  description: string
  intType: InterventionType
  setting: DeliveryMethodSetting[]
  allowsMales: boolean
  allowsFemales: boolean
  minAge: number
  maxAge: number
  riskCriteria: string[]
  attendanceType: string[]
  deliveryMethod: DeliveryMethodSetting[]
}
