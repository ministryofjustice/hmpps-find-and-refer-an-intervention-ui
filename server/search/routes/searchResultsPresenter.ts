import ServiceUserDetails from '../../models/serviceUserDetails'

export default class SearchResultsPresenter {
  constructor(
    readonly backlinkUri: string | null,
    readonly serviceUserDetails: ServiceUserDetails,
  ) {}

  readonly text = {
    pageHeading: 'Search Results',
  }
}
