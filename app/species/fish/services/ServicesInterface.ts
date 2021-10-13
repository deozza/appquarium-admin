import FishInit from "~/app/species/fish/entities/FishInit";
import Error from "~/app/utils/useCasesResult/types/Error";
import Species from "~/app/species/global/entities/Species";

export default interface ServicesInterface {
  queryCreateNewFish(newFish: FishInit): Promise<string | Error>
  queryGetListOfFishes(jwt: string): Promise<Array<Species> | Error>
}
