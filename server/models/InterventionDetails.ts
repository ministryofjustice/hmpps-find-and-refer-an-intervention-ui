import { InterventionType } from './InterventionCatalogueItem'
import RiskCriteria from './RiskCriteria'

export interface PDU {
  id: string
  pduName: string
}

export interface CustodyLocation {
  prisonName: string
  category: string
  county: string
}

export interface CommunityLocation {
  npsRegion: string
  pdus: PDU[]
}

export default interface InterventionDetails {
  id: string
  allowsMales: boolean
  allowsFemales: boolean
  criminogenicNeeds: string[]
  interventionType: InterventionType
  title: string
  minAge?: number
  maxAge?: number
  riskCriteria?: RiskCriteria
  suitableForPeopleWithLearningDifficulties?: string
  equivalentNonLdcProgramme?: string
  timeToComplete?: string
  deliveryFormat: string
  attendanceType: string
  description: string[]
  sessionDetails?: string
  communityLocations?: CommunityLocation[]
  custodyLocations?: CustodyLocation[]
  expectedOutcomes?: string[]
}
