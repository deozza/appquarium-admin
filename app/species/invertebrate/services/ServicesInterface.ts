import Error from "~/app/utils/useCasesResult/types/Error";
import Species from "~/app/species/global/entities/Species";
import InvertebrateInit from "~/app/species/invertebrate/entities/InvertebrateInit";
import SpeciesFamily from "~/app/species/global/entities/SpeciesFamily";
import SpeciesGenre from "~/app/species/global/entities/SpeciesGenre";

export default interface ServicesInterface {
  queryGetListOfInvertebrates(jwt: string): Promise<Array<Species> | Error>
  queryCreateNewInvertebrate(newInvertebrate: InvertebrateInit): Promise<string | Error>
  queryInvertebrateFamilies(jwt: string): Promise<Array<SpeciesFamily> | Error>
  queryInvertebrateGenres(jwt: string): Promise<Array<SpeciesGenre> | Error>
}
