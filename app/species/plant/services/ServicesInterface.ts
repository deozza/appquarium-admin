import Error from "~/app/utils/useCasesResult/types/Error";
import Species from "~/app/species/global/entities/Species";
import PlantInit from "~/app/species/plant/entities/PlantInit";
import SpeciesFamily from "~/app/species/global/entities/SpeciesFamily";
import SpeciesGenre from "~/app/species/global/entities/SpeciesGenre";

export default interface ServicesInterface {
  queryGetListOfPlants(jwt: string): Promise<Array<Species> | Error>
  queryCreateNewPlant(newPlant: PlantInit): Promise<string | Error>
  queryPlantFamilies(jwt: string): Promise<Array<SpeciesFamily> | Error>
  queryPlantGenres(jwt: string): Promise<Array<SpeciesGenre> | Error>
}
