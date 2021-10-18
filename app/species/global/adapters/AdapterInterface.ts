import Error from "~/app/utils/useCasesResult/types/Error";
import Species from "~/app/species/global/entities/Species";
import SpeciesFamily from "~/app/species/global/entities/SpeciesFamily";
import SpeciesGenre from "~/app/species/global/entities/SpeciesGenre";
import WaterConstraints from "~/app/species/global/entities/WaterConstraints";

export default interface AdapterInterface {
  queryTotalSpecies(): Promise<number | null>
  queryListOfSpecies(): Promise<Array<Species> | Error>
  queryGetSpecies(uuid: string): Promise<Species | Error>
  queryListOfSpeciesCategories(): Promise<Array<string> | Error>
  queryListOfSpeciesFamiliesByCategory(category: string): Promise<Array<SpeciesFamily> | Error>
  queryListOfSpeciesGenresByCategory(category: string): Promise<Array<SpeciesGenre> | Error>
  queryListOfSpeciesOrigins(): Promise<Array<string> | Error>
  queryListOfSpeciesByCategory(category: string): Promise<Array<Species> | Error>
  mutationCreateWaterConstraints(uuid: string, waterConstraints: WaterConstraints): Promise<string | Array<Error>>
  mutationEditWaterConstraints(waterConstraints: WaterConstraints): Promise<WaterConstraints | Error>
  mutationAddWaterConstraintsToSpecies(waterConstraint: WaterConstraints, speciesUuid: string): Promise<WaterConstraints | Error>
}
