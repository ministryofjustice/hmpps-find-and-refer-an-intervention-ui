import { dataAccess } from '../data'
import AuditService from './auditService'
import FindAndReferService from './findAndReferService'

export const services = () => {
  const { applicationInfo, hmppsAuditClient } = dataAccess()

  const auditService = new AuditService(hmppsAuditClient)
  const findAndReferService = new FindAndReferService()
  return {
    applicationInfo,
    auditService,
    findAndReferService,
  }
}

export type Services = ReturnType<typeof services>
