import UseCaseInterface from "~/app/species/global/useCases/UseCaseInterface";
import Result from "~/app/utils/useCasesResult/Result";
import Services from "~/app/species/global/services/Services";
import Error from "~/app/utils/useCasesResult/types/Error";
import Species from "~/app/species/global/entities/Species";
import WaterConstraints from "~/app/species/global/entities/WaterConstraints";
import SpeciesNaming from "~/app/species/global/entities/SpeciesNaming";

export default class SpeciesUseCase implements UseCaseInterface{
  async getTotalSpecies(jwt: string): Promise<Result> {
    let result: Result = new Result()
    const speciesService: Services = new Services()

    const totalSpecies: number | null = await speciesService.queryTotalSpecies(jwt)

    if(totalSpecies === null){
      result.addError('Query failed', 400)
      return result
    }

    result.content = totalSpecies
    result.addSuccess("Query is ok", 200)
    return result
  }

  async getSpecies(jwt: string, uuid: string): Promise<Result> {
    let result: Result = new Result()
    const speciesService: Services = new Services()

    const species: Species | Error = await speciesService.queryGetSpecies(jwt, uuid)

    if(species instanceof Error){
      if(species.code === 400){
        result.addError('Query failed', species.code)
        return result
      }

      if(species.code === 404){
        result.addError('Species not found', species.code)
        return result
      }
    }

    result.content = species
    result.addSuccess("Query is ok", 200)
    return result
  }

  async getListOfSpecies(jwt: string): Promise<Result> {
    let result: Result = new Result()
    const speciesService: Services = new Services()

    const listOfSpecies: Array<Species> | Error = await speciesService.queryListOfSpecies(jwt)

    if(listOfSpecies instanceof Error){
      result.errors.push(listOfSpecies)
      return result
    }

    result.content = listOfSpecies
    result.addSuccess("Query is ok", 200)
    return result
  }

  async getSpeciesCategories(jwt: string): Promise<Result> {
    let result: Result = new Result()
    const speciesService: Services = new Services()

    const speciesCategories: Array<string> | Error = await speciesService.querySpeciesCategories(jwt)

    if(speciesCategories instanceof Error){
      result.errors.push(speciesCategories)
      return result
    }

    result.content = speciesCategories
    result.addSuccess("Query is ok", 200)
    return result
  }

  async getSpeciesOrigins(jwt: string): Promise<Result> {
    let result: Result = new Result()
    const speciesService: Services = new Services()

    const speciesOrigins: Array<string> | Error = await speciesService.querySpeciesOrigins(jwt)

    if(speciesOrigins instanceof Error){
      result.errors.push(speciesOrigins)
      return result
    }

    result.content = speciesOrigins
    result.addSuccess("Query is ok", 200)
    return result
  }

  async createSpecies(jwt: string, species: Species): Promise<Result> {
    let result: Result = new Result()
    const speciesService: Services = new Services()

    const updatedSpecies: Species | Error = await SpeciesUseCase.handleNewSpeciesNaming(jwt, species)

    if(updatedSpecies instanceof Error){
      result.errors.push(updatedSpecies)
      return result
    }

    const speciesResult: string | Error = await speciesService.createSpecies(jwt, updatedSpecies)

    if(speciesResult instanceof Error){
      result.errors.push(speciesResult)
      return result
    }

    result.addSuccess('Query is OK', 201)
    result.content = speciesResult
    return result
  }

  async updateSpeciesNaming(jwt: string, species: Species): Promise<Result> {
    let result: Result = new Result()
    const speciesService: Services = new Services()

    const updatedSpecies: Species | Error = await SpeciesUseCase.handleNewSpeciesNaming(jwt, species)

    if(updatedSpecies instanceof Error){
      result.errors.push(updatedSpecies)
      return result
    }

    const editedSpecies: SpeciesNaming | Error = await speciesService.updateSpeciesNaming(jwt, updatedSpecies.species_naming)
    if(editedSpecies instanceof Error){
      result.errors.push(editedSpecies)
      return result
    }

    result.addSuccess('Query is OK', 200)
    return result
  }

  private static async handleNewSpeciesNaming(jwt: string, species: Species): Promise<Species | Error> {
    const speciesService: Services = new Services()

    if(species.species_naming.species_family.uuid === ''){
      const newSpeciesFamily: string | Error = await speciesService.createSpeciesFamily(jwt, species.species_naming.species_family)
      if(newSpeciesFamily instanceof Error){
        return newSpeciesFamily
      }

      species.species_naming.species_family.uuid = newSpeciesFamily
    }

    if(species.species_naming.species_genre.uuid === ''){
      const newSpeciesGenre: string | Error = await speciesService.createSpeciesGenre(jwt, species.species_naming.species_genre)
      if(newSpeciesGenre instanceof Error){
        return newSpeciesGenre
      }

      species.species_naming.species_genre.uuid = newSpeciesGenre
    }

    return species
  }

  async updateWaterConstraints(jwt: string, species: Species): Promise<Result> {
    let result: Result = new Result()
    const speciesService: Services = new Services()
    const updatedWaterConstraints: WaterConstraints | Array<Error> = await speciesService.updateWaterConstraints(jwt, species.water_constraint)

    if(updatedWaterConstraints instanceof WaterConstraints) {
      result.addSuccess('Query is OK', 200)
      return result
    }

    result.errors = updatedWaterConstraints
    return result

  }

  async addWaterConstraints(jwt: string, species: Species): Promise<Result> {
    let result: Result = new Result()
    const speciesService: Services = new Services()
    const waterConstraintsUuid: string | Array<Error> = await speciesService.createWaterConstraints(jwt, species.uuid, species.water_constraint)

    if(typeof waterConstraintsUuid !== 'string'){
      result.errors = waterConstraintsUuid
      return result
    }

    species.water_constraint.uuid = waterConstraintsUuid

    const updatedSpecies: WaterConstraints | Error = await speciesService.addWaterConstraintsToSpecies(jwt, species.uuid, species.water_constraint)

    if(updatedSpecies instanceof Error) {
      result.errors.push(updatedSpecies)
      return result
    }

    result.addSuccess('Query is OK', 201)
    return result
  }
}
