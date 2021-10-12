import Error from "~/app/utils/useCasesResult/types/Error";

export default interface ServicesInterface {
  queryTotalSpecies(jwt: string): Promise<number|null>
  queryListOfSpecies(jwt: string): Promise<Array<string>|Error>
  querySpeciesCategories(jwt: string): Promise<Array<string>|Error>
  querySpeciesGenres(jwt: string): Promise<Array<string>|Error>
  querySpeciesFamilies(jwt: string): Promise<Array<string>|Error>
  querySpeciesOrigins(jwt: string): Promise<Array<string>|Error>
}
