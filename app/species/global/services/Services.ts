import ServicesInterface from "~/app/species/global/services/ServicesInterface";
import AdapterInterface from "~/app/species/global/adapters/AdapterInterface";
import HasuraAdapter from "~/app/species/global/adapters/HasuraAdapter";

export default class Services implements ServicesInterface {

  async queryTotalSpecies(jwt: string): Promise<number|null> {
    const adapter: AdapterInterface | null = new HasuraAdapter(jwt)

    return await adapter.queryTotalSpecies()
  }
}
