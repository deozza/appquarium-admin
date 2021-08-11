import Error from "~/app/utils/useCasesResult/types/Error";

export default interface ServicesInterface {
  queryTotalSpecies(jwt: string): Promise<number|null>
  querySpeciesCategories(jwt: string): Promise<Array<string>|Error>
}
