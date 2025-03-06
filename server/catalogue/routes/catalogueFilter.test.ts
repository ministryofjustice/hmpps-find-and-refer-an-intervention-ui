import { Request } from 'express'
import CatalogueFilter from './catalogueFilter'

describe(CatalogueFilter, () => {
  describe('.fromRequest', () => {
    it('creates a filter from the request’s query params', () => {
      const query = {
        'type-checkbox': ['CRS', 'ACP'],
        'gender-checkbox': ['Male'],
        'search-by-programme-name-input': 'Building',
      }

      const filter = CatalogueFilter.fromRequest({ query } as unknown as Request)

      expect(filter.interventionType).toEqual(['CRS', 'ACP'])
      expect(filter.gender).toEqual(['Male'])
      expect(filter.programmeName).toEqual('Building')
    })
  })

  describe('params', () => {
    describe('No params', () => {
      it('correctly expects fields to be undefined if no type passed', () => {
        const filter = new CatalogueFilter()
        expect(filter.interventionType).toBeUndefined()
        expect(filter.gender).toBeUndefined()
        expect(filter.programmeName).toBeUndefined()
      })
    })

    describe('interventionType', () => {
      it('correctly sets interventionType if only one type is passed', () => {
        const filter = new CatalogueFilter()
        filter.interventionType = ['CRS']

        expect(filter.params.interventionType).toEqual(['CRS'])
      })

      it('correctly sets interventionType if only one type is passed', () => {
        const filter = new CatalogueFilter()
        filter.interventionType = ['ACP', 'CRS']
        expect(filter.params.interventionType).toEqual(['ACP', 'CRS'])
      })
    })

    describe('gender', () => {
      it('correctly sets allowsMales to true and not allowsFemales if only that gender is passed', () => {
        const filter = new CatalogueFilter()
        filter.gender = ['Male']

        expect(filter.params.allowsMales).toEqual(true)
        expect(filter.params.allowsFemales).toBeUndefined()
      })

      it('correctly sets allowsFemales to true and not allowsMales if only that gender is passed', () => {
        const filter = new CatalogueFilter()
        filter.gender = ['Female']

        expect(filter.params.allowsFemales).toEqual(true)
        expect(filter.params.allowsMales).toBeUndefined()
      })

      it('correctly sets both allowsFemales and not allowsMales to true if both are passed', () => {
        const filter = new CatalogueFilter()
        filter.gender = ['Male', 'Female']
        expect(filter.params.allowsMales).toEqual(true)
        expect(filter.params.allowsFemales).toEqual(true)
      })
    })

    describe('programmeName', () => {
      it('correctly sets programmeName ', () => {
        const filter = new CatalogueFilter()
        filter.programmeName = 'Hello'

        expect(filter.params.programmeName).toEqual('Hello')
      })
    })
  })
})
