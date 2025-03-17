import { InterventionType } from './InterventionCatalogueItem'

export default interface CrsInterventionDetails {
  interventionCatalogueId: string
  interventionId: string
  title: string
  interventionType: InterventionType
  npsRegion: string
  pccRegions: string[]
  serviceCategories: string[]
  provider: string
  minAge?: number
  maxAge?: number
  allowsMales: boolean
  allowsFemales: boolean
  description: string
}
