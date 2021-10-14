import ServicesInterface from "~/app/species/plant/services/ServicesInterface";
import Error from "~/app/utils/useCasesResult/types/Error";
import SpeciesHasuraAdapter  from "~/app/species/global/adapters/HasuraAdapter";
import Species from "~/app/species/global/entities/Species";
import SpeciesFamily from "~/app/species/global/entities/SpeciesFamily";
import SpeciesGenre from "~/app/species/global/entities/SpeciesGenre";
import PlantInit from "~/app/species/plant/entities/PlantInit";
import AdapterInterface from "~/app/species/plant/adapters/AdapterInterface";
import HasuraAdapter from "~/app/species/plant/adapters/HasuraAdapter";

export default class Services implements ServicesInterface {

  async queryGetListOfPlants(jwt: string): Promise<Array<Species> | Error> {
    const adapter: SpeciesHasuraAdapter = new SpeciesHasuraAdapter(jwt)

    return await adapter.queryListOfSpeciesByCategory("plant")
  }

  async queryPlantFamilies(jwt: string): Promise<Array<SpeciesFamily> | Error> {
    const adapter: SpeciesHasuraAdapter = new SpeciesHasuraAdapter(jwt)

    return await adapter.queryListOfSpeciesFamiliesByCategory('plant')
  }

  async queryPlantGenres(jwt: string): Promise<Array<SpeciesGenre> | Error> {
    const adapter: SpeciesHasuraAdapter = new SpeciesHasuraAdapter(jwt)

    return await adapter.queryListOfSpeciesGenresByCategory('plant')
  }

  async queryCreateNewPlant(newPlant: PlantInit): Promise<string | Error> {
    const adapter: AdapterInterface = new HasuraAdapter(newPlant.owner.jwt.toString())

    return await adapter.mutationCreateNewPlant(newPlant)
  }
}
