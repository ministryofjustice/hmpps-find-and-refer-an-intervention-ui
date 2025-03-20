import { Factory } from 'fishery'
import InterventionCatalogueItem, {
  DeliveryMethodSetting,
  InterventionType,
} from '../../server/models/InterventionCatalogueItem'

class InterventionCatalogueItemFactory extends Factory<InterventionCatalogueItem> {
  CRS() {
    return this.params({
      interventionType: 'CRS' as InterventionType,
    })
  }

  TOOLKIT() {
    return this.params({
      interventionType: 'TOOL' as InterventionType,
    })
  }

  missingFields() {
    return this.params({
      criminogenicNeeds: [],
      riskCriteria: [],
      timeToComplete: null,
    })
  }
}

export default InterventionCatalogueItemFactory.define(({ sequence }) => ({
  id: sequence.toString(),
  criminogenicNeeds: ['Thinking, Behaviours and Attitudes'],
  title: 'Horizon',
  description:
    'Horizon is for men convicted of a sexual or sexually-motivated offence who are medium risk or above. It helps address problematic factors and how they contribute to behaviour.',
  interventionType: 'ACP' as InterventionType,
  setting: ['CUSTODY' as DeliveryMethodSetting],
  allowsMales: true,
  allowsFemales: false,
  riskCriteria: ['Medium, high or very high', 'Yes'],
  attendanceType: ['In Person'],
  deliveryFormat: ['Group'],
  timeToComplete: 'At least 6 Months',
  suitableForPeopleWithLearningDifficulties: 'true',
  equivalentNonLdcProgramme: 'Kaizen',
}))
