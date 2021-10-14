import AdapterInterface from "~/app/species/invertebrate/adapters/AdapterInterface";
import HasuraClient from "~/app/utils/hasura/HasuraClient";
import InvertebrateInit from "~/app/species/invertebrate/entities/InvertebrateInit";
import Error from "~/app/utils/useCasesResult/types/Error"

export default class HasuraAdapter extends HasuraClient implements AdapterInterface{

  constructor(jwt: string) {
    super(jwt);
  }

  async mutationCreateNewInvertebrate(newInvertebrate: InvertebrateInit): Promise<string | Error> {
    const mutation: string = `mutation CreateNewInvertebrate($category: species_categories_enum, $origin: species_origin_enum, $family: uuid!, $genre: uuid!, $name: String!) {
        insert_species_one(object: {
          category: $category,
          origin: $origin,
          species_naming: {
            data: {
              name: $name,
              family: $family,
              genre: $genre,
            }
          }
        }) {
          uuid
        }
    }
    `

    try {
      const data = await this.client.request(mutation,{
        category: newInvertebrate.species_category,
        origin: newInvertebrate.origin,
        name: newInvertebrate.name,
        family: newInvertebrate.family,
        genre: newInvertebrate.genre
      })
      return data.insert_species_one.uuid
    }
    catch (e) {
      if(e.message.includes("JWTExpired")){
        return new Error("JWT expired", 401)
      }
      return new Error(e.message, 400)
    }
  }

}
