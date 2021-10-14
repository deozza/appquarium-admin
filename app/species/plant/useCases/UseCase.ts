import UseCaseInterface from "~/app/species/plant/useCases/UseCaseInterface";
import Result from "~/app/utils/useCasesResult/Result";
import Services from "~/app/species/plant/services/Services";
import Error from "~/app/utils/useCasesResult/types/Error";
import Species from "~/app/species/global/entities/Species";
import PlantInit from "~/app/species/plant/entities/PlantInit";
import SpeciesFamily from "~/app/species/global/entities/SpeciesFamily";
import SpeciesGenre from "~/app/species/global/entities/SpeciesGenre";

export default class PlantUseCase implements UseCaseInterface{
  async getListOfPlants(jwt: string): Promise<Result> {
    let result: Result = new Result()
    const plantService: Services = new Services()

    const listOfPlants: Array<Species> | Error = await plantService.queryGetListOfPlants(jwt)

    if(listOfPlants instanceof Error){
      result.errors.push(listOfPlants)
      return result
    }

    result.content = listOfPlants
    result.addSuccess("Query is ok", 200)
    return result
  }

  async getPlantGenres(jwt: string): Promise<Result> {
    let result: Result = new Result()
    const plantService: Services = new Services()

    const plantGenres: Array<SpeciesGenre> | Error = await plantService.queryPlantGenres(jwt)

    if(plantGenres instanceof Error){
      result.errors.push(plantGenres)
      return result
    }

    result.content = plantGenres
    result.addSuccess("Query is ok", 200)
    return result
  }

  async getPlantFamilies(jwt: string): Promise<Result> {
    let result: Result = new Result()
    const plantService: Services = new Services()

    const plantFamilies: Array<SpeciesFamily> | Error = await plantService.queryPlantFamilies(jwt)

    if(plantFamilies instanceof Error){
      result.errors.push(plantFamilies)
      return result
    }

    result.content = plantFamilies
    result.addSuccess("Query is ok", 200)
    return result
  }

  async createNewPlant(newPlant: PlantInit): Promise<Result> {
    let result: Result = new Result()
    const plantService: Services = new Services()

    const createdPlantUuid: string | Error = await plantService.queryCreateNewPlant(newPlant)

    if(createdPlantUuid instanceof Error){
      result.errors.push(createdPlantUuid)
      return result
    }

    result.content = createdPlantUuid
    result.addSuccess("Query is ok", 200)
    return result
  }
}
