import { InterventionType } from './InterventionCatalogueItem'

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
  pccRegion: string
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
  riskCriteria?: string[]
  suitableForPeopleWithLearningDifficulties?: string
  equivalentNonLdcProgramme?: string
  timeToComplete?: string
  deliveryFormat: string[]
  attendanceType: string[]
  description: string
  sessionDetails?: string
  communityLocations?: CommunityLocation[]
  custodyLocations?: CustodyLocation[]
  expectedOutcomes?: string[]
}
