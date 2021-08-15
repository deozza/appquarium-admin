import ServicesInterface from "~/app/species/fish/services/ServicesInterface";
import FishInit from "~/app/species/fish/entities/FishInit";
import AdapterInterface from "~/app/species/fish/adapters/AdapterInterface";
import HasuraAdapter from "~/app/species/fish/adapters/HasuraAdapter";
import Error from "~/app/utils/useCasesResult/types/Error";

export default class Services implements ServicesInterface {
  async queryCreateNewFish(newFish: FishInit): Promise<string | Error> {
    const adapter: AdapterInterface = new HasuraAdapter(newFish.owner.jwt.toString())

    return await adapter.mutationCreateNewFish(newFish)
  }

}
