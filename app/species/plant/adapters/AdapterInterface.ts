import PlantInit from "~/app/species/plant/entities/PlantInit";
import Error from "~/app/utils/useCasesResult/types/Error";

export default interface AdapterInterface {
  mutationCreateNewPlant(newPlant: PlantInit): Promise<string| Error>

}
