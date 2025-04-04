import { jwtDecode } from 'jwt-decode'
import type { RequestHandler } from 'express'

import logger from '../../logger'
import asyncMiddleware from './asyncMiddleware'

export default function authorisationMiddleware(
  authorisedRoles: string[] = [],
  allowedAuthSources: string[] = [],
): RequestHandler {
  return asyncMiddleware((req, res, next) => {
    // authorities in the user token will always be prefixed by ROLE_.
    // Convert roles that are passed into this function without the prefix so that we match correctly.
    const authorisedAuthorities = authorisedRoles.map(role => (role.startsWith('ROLE_') ? role : `ROLE_${role}`))
    if (res.locals?.user?.token) {
      const { authorities: roles = [], auth_source: authSource = '' } = jwtDecode(res.locals.user.token) as {
        authorities?: string[]
        auth_source: string
      }

      if (allowedAuthSources.length && !allowedAuthSources.includes(authSource.toLowerCase())) {
        logger.error(`User is not authorised to access this, invalid auth source, ${authSource}`)
        return res.redirect('/authError')
      }

      if (authorisedAuthorities.length && !roles.some(role => authorisedAuthorities.includes(role))) {
        logger.error(`User is not authorised to access this, invalid roles, ${roles}`)
        return res.redirect('/authError')
      }
      return next()
    }

    req.session.returnTo = req.originalUrl
    return res.redirect('/sign-in')
  })
}
