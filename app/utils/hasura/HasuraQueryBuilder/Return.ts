export default class HasuraQueryBuilder{
  type: string
  name: string
  params = []
  return = []
  insert = []
  wheres = []
  orders = []

  constructor(type: string, name: string) {
    this.type = type
    this.name = name
  }

  public getQuery(): string{
    return ``
  }

  public addParam(name: string, type: string, value: string|number){
    this.params.push({
      name: name,
      type: type,
      value: value
    })
  }

  public addInsert(name: string, value: string|number){
    this.insert[name] = value
  }

  public addReturn(...names: Array<string>){
    names.forEach((name: string) => this.return.push(name))
  }

  public addWhere(property: string, compareMode: string, value: string|number){
    this.wheres.push({
      property: property,
      compareMode: compareMode,
      value: value
    })
  }

  public addOrderBy(property: string, order: string = 'asc'){
    this.orders.push({
      property: property,
      order: order
    })
  }
}
