import InvertebrateInit from "~/app/species/invertebrate/entities/InvertebrateInit";
import Error from "~/app/utils/useCasesResult/types/Error"

export default interface AdapterInterface {
  mutationCreateNewInvertebrate(newInvertebrate: InvertebrateInit): Promise<string| Error>
}
