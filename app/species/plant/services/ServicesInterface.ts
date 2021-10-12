import Error from "~/app/utils/useCasesResult/types/Error";

export default interface ServicesInterface {
  queryGetListOfPlants(jwt: string): Promise<Array<string> | Error>

}
