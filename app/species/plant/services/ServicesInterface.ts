import Error from "~/app/utils/useCasesResult/types/Error";
import Species from "~/app/species/global/entities/Species";

export default interface ServicesInterface {
  queryGetListOfPlants(jwt: string): Promise<Array<Species> | Error>

}
