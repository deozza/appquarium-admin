import UseCaseInterface from "~/app/species/global/useCases/UseCaseInterface";
import Result from "~/app/utils/useCasesResult/Result";
import Services from "~/app/species/global/services/Services";
import Error from "~/app/utils/useCasesResult/types/Error";

export default class SpeciesUseCase implements UseCaseInterface{
  async getTotalSpecies(jwt: string): Promise<Result> {
    let result: Result = new Result()
    const speciesService: Services = new Services()

    const totalSpecies: number | null = await speciesService.queryTotalSpecies(jwt)

    if(totalSpecies === null){
      result.addError('Query failed', 400)
      return result
    }

    result.content = totalSpecies
    result.addSuccess("Query is ok", 200)
    return result
  }

  async getSpeciesCategories(jwt: string): Promise<Result> {
    let result: Result = new Result()
    const speciesService: Services = new Services()

    const speciesCategories: Array<string> | Error = await speciesService.querySpeciesCategories(jwt)

    if(speciesCategories instanceof Error){
      result.errors.push(speciesCategories)
      return result
    }

    result.content = speciesCategories
    result.addSuccess("Query is ok", 200)
    return result
  }

}
