import fs from 'fs'
import path from 'path'
import config from './config'

const { buildNumber, gitRef, productId, branchName } = config

export type ApplicationInfo = {
  applicationName: string
  buildNumber: string
  gitRef: string
  gitShortHash: string
  productId?: string
  branchName: string
}

export default (): ApplicationInfo => {
  const packageJson =
    process.env.NODE_ENV !== 'test'
      ? path.join(__dirname, '../../package.json')
      : path.join(__dirname, '../package.json')
  const { name: applicationName } = JSON.parse(fs.readFileSync(packageJson).toString())
  return { applicationName, buildNumber, gitRef, gitShortHash: gitRef.substring(0, 7), productId, branchName }
}
