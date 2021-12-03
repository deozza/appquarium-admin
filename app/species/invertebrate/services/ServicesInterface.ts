import UseCaseError from "~/app/utils/useCasesResult/types/UseCaseError";
import Species from "~/app/species/global/entities/Species";
import SpeciesFamily from "~/app/species/global/entities/SpeciesFamily";
import SpeciesGenre from "~/app/species/global/entities/SpeciesGenre";

export default interface ServicesInterface {
  queryGetListOfInvertebrates(jwt: string): Promise<Array<Species> | UseCaseError>

  queryInvertebrateFamilies(jwt: string): Promise<Array<SpeciesFamily> | UseCaseError>

  queryInvertebrateGenres(jwt: string): Promise<Array<SpeciesGenre> | UseCaseError>
}
