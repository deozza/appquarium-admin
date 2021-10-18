import UseCaseInterface from "~/app/species/global/useCases/UseCaseInterface";
import Result from "~/app/utils/useCasesResult/Result";
import Services from "~/app/species/global/services/Services";
import Error from "~/app/utils/useCasesResult/types/Error";
import Species from "~/app/species/global/entities/Species";
import WaterConstraints from "~/app/species/global/entities/WaterConstraints";

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

  async addOrEditWaterConstraints(jwt: string, species: Species): Promise<Result> {
    let result: Result = new Result()
    const speciesService: Services = new Services()
    let updatedSpecies: WaterConstraints | Error

    if(species.water_constraint.uuid !== ''){

      console.log('in update if')

      updatedSpecies = await speciesService.updateWaterConstraints(jwt, species.water_constraint)
    }else{
      const createdWaterConstraintsUuid : string | Array<Error> = await speciesService.createWaterConstraints(jwt, species.uuid, species.water_constraint)

      if(typeof createdWaterConstraintsUuid !== 'string'){
        result.errors = createdWaterConstraintsUuid
        return result
      }

      species.water_constraint.uuid = createdWaterConstraintsUuid

      updatedSpecies = await speciesService.addWaterConstraintsToSpecies(jwt, species.uuid, species.water_constraint)
    }

    if(updatedSpecies instanceof Error) {
      result.errors.push(updatedSpecies)
      return result
    }

    result.addSuccess('Query is OK', 201)
    return result

  }

}
