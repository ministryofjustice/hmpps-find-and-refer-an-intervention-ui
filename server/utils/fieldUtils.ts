export type AvailableCatalogueFields = {
  gender: boolean
  type: boolean
  riskCriteria: boolean
  criminogenicNeeds: boolean
  timeToComplete: boolean
  deliveryFormat: boolean
  attendanceType: boolean
  suitableForPeopleWithLearningDifficulties: boolean
  equivalentNonLdcProgramme: boolean
}
export const CatalogueFields = {
  ACP_community: {
    gender: true,
    type: true,
    riskCriteria: true,
    criminogenicNeeds: true,
    timeToComplete: true,
    deliveryFormat: true,
    attendanceType: true,
    suitableForPeopleWithLearningDifficulties: false,
    equivalentNonLdcProgramme: false,
  } as AvailableCatalogueFields,
  ACP_custody: {
    gender: true,
    type: true,
    riskCriteria: true,
    criminogenicNeeds: false,
    timeToComplete: true,
    deliveryFormat: true,
    attendanceType: false,
    suitableForPeopleWithLearningDifficulties: true,
    equivalentNonLdcProgramme: true,
  } as AvailableCatalogueFields,
  CRS_community: {
    gender: true,
    type: true,
    riskCriteria: false,
    criminogenicNeeds: true,
    timeToComplete: false,
    deliveryFormat: false,
    attendanceType: true,
    suitableForPeopleWithLearningDifficulties: false,
    equivalentNonLdcProgramme: false,
  } as AvailableCatalogueFields,
  CRS_custody: {
    gender: true,
    type: true,
    riskCriteria: false,
    criminogenicNeeds: true,
    timeToComplete: false,
    deliveryFormat: true,
    attendanceType: true,
    suitableForPeopleWithLearningDifficulties: false,
    equivalentNonLdcProgramme: false,
  } as AvailableCatalogueFields,
  SI_community: {
    gender: true,
    type: true,
    riskCriteria: false,
    criminogenicNeeds: true,
    timeToComplete: false,
    deliveryFormat: true,
    attendanceType: true,
    suitableForPeopleWithLearningDifficulties: false,
    equivalentNonLdcProgramme: false,
  } as AvailableCatalogueFields,
  TOOLKITS_community: {
    gender: true,
    type: true,
    riskCriteria: true,
    criminogenicNeeds: true,
    timeToComplete: false,
    deliveryFormat: true,
    attendanceType: true,
    suitableForPeopleWithLearningDifficulties: false,
    equivalentNonLdcProgramme: false,
  } as AvailableCatalogueFields,
}

export type AvailableInterventionDetailsFields = {
  gender: boolean
  type: boolean
  riskCriteria: boolean
  criminogenicNeeds: boolean
  timeToComplete: boolean
  deliveryFormat: boolean
  attendanceType: boolean
  suitableForPeopleWithLearningDifficulties: boolean
  equivalentNonLdcProgramme: boolean
}

export const InterventionDetailsFields = {
  ACP_community: {
    gender: true,
    type: true,
    riskCriteria: true,
    criminogenicNeeds: false,
    timeToComplete: true,
    deliveryFormat: true,
    attendanceType: true,
    suitableForPeopleWithLearningDifficulties: false,
    equivalentNonLdcProgramme: false,
  } as AvailableInterventionDetailsFields,
  ACP_custody: {
    gender: true,
    type: true,
    riskCriteria: true,
    criminogenicNeeds: false,
    timeToComplete: true,
    deliveryFormat: true,
    attendanceType: false,
    suitableForPeopleWithLearningDifficulties: true,
    equivalentNonLdcProgramme: true,
  } as AvailableInterventionDetailsFields,
  CRS_community: {
    gender: true,
    type: true,
    riskCriteria: false,
    criminogenicNeeds: true,
    timeToComplete: false,
    deliveryFormat: false,
    attendanceType: true,
    suitableForPeopleWithLearningDifficulties: false,
    equivalentNonLdcProgramme: false,
  } as AvailableInterventionDetailsFields,
  CRS_custody: {
    gender: true,
    type: true,
    riskCriteria: false,
    criminogenicNeeds: true,
    timeToComplete: false,
    deliveryFormat: true,
    attendanceType: true,
    suitableForPeopleWithLearningDifficulties: false,
    equivalentNonLdcProgramme: false,
  } as AvailableInterventionDetailsFields,
  SI_community: {
    gender: true,
    type: true,
    riskCriteria: false,
    criminogenicNeeds: true,
    timeToComplete: false,
    deliveryFormat: true,
    attendanceType: true,
    suitableForPeopleWithLearningDifficulties: false,
    equivalentNonLdcProgramme: false,
  } as AvailableInterventionDetailsFields,
}
