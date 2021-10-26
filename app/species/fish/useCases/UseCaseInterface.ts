import FishInit from "~/app/species/fish/entities/FishInit";
import Result from "~/app/utils/useCasesResult/Result";

export default interface UseCaseInterface {
  getListOfFishes(jwt: string): Promise<Result>
  getFishGenres(jwt: string): Promise<Result>
  getFishFamilies(jwt: string): Promise<Result>

}
