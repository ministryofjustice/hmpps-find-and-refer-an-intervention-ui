export default interface InterventionSummary {
  title: string
  description: string
  interventionType: string // Commissioned Rehabilitative Service
  setting: string[] // Custody or community
  allowsMales: boolean // Male or female
  allowsFemales: boolean // Male or female
  riskCriteria: string[]
  attendanceType: string[] // one-to-one
  deliveryFormat: string[] // In person, online
  criminogenicNeeds: string[]
  timeToComplete: string
  suitableForPeopleWithLearningDifficulties: boolean
  equivalentNonLdcProgramme: string
}
