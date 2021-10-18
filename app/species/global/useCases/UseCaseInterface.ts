import Result from "~/app/utils/useCasesResult/Result";
import Species from "~/app/species/global/entities/Species";

export default interface UseCaseInterface {
  getTotalSpecies(jwt: string): Promise<Result>
  getListOfSpecies(jwt: string): Promise<Result>
  getSpeciesOrigins(jwt: string): Promise<Result>
  getSpecies(jwt: string, uuid: string): Promise<Result>
  addOrEditWaterConstraints(jwt: string, species: Species)
}
