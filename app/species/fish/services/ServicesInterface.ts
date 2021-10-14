import FishInit from "~/app/species/fish/entities/FishInit";
import Error from "~/app/utils/useCasesResult/types/Error";
import Species from "~/app/species/global/entities/Species";
import SpeciesFamily from "~/app/species/global/entities/SpeciesFamily";
import SpeciesGenre from "~/app/species/global/entities/SpeciesGenre";

export default interface ServicesInterface {
  queryCreateNewFish(newFish: FishInit): Promise<string | Error>
  queryGetListOfFishes(jwt: string): Promise<Array<Species> | Error>
  queryFishFamilies(jwt: string): Promise<Array<SpeciesFamily> | Error>
  queryFishGenres(jwt: string): Promise<Array<SpeciesGenre> | Error>
}
