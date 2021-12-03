import ExpectedCssStyle from "~/components/atoms/utils/ExpectedCssStyle";
import UnexpectedStyleError from "~/errors/components/atoms/UnexpectedStyleError";
import UnexpectedSizeError from "~/errors/components/atoms/UnexpectedSizeError";

export default class BaseBadgeModel {

  readonly DEFAULT_STYLE: string = ExpectedCssStyle.getExpectedStyles()[0]

  readonly DEFAULT_SIZE: string = ExpectedCssStyle.getExpectedSizes()[0]

  content: string | any
  style: string
  size: string
  icon: string | null
  isOnlyIcon: boolean | null

  constructor(content: string | any) {
    this.content = content
    this.size = this.DEFAULT_SIZE
    this.style = this.DEFAULT_STYLE
    this.icon = null
    this.isOnlyIcon = null
  }

  toJSON() {
    return {...this} // here I make a POJO's copy of the class instance
  }

  public setStyleOrThrowError(style: string): void {
    if (ExpectedCssStyle.getExpectedStyles().includes(style) === false) {
      throw new UnexpectedStyleError(style, this.constructor.name)
    }
    this.style = style
  }

  public setSizeOrThrowError(size: string): void {
    if (ExpectedCssStyle.getExpectedSizes().includes(size) === false) {
      throw new UnexpectedSizeError(size, this.constructor.name)
    }
    this.size = size
  }

  public setIcon(icon: string, isOnlyIcon: boolean = false): void {
    this.icon = icon
    this.isOnlyIcon = isOnlyIcon
  }


}
