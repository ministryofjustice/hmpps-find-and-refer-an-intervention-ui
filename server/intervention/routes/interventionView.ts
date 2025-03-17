import InterventionPresenter from './interventionPresenter'
import { SummaryListItem } from '../../utils/summaryList'
import { SummaryListArgs, TableArgs } from '../../utils/govukFrontendTypes'
import ViewUtils from '../../utils/viewUtils'
import { CustodyLocation } from '../../models/InterventionDetails'

export default class InterventionView {
  constructor(private readonly presenter: InterventionPresenter) {}

  static summary(items: SummaryListItem[]): SummaryListArgs {
    return {
      ...ViewUtils.summaryListArgs(items),
    }
  }

  private getLocationsInCustodyTableArgs(locations: CustodyLocation[]): TableArgs {
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
      rows: this.generateCustodyTableRows(this.presenter.intervention.custodyLocations),
    }
  }

  generateCustodyTableRows(locations: CustodyLocation[]) {
    const locationRows = []
    locations.forEach(location => {
      locationRows.push([
        {
          html: `<a href='#'>${location.name}</a>`,
        },
        {
          text: location.category,
        },
        {
          text: location.county,
        },
      ])
    })
    return locationRows
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
        getLocationsInCustodyTableArgs: this.getLocationsInCustodyTableArgs,
        backLinkArgs: this.backLinkArgs,
      },
    ]
  }
}
