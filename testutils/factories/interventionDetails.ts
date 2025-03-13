import { Factory } from 'fishery'
import InterventionDetails from '../../server/models/InterventionDetails'
import { InterventionType } from '../../server/models/InterventionCatalogueItem'

class InterventionDetailsFactory extends Factory<InterventionDetails> {
  custody() {
    return this.params({
      custodyLocations: [
        {
          name: 'London',
          category: 'A',
          county: 'London',
        },
        {
          name: 'Manchester',
          category: 'M',
          county: 'Manchester',
        },
      ],
    })
  }

  community() {
    return this.params({
      custodyLocations: [
        {
          name: 'London',
          category: 'A',
          county: 'London',
        },
        {
          name: 'Manchester',
          category: 'M',
          county: 'Manchester',
        },
      ],
    })
  }
}

export default InterventionDetailsFactory.define(({ sequence }) => ({
  id: sequence.toString(),
  criminogenicNeeds: ['Thinking, Behaviours and Attitudes'],
  title: 'Horizon',
  description:
    'Horizon is for men convicted of a sexual or sexually-motivated offence who are medium risk or above. It helps address problematic factors and how they contribute to behaviour.',
  interventionType: 'ACP' as InterventionType,
  setting: ['CUSTODY'],
  allowsMales: true,
  allowsFemales: false,
  riskCriteria: ['Medium, high or very high', 'Yes'],
  attendanceType: ['In Person'],
  deliveryFormat: ['Group'],
  timeToComplete: 'At least 6 Months',
  suitableForPeopleWithLearningDifficulties: 'true',
  equivalentNonLdcProgramme: 'Kaizen',
  minAge: 18,
  maxAge: 30,
  sessionDetails: 'abc',
  communityLocations: null,
  custodyLocations: null,
}))
