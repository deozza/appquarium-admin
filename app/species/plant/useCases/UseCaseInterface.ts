import Result from "~/app/utils/useCasesResult/Result";

export default interface UseCaseInterface {
  getListOfPlants(jwt: string): Promise<Result>

}
