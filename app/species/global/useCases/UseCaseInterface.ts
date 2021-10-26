import Result from "~/app/utils/useCasesResult/Result";
import Species from "~/app/species/global/entities/Species";

export default interface UseCaseInterface {
  getTotalSpecies(jwt: string): Promise<Result>
  getListOfSpecies(jwt: string): Promise<Result>
  getSpeciesOrigins(jwt: string): Promise<Result>
  getSpecies(jwt: string, uuid: string): Promise<Result>
  createSpecies(jwt: string, species: Species): Promise<Result>
  updateSpeciesNaming(jwt: string, species: Species): Promise<Result>
  updateWaterConstraints(jwt: string, species: Species): Promise<Result>
  addWaterConstraints(jwt: string, species: Species): Promise<Result>
}
