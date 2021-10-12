import UseCaseInterface from "~/app/species/plant/useCases/UseCaseInterface";
import Result from "~/app/utils/useCasesResult/Result";
import Services from "~/app/species/plant/services/Services";
import Error from "~/app/utils/useCasesResult/types/Error";

export default class PlantUseCase implements UseCaseInterface{
  async getListOfPlants(jwt: string): Promise<Result> {
    let result: Result = new Result()
    const plantService: Services = new Services()

    const listOfPlants: Array<string> | Error = await plantService.queryGetListOfPlants(jwt)

    if(listOfPlants instanceof Error){
      result.errors.push(listOfPlants)
      return result
    }

    result.content = listOfPlants
    result.addSuccess("Query is ok", 200)
    return result
  }
}
