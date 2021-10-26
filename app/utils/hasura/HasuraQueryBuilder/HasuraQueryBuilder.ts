import Order from "~/app/utils/hasura/HasuraQueryBuilder/Order";
import Insert from "~/app/utils/hasura/HasuraQueryBuilder/Insert";
import Param from "~/app/utils/hasura/HasuraQueryBuilder/Param";
import Where from "~/app/utils/hasura/HasuraQueryBuilder/Where";

export default class HasuraQueryBuilder{
  type: string
  name: string
  params: Array<Param> = []
  return: Array<string> = []
  insert: Array<Insert> = []
  wheres: Array<Where> = []
  orders: Array<Order> = []

  constructor(type: string, name: string) {
    this.type = type
    this.name = name
  }

  public getQuery(): string{
    let query: string = this.type

    query += this.computeParams()

    query += "{"

    query += this.name

    if(this.wheres.length > 0 || this.orders.length > 0){
      query += '('

      query += this.computeWhere()

      if(this.wheres.length > 0 && this.orders.length > 0){
        query += ','
      }

      query += this.computeOrder()

      query += ')'
    }


    query += this.computeReturn()

    query += '}'
    return query
  }

  public addParam(name: string, type: string, value: string|number){
    if(this.params.find((param: Param) => param.name === name) === undefined) {
      this.params.push(new Param(name, type, value))
    }
  }

  public addInsert(name: string, value: string|number){
    if(this.insert.find((insert: Insert) => insert.name === name) === undefined){
      this.insert.push(new Insert(name, value))
    }
  }

  public addReturn(...names: Array<string>){
    names.forEach((name) => this.return.push(name))
  }

  public addWhere(property: string, compareMode: string, value: string|number){
    if(this.wheres.find((where: Where) => where.property === property) === undefined) {

      let whereConstraint = new Where(property, compareMode, value)

      this.wheres.push(whereConstraint)
    }
  }

  public addOrderBy(property: string, order: string = 'asc'){
    if(this.orders.find((order: Order) => order.property === property) === undefined) {
      this.orders.push(new Order(property, order))
    }
  }

  private computeParams(): string{
    if(this.params.length === 0){
      return ''
    }

    let computedParams = '('
    for(let param in this.params){
      computedParams += this.params[param].name+': '+this.params[param].type

      if(~~param < (this.params.length-1)){
        computedParams += ','
      }
    }

    computedParams += ')'

    return computedParams
  }

  private computeWhere(): string{
    if(this.wheres.length === 0 ){
      return ''
    }

    let computedWhere: string = 'where: {'

    for(let where in this.wheres){
      computedWhere += this.wheres[where].property + ': {' + this.wheres[where].compareMode + ': ' + this.wheres[where].value + '}'
      if(~~where < (this.wheres.length-1)){
        computedWhere += ','
      }
    }

    computedWhere += '}'
    return computedWhere
  }

  private computeOrder(): string{
    if(this.orders.length === 0 ){
      return ''
    }

    let computedOrders: string = 'order_by: {'
    for(let order in this.orders){
      computedOrders += this.orders[order].property+': '+this.orders[order].order

      if(~~order < (this.orders.length-1)){
        computedOrders += ','
      }
    }

    computedOrders += '}'

    return computedOrders
  }

  private computeReturn(): string{
    let computedReturn: string = '{'

    for(let returnMember in this.return){
      computedReturn += this.return[returnMember]

      if(~~returnMember < (this.return.length-1)){
        computedReturn += ','
      }
    }

    computedReturn += '}'
    return computedReturn
  }
}
