import FishInit from "~/app/species/fish/entities/FishInit";
import Result from "~/app/utils/useCasesResult/Result";

export default interface UseCaseInterface {
  createNewFish(newFish: FishInit): Promise<Result>
}
