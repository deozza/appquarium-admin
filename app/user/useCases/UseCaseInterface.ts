import Result from "~/app/utils/useCasesResult/Result";
import Credentials from "~/app/user/entities/Credentials";

export default interface UseCaseInterface {
  login(credentials: Credentials): Promise<Result>
  getTotalUsers(jwt: string): Promise<Result>
  checkTokenIsValidOrRefresh(token: string): Promise<Result>
}
