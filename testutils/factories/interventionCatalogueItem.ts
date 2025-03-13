import { Factory } from 'fishery'
import InterventionCatalogueItem from '../../server/models/InterventionCatalogueItem'

export default Factory.define<InterventionCatalogueItem>(({ sequence }) => ({
  id: sequence.toString(),
  criminogenicNeeds: ['Thinking, Behaviours and Attitudes'],
  title: 'Horizon',
  description:
    'Horizon is for men convicted of a sexual or sexually-motivated offence who are medium risk or above. It helps address problematic factors and how they contribute to behaviour.',
  interventionType: 'ACP',
  setting: ['CUSTODY'],
  allowsMales: true,
  allowsFemales: false,
  riskCriteria: ['Medium, high or very high', 'Yes'],
  attendanceType: ['In Person'],
  deliveryFormat: ['Group'],
  timeToComplete: 'At least 6 Months',
  suitableForPeopleWithLearningDifficulties: 'true',
  equivalentNonLdcProgramme: 'Kaizen',
}))
