export default class BaseHeaderModel {
    content: string | any
    style: string
    size: number

    constructor(content: string | any, size: number = 1, style: string = 'light') {
        this.content = content

        const EXPECTED_STYLES: Array<string> = [
            'light',
            'dark',
            'primary',
            'secondary',
            'success',
            'danger',
            'warning',
            'info'
        ]
        if(EXPECTED_STYLES.includes(style) === false){
            throw Error("Style '"+style+"' is not a valid style for BaseHeaderModel")
        }
        this.style = style

        if(size < 1 || size > 6){
            throw Error("Size '"+size+"' is out of bounds for BaseHeaderModel")
        }
        this.size = size
    }
}
