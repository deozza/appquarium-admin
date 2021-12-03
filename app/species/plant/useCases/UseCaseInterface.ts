import Result from "~/app/utils/useCasesResult/Result";

export default interface UseCaseInterface {
  getListOfPlants(jwt: string): Promise<Result>

  getPlantGenres(jwt: string): Promise<Result>

  getPlantFamilies(jwt: string): Promise<Result>
}
