import AdapterInterface from "~/app/species/global/adapters/AdapterInterface";
import HasuraClient from "~/app/utils/hasura/HasuraClient";
import Error from "~/app/utils/useCasesResult/types/Error";
import Species from "~/app/species/global/entities/Species";
import SpeciesGenre from "~/app/species/global/entities/SpeciesGenre";
import SpeciesFamily from "~/app/species/global/entities/SpeciesFamily";
import WaterConstraints from "~/app/species/global/entities/WaterConstraints";
import SpeciesNaming from "~/app/species/global/entities/SpeciesNaming";
import HasuraQueryBuilder from "~/app/utils/hasura/HasuraRequestBuilder/HasuraQueryBuilder";
import HasuraMutationInsertBuilder from "~/app/utils/hasura/HasuraRequestBuilder/HasuraMutationInsertBuilder";
import HasuraMutationUpdateBuilder from "~/app/utils/hasura/HasuraRequestBuilder/HasuraMutationUpdateBuilder";

export default class HasuraAdapter extends HasuraClient implements AdapterInterface{

  async queryTotalSpecies(): Promise<number | null> {

    let queryBuilder: HasuraQueryBuilder = new HasuraQueryBuilder('species_aggregate')
    queryBuilder.addReturn('aggregate {count}')
    const query: string = queryBuilder.getRequest()

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
    let queryBuilder: HasuraQueryBuilder = new HasuraQueryBuilder('species')
    queryBuilder.addOrderBy('created_at')
    queryBuilder.addReturn('uuid', 'category', 'publication_state', 'created_at', 'updated_at', 'species_naming {name,  species_genre {name}}')

    const query: string = queryBuilder.getRequest()

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
    let queryBuilder: HasuraQueryBuilder = new HasuraQueryBuilder('species_by_pk')

    queryBuilder.addParam('$uuid', 'uuid!', uuid)

    queryBuilder.addByPk('uuid', '$uuid')

    queryBuilder.addReturn('uuid', 'created_at', 'updated_at', 'category', 'origin', 'publication_state')
    queryBuilder.addReturn('species_naming {uuid, created_at, updated_at, name, common_names, old_names, species_family {name, uuid}, species_genre {name, uuid}}')
    queryBuilder.addReturn('water_constraint {uuid, created_at, updated_at, ph_min, ph_max, gh_min, gh_max, temp_min ,temp_max}')

    const query: string = queryBuilder.getRequest()

    try {
      const data = await this.client.request(query,{
        uuid: uuid
      })

      return new Species(data.species_by_pk)
    }
    catch (e) {
      if(e.message.includes("JWTExpired")){
        return new Error("JWT expired", 401)

      }
      return new Error(e.message, 400)
    }
  }


