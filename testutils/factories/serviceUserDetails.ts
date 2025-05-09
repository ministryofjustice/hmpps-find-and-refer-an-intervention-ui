import { Factory } from 'fishery'
import ServiceUserDetails from '../../server/models/serviceUserDetails'

export default Factory.define<ServiceUserDetails>(() => ({
  name: 'Bob',
  crn: 'X123456',
  dob: '20-05-1990',
  gender: 'Male',
  ethnicity: 'British',
  currentPdu: 'East Sussex',
}))
