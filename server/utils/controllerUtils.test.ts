import { ParsedQs } from 'qs'
import { Request } from 'express'
import ControllerUtils from './controllerUtils'

describe(ControllerUtils, () => {
  describe('parseQueryParamAsPositiveInteger', () => {
    it('returns null for missing query param', () => {
      expect(
        ControllerUtils.parseQueryParamAsPositiveInteger({ query: {} as ParsedQs } as Request, 'missing')
      ).toBeNull()
    })

    it('returns null for invalid int values', () => {
      const req = {
        query: { value1: '[]', value2: '-1', value3: 'NaN', value4: '0', value5: [] } as ParsedQs,
      } as Request
      expect(ControllerUtils.parseQueryParamAsPositiveInteger(req, 'value1')).toBeNull()
      expect(ControllerUtils.parseQueryParamAsPositiveInteger(req, 'value2')).toBeNull()
      expect(ControllerUtils.parseQueryParamAsPositiveInteger(req, 'value3')).toBeNull()
      expect(ControllerUtils.parseQueryParamAsPositiveInteger(req, 'value4')).toBeNull()
      expect(ControllerUtils.parseQueryParamAsPositiveInteger(req, 'value5')).toBeNull()
    })

    it('returns a number for valid int values', () => {
      const req = { query: { value1: '12', value2: '345' } as ParsedQs } as Request
      expect(ControllerUtils.parseQueryParamAsPositiveInteger(req, 'value1')).toEqual(12)
      expect(ControllerUtils.parseQueryParamAsPositiveInteger(req, 'value2')).toEqual(345)
    })
  })
})
