import { jwtDecode } from 'jwt-decode'
import express from 'express'
import { convertToTitleCase } from '../utils/utils'
import logger from '../../logger'
import { AuthSource } from '../interfaces/hmppsUser'

export default function setUpCurrentUser() {
  const router = express.Router()

  router.use((req, res, next) => {
    try {
      const {
        name,
        user_id: userId,
        authorities: roles = [],
        auth_source: authSource,
      } = jwtDecode(res.locals.user.token) as {
        name?: string
        user_id?: string
        authorities?: string[]
        auth_source?: AuthSource
      }

      res.locals.user = {
        staffId: 0,
        ...res.locals.user,
        userId,
        name,
        displayName: convertToTitleCase(name),
        userRoles: roles.map(role => role.substring(role.indexOf('_') + 1)),
        authSource,
        isPrisonUser: authSource.toLowerCase() === 'nomis',
        isCommunityUser: authSource.toLowerCase() === 'delius',
      }

      if (res.locals.user.authSource === 'nomis') {
        res.locals.user.staffId = parseInt(userId, 10) || undefined
      }

      next()
    } catch (error) {
      logger.error(error, `Failed to populate user details for: ${res.locals.user && res.locals.user.username}`)
      next(error)
    }
  })

  return router
}
