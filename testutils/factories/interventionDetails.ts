import { Factory } from 'fishery'
import InterventionDetails from '../../server/models/InterventionDetails'
import { InterventionType } from '../../server/models/InterventionCatalogueItem'

class InterventionDetailsFactory extends Factory<InterventionDetails> {
  custody() {
    return this.params({
      custodyLocations: [
        {
          prisonName: 'London',
          category: 'A',
          county: 'London',
        },
        {
          prisonName: 'Manchester',
          category: 'M',
          county: 'Manchester',
        },
      ],
    })
  }

  community() {
    return this.params({
      communityLocations: [
        {
          pccRegion: 'Cleveland',
          pdus: [
            {
              id: '1',
              pduName: 'Redcar, Cleveland and Middlesbrough',
            },
            {
              id: '2',
              pduName: 'Stockton and Hartlepool',
            },
          ],
        },
        {
          pccRegion: 'Durham',
          pdus: [
            {
              id: '1',
              pduName: 'County Durham and Darlington',
            },
          ],
        },
      ],
    })
  }

  CRS() {
    return this.params({
      interventionType: 'CRS' as InterventionType,
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
