import Result from "~/app/utils/useCasesResult/Result";
import InvertebrateInit from "~/app/species/invertebrate/entities/InvertebrateInit";

export default interface UseCaseInterface {
  getListOfInvertebrates(jwt: string): Promise<Result>
  getInvertebrateGenres(jwt: string): Promise<Result>
  getInvertebrateFamilies(jwt: string): Promise<Result>
  createNewInvertebrate(newInvertebrate: InvertebrateInit): Promise<Result>
}
