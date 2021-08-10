import Result from "~/app/utils/useCasesResult/Result";

export default interface UseCaseInterface {
  getTotalSpecies(jwt: string): Promise<Result>
}
