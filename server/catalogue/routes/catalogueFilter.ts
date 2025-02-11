import { Request } from 'express'
import { CatalogueFilterParams } from '../../services/findAndReferService'
import { DeliveryMethodSetting } from '../../models/InterventionCatalogueItem'

export default class CatalogueFilter {
  interventionType: string[] | undefined

  // gender: ('male' | 'female')[] | undefined

  setting: DeliveryMethodSetting

  static fromRequest(request: Request): CatalogueFilter {
    const filter = new CatalogueFilter()
    console.log('------------------------')
    console.log(request)
    console.log('------------------------')

    // filter.gender = request.body.gender as ('male' | 'female')[] | undefined
    filter.interventionType = request.body['type-checkbox'] as string[] | undefined
    filter.setting = request.body['setting-checkbox'] as ('COMMUNITY' | 'CUSTODY') | undefined

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

    // if (this.gender !== undefined) {
    //   if (this.gender.includes('male')) {
    //     params.allowsMale = true
    //   }
    //
    //   if (this.gender.includes('female')) {
    //     params.allowsFemale = true
    //   }
    // }

    return params
  }
}
