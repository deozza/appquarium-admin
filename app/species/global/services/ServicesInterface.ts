import Error from "~/app/utils/useCasesResult/types/Error";
import Species from "~/app/species/global/entities/Species";
import WaterConstraints from "~/app/species/global/entities/WaterConstraints";
import User from "~/app/user/entities/User";

export default interface ServicesInterface {
  queryTotalSpecies(jwt: string): Promise<number|null>
  queryGetSpecies(jwt: string, uuid: string): Promise<Species|Error>
  queryListOfSpecies(jwt: string): Promise<Array<Species>|Error>
  querySpeciesCategories(jwt: string): Promise<Array<string>|Error>
  querySpeciesOrigins(jwt: string): Promise<Array<string>|Error>
  createSpecies(jwt: string, species: Species): Promise<string | Error>
  updateWaterConstraints(jwt: string, waterConstraints: WaterConstraints): Promise<WaterConstraints | Array<Error>>
  createWaterConstraints(jwt: string, uuid: string, waterConstraints: WaterConstraints): Promise<string|Array<Error>>
  addWaterConstraintsToSpecies(jwt: string, speciesUuid: string, waterConstraints: WaterConstraints): Promise<WaterConstraints | Error>
  initNewSpecies(user: User, category: string): Species
}
