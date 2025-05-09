import PresenterUtils from '../../utils/presenterUtils'
import { FormValidationError } from '../../utils/formValidationError'

export default class SearchPresenter {
  constructor(
    readonly backlinkUri: string | null,
    private readonly error: FormValidationError | null = null,
    private readonly userInputData: Record<string, string[]> | null = null,
  ) {}

  readonly errorSummary = PresenterUtils.errorSummary(this.error)

  private readonly utils = new PresenterUtils(this.userInputData)

  readonly text = {
    pageHeading: 'Enter a CRN or prison number',
    searchDescription: `This will retrieve the person's details to help you find suitable interventions.`,
  }

  readonly fields = {
    searchByCrn: {
      value: this.utils.stringValue(null, 'search-by-crn'),
      errorMessage: PresenterUtils.errorMessage(this.error, 'search-by-crn'),
    },
  }
}
