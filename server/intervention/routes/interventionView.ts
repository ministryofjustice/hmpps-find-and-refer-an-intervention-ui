import InterventionPresenter from './interventionPresenter'
import { SummaryListItem } from '../../utils/summaryList'
import { SummaryListArgs } from '../../utils/govukFrontendTypes'
import ViewUtils from '../../utils/viewUtils'

export default class InterventionView {
  constructor(private readonly presenter: InterventionPresenter) {}

  static summary(items: SummaryListItem[]): SummaryListArgs {
    return {
      ...ViewUtils.summaryListArgs(items),
    }
  }

  get renderArgs(): [string, Record<string, unknown>] {
    return [
      'intervention/intervention',
      {
        presenter: this.presenter,
        summaryListArgs: InterventionView.summary,
      },
    ]
  }
}
