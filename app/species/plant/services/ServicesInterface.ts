import UseCaseError from "~/app/utils/useCasesResult/types/UseCaseError";
import Species from "~/app/species/global/entities/Species";
import SpeciesFamily from "~/app/species/global/entities/SpeciesFamily";
import SpeciesGenre from "~/app/species/global/entities/SpeciesGenre";

export default interface ServicesInterface {
  queryGetListOfPlants(jwt: string): Promise<Array<Species> | UseCaseError>
  queryPlantFamilies(jwt: string): Promise<Array<SpeciesFamily> | UseCaseError>
  queryPlantGenres(jwt: string): Promise<Array<SpeciesGenre> | UseCaseError>
}
