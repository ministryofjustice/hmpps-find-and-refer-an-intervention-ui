import { Request } from 'express'
import { CatalogueFilterParams } from '../../services/findAndReferService'
import { DeliveryMethodSetting } from '../../models/InterventionCatalogueItem'

export default class CatalogueFilter {
  interventionType: string[] | undefined

  gender: ('Male' | 'Female')[] | undefined

  setting: DeliveryMethodSetting

  static fromRequest(request: Request): CatalogueFilter {
    const filter = new CatalogueFilter()

    filter.gender = request.body['gender-checkbox'] as ('Male' | 'Female')[] | undefined
    filter.interventionType = request.body['type-checkbox'] as string[] | undefined
    filter.setting = request.body['setting-radio'] as ('COMMUNITY' | 'CUSTODY') | undefined

    return filter
  }

  get params(): CatalogueFilterParams {
    const params: CatalogueFilterParams = {}

    if (this.interventionType !== undefined) {
      params.interventionType = this.interventionType
    }

    if (this.setting !== undefined) {
      params.setting = this.setting
    }

    if (this.gender !== undefined) {
      if (this.gender.includes('Male')) {
        params.allowsMales = true
      }

      if (this.gender.includes('Female')) {
        params.allowsFemales = true
      }
    }

    return params
  }
}
