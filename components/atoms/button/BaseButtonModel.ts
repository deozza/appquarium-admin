export default class BaseButtonModel {
    content: string | any
    style: string
    size: string
    type: string
    isLoading: boolean
    isDisabled: boolean
    icon: string
    isOnlyIcon: boolean
    isOutlined: boolean
    isRound: boolean
    event: string

    constructor(
        content: string | any,
        style: string = 'primary',
        type: string = 'submit',
        size: string = 'normal',
        icon: string = '',
        isOnlyIcon: boolean = false,
        isOutlined: boolean = false,
        isRound: boolean = false,
        isLoading: boolean = false,
        isDisabled: boolean = false
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
            throw Error("Style '"+style+"' is not a valid style for BaseButtonModel")
        }
        this.style = style

        const EXPECTED_SIZES: Array<string> = [
            'small',
            'normal',
            'large',
        ]
        if(EXPECTED_SIZES.includes(size) === false){
            throw Error("Size '"+size+"' is not a valid size for BaseButtonModel")
        }
        this.size = size

        const EXPECTED_TYPES: Array<string> = [
            'submit',
            'button',
            'reset',
        ]
        if(EXPECTED_TYPES.includes(type) === false){
            throw Error("Type '"+type+"' is not a valid type for BaseButtonModel")
        }
        this.type = type

        this.isLoading = isLoading
        this.isDisabled = isDisabled
        this.icon = icon

        if(this.icon !== '' && isOnlyIcon === true){
            throw Error("If no icon is set for BaseButtonModel, the value for 'isOnlyIcon' can not be 'true'")
        }
        this.isOnlyIcon = isOnlyIcon
        this.isOutlined = isOutlined
        this.isRound = isRound
        this.event = 'buttonIsClicked'
    }
}
