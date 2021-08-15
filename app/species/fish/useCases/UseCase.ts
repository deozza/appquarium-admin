import UseCaseInterface from "~/app/species/fish/useCases/UseCaseInterface";
import FishInit from "~/app/species/fish/entities/FishInit";
import Result from "~/app/utils/useCasesResult/Result";
import Services from "~/app/species/fish/services/Services";
import Error from "~/app/utils/useCasesResult/types/Error";

export default class FishUseCase implements UseCaseInterface{
  async createNewFish(newFish: FishInit): Promise<Result> {
    let result: Result = new Result()
    const fishService: Services = new Services()

    const createdFishUuid: string | Error = await fishService.queryCreateNewFish(newFish)

    if(createdFishUuid instanceof Error){
      console.log(createdFishUuid)
      result.errors.push(createdFishUuid)
      return result
    }

    result.content = createdFishUuid
    result.addSuccess("Query is ok", 200)
    return result
  }


}
