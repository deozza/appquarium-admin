import Error from "~/app/utils/useCasesResult/types/Error";

export default interface AdapterInterface {
  queryTotalSpecies(): Promise<number | null>
  queryListOfSpeciesCategories(): Promise<Array<string> | Error>
}
