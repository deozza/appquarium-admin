import AdapterInterface from "~/app/species/global/adapters/AdapterInterface";
import HasuraClient from "~/app/utils/hasura/HasuraClient";
import Error from "~/app/utils/useCasesResult/types/Error";
import Species from "~/app/species/global/entities/Species";
import SpeciesGenre from "~/app/species/global/entities/SpeciesGenre";
import SpeciesFamily from "~/app/species/global/entities/SpeciesFamily";

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
        updated_at
        publication_state
        uuid
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

}
