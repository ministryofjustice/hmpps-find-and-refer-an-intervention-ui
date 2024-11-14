import Wiremock from './mockApis/wiremock'

const wiremock = new Wiremock('http://localhost:9092/__admin')

export default async function setUpMocks(): Promise<void> {
  await wiremock.resetStubs()

  await Promise.all([])
}
