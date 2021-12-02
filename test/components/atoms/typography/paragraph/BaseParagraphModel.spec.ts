import BaseParagraphModel from "~/components/atoms/typography/paragraph/BaseParagraphModel";

describe('Testing BaseParagraphModel.ts component', () => {

  test('basic paragraph without customization', () => {
    let paragraph: BaseParagraphModel = new BaseParagraphModel('content')
    expect(paragraph.style).toEqual('light')
  })

  test('set valid style', () => {
    let paragraph: BaseParagraphModel = new BaseParagraphModel('content')
    expect(paragraph.style).toEqual('light')
    paragraph.setStyleOrThrowError('secondary')
    expect(paragraph.style).toEqual('secondary')
  })

  test('set unexpected style throw error', () => {
    let paragraph: BaseParagraphModel = new BaseParagraphModel('content')
    expect(() => paragraph.setStyleOrThrowError('unexpected')).toThrowError(Error("Style 'unexpected' is not a valid style for BaseParagraphModel"))
  })
})
