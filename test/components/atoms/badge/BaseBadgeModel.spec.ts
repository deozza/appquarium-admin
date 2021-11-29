import BaseBadgeModel from "~/components/atoms/badge/BaseBadgeModel";

describe('Testing BaseBadgeModel.ts component', () => {

  test('customize with valid style', () => {
    let badge: BaseBadgeModel = new BaseBadgeModel('content')
    expect(badge.style).toEqual('primary')
    badge.setStyleOrThrowError('secondary')
    expect(badge.style).toEqual('secondary')
  })

  test('unexpected style throw error', () => {
    let badge: BaseBadgeModel = new BaseBadgeModel('content')

    expect(() => badge.setStyleOrThrowError('unexpectedStyle')).toThrowError(Error("Style 'unexpectedStyle' is not a valid style for BaseBadgeModel"))
  })

  test('customize with valid size', () => {
    let badge: BaseBadgeModel = new BaseBadgeModel('content')
    expect(badge.size).toEqual('normal')
    badge.setSizeOrThrowError('small')
    expect(badge.size).toEqual('small')
  })

  test('unexpected size throw error', () => {
    let badge: BaseBadgeModel = new BaseBadgeModel('content')
    expect(() => badge.setSizeOrThrowError('unexpectedSize')).toThrowError(Error("Size 'unexpectedSize' is not a valid size for BaseBadgeModel"))
  })

  test('customize with icon', () => {
    let badge: BaseBadgeModel = new BaseBadgeModel('content')
    expect(badge.icon).toBeNull()
    expect(badge.isOnlyIcon).toBeNull()
    badge.setIcon('icon')
    expect(badge.icon).toEqual('icon')
    expect(badge.isOnlyIcon).toBeFalsy()
  })

})
