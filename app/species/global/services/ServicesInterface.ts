import Error from "~/app/utils/useCasesResult/types/Error";
import Species from "~/app/species/global/entities/Species";
import WaterConstraints from "~/app/species/global/entities/WaterConstraints";
import User from "~/app/user/entities/User";
import SpeciesNaming from "~/app/species/global/entities/SpeciesNaming";
import AnimalSpecs from "~/app/species/global/entities/AnimalSpecs";

export default interface ServicesInterface {
  queryTotalSpecies(jwt: string): Promise<number|null>
  queryGetSpecies(jwt: string, uuid: string): Promise<Species|Error>
  queryListOfSpecies(jwt: string): Promise<Array<Species>|Error>
  querySpeciesCategories(jwt: string): Promise<Array<string>|Error>
  querySpeciesOrigins(jwt: string): Promise<Array<string>|Error>

  createSpecies(jwt: string, species: Species): Promise<string | Error>

  updateSpeciesNaming(jwt: string, speciesNaming: SpeciesNaming): Promise<SpeciesNaming | Error>

  updateWaterConstraints(jwt: string, waterConstraints: WaterConstraints): Promise<WaterConstraints | Array<Error>>
  createWaterConstraints(jwt: string, uuid: string, waterConstraints: WaterConstraints): Promise<string|Array<Error>>
  addWaterConstraintsToSpecies(jwt: string, speciesUuid: string, waterConstraints: WaterConstraints): Promise<WaterConstraints | Error>

  updateAnimalSpecs(jwt: string, animalSpecs: AnimalSpecs): Promise<AnimalSpecs | Array<Error>>
  createAnimalSpecs(jwt: string, uuid: string, animalSpecs: AnimalSpecs): Promise<string|Array<Error>>
  addAnimalSpecsToSpecies(jwt: string, speciesUuid: string, animalSpecs: AnimalSpecs): Promise<AnimalSpecs | Error>

  initNewSpecies(user: User, category: string): Species
  checkNextState(species: Species, nextState: string): Promise<boolean | Array<Error>>
  updatePublicationState(jwt: string, uuid: string, state: string): Promise<string|Array<Error>>

  deleteSpecies(jwt: string, uuid: string): Promise<boolean|Array<Error>>
}
