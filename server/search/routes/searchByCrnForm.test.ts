import TestUtils from '../../../testutils/testUtils'
import SearchByIdentifierForm from './SearchByIdentifierForm'

describe(`SearchByIdentifierForm`, () => {
  describe('data', () => {
    describe('when a crn is passed', () => {
      it('returns params for update', async () => {
        const request = TestUtils.createRequest({
          'search-by-crn': 'X123456',
        })
        const data = await new SearchByIdentifierForm(request).data()

        expect(data.paramsForUpdate).toEqual('X123456')
      })
    })

    describe('when a prisonerNumber is passed', () => {
      it('returns params for update', async () => {
        const request = TestUtils.createRequest({
          'search-by-crn': 'A1234AA',
        })
        const data = await new SearchByIdentifierForm(request).data()

        expect(data.paramsForUpdate).toEqual('A1234AA')
      })
    })

    describe('when crn is empty', () => {
      it('returns an error', async () => {
        const request = TestUtils.createRequest({
          'search-by-crn': '',
        })
        const data = await new SearchByIdentifierForm(request).data()

        expect(data.error?.errors).toContainEqual({
          errorSummaryLinkedField: 'search-by-crn',
          formFields: ['search-by-crn'],
          message: 'Enter CRN or prison number.',
        })
      })
    })

    describe('when crn is the wrong format', () => {
      it('returns an error', async () => {
        const request = TestUtils.createRequest({
          body: {
            'search-by-crn': 'X123',
          },
        })
        const data = await new SearchByIdentifierForm(request).data()

        expect(data.error?.errors).toContainEqual({
          errorSummaryLinkedField: 'search-by-crn',
          formFields: ['search-by-crn'],
          message:
            'Enter a CRN or prison number in the correct format, like X123456 for a CRN or D0168GH for a prison number',
        })
      })
    })
  })
})
