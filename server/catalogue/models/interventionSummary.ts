export default interface InterventionSummary {
  title: string
  description: string
  interventionType: string // Commissioned Rehabilitative Service
  setting: string // Custody or community
  gender: string // Male or female
  ageRestriction: string // xx-xx years old
  riskCriteria: string
  suitableForPeopleWithLearningDisabilitiesOrChallenges: string // Yes/No
  learningDisabilityCateredIntendedFor: string
  equivalentNonLDCProgramme: string
  attendanceType: string // one-to-one
  deliveryMethod: string // In person, online
}
