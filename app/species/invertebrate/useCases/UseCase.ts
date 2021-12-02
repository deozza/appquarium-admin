import UseCaseInterface from "~/app/species/invertebrate/useCases/UseCaseInterface";
import Result from "~/app/utils/useCasesResult/Result";
import Services from "~/app/species/invertebrate/services/Services";
import UseCaseError from "~/app/utils/useCasesResult/types/UseCaseError";
import Species from "~/app/species/global/entities/Species";
import SpeciesGenre from "~/app/species/global/entities/SpeciesGenre";
import SpeciesFamily from "~/app/species/global/entities/SpeciesFamily";
import InvertebrateInit from "~/app/species/invertebrate/entities/InvertebrateInit";

export default class InvertebrateUseCase implements UseCaseInterface{
  async getListOfInvertebrates(jwt: string): Promise<Result> {
    let result: Result = new Result()
    const invertebrateService: Services = new Services()

    const listOfInvertebrates: Array<Species> | UseCaseError = await invertebrateService.queryGetListOfInvertebrates(jwt)

    if(listOfInvertebrates instanceof UseCaseError){
      result.errors.push(listOfInvertebrates)
      return result
    }

    result.content = listOfInvertebrates
    result.addSuccess("Query is ok", 200)
    return result
  }

  async getInvertebrateGenres(jwt: string): Promise<Result> {
    let result: Result = new Result()
    const invertebrateService: Services = new Services()

    const invertebrateGenres: Array<SpeciesGenre> | UseCaseError = await invertebrateService.queryInvertebrateGenres(jwt)

    if(invertebrateGenres instanceof UseCaseError){
      result.errors.push(invertebrateGenres)
      return result
    }

    result.content = invertebrateGenres
    result.addSuccess("Query is ok", 200)
    return result
  }

  async getInvertebrateFamilies(jwt: string): Promise<Result> {
    let result: Result = new Result()
    const invertebrateService: Services = new Services()

    const invertebrateFamilies: Array<SpeciesFamily> | UseCaseError = await invertebrateService.queryInvertebrateFamilies(jwt)

    if(invertebrateFamilies instanceof UseCaseError){
      result.errors.push(invertebrateFamilies)
      return result
    }

    result.content = invertebrateFamilies
    result.addSuccess("Query is ok", 200)
    return result
  }
}
