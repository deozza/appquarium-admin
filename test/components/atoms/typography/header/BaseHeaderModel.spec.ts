import BaseHeaderModel from "~/components/atoms/typography/header/BaseHeaderModel";

describe('Testing BaseHeaderModel.ts component', () => {

  test('basic header without customization', () => {
    let header: BaseHeaderModel = new BaseHeaderModel('content')
    expect(header.style).toEqual('light')
    expect(header.size).toEqual(1)
  })

  test('set valid style', () => {
    let header: BaseHeaderModel = new BaseHeaderModel('content')
    expect(header.style).toEqual('light')
    header.setStyleOrThrowError('secondary')
    expect(header.style).toEqual('secondary')
  })

  test('set unexpected style throw error', () => {
    let header: BaseHeaderModel = new BaseHeaderModel('content')
    expect(() => header.setStyleOrThrowError('unexpected')).toThrowError(Error("Style 'unexpected' is not a valid style for BaseHeaderModel"))
  })


  test('set valid size', () => {
    let header: BaseHeaderModel = new BaseHeaderModel('content')
    expect(header.size).toEqual(1)
    header.setSizeOrThrowError(2)
    expect(header.size).toEqual(2)
  })

  test('set unexpected sizee throw error', () => {
    let header: BaseHeaderModel = new BaseHeaderModel('content')
    expect(() => header.setSizeOrThrowError(10)).toThrowError(Error("Size '10' is out of bounds for BaseHeaderModel"))
  })

})
