import FishInit from "~/app/species/fish/entities/FishInit";
import Error from "~/app/utils/useCasesResult/types/Error";

export default interface AdapterInterface {
  mutationCreateNewFish(newFish: FishInit): Promise<string| Error>
}
