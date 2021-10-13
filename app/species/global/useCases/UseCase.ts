import UseCaseInterface from "~/app/species/global/useCases/UseCaseInterface";
import Result from "~/app/utils/useCasesResult/Result";
import Services from "~/app/species/global/services/Services";
import Error from "~/app/utils/useCasesResult/types/Error";
import Species from "~/app/species/global/entities/Species";

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

  async getListOfSpecies(jwt: string): Promise<Result> {
    let result: Result = new Result()
    const speciesService: Services = new Services()

    const listOfSpecies: Array<Species> | Error = await speciesService.queryListOfSpecies(jwt)

    if(listOfSpecies instanceof Error){
      result.errors.push(listOfSpecies)
      return result
    }

    result.content = listOfSpecies
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

  async getSpeciesGenres(jwt: string): Promise<Result> {
    let result: Result = new Result()
    const speciesService: Services = new Services()

    const speciesgenres: Array<string> | Error = await speciesService.querySpeciesGenres(jwt)

    if(speciesgenres instanceof Error){
      result.errors.push(speciesgenres)
      return result
    }

    result.content = speciesgenres
    result.addSuccess("Query is ok", 200)
    return result
  }

  async getSpeciesFamilies(jwt: string): Promise<Result> {
    let result: Result = new Result()
    const speciesService: Services = new Services()

    const speciesFamilies: Array<string> | Error = await speciesService.querySpeciesFamilies(jwt)

    if(speciesFamilies instanceof Error){
      result.errors.push(speciesFamilies)
      return result
    }

    result.content = speciesFamilies
    result.addSuccess("Query is ok", 200)
    return result
  }

  async getSpeciesOrigins(jwt: string): Promise<Result> {
    let result: Result = new Result()
    const speciesService: Services = new Services()

    const speciesOrigins: Array<string> | Error = await speciesService.querySpeciesOrigins(jwt)

    if(speciesOrigins instanceof Error){
      result.errors.push(speciesOrigins)
      return result
    }

    result.content = speciesOrigins
    result.addSuccess("Query is ok", 200)
    return result
  }


}
