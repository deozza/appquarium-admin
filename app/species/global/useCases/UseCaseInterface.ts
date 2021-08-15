import Result from "~/app/utils/useCasesResult/Result";

export default interface UseCaseInterface {
  getTotalSpecies(jwt: string): Promise<Result>
  getSpeciesGenres(jwt: string): Promise<Result>
  getSpeciesFamilies(jwt: string): Promise<Result>
  getSpeciesOrigins(jwt: string): Promise<Result>
}