  async queryListOfSpeciesCategories(): Promise<Array<string> | Error> {
    let queryBuilder: HasuraQueryBuilder = new HasuraQueryBuilder('species_categories')
    queryBuilder.addReturn('name')

    const query: string = queryBuilder.getRequest()

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
    let queryBuilder: HasuraQueryBuilder = new HasuraQueryBuilder('species_family')
    queryBuilder.addReturn('uuid', 'name', 'category', 'user')
    queryBuilder.addParam('$category', 'species_categories_enum', category)
    queryBuilder.addWhere('category', '_eq', '$category')
    const query: string = queryBuilder.getRequest()

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
    let queryBuilder: HasuraQueryBuilder = new HasuraQueryBuilder('species_genre')
    queryBuilder.addReturn('uuid', 'name', 'category', 'user')
    queryBuilder.addParam('$category', 'species_categories_enum', category)
    queryBuilder.addWhere('category', '_eq', '$category')
    const query: string = queryBuilder.getRequest()
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
    let queryBuilder: HasuraQueryBuilder = new HasuraQueryBuilder('species_origin')
    queryBuilder.addReturn('name')
    const query: string = queryBuilder.getRequest()

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
    let queryBuilder: HasuraQueryBuilder = new HasuraQueryBuilder('species')
    queryBuilder.addReturn('uuid', 'created_at', 'updated_at', 'category', 'publication_state', 'species_naming {name, species_genre {name}}')
    queryBuilder.addParam('$category', 'species_categories_enum', category)
    queryBuilder.addWhere('category', '_eq', '$category')
    queryBuilder.addOrderBy('created_at')

    const query: string = queryBuilder.getRequest()

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

  async mutationCreateSpeciesFamily(speciesFamily: SpeciesFamily): Promise<string | Error>{
    let queryBuilder: HasuraMutationInsertBuilder = new HasuraMutationInsertBuilder('insert_species_family_one')
    queryBuilder.addParam('$category', 'species_categories_enum', speciesFamily.category)
    queryBuilder.addParam('$name', 'String', speciesFamily.name)
    queryBuilder.addInsert('category', '$category')
    queryBuilder.addInsert('name', '$name')
    queryBuilder.addReturn('uuid')

    const mutation: string = queryBuilder.getRequest()

    try {
      const data = await this.client.request(mutation, {
        category: speciesFamily.category,
        name: speciesFamily.name,
      })
      return data.insert_species_family_one.uuid
    }
    catch (e) {
      if(e.message.includes("JWTExpired")){
        return new Error("JWT expired", 401)
      }
      return new Error(e.message, 400)
    }
  }

  async mutationCreateSpeciesGenre(speciesGenre: SpeciesGenre): Promise<string | Error>{
    let queryBuilder: HasuraMutationInsertBuilder = new HasuraMutationInsertBuilder('insert_species_genre_one')
    queryBuilder.addParam('$category', 'species_categories_enum', speciesGenre.category)
    queryBuilder.addParam('$name', 'String', speciesGenre.name)
    queryBuilder.addInsert('category', '$category')
    queryBuilder.addInsert('name', '$name')
    queryBuilder.addReturn('uuid')

    const mutation: string = queryBuilder.getRequest()

    try {
      const data = await this.client.request(mutation, {
        category: speciesGenre.category,
        name: speciesGenre.name,
      })
      return data.insert_species_genre_one.uuid
    }
    catch (e) {
      if(e.message.includes("JWTExpired")){
        return new Error("JWT expired", 401)
      }
      return new Error(e.message, 400)
    }
  }

  async mutationCreateSpecies(species: Species): Promise<string | Error> {

    const mutation: string = 'mutation ($category: species_categories_enum, $family: uuid!, $genre: uuid!, $name: String!) {insert_species_one(object: {category: $category, species_naming: {data: {family: $family, genre: $genre, name: $name}}}) {uuid}}'

    try {
      const data = await this.client.request(mutation,{
        category: species.category,
        name: species.species_naming.name,
        family: species.species_naming.species_family.uuid,
        genre: species.species_naming.species_genre.uuid
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

  async mutationUpdateSpeciesNaming(speciesNaming: SpeciesNaming): Promise<SpeciesNaming | Error>{
    let queryBuilder: HasuraMutationUpdateBuilder = new HasuraMutationUpdateBuilder('update_species_naming_by_pk')
    queryBuilder.addParam('$uuid', 'uuid!', speciesNaming.uuid)
    queryBuilder.addParam('$genre', 'uuid', speciesNaming.species_genre.uuid)
    queryBuilder.addParam('$family', 'uuid', speciesNaming.species_family.uuid)
    queryBuilder.addParam('$name', 'String', speciesNaming.name)
    queryBuilder.addPkColumn('uuid', '$uuid')
    queryBuilder.addInsert('genre', '$genre')
    queryBuilder.addInsert('family', '$family')
    queryBuilder.addInsert('name', '$name')
    queryBuilder.addReturn('uuid','updated_at', 'name', 'common_names', 'old_names', 'species_family {name}', 'species_genre {name}')

    const mutation: string = queryBuilder.getRequest()

    try {
      const data = await this.client.request(mutation, {
        uuid: speciesNaming.uuid,
        genre: speciesNaming.species_genre.uuid,
        family: speciesNaming.species_family.uuid,
        name: speciesNaming.name
      })
      return data.insert_species_genre_one.uuid
    }
    catch (e) {
      if(e.message.includes("JWTExpired")){
        return new Error("JWT expired", 401)
      }
      return new Error(e.message, 400)
    }
  }

  async mutationCreateWaterConstraints(uuid: string, waterConstraints: WaterConstraints): Promise<string | Array<Error>> {
    let queryBuilder: HasuraMutationInsertBuilder = new HasuraMutationInsertBuilder('insert_water_constraints_one')
    queryBuilder.addParam('$ph_min', 'numeric', waterConstraints.ph_min)
    queryBuilder.addParam('$ph_max', 'numeric', waterConstraints.ph_max)
    queryBuilder.addParam('$gh_min', 'Int', waterConstraints.gh_min)
    queryBuilder.addParam('$gh_max', 'Int', waterConstraints.gh_max)
    queryBuilder.addParam('$temp_min', 'Int', waterConstraints.temp_min)
    queryBuilder.addParam('$temp_max', 'Int', waterConstraints.temp_max)

    queryBuilder.addInsert('ph_min', '$ph_min')
    queryBuilder.addInsert('ph_max', '$ph_max')
    queryBuilder.addInsert('gh_min', '$gh_min')
    queryBuilder.addInsert('gh_max', '$gh_max')
    queryBuilder.addInsert('temp_min', '$temp_min')
    queryBuilder.addInsert('temp_max', '$temp_max')

    queryBuilder.addReturn('uuid')
    const mutation: string = queryBuilder.getRequest()

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

    let queryBuilder: HasuraMutationUpdateBuilder = new HasuraMutationUpdateBuilder('update_species_by_pk')

    queryBuilder.addParam('$speciesUuid', 'uuid!', speciesUuid)
    queryBuilder.addParam('$waterConstraintsUuid', 'uuid', waterConstraints.uuid)

    queryBuilder.addPkColumn('uuid', '$speciesUuid')

    queryBuilder.addInsert('water_constraints', '$waterConstraintsUuid')

    queryBuilder.addReturn('uuid')

    const mutation: string = queryBuilder.getRequest()

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

  async mutationEditWaterConstraints(waterConstraints: WaterConstraints): Promise<WaterConstraints | Array<Error>> {
    let queryBuilder: HasuraMutationUpdateBuilder = new HasuraMutationUpdateBuilder('update_water_constraints_by_pk')

    queryBuilder.addParam('$uuid', 'uuid!', waterConstraints.uuid)
    queryBuilder.addParam('$ph_min', 'numeric', waterConstraints.ph_min)
    queryBuilder.addParam('$ph_max', 'numeric', waterConstraints.ph_max)
    queryBuilder.addParam('$gh_min', 'Int', waterConstraints.gh_min)
    queryBuilder.addParam('$gh_max', 'Int', waterConstraints.gh_max)
    queryBuilder.addParam('$temp_min', 'Int', waterConstraints.temp_min)
    queryBuilder.addParam('$temp_max', 'Int', waterConstraints.temp_max)

    queryBuilder.addPkColumn('uuid', '$uuid')

    queryBuilder.addInsert('ph_min', '$ph_min')
    queryBuilder.addInsert('ph_max', '$ph_max')
    queryBuilder.addInsert('gh_min', '$gh_min')
    queryBuilder.addInsert('gh_max', '$gh_max')
    queryBuilder.addInsert('temp_min', '$temp_min')
    queryBuilder.addInsert('temp_max', '$temp_max')

    queryBuilder.addReturn('uuid')

    const mutation: string = queryBuilder.getRequest()

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

      return waterConstraints
    }
    catch (e) {
      if(e.message.includes("JWTExpired")){
        return [new Error("JWT expired", 401)]
      }
      return [new Error(e.message, 400)]
    }

  }
}
