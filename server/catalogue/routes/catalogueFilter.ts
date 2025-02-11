import { Request } from 'express'
import { CatalogueFilterParams } from '../../services/findAndReferService'

export default class CatalogueFilter {
  interventionType: string[] | undefined

  // gender: ('male' | 'female')[] | undefined

  // setting: 'community' | 'custody'

  static fromRequest(request: Request): CatalogueFilter {
    const filter = new CatalogueFilter()

    // filter.gender = request.body.gender as ('male' | 'female')[] | undefined
    filter.interventionType = request.body['type-checkbox'] as string[] | undefined

    return filter
  }

  get params(): CatalogueFilterParams {
    const params: CatalogueFilterParams = {}

    if (this.interventionType !== undefined) {
      params.interventionType = this.interventionType
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
