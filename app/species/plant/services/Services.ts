import ServicesInterface from "~/app/species/plant/services/ServicesInterface";
import Error from "~/app/utils/useCasesResult/types/Error";
import SpeciesHasuraAdapter  from "~/app/species/global/adapters/HasuraAdapter";

export default class Services implements ServicesInterface {

  async queryGetListOfPlants(jwt: string): Promise<Array<string> | Error> {
    const adapter: SpeciesHasuraAdapter = new SpeciesHasuraAdapter(jwt)

    return await adapter.queryListOfSpeciesByCategory("plant")
  }
}
