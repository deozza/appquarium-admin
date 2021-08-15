import AdapterInterface from "~/app/species/fish/adapters/AdapterInterface";
import HasuraClient from "~/app/utils/hasura/HasuraClient";
import FishInit from "~/app/species/fish/entities/FishInit";
import Error from "~/app/utils/useCasesResult/types/Error"

export default class HasuraAdapter extends HasuraClient implements AdapterInterface{

  constructor(jwt: string) {
    super(jwt);
  }

  async mutationCreateNewFish(newFish: FishInit): Promise<string | Error> {
    const mutation: string = `mutation CreateNewFish($category: species_categories_enum, $origin: species_origin_enum, $user: String!, $family: uuid!, $genre: uuid!, $name: String!) {
        insert_species_one(object: {
          category: $category,
          origin: $origin,
          user: $user,
          species_naming: {
            data: {
              name: $name,
              family: $family,
              genre: $genre,
              user: $user
            }
          }
        }) {
          uuid
        }
    }
    `

    try {
      const data = await this.client.request(mutation,{
        category: newFish.species_category,
        origin: newFish.origin,
        user: newFish.owner.extractUserIdFromJwt(),
        name: newFish.name,
        family: newFish.family,
        genre: newFish.genre
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
