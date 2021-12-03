import ServicesInterface from "~/app/species/plant/services/ServicesInterface";
import UseCaseError from "~/app/utils/useCasesResult/types/UseCaseError";
import SpeciesHasuraAdapter from "~/app/species/global/adapters/HasuraAdapter";
import Species from "~/app/species/global/entities/Species";
import SpeciesFamily from "~/app/species/global/entities/SpeciesFamily";
import SpeciesGenre from "~/app/species/global/entities/SpeciesGenre";

export default class Services implements ServicesInterface {

  async queryGetListOfPlants(jwt: string): Promise<Array<Species> | UseCaseError> {
    const adapter: SpeciesHasuraAdapter = new SpeciesHasuraAdapter(jwt)

    return await adapter.queryListOfSpeciesByCategory("plant")
  }

  async queryPlantFamilies(jwt: string): Promise<Array<SpeciesFamily> | UseCaseError> {
    const adapter: SpeciesHasuraAdapter = new SpeciesHasuraAdapter(jwt)

    return await adapter.queryListOfSpeciesFamiliesByCategory('plant')
  }

  async queryPlantGenres(jwt: string): Promise<Array<SpeciesGenre> | UseCaseError> {
    const adapter: SpeciesHasuraAdapter = new SpeciesHasuraAdapter(jwt)

    return await adapter.queryListOfSpeciesGenresByCategory('plant')
  }
}
