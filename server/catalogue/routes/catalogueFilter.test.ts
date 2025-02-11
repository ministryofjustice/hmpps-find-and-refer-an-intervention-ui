import { Request } from 'express'
import CatalogueFilter from './catalogueFilter'

describe(CatalogueFilter, () => {
  describe('.fromRequest', () => {
    it('creates a filter from the request’s query params', () => {
      const body = { 'type-checkbox': ['CRS', 'ACP'], 'setting-checkbox': ['COMMUNITY'] }

      const filter = CatalogueFilter.fromRequest({ body } as unknown as Request)

      expect(filter.interventionType).toEqual(['CRS', 'ACP'])
      expect(filter.setting).toEqual(['COMMUNITY'])
    })
  })

  describe('params', () => {
    describe('interventionType', () => {
      it('correctly expects interventionType to be undefined if no type passed', () => {
        const filter = new CatalogueFilter()
        expect(filter.params.interventionType).toBeUndefined()
      })

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

    describe('setting', () => {
      it('correctly expects setting to be undefined if no setting passed', () => {
        const filter = new CatalogueFilter()
        expect(filter.params.setting).toBeUndefined()
      })

      it('correctly sets setting', () => {
        const filter = new CatalogueFilter()
        filter.setting = 'CUSTODY'
        expect(filter.params.setting).toEqual('CUSTODY')

        filter.setting = 'COMMUNITY'
        expect(filter.params.setting).toEqual('COMMUNITY')
      })
    })
  })
})
