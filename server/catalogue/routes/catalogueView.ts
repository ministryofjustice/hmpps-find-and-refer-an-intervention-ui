import CataloguePresenter from './cataloguePresenter'
import { SummaryListItem } from '../../utils/summaryList'
import { CheckboxesArgs, InputArgs, RadiosArgs, SummaryListArgs } from '../../utils/govukFrontendTypes'
import ViewUtils from '../../utils/viewUtils'

export default class CatalogueView {
  constructor(private readonly presenter: CataloguePresenter) {}

  static summary(items: SummaryListItem[]): SummaryListArgs {
    return {
      ...ViewUtils.summaryListArgs(items),
    }
  }

  private get searchByProgrammeNameInputArgs(): InputArgs {
    return {
      id: 'search-by-programme-name-input',
      name: 'search-by-programme-name-input',
      classes: 'govuk-input--width-20',
      label: {
        text: this.presenter.text.searchByProgrammeNameInput.heading,
        classes: 'govuk-label--m',
      },
      value: '', // this.presenter.fields.keywords,
      errorMessage: ViewUtils.govukErrorMessage(null), // ViewUtils.govukErrorMessage(this.presenter.errorMessage),
    }
  }

  private get locationInputArgs(): InputArgs {
    return {
      id: 'location-input',
      name: 'location-input',
      classes: 'govuk-input--width-20',
      label: {
        text: this.presenter.text.locationInput.heading,
        classes: 'govuk-label--m',
      },
      value: '', // this.presenter.fields.keywords,
      errorMessage: ViewUtils.govukErrorMessage(null), // ViewUtils.govukErrorMessage(this.presenter.errorMessage),
    }
  }

  private get genderCheckboxArgs(): CheckboxesArgs {
    return {
      idPrefix: 'gender-checkbox',
      name: 'gender-checkbox',
      fieldset: {
        legend: {
          text: this.presenter.text.genderRadio.heading,
          classes: 'govuk-fieldset__legend--m',
        },
        classes: 'govuk-checkboxes--small',
      },
      items: [
        {
          value: 'Male',
          text: this.presenter.text.genderRadio.items.maleHeading,
          checked: this.presenter.filter.gender?.includes('Male') ?? false,
        },
        {
          value: 'Female',
          text: this.presenter.text.genderRadio.items.femaleHeading,
          checked: this.presenter.filter.gender?.includes('Female') ?? false,
        },
      ],
    }
  }

  private get needsCheckboxArgs(): CheckboxesArgs {
    return {
      idPrefix: 'needs-checkbox',
      name: 'needs-checkbox',
      fieldset: {
        legend: {
          text: this.presenter.text.needsRadio.heading,
          classes: 'govuk-fieldset__legend--m',
        },
        classes: 'govuk-checkboxes--small',
      },
      items: this.presenter.needsOptions,
    }
  }

  private get typeCheckboxArgs(): CheckboxesArgs {
    return {
      idPrefix: 'type-checkbox',
      name: 'type-checkbox',
      fieldset: {
        legend: {
          text: this.presenter.text.typeRadio.heading,
          classes: 'govuk-fieldset__legend--m',
        },
        classes: 'govuk-checkboxes--small',
      },
      items: this.presenter.typeOptions,
    }
  }

  private get formatCheckboxArgs(): CheckboxesArgs {
    return {
      idPrefix: 'format-checkbox',
      name: 'gender-checkbox',
      fieldset: {
        legend: {
          text: this.presenter.text.formatRadio.heading,
          classes: 'govuk-fieldset__legend--m',
        },
        classes: 'govuk-checkboxes--small',
      },
      items: [
        {
          value: 'one-to-one',
          text: this.presenter.text.formatRadio.items.oneToOneHeading,
          checked: false,
        },
        {
          value: 'group',
          text: this.presenter.text.formatRadio.items.groupHeading,
          checked: false,
        },
      ],
    }
  }

  private get attendanceTypeCheckboxArgs(): CheckboxesArgs {
    return {
      idPrefix: 'attendance-type-checkbox',
      name: 'attendance-type-checkbox',
      fieldset: {
        legend: {
          text: this.presenter.text.attendanceTypeRadio.heading,
          classes: 'govuk-fieldset__legend--m',
        },
        classes: 'govuk-checkboxes--small',
      },
      items: [
        {
          value: 'in-person',
          text: this.presenter.text.attendanceTypeRadio.items.inPersonHeading,
          checked: false,
        },
        {
          value: 'online',
          text: this.presenter.text.attendanceTypeRadio.items.onlineHeading,
          checked: false,
        },
      ],
    }
  }

  get renderArgs(): [string, Record<string, unknown>] {
    return [
      'catalogue/catalogue',
      {
        presenter: this.presenter,
        summaryListArgs: CatalogueView.summary,
        searchByProgrammeNameInputArgs: this.searchByProgrammeNameInputArgs,
        locationInputArgs: this.locationInputArgs,
        genderCheckboxArgs: this.genderCheckboxArgs,
        needsCheckboxArgs: this.needsCheckboxArgs,
        typeCheckboxArgs: this.typeCheckboxArgs,
        formatCheckboxArgs: this.formatCheckboxArgs,
        attendanceTypeCheckboxArgs: this.attendanceTypeCheckboxArgs,
        pagination: this.presenter.pagination.mojPaginationArgs,
      },
    ]
  }
}
