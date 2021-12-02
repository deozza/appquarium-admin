import BaseHeaderModel from "~/components/atoms/typography/header/BaseHeaderModel";
import UnexpectedStyleError from "~/errors/components/atoms/UnexpectedStyleError";
import UnexpectedSizeError from "~/errors/components/atoms/UnexpectedSizeError";

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
    expect(() => header.setStyleOrThrowError('unexpected')).toThrowError(UnexpectedStyleError)
  })


  test('set valid size', () => {
    let header: BaseHeaderModel = new BaseHeaderModel('content')
    expect(header.size).toEqual(1)
    header.setSizeOrThrowError(2)
    expect(header.size).toEqual(2)
  })

  test('set unexpected size throw error', () => {
    let header: BaseHeaderModel = new BaseHeaderModel('content')
    expect(() => header.setSizeOrThrowError(10)).toThrowError(UnexpectedSizeError)
  })

})
