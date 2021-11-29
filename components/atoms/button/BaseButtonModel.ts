import ExpectedCssStyle from "~/components/atoms/utils/ExpectedCssStyle";

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

  toJSON () {
    return { ...this } // here I make a POJO's copy of the class instance
  }

  public setStyleOrThrowError(style: string, isOutlined: boolean = false, isRound: boolean = false): void{
    if(ExpectedCssStyle.getExpectedStyles().includes(style) === false){
      throw Error("Style '"+style+"' is not a valid style for BaseButtonModel")
    }
    this.style = style
    this.isOutlined = isOutlined
    this.isRound = isRound
  }

  public setSizeOrThrowError(size: string): void{
    if(ExpectedCssStyle.getExpectedSizes().includes(size) === false){
      throw Error("Size '"+size+"' is not a valid size for BaseButtonModel")
    }
    this.size = size
  }

  public setTypeOrThrowError(type: string): void{
    if(this.EXPECTED_TYPES.includes(type) === false){
      throw Error("Type '"+type+"' is not a valid type for BaseButtonModel")
    }
    this.type = type
  }

  public setIcon(icon: string, isOnlyIcon: boolean = false): void{
    this.icon = icon
    this.isOnlyIcon = isOnlyIcon
  }

  public setLoading(isLoading: boolean): void{
    this.isLoading = isLoading
    this.isDisabled = isLoading
  }
}
