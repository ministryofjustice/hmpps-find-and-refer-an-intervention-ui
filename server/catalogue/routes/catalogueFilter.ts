import { Request } from 'express'
import { CatalogueFilterParams } from '../../services/findAndReferService'

export default class CatalogueFilter {
  interventionType: string[] | undefined

  gender: ('Male' | 'Female')[] | undefined

  searchByProgrammeName: string

  static fromRequest(request: Request): CatalogueFilter {
    const filter = new CatalogueFilter()
    filter.gender = request.query['gender-checkbox'] as ('Male' | 'Female')[] | undefined
    filter.interventionType = request.query['type-checkbox'] as string[] | undefined
    filter.searchByProgrammeName = request.query['search-by-programme-name-input'] as string

    return filter
  }

  get params(): CatalogueFilterParams {
    const params: CatalogueFilterParams = {}

    if (this.interventionType !== undefined) {
      params.interventionType = this.interventionType
    }

    if (this.gender !== undefined) {
      if (this.gender.includes('Male')) {
        params.allowsMales = true
      }

      if (this.gender.includes('Female')) {
        params.allowsFemales = true
      }
    }

    if (this.searchByProgrammeName !== undefined) {
      params.searchByProgrammeName = this.searchByProgrammeName
    }

    return params
  }
}
