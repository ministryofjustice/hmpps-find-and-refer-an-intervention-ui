import { Factory } from 'fishery'
import { InterventionType } from '../../server/models/InterventionCatalogueItem'
import InterventionDetails from '../../server/models/InterventionDetails'

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
          npsRegion: 'North East',
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
          npsRegion: 'East of England',
          pdus: [
            {
              id: '1',
              pduName: 'Cambridgeshire',
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

  SI() {
    return this.params({
      interventionType: 'SI' as InterventionType,
      criminogenicNeedsScore:
        'At least 1 of the following 3 OASys criteria needs to be satisfied:* score of 2 on item 11.3 - aggressive behaviour* answer of ‘yes’ to ‘Thinking and behaviour’ being related to risk of serious harm to self or others* answer of ‘yes’ to ‘Attitudes’ being related to risk of serious harm to self or others',
    })
  }

  TOOLKITS() {
    return this.params({
      interventionType: 'TOOLKITS' as InterventionType,
    })
  }
}

export default InterventionDetailsFactory.define(({ sequence }) => ({
  id: sequence.toString(),
  criminogenicNeeds: ['Thinking, Behaviours and Attitudes'],
  title: 'Horizon',
  description: [
    'Horizon is for men convicted of a sexual or sexually-motivated offence who are medium risk or above. ' +
      'It helps address problematic factors and how they contribute to behaviour.',
  ],
  interventionType: 'ACP' as InterventionType,
  setting: ['CUSTODY'],
  allowsMales: true,
  allowsFemales: false,
  riskCriteria: {
    saraOtherScoreGuide: 'Low risk on SARA',
    ogrsScoreGuide: 'If OVP not available, then OGRS3: score 25+',
    ovpGuide: 'OVP: score 20+',
  },
  attendanceType: 'In Person',
  deliveryFormat: 'Group',
  timeToComplete: 'At least 6 Months',
  suitableForPeopleWithLearningDifficulties: 'true',
  equivalentNonLdcProgramme: 'Kaizen',
  minAge: 18,
  maxAge: 30,
  sessionDetails: 'abc',
  communityLocations: null,
  custodyLocations: null,
  criminogenicNeedsScore: null,
  enablingInterventions: null,
  exclusion: null,
}))
