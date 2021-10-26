import AdapterInterface from "~/app/species/fish/adapters/AdapterInterface";
import HasuraClient from "~/app/utils/hasura/HasuraClient";
import Error from "~/app/utils/useCasesResult/types/Error"

export default class HasuraAdapter extends HasuraClient implements AdapterInterface{

  constructor(jwt: string) {
    super(jwt);
  }

}
