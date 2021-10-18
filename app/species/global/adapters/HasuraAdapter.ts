import AdapterInterface from "~/app/species/global/adapters/AdapterInterface";
import HasuraClient from "~/app/utils/hasura/HasuraClient";
import Error from "~/app/utils/useCasesResult/types/Error";
import Species from "~/app/species/global/entities/Species";
import SpeciesGenre from "~/app/species/global/entities/SpeciesGenre";
import SpeciesFamily from "~/app/species/global/entities/SpeciesFamily";
import WaterConstraints from "~/app/species/global/entities/WaterConstraints";

export default class HasuraAdapter extends HasuraClient implements AdapterInterface{

  async queryTotalSpecies(): Promise<number | null> {
    const query: string = `query{
      species_aggregate {
        aggregate {
          count
        }
      }
    }
    `
    try {
      const data = await this.client.request(query)
      const totalSpecies: number = data.species_aggregate.aggregate.count
      return totalSpecies
    }
    catch (e) {
      return null
    }
  }

  async queryListOfSpecies(): Promise<Array<Species> | Error> {
    const query: string = `query{
      species {
        category
        publication_state
        updated_at
        species_naming {
          species_genre {
            name
          }
          name
        }
        uuid
      }
    }
    `
    try {
      const data = await this.client.request(query)
      const listOfSpecies: Array<Species> = data.species.map((item: Array<string>) => new Species(item))
      return listOfSpecies
    }
    catch (e) {
      if(e.message.includes("JWTExpired")){
        return new Error("JWT expired", 401)

      }
      return new Error(e.message, 400)
    }
  }

  async queryGetSpecies(uuid: string): Promise<Species | Error> {
    const query: string = `query($uuid: uuid!) {
        species_by_pk(uuid: $uuid) {
          uuid
          created_at
          updated_at
          category
          origin
          publication_state
          species_naming {
            common_names
            created_at
            name
            old_names
            updated_at
            uuid
            species_family {
              name
              uuid
            }
            species_genre {
              name
              uuid
            }
          }
          water_constraint {
            created_at
            gh_max
            gh_min
            ph_max
            ph_min
            temp_max
            temp_min
            updated_at
            uuid
          }
        }
      }
    `
    try {
      const data = await this.client.request(query,{
        uuid: uuid
      })

      const species: Species = new Species(data.species_by_pk)
      return species
    }
    catch (e) {
      if(e.message.includes("JWTExpired")){
        return new Error("JWT expired", 401)

      }
      return new Error(e.message, 400)
    }
  }


  async queryListOfSpeciesCategories(): Promise<Array<string> | Error> {
    const query: string = `query {
      species_categories {
        name
      }
    }
    `
    try {
      const data = await this.client.request(query)
      const listOfSpeciesCategories: Array<string> = data.species_categories
      return listOfSpeciesCategories
    }
    catch (e) {
      if(e.message.includes("JWTExpired")){
        return new Error("JWT expired", 401)

      }
      return new Error(e.message, 400)
    }
  }

  async queryListOfSpeciesFamiliesByCategory(category: string): Promise<Array<SpeciesFamily> | Error> {
    const query: string = `query($category: species_categories_enum) {
        species_family(where: {category: {_eq: $category}}) {
          name
          uuid
        }
      }
    `
    try {
      const data = await this.client.request(query,{
        category: category
      })
      const listOfSpeciesFamilies: Array<SpeciesGenre> = data.species_family.map((item: Array<string>) => new SpeciesFamily(item))
      return listOfSpeciesFamilies
    }
    catch (e) {
      if(e.message.includes("JWTExpired")){
        return new Error("JWT expired", 401)

      }
      return new Error(e.message, 400)
    }
  }

  async queryListOfSpeciesGenresByCategory(category: string): Promise<Array<SpeciesGenre> | Error> {
    const query: string = `query($category: species_categories_enum) {
      species_genre(where: {category: {_eq: $category}}) {
          name
          uuid
        }
      }
    `
    try {
      const data = await this.client.request(query,{
        category: category
      })
      const listOfSpeciesGenres: Array<SpeciesGenre> = data.species_genre.map((item: Array<string>) => new SpeciesGenre(item))
      return listOfSpeciesGenres
    }
    catch (e) {
      if(e.message.includes("JWTExpired")){
        return new Error("JWT expired", 401)

      }
      return new Error(e.message, 400)
    }
  }

