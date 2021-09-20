import UseCaseInterface from "~/app/species/fish/useCases/UseCaseInterface";
import FishInit from "~/app/species/fish/entities/FishInit";
import Result from "~/app/utils/useCasesResult/Result";
import Services from "~/app/species/fish/services/Services";
import Error from "~/app/utils/useCasesResult/types/Error";

export default class FishUseCase implements UseCaseInterface{

  async getListOfFishes(jwt: string): Promise<Result> {
    let result: Result = new Result()
    const fishService: Services = new Services()

    const listOfFishes: Array<string> | Error = await fishService.queryGetListOfFishes(jwt)

    if(listOfFishes instanceof Error){
      result.errors.push(listOfFishes)
      return result
    }

    result.content = listOfFishes
    result.addSuccess("Query is ok", 200)
    return result
  }

  async createNewFish(newFish: FishInit): Promise<Result> {
    let result: Result = new Result()
    const fishService: Services = new Services()

    const createdFishUuid: string | Error = await fishService.queryCreateNewFish(newFish)

    if(createdFishUuid instanceof Error){
      result.errors.push(createdFishUuid)
      return result
    }

    result.content = createdFishUuid
    result.addSuccess("Query is ok", 200)
    return result
  }


}
