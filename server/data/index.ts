/* eslint-disable import/first */
/*
 * Do appinsights first as it does some magic instrumentation work, i.e. it affects other 'require's
 * In particular, applicationinsights automatically collects bunyan logs
 */
import applicationInfoSupplier from '../applicationInfo'
import { buildAppInsightsClient, initialiseAppInsights } from '../utils/azureAppInsights'

const applicationInfo = applicationInfoSupplier()
initialiseAppInsights()
buildAppInsightsClient(applicationInfo)

import config from '../config'
import HmppsAuditClient from './hmppsAuditClient'
import HmppsAuthClient from './hmppsAuthClient'
import { createRedisClient } from './redisClient'
import InMemoryTokenStore from './tokenStore/inMemoryTokenStore'
import RedisTokenStore from './tokenStore/redisTokenStore'

type RestClientBuilder<T> = (token: Express.User['token']) => T
type RestClientBuilderWithoutToken<T> = () => T

// This should be changed to a redis client when redis is implemented properly
const tokenStore = new InMemoryTokenStore()

const hmppsAuthClientBuilder: RestClientBuilderWithoutToken<HmppsAuthClient> = () => new HmppsAuthClient(tokenStore)

export const dataAccess = () => ({
  applicationInfo,
  hmppsAuthClient: new HmppsAuthClient(
    config.redis.enabled ? new RedisTokenStore(createRedisClient()) : new InMemoryTokenStore(),
  ),
  hmppsAuditClient: new HmppsAuditClient(config.sqs.audit),
})

export type DataAccess = ReturnType<typeof dataAccess>

export { HmppsAuditClient, HmppsAuthClient, hmppsAuthClientBuilder, RestClientBuilder, RestClientBuilderWithoutToken }
