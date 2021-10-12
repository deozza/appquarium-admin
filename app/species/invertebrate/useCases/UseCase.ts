import UseCaseInterface from "~/app/species/invertebrate/useCases/UseCaseInterface";
import Result from "~/app/utils/useCasesResult/Result";
import Services from "~/app/species/invertebrate/services/Services";
import Error from "~/app/utils/useCasesResult/types/Error";

export default class InvertebrateUseCase implements UseCaseInterface{
  async getListOfInvertebrates(jwt: string): Promise<Result> {
    let result: Result = new Result()
    const invertebrateService: Services = new Services()

    const listOfInvertebrates: Array<string> | Error = await invertebrateService.queryGetListOfInvertebrates(jwt)

    if(listOfInvertebrates instanceof Error){
      result.errors.push(listOfInvertebrates)
      return result
    }

    result.content = listOfInvertebrates
    result.addSuccess("Query is ok", 200)
    return result
  }
}
