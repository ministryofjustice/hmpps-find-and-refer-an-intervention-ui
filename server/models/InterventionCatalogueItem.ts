export type InterventionType = 'SI' | 'ACP' | 'CRS'
export type DeliveryMethodSetting = 'COMMUNITY' | 'CUSTODY'

export default interface InterventionCatalogueItem {
  id: string
  title: string
  description: string
  interventionType: InterventionType
  setting: DeliveryMethodSetting[]
  allowsMales: boolean
  allowsFemales: boolean
  minAge: number
  maxAge: number
  riskCriteria: string[]
  attendanceType: string[]
  deliveryFormat: string[]
}
