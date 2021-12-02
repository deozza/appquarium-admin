import UseCaseInterface from "~/app/species/plant/useCases/UseCaseInterface";
import Result from "~/app/utils/useCasesResult/Result";
import Services from "~/app/species/plant/services/Services";
import UseCaseError from "~/app/utils/useCasesResult/types/UseCaseError";
import Species from "~/app/species/global/entities/Species";
import PlantInit from "~/app/species/plant/entities/PlantInit";
import SpeciesFamily from "~/app/species/global/entities/SpeciesFamily";
import SpeciesGenre from "~/app/species/global/entities/SpeciesGenre";

export default class PlantUseCase implements UseCaseInterface{
  async getListOfPlants(jwt: string): Promise<Result> {
    let result: Result = new Result()
    const plantService: Services = new Services()

    const listOfPlants: Array<Species> | UseCaseError = await plantService.queryGetListOfPlants(jwt)

    if(listOfPlants instanceof UseCaseError){
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

    const plantGenres: Array<SpeciesGenre> | UseCaseError = await plantService.queryPlantGenres(jwt)

    if(plantGenres instanceof UseCaseError){
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

    const plantFamilies: Array<SpeciesFamily> | UseCaseError = await plantService.queryPlantFamilies(jwt)

    if(plantFamilies instanceof UseCaseError){
      result.errors.push(plantFamilies)
      return result
    }

    result.content = plantFamilies
    result.addSuccess("Query is ok", 200)
    return result
  }
}
