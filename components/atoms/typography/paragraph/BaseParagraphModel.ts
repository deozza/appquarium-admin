import ExpectedCssStyle from "~/components/atoms/utils/ExpectedCssStyle";
import UnexpectedStyleError from "~/errors/components/atoms/UnexpectedStyleError";

export default class BaseParagraphModel {
  readonly DEFAULT_STYLE: string = ExpectedCssStyle.getExpectedStyles()[7]

  content: string | any
  style: string

  constructor(content: string | any) {
    this.content = content
    this.style = this.DEFAULT_STYLE
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
}
