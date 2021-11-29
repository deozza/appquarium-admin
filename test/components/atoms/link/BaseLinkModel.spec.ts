import BaseLinkModel from "~/components/atoms/link/BaseLinkModel";

describe('Testing BaseLinkModel.ts component', () => {

  test('basic internal link without customization', () => {
    let link: BaseLinkModel = new BaseLinkModel('title', '/link/to/route')
    expect(link.style).toEqual('light')
    expect(link.hasUnderline).toBeFalsy()
    expect(link.isExternal).toBeFalsy()
  })

  test('basic external http link without customization', () => {
    let link: BaseLinkModel = new BaseLinkModel('title', 'http://google.com')
    expect(link.style).toEqual('light')
    expect(link.isExternal).toBeTruthy()
  })

  test('basic external https link without customization', () => {
    let link: BaseLinkModel = new BaseLinkModel('title', 'https://google.com')
    expect(link.style).toEqual('light')
    expect(link.isExternal).toBeTruthy()
  })

  test('set valid style', () => {
    let link: BaseLinkModel = new BaseLinkModel('title')
    expect(link.style).toEqual('light')
    link.setStyleOrThrowError('secondary')
    expect(link.style).toEqual('secondary')
  })

  test('set unexpected style throw error', () => {
    let link: BaseLinkModel = new BaseLinkModel('content')
    expect(() => link.setStyleOrThrowError('unexpected')).toThrowError(Error("Style 'unexpected' is not a valid style for BaseLinkModel"))
  })

})
