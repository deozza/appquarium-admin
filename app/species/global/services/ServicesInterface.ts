import Error from "~/app/utils/useCasesResult/types/Error";
import Species from "~/app/species/global/entities/Species";

export default interface ServicesInterface {
  queryTotalSpecies(jwt: string): Promise<number|null>
  queryListOfSpecies(jwt: string): Promise<Array<Species>|Error>
  querySpeciesCategories(jwt: string): Promise<Array<string>|Error>
  querySpeciesGenres(jwt: string): Promise<Array<string>|Error>
  querySpeciesFamilies(jwt: string): Promise<Array<string>|Error>
  querySpeciesOrigins(jwt: string): Promise<Array<string>|Error>
}
