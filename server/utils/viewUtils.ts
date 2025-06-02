import * as nunjucks from 'nunjucks'
import { ListStyle, SummaryListItem, SummaryListItemContent } from './summaryList'
import { ErrorSummaryArgs, SummaryListArgs, SummaryListArgsRowActionsItem } from './govukFrontendTypes'
import AuthUserDetails from '../shared/models/hmppsAuth/authUserDetails'

export type SortableTableHeaders = {
  text: string
  sort: 'ascending' | 'descending' | 'none'
  persistentId: string | null
}[]
export type SortableTableRow = {
  text: string
  sortValue: string | null
  href: string | null
  doubleCell: boolean | null
}[]

export default class ViewUtils {
  static escape(val: string): string {
    const escape = new nunjucks.Environment().getFilter('escape')
    return escape(val).val
  }

  static nl2br(val: string): string {
    // this is a weird condition - but it's possible to trick the compiler into letting you call this method
    // with non string objects via the template callback mechanism we have for govuk frontend macros.
    // in that instance the type of val is a nunjucks `SafeString`, and everything still works as expected.
    if (typeof val !== 'string') return val

    const nl2br = new nunjucks.Environment().getFilter('nl2br')
    return nl2br(val)
  }

  static govukErrorMessage(message: string | null | undefined): { text: string } | null {
    return message === null || message === undefined ? null : { text: message }
  }

  static govukErrorSummaryArgs(
    errorSummary: { field: string; message: string }[] | null,
    classes: string = '',
  ): ErrorSummaryArgs | null {
    if (errorSummary === null) {
      return null
    }

    return {
      titleText: 'There is a problem',
      classes,
      errorList: errorSummary.map(error => {
        return {
          text: error.message,
          href: `#${error.field}`,
        }
      }),
    }
  }

  private static isAuthUserDetails(line: SummaryListItemContent): line is AuthUserDetails {
    return <AuthUserDetails>line !== null && (<AuthUserDetails>line).username !== undefined
  }

  private static summaryListItemLine(line: SummaryListItemContent): string {
    if (ViewUtils.isAuthUserDetails(line)) {
      const name = `${line.firstName} ${line.lastName}`
      return `${ViewUtils.escape(name)} (<a href="mailto: ${ViewUtils.escape(line.email)}">${ViewUtils.escape(
        line.email,
      )}</a>)`
    }
    return `${ViewUtils.escape(line)}`
  }

  static summaryListArgs(
    summaryListItems: SummaryListItem[],
    options: { showBorders: boolean } = { showBorders: true },
  ): SummaryListArgs {
    return {
      classes: options.showBorders ? undefined : 'govuk-summary-list--no-border',
      rows: summaryListItems.map((item, index) => {
        return {
          key: {
            text: item.key,
          },
          value: (() => {
            if (item.listStyle !== undefined) {
              const itemClass = `govuk-list${item.listStyle === ListStyle.bulleted ? ' govuk-list--bullet' : ''}`
              const html = `<ul class="${itemClass}">${item.lines
                .map(line => `<li>${ViewUtils.summaryListItemLine(line)}</li>`)
                .join('\n')}</ul>`
              return { html }
            }
            if (item.valueLink) {
              const html = item.valueLink
              return { html }
            }
            const html = item.lines
              .map(line => `<p class="govuk-body">${ViewUtils.nl2br(ViewUtils.summaryListItemLine(line))}</p>`)
              .join('\n')
            return { html }
          })(),
          actions: {
            items: (() => {
              const items: SummaryListArgsRowActionsItem[] = []
              if (item.deleteLink) {
                items.push({
                  href: item.deleteLink,
                  text: 'Delete',
                  attributes: { id: `delete-link-${index}` },
                })
              }
              if (item.changeLink) {
                items.push({
                  href: item.changeLink,
                  text: 'Change',
                  attributes: { id: `change-link-${index}` },
                })
              }
              return items
            })(),
          },
        }
      }),
    }
  }

  static summaryListArgsWithSummaryCard(
    summaryListItems: SummaryListItem[],
    heading: string | null | undefined = null,
    options: { showBorders: boolean; showTitle: boolean } = { showBorders: true, showTitle: true },
    actions: { href: string; text: string; visuallyHiddenText: string | null } | null = null,
  ): SummaryListArgs {
    return {
      card: (() => {
        if (options.showTitle) {
          return {
            title: {
              text: heading,
            },
            actions: {
              items: [actions],
            },
          }
        }
        return null
      })(),
      classes: options.showBorders ? undefined : 'govuk-summary-list--no-border',
      rows: summaryListItems.map((item, index) => {
        return {
          key: {
            text: item.key,
          },
          value: (() => {
            if (item.listStyle !== undefined) {
              const itemClass = `govuk-list${item.listStyle === ListStyle.bulleted ? ' govuk-list--bullet' : ''}`
              const html = `<ul class="${itemClass}">${item.lines
                .map(line => `<li>${ViewUtils.summaryListItemLine(line)}</li>`)
                .join('\n')}</ul>`
              return { html }
            }
            const html = item.lines
              .map(line => `<p class="govuk-body">${ViewUtils.nl2br(ViewUtils.summaryListItemLine(line))}</p>`)
              .join('\n')
            return { html }
          })(),
          actions: (() => {
            if (item.changeLink) {
              return {
                items: [
                  {
                    href: item.changeLink,
                    text: 'Change',
                    attributes: { id: `change-link-${index}` },
                  },
                ],
              }
            }
            return null
          })(),
        }
      }),
    }
  }
}
