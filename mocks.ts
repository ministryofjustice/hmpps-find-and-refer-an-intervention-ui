import Wiremock from './mockApis/wiremock'
import ReferAndMonitorAndDeliusMocks from './mockApis/referAndMonitorAndDelius'
import deliusUser from './testutils/factories/deliusUser'
import deliusUserAccess from './testutils/factories/deliusUserAccess'

const wiremock = new Wiremock('http://localhost:9092/__admin')
const referAndMonitorAndDeliusMocks = new ReferAndMonitorAndDeliusMocks(wiremock, '')

export default async function setUpMocks(): Promise<void> {
  await wiremock.resetStubs()

  await Promise.all([
    referAndMonitorAndDeliusMocks.stubGetCrnUserAccess(deliusUserAccess.build()),
    referAndMonitorAndDeliusMocks.stubGetUserByUsername('bernard.beaks', deliusUser.build()),
  ])
}
