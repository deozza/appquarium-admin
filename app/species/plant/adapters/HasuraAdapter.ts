import AdapterInterface from "~/app/species/plant/adapters/AdapterInterface";
import HasuraClient from "~/app/utils/hasura/HasuraClient";
import PlantInit from "~/app/species/plant/entities/PlantInit";
import Error from "~/app/utils/useCasesResult/types/Error";
export default class HasuraAdapter extends HasuraClient implements AdapterInterface{

  constructor(jwt: string) {
    super(jwt);
  }

  async mutationCreateNewPlant(newPlant: PlantInit): Promise<string | Error> {
    const mutation: string = `mutation CreateNewPlant($category: species_categories_enum, $origin: species_origin_enum, $family: uuid!, $genre: uuid!, $name: String!) {
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
        category: newPlant.species_category,
        origin: newPlant.origin,
        name: newPlant.name,
        family: newPlant.family,
        genre: newPlant.genre
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
