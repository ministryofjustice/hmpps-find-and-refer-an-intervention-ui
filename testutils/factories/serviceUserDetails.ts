import { Factory } from 'fishery'
import ServiceUserDetails from '../../server/models/serviceUserDetails'

export default Factory.define<ServiceUserDetails>(() => ({
  name: 'Bob',
  crn: 'X123456',
  dob: '1990-05-20',
  gender: 'Male',
  ethnicity: 'British',
  currentPdu: 'East Sussex',
  setting: 'Custody',
}))
