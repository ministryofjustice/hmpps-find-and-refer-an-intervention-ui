import type { Request, Response, NextFunction } from 'express'
import type { HTTPError } from 'superagent'
import logger from '../logger'

export default function createErrorHandler(production: boolean) {
  return (error: HTTPError, req: Request, res: Response, next: NextFunction): void => {
    logger.error(`Error handling request for '${req.originalUrl}', user '${res.locals.user?.username}'`, error)

    if (error.status === 401 || error.status === 403) {
      logger.info('Logging user out')
      return res.redirect('/sign-out')
    }

    res.locals.message = production ? null : error.message
    res.locals.status = error.status
    res.locals.stack = production ? null : error.stack

    res.status(error.status || 500)

    if (error.status === 404) {
      logger.info('Page not found')
      return res.render('pages/not-found-error')
    }

    if (error.status === 503) {
      logger.info('Service is unavailable')
      return res.render('pages/service-unavailable-error')
    }

    return res.render('pages/error')
  }
}
