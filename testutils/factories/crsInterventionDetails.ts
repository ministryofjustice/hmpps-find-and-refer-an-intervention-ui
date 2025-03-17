import { Factory } from 'fishery'
import CrsInterventionDetails from '../../server/models/CrsInterventionDetails'

export default Factory.define<CrsInterventionDetails>(({ sequence }) => ({
  title: 'Kick your Habit',
  interventionCatalogueId: 'ce0bf924-d5eb-498f-9376-8a01a07510f5',
  interventionId: sequence.toString(),
  interventionType: 'CRS',
  npsRegion: 'North East',
  pccRegions: ['Cleveland', 'Durham', 'Northumbria'],
  serviceCategories: [
    'Emotional Wellbeing',
    'Family and Significant Others',
    'Lifestyle and Associates',
    'Social Inclusion',
  ],
  provider: 'Home Trust',
  minAge: 18,
  maxAge: null,
  allowsMales: true,
  allowsFemales: true,
  description: 'Drug and alcohol rehab.',
}))
