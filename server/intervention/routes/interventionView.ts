import InterventionPresenter from './interventionPresenter'
import { SummaryListItem } from '../../utils/summaryList'
import { SummaryListArgs, TableArgs } from '../../utils/govukFrontendTypes'
import ViewUtils from '../../utils/viewUtils'

export default class InterventionView {
  constructor(private readonly presenter: InterventionPresenter) {}

  static summary(items: SummaryListItem[]): SummaryListArgs {
    return {
      ...ViewUtils.summaryListArgs(items),
    }
  }

  private getLocationsInCustodyTableArgs(): TableArgs {
    return {
      attributes: {
        'data-module': 'moj-sortable-table',
      },
      head: [
        {
          text: 'Location',
          attributes: {
            'aria-sort': 'ascending',
          },
        },
        {
          text: 'Category',
          attributes: {
            'aria-sort': 'none',
          },
        },
        {
          text: 'County',
          attributes: {
            'aria-sort': 'none',
          },
        },
      ],
      rows: [
        [
          {
            html: "<a href='#'>Aylesbury (HMP)</a>",
          },
          {
            text: 'Category C',
          },
          {
            text: 'Buckinghamshire',
          },
        ],
        [
          {
            html: "<a href='#'>Brinsford (HMP)</a>",
          },
          {
            text: 'Category B/C',
          },
          {
            text: 'Wolverhampton',
          },
        ],
        [
          {
            html: "<a href='#'>Erlestoke (HMP)</a>",
          },
          {
            text: 'Category C',
          },
          {
            text: 'Wiltshire',
          },
        ],
        [
          {
            html: "<a href='#'>Frankland (HMP)</a>",
          },
          {
            text: 'Category A/B',
          },
          {
            text: 'Durham',
          },
        ],
        [
          {
            html: "<a href='#'>Stoke Heath (HMP)</a>",
          },
          {
            text: 'Category C',
          },
          {
            text: 'Shropshire',
          },
        ],
        [
          {
            html: "<a href='#'>Swinton Hall (HMP)</a>",
          },
          {
            text: 'Category C',
          },
          {
            text: 'Staffordshire',
          },
        ],
      ],
    }
  }

  private readonly backLinkArgs = {
    text: 'Back',
    href: this.presenter.backlinkUri,
  }

  get renderArgs(): [string, Record<string, unknown>] {
    return [
      'intervention/intervention',
      {
        presenter: this.presenter,
        summaryListArgs: InterventionView.summary,
        getLocationsInCustodyTableArgs: this.getLocationsInCustodyTableArgs(),
        backLinkArgs: this.backLinkArgs,
      },
    ]
  }
}
