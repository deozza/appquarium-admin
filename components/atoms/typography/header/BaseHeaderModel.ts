import ExpectedCssStyle from "~/components/atoms/utils/ExpectedCssStyle";

export default class BaseHeaderModel {

  readonly DEFAULT_STYLE: string = ExpectedCssStyle.getExpectedStyles()[7]
  readonly DEFAULT_SIZE: number = 1

    content: string | any
    style: string
    size: number

    constructor(content: string | any) {
        this.content = content
        this.style = this.DEFAULT_STYLE
        this.size = this.DEFAULT_SIZE
    }

  toJSON () {
    return { ...this } // here I make a POJO's copy of the class instance
  }

  public setStyleOrThrowError(style: string): void{
    if(ExpectedCssStyle.getExpectedStyles().includes(style) === false){
      throw Error("Style '"+style+"' is not a valid style for BaseHeaderModel")
    }
    this.style = style
  }

  public setSizeOrThrowError(size: number): void{
    if(size < 1 || size > 6){
      throw Error("Size '"+size+"' is out of bounds for BaseHeaderModel")
    }

    this.size = size
  }
}
