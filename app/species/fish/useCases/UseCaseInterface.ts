import Result from "~/app/utils/useCasesResult/Result";
import Species from "~/app/species/global/entities/Species";
import User from "~/app/user/entities/User";

export default interface UseCaseInterface {
  getListOfFishes(jwt: string): Promise<Result>
  getFishGenres(jwt: string): Promise<Result>
  getFishFamilies(jwt: string): Promise<Result>
  initNewFish(user: User): Species

}
