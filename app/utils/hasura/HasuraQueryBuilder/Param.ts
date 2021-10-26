export default class Param{
  type: string
  name: string
  value: string|number

  constructor(name: string, type: string, value: string|number) {
    this.name = name
    this.type = type
    this.value = value
  }
}
