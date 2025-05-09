import { Request } from 'express'
import { ValidationChain, body } from 'express-validator'
import FormUtils from '../../utils/formUtils'
import { FormData } from '../../utils/forms/formData'
import errorMessages from '../../utils/errorMessages'

export default class SearchByCrnForm {
  constructor(private readonly request: Request) {}

  async data(): Promise<FormData<Partial<{ crn: string }>>> {
    const validationResult = await FormUtils.runValidations({
      request: this.request,
      validations: SearchByCrnForm.validations,
    })

    const error = FormUtils.validationErrorFromResult(validationResult)
    if (error) {
      return {
        paramsForUpdate: null,
        error,
      }
    }

    return {
      paramsForUpdate: {
        crn: this.request.body['search-by-crn'],
      },
      error: null,
    }
  }

  static get validations(): ValidationChain[] {
    return [
      body('search-by-crn').notEmpty().withMessage(errorMessages.enterCrn.empty),
      body('search-by-crn')
        .matches(/^[A-Z]\d{6}$/)
        .withMessage(errorMessages.enterCrn.wrongFormat),
    ]
  }
}
