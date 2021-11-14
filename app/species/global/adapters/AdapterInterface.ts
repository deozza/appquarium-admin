import Error from "~/app/utils/useCasesResult/types/Error";
import Species from "~/app/species/global/entities/Species";
import SpeciesFamily from "~/app/species/global/entities/SpeciesFamily";
import SpeciesGenre from "~/app/species/global/entities/SpeciesGenre";
import WaterConstraints from "~/app/species/global/entities/WaterConstraints";
import SpeciesNaming from "~/app/species/global/entities/SpeciesNaming";
import AnimalSpecs from "~/app/species/global/entities/AnimalSpecs";

export default interface AdapterInterface {
  queryTotalSpecies(): Promise<number | null>
  queryListOfSpecies(): Promise<Array<Species> | Error>
  queryGetSpecies(uuid: string): Promise<Species | Error>
  queryListOfSpeciesCategories(): Promise<Array<string> | Error>
  queryListOfSpeciesFamiliesByCategory(category: string): Promise<Array<SpeciesFamily> | Error>
  queryListOfSpeciesGenresByCategory(category: string): Promise<Array<SpeciesGenre> | Error>
  queryListOfSpeciesOrigins(): Promise<Array<string> | Error>
  queryListOfSpeciesByCategory(category: string): Promise<Array<Species> | Error>

  mutationCreateSpeciesGenre(speciesGenre: SpeciesGenre): Promise<string | Error>
  mutationCreateSpeciesFamily(speciesFamily: SpeciesFamily): Promise<string | Error>
  mutationCreateSpecies(species: Species): Promise<string | Error>
  mutationUpdateSpeciesNaming(speciesNaming: SpeciesNaming): Promise<SpeciesNaming | Error>

  mutationCreateWaterConstraints(uuid: string, waterConstraints: WaterConstraints): Promise<string | Array<Error>>
  mutationEditWaterConstraints(waterConstraints: WaterConstraints): Promise<WaterConstraints | Array<Error>>
  mutationAddWaterConstraintsToSpecies(waterConstraint: WaterConstraints, speciesUuid: string): Promise<WaterConstraints | Error>

  mutationCreateAnimalSpecs(uuid: string, animalSpecs: AnimalSpecs): Promise<string | Array<Error>>
  mutationEditAnimalSpecs(animalSpecs: AnimalSpecs): Promise<AnimalSpecs | Array<Error>>
  mutationAddAnimalSpecsToSpecies(animalSpecs: AnimalSpecs, speciesUuid: string): Promise<AnimalSpecs | Error>

  mutationUpdatePublicationState(uuid: string, nextState: string): Promise<string | Array<Error>>
}
