import BaseButtonModel from "~/components/atoms/button/BaseButtonModel";

describe('Testing BaseButtonModel.ts component', () => {

  test('basic button without customization', () => {
    let button: BaseButtonModel = new BaseButtonModel('content')
    expect(button.style).toEqual('primary')
    expect(button.size).toEqual('normal')
    expect(button.type).toEqual('submit')
    expect(button.event).toEqual('buttonIsClicked')
    expect(button.isDisabled).toBeFalsy()
    expect(button.isLoading).toBeFalsy()
  })

  test('set valid style', () => {
    let button: BaseButtonModel = new BaseButtonModel('content')
    expect(button.style).toEqual('primary')
    button.setStyleOrThrowError('secondary')
    expect(button.style).toEqual('secondary')
  })

  test('set unexpected style throw error', () => {
    let button: BaseButtonModel = new BaseButtonModel('content')
    expect(() => button.setStyleOrThrowError('unexpected')).toThrowError(Error("Style 'unexpected' is not a valid style for BaseButtonModel"))
  })

  test('set valid size', () => {
    let button: BaseButtonModel = new BaseButtonModel('content')
    expect(button.size).toEqual('normal')
    button.setSizeOrThrowError('small')
    expect(button.size).toEqual('small')
  })

  test('set unexpected size throw error', () => {
    let button: BaseButtonModel = new BaseButtonModel('content')
    expect(() => button.setSizeOrThrowError('unexpected')).toThrowError(Error("Size 'unexpected' is not a valid size for BaseButtonModel"))
  })

  test('set valid type', () => {
    let button: BaseButtonModel = new BaseButtonModel('content')
    expect(button.type).toEqual('submit')
    button.setTypeOrThrowError('button')
    expect(button.type).toEqual('button')
  })

  test('set unexpected type throw error', () => {
    let button: BaseButtonModel = new BaseButtonModel('content')
    expect(() => button.setTypeOrThrowError('unexpected')).toThrowError(Error("Type 'unexpected' is not a valid type for BaseButtonModel"))
  })

  test('set icon', () => {
    let button: BaseButtonModel = new BaseButtonModel('content')
    expect(button.icon).toBeNull()
    expect(button.isOnlyIcon).toBeNull()

    button.setIcon('icon')
    expect(button.icon).toEqual('icon')
    expect(button.isOnlyIcon).toBeFalsy()

  })

  test('set isLoading also changes isDisable', () => {
    let button: BaseButtonModel = new BaseButtonModel('content')
    expect(button.isDisabled).toBeFalsy()
    expect(button.isLoading).toBeFalsy()
    button.setLoading(true)
    expect(button.isDisabled).toBeTruthy()
    expect(button.isLoading).toBeTruthy()
  })

})
