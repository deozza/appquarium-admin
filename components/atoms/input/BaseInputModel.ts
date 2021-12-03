export default class BaseInputModele {
  type: string
  id: string
  name: string
  label: string | any
  value: any
  required: boolean
  style: string
  error: string | any

  constructor(type: string, id: string, name: string, label: string | any, required: boolean = false, value: any = null, style: string = 'light') {

    const expectedType: Array<string> = [
      'text',
      'email',
      'number',
      'password'
    ]

    if (!expectedType.includes(type)) {
      throw new Error(type + ' is not a valid input type')
    }

    this.type = type
    this.id = id
    this.name = name
    this.label = label
    this.required = required
    this.value = value

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
    if (EXPECTED_STYLES.includes(style) === false) {
      throw Error("Style '" + style + "' is not a valid style for BaseInputModel")
    }
    this.style = style

    this.error = ''
  }

  toJSON() {
    return {...this} // here I make a POJO's copy of the class instance
  }
}
