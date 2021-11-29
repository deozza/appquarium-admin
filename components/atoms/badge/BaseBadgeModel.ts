export default class BaseBadgeModel {

  readonly EXPECTED_STYLES: Array<string> = [
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'link'
  ]

  readonly DEFAULT_STYLE: string = this.EXPECTED_STYLES[0]

  readonly EXPECTED_SIZES: Array<string> = [
    'normal',
    'small',
    'large',
  ]

  readonly DEFAULT_SIZE: string = this.EXPECTED_SIZES[0]

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

  toJSON () {
    return { ...this } // here I make a POJO's copy of the class instance
  }

  public setStyleOrThrowError(style: string): void {
    if(this.EXPECTED_STYLES.includes(style) === false){
      throw Error("Style '"+style+"' is not a valid style for BaseBadgeModel")
    }
    this.style = style
  }

  public setSizeOrThrowError(size: string): void {
    if(this.EXPECTED_SIZES.includes(size) === false){
      throw Error("Size '"+size+"' is not a valid size for BaseBadgeModel")
    }
    this.size = size
  }

  public setIcon(icon: string, isOnlyIcon: boolean = false): void {
    this.icon = icon
    this.isOnlyIcon = isOnlyIcon
  }


}
