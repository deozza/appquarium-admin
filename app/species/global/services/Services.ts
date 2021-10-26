import ServicesInterface from "~/app/species/global/services/ServicesInterface";
import AdapterInterface from "~/app/species/global/adapters/AdapterInterface";
import HasuraAdapter from "~/app/species/global/adapters/HasuraAdapter";
import Error from "~/app/utils/useCasesResult/types/Error";
import Species from "~/app/species/global/entities/Species";
import WaterConstraints from "~/app/species/global/entities/WaterConstraints";
import Result from "~/app/utils/useCasesResult/Result";
import User from "~/app/user/entities/User";
import SpeciesNaming from "~/app/species/global/entities/SpeciesNaming";

export default class Services implements ServicesInterface {
  async queryTotalSpecies(jwt: string): Promise<number|null> {
    const adapter: AdapterInterface = new HasuraAdapter(jwt)

    return await adapter.queryTotalSpecies()
  }

  async queryListOfSpecies(jwt: string): Promise<Array<Species>|Error> {
    const adapter: AdapterInterface = new HasuraAdapter(jwt)

    return await adapter.queryListOfSpecies()
  }

  async queryGetSpecies(jwt: string, uuid: string): Promise<Species|Error> {
    const adapter: AdapterInterface = new HasuraAdapter(jwt)

    return await adapter.queryGetSpecies(uuid)
  }

  async querySpeciesCategories(jwt: string): Promise<Array<string>|Error> {
    const adapter: AdapterInterface = new HasuraAdapter(jwt)

    return await adapter.queryListOfSpeciesCategories()
  }

  async querySpeciesOrigins(jwt: string): Promise<Array<string> | Error> {
    const adapter: AdapterInterface = new HasuraAdapter(jwt)

    return await adapter.queryListOfSpeciesOrigins()
  }

  initNewSpecies(user: User, category: string): Species {
    let newSpecies = new Species([])
    newSpecies.category = category
    newSpecies.user = user.uid
    newSpecies.publication_state = 'DRAFT'
    newSpecies.species_naming.species_family.category = category
    newSpecies.species_naming.species_family.user = user.uid
    newSpecies.species_naming.species_genre.category = category
    newSpecies.species_naming.species_genre.user = user.uid

    return newSpecies
  }

  async createSpecies(jwt: string, species: Species): Promise<string | Error> {
    const adapter: AdapterInterface = new HasuraAdapter(jwt)

    return await adapter.mutationCreateSpecies(species)
  }

  async updateSpeciesNaming(jwt: string, speciesNaming: SpeciesNaming): Promise<SpeciesNaming | Error> {
    const adapter: AdapterInterface = new HasuraAdapter(jwt)

    if(speciesNaming.species_family.uuid === ''){
      const newSpeciesFamily: string | Error = await adapter.mutationCreateSpeciesFamily(speciesNaming.species_family)
      if(newSpeciesFamily instanceof Error){
        return newSpeciesFamily
      }

      speciesNaming.species_family.uuid = newSpeciesFamily
    }

    if(speciesNaming.species_genre.uuid === ''){
      const newSpeciesGenre: string | Error = await adapter.mutationCreateSpeciesGenre(speciesNaming.species_genre)
      if(newSpeciesGenre instanceof Error){
        return newSpeciesGenre
      }

      speciesNaming.species_genre.uuid = newSpeciesGenre
    }

    return await adapter.mutationUpdateSpeciesNaming(speciesNaming)
  }

  async createWaterConstraints(jwt: string, uuid: string, waterConstraints: WaterConstraints): Promise<string | Array<Error>> {
    const areConstraintsValid: Result = Services.checkWaterConstraintsAreValid(waterConstraints)

    if(areConstraintsValid.isFailed()){
      return areConstraintsValid.errors
    }

    const adapter: AdapterInterface = new HasuraAdapter(jwt)

    const waterConstraintsUuid: string | Array<Error> = await adapter.mutationCreateWaterConstraints(uuid, waterConstraints)

    if(typeof waterConstraintsUuid !== 'string'){
      return waterConstraintsUuid
    }

    return waterConstraintsUuid
  }

  async addWaterConstraintsToSpecies(jwt: string, speciesUuid: string, waterConstraints: WaterConstraints): Promise<WaterConstraints | Error> {
    const adapter: AdapterInterface = new HasuraAdapter(jwt)

    return await adapter.mutationAddWaterConstraintsToSpecies(waterConstraints, speciesUuid)
  }

  async updateWaterConstraints(jwt: string, waterConstraints: WaterConstraints): Promise<WaterConstraints | Array<Error>> {
    const areConstraintsValid: Result = Services.checkWaterConstraintsAreValid(waterConstraints)


    if(areConstraintsValid.isFailed()){
      return areConstraintsValid.errors
    }

    const adapter: AdapterInterface = new HasuraAdapter(jwt)

    return await adapter.mutationEditWaterConstraints(waterConstraints)
  }

  private static checkWaterConstraintsAreValid(waterConstraints: WaterConstraints): Result {
    const result: Result = new Result()

    if(waterConstraints.ph_min > waterConstraints.ph_max){
      result.addError("ph_min", 400)
    }

    if(waterConstraints.gh_min > waterConstraints.gh_max){
      result.addError("gh_min", 400)
    }

    if(waterConstraints.temp_min > waterConstraints.temp_max){
      result.addError("temp_min", 400)
    }

    return result
  }


}
