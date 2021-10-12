import Result from "~/app/utils/useCasesResult/Result";

export default interface UseCaseInterface {
  getListOfInvertebrates(jwt: string): Promise<Result>

}
