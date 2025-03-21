import jwt from 'jsonwebtoken'
import { Factory } from 'fishery'

interface TokenParams {
  authSource: string
  userID: string
  username: string
  roles: string[]
  clientID: string
}

class Oauth2TokenFactory extends Factory<string, TokenParams> {
  probationPractitionerToken() {
    return this.transient({
      authSource: 'delius',
      userID: '2500128586',
      username: 'joe.smith',
      roles: ['ROLE_PROBATION'],
    })
  }
}

export default Oauth2TokenFactory.define(({ transientParams }) => {
  const { authSource, userID, username, roles, clientID = 'interventions' } = transientParams
  const payload = {
    user_id: userID,
    auth_source: authSource,
    user_name: username,
    authorities: roles,
    client_id: clientID,
    exp: 3758875200, // warning - tests may start to fail in 2089...
  }
  return jwt.sign(payload, 'secret')
})
