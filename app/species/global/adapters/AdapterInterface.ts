import Error from "~/app/utils/useCasesResult/types/Error";

export default interface AdapterInterface {
  queryTotalSpecies(): Promise<number | null>
  queryListOfSpeciesCategories(): Promise<Array<string> | Error>
  queryListOfSpeciesFamilies(): Promise<Array<string> | Error>
  queryListOfSpeciesGenres(): Promise<Array<string> | Error>
  queryListOfSpeciesOrigins(): Promise<Array<string> | Error>
  queryListOfSpeciesByCategory(category: string): Promise<Array<string> | Error>
}
