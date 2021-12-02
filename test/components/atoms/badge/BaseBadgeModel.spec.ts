import BaseBadgeModel from "~/components/atoms/badge/BaseBadgeModel";
import UnexpectedStyleError from "~/errors/components/atoms/UnexpectedStyleError";
import UnexpectedSizeError from "~/errors/components/atoms/UnexpectedSizeError";

describe('Testing BaseBadgeModel.ts component', () => {

  test('customize with valid style', () => {
    let badge: BaseBadgeModel = new BaseBadgeModel('content')
    expect(badge.style).toEqual('primary')
    badge.setStyleOrThrowError('secondary')
    expect(badge.style).toEqual('secondary')
  })

  test('unexpected style throw error', () => {
    let badge: BaseBadgeModel = new BaseBadgeModel('content')

    expect(() => badge.setStyleOrThrowError('unexpectedStyle')).toThrowError(UnexpectedStyleError)
  })

  test('customize with valid size', () => {
    let badge: BaseBadgeModel = new BaseBadgeModel('content')
    expect(badge.size).toEqual('normal')
    badge.setSizeOrThrowError('small')
    expect(badge.size).toEqual('small')
  })

  test('unexpected size throw error', () => {
    let badge: BaseBadgeModel = new BaseBadgeModel('content')
    expect(() => badge.setSizeOrThrowError('unexpectedSize')).toThrowError(UnexpectedSizeError)
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
