import AdapterInterface from "~/app/species/invertebrate/adapters/AdapterInterface";
import HasuraClient from "~/app/utils/hasura/HasuraClient";

export default class HasuraAdapter extends HasuraClient implements AdapterInterface{

  constructor(jwt: string) {
    super(jwt);
  }

}
