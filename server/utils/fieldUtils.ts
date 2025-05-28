export type AvailableCatalogueFields = {
  gender: boolean
  type: boolean
  riskCriteria: boolean
  criminogenicNeeds: boolean
  ageGroup: boolean
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
    ageGroup: false,
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
    ageGroup: false,
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
    ageGroup: false,
    timeToComplete: false,
    deliveryFormat: true,
    attendanceType: true,
    suitableForPeopleWithLearningDifficulties: false,
    equivalentNonLdcProgramme: false,
  } as AvailableCatalogueFields,
  CRS_custody: {
    gender: true,
    type: true,
    riskCriteria: false,
    criminogenicNeeds: true,
    ageGroup: false,
    timeToComplete: false,
    deliveryFormat: true,
    attendanceType: true,
    suitableForPeopleWithLearningDifficulties: false,
    equivalentNonLdcProgramme: false,
  } as AvailableCatalogueFields,
  SI_community: {
    gender: true,
    type: true,
    riskCriteria: true,
    criminogenicNeeds: true,
    ageGroup: true,
    timeToComplete: true,
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
    ageGroup: true,
    timeToComplete: true,
    deliveryFormat: true,
    attendanceType: true,
    suitableForPeopleWithLearningDifficulties: false,
    equivalentNonLdcProgramme: false,
  } as AvailableCatalogueFields,
  TOOLKITS_custody: {
    gender: true,
    type: true,
    riskCriteria: true,
    criminogenicNeeds: true,
    ageGroup: true,
    timeToComplete: true,
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
  expectedOutcomes: boolean
  ageGroup: boolean
  criminogenicNeedsScore: boolean
  enablingInterventions: boolean
  programmeSuitability: boolean
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
    ageGroup: false,
    criminogenicNeedsScore: false,
    enablingInterventions: false,
    programmeSuitability: false,
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
    ageGroup: false,
    criminogenicNeedsScore: false,
    enablingInterventions: false,
    programmeSuitability: false,
  } as AvailableInterventionDetailsFields,
  CRS_community: {
    gender: true,
    type: true,
    riskCriteria: false,
    criminogenicNeeds: true,
    timeToComplete: false,
    deliveryFormat: true,
    attendanceType: true,
    suitableForPeopleWithLearningDifficulties: false,
    equivalentNonLdcProgramme: false,
    expectedOutcomes: true,
    ageGroup: false,
    criminogenicNeedsScore: false,
    enablingInterventions: false,
    programmeSuitability: false,
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
    expectedOutcomes: true,
    ageGroup: false,
    criminogenicNeedsScore: false,
    enablingInterventions: false,
    programmeSuitability: false,
  } as AvailableInterventionDetailsFields,
  SI_community: {
    gender: true,
    type: true,
    riskCriteria: true,
    criminogenicNeeds: true,
    timeToComplete: false,
    deliveryFormat: true,
    attendanceType: true,
    suitableForPeopleWithLearningDifficulties: false,
    equivalentNonLdcProgramme: false,
    ageGroup: true,
    criminogenicNeedsScore: true,
    enablingInterventions: true,
    programmeSuitability: true,
  } as AvailableInterventionDetailsFields,
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
    ageGroup: false,
    criminogenicNeedsScore: false,
    enablingInterventions: false,
    programmeSuitability: false,
  } as AvailableInterventionDetailsFields,
  TOOLKITS_custody: {
    gender: true,
    type: true,
    riskCriteria: true,
    criminogenicNeeds: true,
    timeToComplete: false,
    deliveryFormat: true,
    attendanceType: true,
    suitableForPeopleWithLearningDifficulties: false,
    equivalentNonLdcProgramme: false,
    ageGroup: false,
    criminogenicNeedsScore: false,
    enablingInterventions: false,
    programmeSuitability: false,
  } as AvailableInterventionDetailsFields,
}
