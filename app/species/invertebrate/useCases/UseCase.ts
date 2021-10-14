import UseCaseInterface from "~/app/species/invertebrate/useCases/UseCaseInterface";
import Result from "~/app/utils/useCasesResult/Result";
import Services from "~/app/species/invertebrate/services/Services";
import Error from "~/app/utils/useCasesResult/types/Error";
import Species from "~/app/species/global/entities/Species";
import SpeciesGenre from "~/app/species/global/entities/SpeciesGenre";
import SpeciesFamily from "~/app/species/global/entities/SpeciesFamily";
import InvertebrateInit from "~/app/species/invertebrate/entities/InvertebrateInit";

export default class InvertebrateUseCase implements UseCaseInterface{
  async getListOfInvertebrates(jwt: string): Promise<Result> {
    let result: Result = new Result()
    const invertebrateService: Services = new Services()

    const listOfInvertebrates: Array<Species> | Error = await invertebrateService.queryGetListOfInvertebrates(jwt)

    if(listOfInvertebrates instanceof Error){
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

    const invertebrateGenres: Array<SpeciesGenre> | Error = await invertebrateService.queryInvertebrateGenres(jwt)

    if(invertebrateGenres instanceof Error){
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

    const invertebrateFamilies: Array<SpeciesFamily> | Error = await invertebrateService.queryInvertebrateFamilies(jwt)

    if(invertebrateFamilies instanceof Error){
      result.errors.push(invertebrateFamilies)
      return result
    }

    result.content = invertebrateFamilies
    result.addSuccess("Query is ok", 200)
    return result
  }

  async createNewInvertebrate(newInvertebrate: InvertebrateInit): Promise<Result> {
    let result: Result = new Result()
    const invertebrateService: Services = new Services()

    const createdInvertebrateUuid: string | Error = await invertebrateService.queryCreateNewInvertebrate(newInvertebrate)

    if(createdInvertebrateUuid instanceof Error){
      result.errors.push(createdInvertebrateUuid)
      return result
    }

    result.content = createdInvertebrateUuid
    result.addSuccess("Query is ok", 200)
    return result
  }
}
