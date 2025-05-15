import { Request } from 'express'
import { ValidationChain, body } from 'express-validator'
import FormUtils from '../../utils/formUtils'
import { FormData } from '../../utils/forms/formData'
import errorMessages from '../../utils/errorMessages'

export default class SearchByIdentifierForm {
  constructor(private readonly request: Request) {}

  async data(): Promise<FormData<Partial<{ crn: string }> | Partial<{ prisonerNumber: string }>>> {
    const validationResult = await FormUtils.runValidations({
      request: this.request,
      validations: SearchByIdentifierForm.validations,
    })

    const error = FormUtils.validationErrorFromResult(validationResult)
    if (error) {
      return {
        paramsForUpdate: null,
        error,
      }
    }
    let searchValue: Partial<{ crn: string }> | Partial<{ prisonerNumber: string }> = {
      crn: this.request.body['search-by-crn'],
    }
    if (/^[A-Z]\d{4}[A-Z]{2}$/.test(this.request.body['search-by-crn'])) {
      searchValue = { prisonerNumber: this.request.body['search-by-crn'] }
    }

    return {
      paramsForUpdate: searchValue,
      error: null,
    }
  }

  static get validations(): ValidationChain[] {
    return [
      body('search-by-crn').notEmpty().withMessage(errorMessages.enterCrn.empty),
      body('search-by-crn')
        .matches(/^[A-Z]\d{6}$|^[A-Z]\d{4}[A-Z]{2}$/)
        .withMessage(errorMessages.enterCrn.wrongFormat),
    ]
  }
}
