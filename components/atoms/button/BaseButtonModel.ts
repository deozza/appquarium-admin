import ExpectedCssStyle from "~/components/atoms/utils/ExpectedCssStyle";
import UnexpectedStyleError from "~/errors/components/atoms/UnexpectedStyleError";
import UnexpectedSizeError from "~/errors/components/atoms/UnexpectedSizeError";
import UnexpectedButtonTypeError from "~/errors/components/atoms/UnexpectedButtonTypeError";

export default class BaseButtonModel {

  readonly DEFAULT_STYLE: string = ExpectedCssStyle.getExpectedStyles()[0]

  readonly DEFAULT_SIZE: string = ExpectedCssStyle.getExpectedSizes()[0]

  readonly EXPECTED_TYPES: Array<string> = [
    'submit',
    'button',
    'reset'
  ]

  readonly DEFAULT_TYPE: string = this.EXPECTED_TYPES[0]

  readonly DEFAULT_EVENT_NAME: string = 'buttonIsClicked'

  content: string | any
  style: string
  size: string
  type: string
  isLoading: boolean
  isDisabled: boolean
  icon: string | null
  isOnlyIcon: boolean | null
  isOutlined: boolean
  isRound: boolean
  event: string

  constructor(content: string | any) {
    this.content = content
    this.style = this.DEFAULT_STYLE
    this.size = this.DEFAULT_SIZE
    this.type = this.DEFAULT_TYPE
    this.isRound = false
    this.isOutlined = false
    this.isLoading = false
    this.isDisabled = false
    this.icon = null
    this.isOnlyIcon = null
    this.event = this.DEFAULT_EVENT_NAME
  }

  toJSON() {
    return {...this} // here I make a POJO's copy of the class instance
  }

  public setStyleOrThrowError(style: string, isOutlined: boolean = false, isRound: boolean = false): void {
    if (ExpectedCssStyle.getExpectedStyles().includes(style) === false) {
      throw new UnexpectedStyleError(style, this.constructor.name)
    }
    this.style = style
    this.isOutlined = isOutlined
    this.isRound = isRound
  }

  public setSizeOrThrowError(size: string): void {
    if (ExpectedCssStyle.getExpectedSizes().includes(size) === false) {
      throw new UnexpectedSizeError(size, this.constructor.name)
    }
    this.size = size
  }

  public setTypeOrThrowError(type: string): void {
    if (this.EXPECTED_TYPES.includes(type) === false) {
      throw new UnexpectedButtonTypeError(type, this.constructor.name)
    }
    this.type = type
  }

  public setIcon(icon: string, isOnlyIcon: boolean = false): void {
    this.icon = icon
    this.isOnlyIcon = isOnlyIcon
  }

  public setLoading(isLoading: boolean): void {
    this.isLoading = isLoading
    this.isDisabled = isLoading
  }
}
