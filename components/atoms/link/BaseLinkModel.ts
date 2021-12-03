import ExpectedCssStyle from "~/components/atoms/utils/ExpectedCssStyle";
import UnexpectedStyleError from "~/errors/components/atoms/UnexpectedStyleError";

export default class BaseLinkModel {

  readonly DEFAULT_STYLE: string = ExpectedCssStyle.getExpectedStyles()[7]

  content: string | any
  style: string
  linkTo: string
  isExternal: boolean
  hasUnderline: boolean

  constructor(content: string | any, linkTo: string = '/') {
    this.content = content
    this.style = this.DEFAULT_STYLE
    this.linkTo = linkTo
    this.isExternal = linkTo.substring(0, 7) === 'http://' || linkTo.substring(0, 8) === 'https://'
    this.hasUnderline = false
  }

  toJSON() {
    return {...this} // here I make a POJO's copy of the class instance
  }

  public setStyleOrThrowError(style: string, hasUnderline: boolean = false): void {

    if (ExpectedCssStyle.getExpectedStyles().includes(style) === false) {
      throw new UnexpectedStyleError(style, this.constructor.name)
    }
    this.style = style
    this.hasUnderline = hasUnderline
  }
}
