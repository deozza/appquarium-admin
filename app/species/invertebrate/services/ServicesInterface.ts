import Error from "~/app/utils/useCasesResult/types/Error";

export default interface ServicesInterface {
  queryGetListOfInvertebrates(jwt: string): Promise<Array<string> | Error>

}
