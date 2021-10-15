import UseCaseInterface from "~/app/user/useCases/UseCaseInterface";
import Result from "~/app/utils/useCasesResult/Result";
import Credentials from "~/app/user/entities/Credentials";
import Services from "~/app/user/services/Services";
import User from "~/app/user/entities/User";

export default class UserUseCase implements UseCaseInterface {

  private readonly module: any

  constructor(module: any) {
    this.module = module
  }

  async login(credentials: Credentials): Promise<Result> {
    const userServices: Services = new Services(this.module)
    let result: Result = new Result()

    const user: User | null = await userServices.authenticateUser(credentials)

    if(user === null){
      result.addError('User not found', 404)
      return result
    }

    result.content = user
    result.addSuccess('Credentials are ok', 201)
    return result
  }

  async checkTokenIsValidOrRefresh(token: string): Promise<Result> {
    const userServices: Services = new Services(this.module)
    let result: Result = new Result()

    const tokenDecodablePart = token.split('.')[1]
    const decoded = JSON.parse(Buffer.from(tokenDecodablePart, 'base64').toString())

    if(Date.now() < decoded.exp * 1000){
      result.addSuccess('Token is valid', 200)
      return result
    }

    const refreshedToken : string | null = await userServices.getRefreshedToken()

    if(refreshedToken === null){
      result.addError('Invalid credentials', 401)
      return result
    }

    result.content = refreshedToken
    result.addSuccess('Token is refreshed', 201)
    return result
  }

  async getTotalUsers(jwt: string): Promise<Result> {
    const userServices: Services = new Services(null)
    let result: Result = new Result()

    const totalUsers: number | null = await userServices.queryTotalUsers(jwt)

    if(totalUsers === null){
      result.addError('Query failed', 400)
      return result
    }

    result.content = totalUsers
    result.addSuccess("Query is ok", 200)
    return result
  }
}
