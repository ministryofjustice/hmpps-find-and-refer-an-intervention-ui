import { DummyData } from '../../services/findAndReferService'

export default class TestView {
  constructor(private readonly dummyData: DummyData) {}

  get renderArgs(): [string, Record<string, unknown>] {
    return [
      'test/test',
      {
        dummyData: this.dummyData,
      },
    ]
  }
}
