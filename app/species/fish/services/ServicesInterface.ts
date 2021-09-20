import FishInit from "~/app/species/fish/entities/FishInit";
import Error from "~/app/utils/useCasesResult/types/Error";

export default interface ServicesInterface {
  queryCreateNewFish(newFish: FishInit): Promise<string | Error>
  queryGetListOfFishes(jwt: string): Promise<Array<string> | Error>
}
