/* eslint-disable no-param-reassign */
import express from 'express'
import fs from 'fs'
import nunjucks from 'nunjucks'
import path from 'path'
import logger from '../../logger'
import config from '../config'
import { initialiseName } from './utils'

export default function nunjucksSetup(app: express.Express): void {
  app.set('view engine', 'njk')

  app.locals.asset_path = '/assets/'
  app.locals.applicationName = 'HMPPS Find and refer an intervention'
  app.locals.environmentName = config.environmentName
  app.locals.environmentNameColour = config.environmentName === 'PRE-PRODUCTION' ? 'govuk-tag--green' : ''
  app.locals.applicationInsightsConnectionString = config.applicationInsights.connectionString || ''
  app.locals.appInsightsApplicationName = config.applicationInsights.cloudRoleName
  let assetManifest: Record<string, string> = {}

  try {
    const assetMetadataPath = path.resolve(__dirname, '../../assets/manifest.json')
    assetManifest = JSON.parse(fs.readFileSync(assetMetadataPath, 'utf8'))
  } catch (e) {
    if (process.env.NODE_ENV !== 'test') {
      logger.error(e, 'Could not read asset manifest file')
    }
  }

  const njkEnv = nunjucks.configure(
    [
      path.join(__dirname, '../../server/views'),
      'node_modules/govuk-frontend/dist/',
      'node_modules/@ministryofjustice/frontend/',
    ],
    {
      autoescape: true,
      express: app,
    },
  )

  njkEnv.addFilter('initialiseName', initialiseName)
  njkEnv.addFilter('assetMap', (url: string) => assetManifest[url] || url)
  njkEnv.addFilter('json', (value, spaces) => {
    if (value instanceof nunjucks.runtime.SafeString) {
      value = value.toString()
    }
    return JSON.stringify(value, null, spaces).replace(/</g, '\\u003c')
  })
}