  async queryListOfSpeciesOrigins(): Promise<Array<string> | Error> {
    const query: string = `query {
      species_origin {
          name
        }
      }
    `
    try {
      const data = await this.client.request(query)
      const listOfSpeciesOrigins: Array<string> = data.species_origin
      return listOfSpeciesOrigins
    }
    catch (e) {
      if(e.message.includes("JWTExpired")){
        return new Error("JWT expired", 401)

      }
      return new Error(e.message, 400)
    }
  }

  async queryListOfSpeciesByCategory(category: string): Promise<Array<Species> | Error> {
    const query: string = `query($category: species_categories_enum) {
      species(where: {category: {_eq: $category}}, order_by: {updated_at: desc}) {
        uuid
        updated_at
        category
        publication_state
        species_naming {
          name
          species_genre {
            name
          }
        }
      }
    }
    `
    try {
      const data = await this.client.request(query,{
        category: category
      })

      const listOfSpecies: Array<Species> = data.species.map((item: Array<string>) => new Species(item))
      return listOfSpecies
    }
    catch (e) {
      if(e.message.includes("JWTExpired")){
        return new Error("JWT expired", 401)
      }
      return new Error(e.message, 400)
    }
  }

  async mutationCreateWaterConstraints(uuid: string, waterConstraints: WaterConstraints): Promise<string | Array<Error>> {
      const mutation: string = `mutation AddWaterConstraints($ph_min: numeric, $ph_max: numeric, $gh_min: Int, $gh_max: Int, $temp_min: Int, $temp_max: Int) {
        insert_water_constraints_one(object: {
          ph_min: $ph_min,
          ph_max: $ph_max,
          gh_min: $gh_min,
          gh_max: $gh_max,
          temp_min: $temp_min,
          temp_max: $temp_max
        }) {
          uuid
          }
      }
    `

    try {
      const data = await this.client.request(mutation,{
        ph_min: waterConstraints.ph_min,
        ph_max: waterConstraints.ph_max,
        gh_min: waterConstraints.gh_min,
        gh_max: waterConstraints.gh_max,
        temp_min: waterConstraints.temp_min,
        temp_max: waterConstraints.temp_max,
      })
      return data.insert_water_constraints_one.uuid
    }
    catch (e) {
        let errors: Array<Error> = []
      if(e.message.includes("JWTExpired")){
        errors.push(new Error("JWT expired", 401))
        return errors
      }
      errors.push(new Error(e.message, 400))
      return errors
    }

  }

  async mutationAddWaterConstraintsToSpecies(waterConstraints: WaterConstraints, speciesUuid: string): Promise<WaterConstraints | Error> {
    const mutation: string = `mutation AddWaterConstraintsToSpecies($waterConstraintsUuid: uuid, $speciesUuid: uuid!) {
        update_species_by_pk(pk_columns: {uuid: $speciesUuid}, _set: {water_constraints: $waterConstraintsUuid}) {
          uuid
        }
      }
    `

    try {
      await this.client.request(mutation,{
        waterConstraintsUuid: waterConstraints.uuid,
        speciesUuid: speciesUuid,
      })
      return waterConstraints
    }
    catch (e) {
      if(e.message.includes("JWTExpired")){
        return new Error("JWT expired", 401)
      }

      return new Error(e.message, 400)
    }
  }

  async mutationEditWaterConstraints(waterConstraints: WaterConstraints): Promise<WaterConstraints | Error> {
    const mutation: string = `mutation EditWaterConstraints($uuid: uuid!, $ph_min: numeric, $ph_max: numeric, $gh_min: Int, $gh_max: Int, $temp_min: Int, $temp_max: Int) {
        update_water_constraints_by_pk(pk_columns: {uuid: $uuid}, _set: {
          gh_max: $gh_max,
          gh_min: $gh_min,
          ph_max: $ph_max,
          ph_min: $ph_min,
          temp_max: $temp_max,
          temp_min: $temp_min
        }) {
          uuid
        }
      }
    `

    try {
      await this.client.request(mutation,{
        uuid: waterConstraints.uuid,
        ph_min: waterConstraints.ph_min,
        ph_max: waterConstraints.ph_max,
        gh_min: waterConstraints.gh_min,
        gh_max: waterConstraints.gh_max,
        temp_min: waterConstraints.temp_min,
        temp_max: waterConstraints.temp_max,
      })

      console.log('success')

      return waterConstraints
    }
    catch (e) {
      console.log('failed')

      console.log(e.message)

      if(e.message.includes("JWTExpired")){
        return new Error("JWT expired", 401)
      }
      return new Error(e.message, 400)
    }

  }



}
