import Result from "~/app/utils/useCasesResult/Result";
import PlantInit from "~/app/species/plant/entities/PlantInit";

export default interface UseCaseInterface {
  getListOfPlants(jwt: string): Promise<Result>
  getPlantGenres(jwt: string): Promise<Result>
  getPlantFamilies(jwt: string): Promise<Result>
  createNewPlant(newPlant: PlantInit): Promise<Result>

}
