export default class BaseBadgeModel {
    content: string | any
    style: string
    size: string
    icon: string
    isOnlyIcon: boolean

    constructor(
        content: string | any,
        style: string = 'primary',
        size: string = 'normal',
        icon: string = '',
        isOnlyIcon: boolean = false,
    ) {
        this.content = content

        const EXPECTED_STYLES: Array<string> = [
            'primary',
            'secondary',
            'success',
            'danger',
            'warning',
            'info',
            'link'
        ]
        if(EXPECTED_STYLES.includes(style) === false){
            throw Error("Style '"+style+"' is not a valid style for BaseBadgeModel")
        }
        this.style = style

        const EXPECTED_SIZES: Array<string> = [
            'small',
            'normal',
            'large',
        ]
        if(EXPECTED_SIZES.includes(size) === false){
            throw Error("Size '"+size+"' is not a valid size for BaseBadgeModel")
        }
        this.size = size


        this.icon = icon

        if(this.icon !== '' && isOnlyIcon === true){
            throw Error("If no icon is set for BaseBadgeModel, the value for 'isOnlyIcon' can not be 'true'")
        }
        this.isOnlyIcon = isOnlyIcon
    }

  toJSON () {
    return { ...this } // here I make a POJO's copy of the class instance
  }
}
