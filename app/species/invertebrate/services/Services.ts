import ServicesInterface from "~/app/species/invertebrate/services/ServicesInterface";
import Error from "~/app/utils/useCasesResult/types/Error";
import SpeciesHasuraAdapter  from "~/app/species/global/adapters/HasuraAdapter";
import Species from "~/app/species/global/entities/Species";
import SpeciesFamily from "~/app/species/global/entities/SpeciesFamily";
import SpeciesGenre from "~/app/species/global/entities/SpeciesGenre";
import InvertebrateInit from "~/app/species/invertebrate/entities/InvertebrateInit";
import AdapterInterface from "~/app/species/invertebrate/adapters/AdapterInterface";
import HasuraAdapter from "~/app/species/invertebrate/adapters/HasuraAdapter";

export default class Services implements ServicesInterface {
  async queryGetListOfInvertebrates(jwt: string): Promise<Array<Species> | Error> {
    const adapter: SpeciesHasuraAdapter = new SpeciesHasuraAdapter(jwt)

    return await adapter.queryListOfSpeciesByCategory("invertebrate")
  }

  async queryInvertebrateFamilies(jwt: string): Promise<Array<SpeciesFamily> | Error> {
    const adapter: SpeciesHasuraAdapter = new SpeciesHasuraAdapter(jwt)

    return await adapter.queryListOfSpeciesFamiliesByCategory('invertebrate')
  }

  async queryInvertebrateGenres(jwt: string): Promise<Array<SpeciesGenre> | Error> {
    const adapter: SpeciesHasuraAdapter = new SpeciesHasuraAdapter(jwt)

    return await adapter.queryListOfSpeciesGenresByCategory('invertebrate')
  }
}
