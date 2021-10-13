import Error from "~/app/utils/useCasesResult/types/Error";
import Species from "~/app/species/global/entities/Species";

export default interface AdapterInterface {
  queryTotalSpecies(): Promise<number | null>
  queryListOfSpecies(): Promise<Array<Species> | Error>
  queryListOfSpeciesCategories(): Promise<Array<string> | Error>
  queryListOfSpeciesFamilies(): Promise<Array<string> | Error>
  queryListOfSpeciesGenres(): Promise<Array<string> | Error>
  queryListOfSpeciesOrigins(): Promise<Array<string> | Error>
  queryListOfSpeciesByCategory(category: string): Promise<Array<Species> | Error>
}
