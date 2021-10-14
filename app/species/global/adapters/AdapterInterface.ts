import Error from "~/app/utils/useCasesResult/types/Error";
import Species from "~/app/species/global/entities/Species";
import SpeciesFamily from "~/app/species/global/entities/SpeciesFamily";
import SpeciesGenre from "~/app/species/global/entities/SpeciesGenre";

export default interface AdapterInterface {
  queryTotalSpecies(): Promise<number | null>
  queryListOfSpecies(): Promise<Array<Species> | Error>
  queryListOfSpeciesCategories(): Promise<Array<string> | Error>
  queryListOfSpeciesFamiliesByCategory(category: string): Promise<Array<SpeciesFamily> | Error>
  queryListOfSpeciesGenresByCategory(category: string): Promise<Array<SpeciesGenre> | Error>
  queryListOfSpeciesOrigins(): Promise<Array<string> | Error>
  queryListOfSpeciesByCategory(category: string): Promise<Array<Species> | Error>
}
