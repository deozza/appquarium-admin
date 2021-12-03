import Services from "~/app/species/global/services/Services";
import Result from "~/app/utils/useCasesResult/Result";
import UseCaseError from "~/app/utils/useCasesResult/types/UseCaseError";
import Species from "~/app/species/global/entities/Species";
import User from "~/app/user/entities/User";
import WaterConstraints from "~/app/species/global/entities/WaterConstraints";
import HasuraAdapter from "~/app/species/global/adapters/HasuraAdapter";
import SpeciesUseCase from "~/app/species/global/useCases/UseCase";
import SpeciesFamily from "~/app/species/global/entities/SpeciesFamily";
import SpeciesGenre from "~/app/species/global/entities/SpeciesGenre";
import SpeciesNaming from "~/app/species/global/entities/SpeciesNaming";
import AnimalSpecs from "~/app/species/global/entities/AnimalSpecs";

jest.mock("~/app/species/global/adapters/HasuraAdapter")

describe('Testing FishUseCase.ts', () => {

  const jwt: string = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTYzODQ4NzE5OSwiZXhwIjoxNjM4NDkwNzk5LCJ1c2VyX2lkIjoidXNlcl9pZCJ9.Z1IMEdYiFm_HmI8vTa5qGwEMV8rg4I2vhP5pDu8EODI'
  /*
    {
      "sub": "1234567890",
      "name": "John Doe",
      "admin": true,
      "iat": 1638487199,
      "exp": 1638490799,
      "user_id": "user_id"
    }
   */

  const user: User = new User(jwt)
  const service: Services = new Services()

  test('queryTotalSpecies returns adapter response', async () => {

    HasuraAdapter.prototype.queryTotalSpecies = jest.fn().mockImplementationOnce(() => {
      return 1;
    });

    expect(await service.queryTotalSpecies('jwt')).toEqual(1)
  })

  test('queryListOfSpecies returns adapter response', async () => {

    HasuraAdapter.prototype.queryListOfSpecies = jest.fn().mockImplementationOnce(() => {
      return [];
    });

    expect(await service.queryListOfSpecies('jwt')).toEqual([])
  })

  test('queryGetSpecies returns adapter response', async () => {

    const species: Species = new Species([])

    HasuraAdapter.prototype.queryListOfSpecies = jest.fn().mockImplementationOnce(() => {
      return species;
    });

    expect(await service.queryGetSpecies('jwt', 'species_uuid')).toEqual(species)
  })

  test('querySpeciesCategories returns adapter response', async () => {

    HasuraAdapter.prototype.queryListOfSpeciesByCategory = jest.fn().mockImplementationOnce(() => {
      return [];
    });

    expect(await service.querySpeciesCategories('jwt')).toEqual([])
  })

  test('querySpeciesOrigins returns adapter response', async () => {

    HasuraAdapter.prototype.queryListOfSpeciesOrigins = jest.fn().mockImplementationOnce(() => {
      return [];
    });

    expect(await service.querySpeciesOrigins('jwt')).toEqual([])
  })

  test('initNewSpecies with valid category', () => {

    const fish: Species = service.initNewSpecies(user, 'fish')

    const expectedFish: Species = new Species([])
    expectedFish.category = 'fish'
    expectedFish.user = 'user_id'
    expectedFish.publication_state = 'DRAFT'
    expectedFish.species_naming.species_family.category = 'fish'
    expectedFish.species_naming.species_family.user = 'user_id'
    expectedFish.species_naming.species_genre.category = 'fish'
    expectedFish.species_naming.species_genre.user = 'user_id'

    expect(fish).toEqual(fish)
  })

  test('createSpecies returns adapter response', async () => {
    const species: Species = new Species([])

    HasuraAdapter.prototype.mutationCreateSpecies = jest.fn().mockImplementationOnce(() => {
      return 'species_uuid';
    });

    expect(await service.createSpecies('jwt', species)).toEqual('species_uuid')
  })

  test('createSpeciesFamily returns adapter response', async () => {
    const speciesFamily: SpeciesFamily = new SpeciesFamily([])

    HasuraAdapter.prototype.mutationCreateSpeciesFamily = jest.fn().mockImplementationOnce(() => {
      return 'species_uuid';
    });

    expect(await service.createSpeciesFamily('jwt', speciesFamily)).toEqual('species_uuid')
  })

  test('createSpeciesGenre returns adapter response', async () => {
    const speciesGenre: SpeciesGenre = new SpeciesGenre([])

    HasuraAdapter.prototype.mutationCreateSpeciesGenre = jest.fn().mockImplementationOnce(() => {
      return 'species_uuid';
    });

    expect(await service.createSpeciesGenre('jwt', speciesGenre)).toEqual('species_uuid')
  })

  test('checkWaterConstraintsAreValid with valid waterConstraints', () => {
    const validWaterConstraints: WaterConstraints = new WaterConstraints([])
    validWaterConstraints.temp_min = 20
    validWaterConstraints.temp_max = 25
    validWaterConstraints.ph_min = 6
    validWaterConstraints.ph_max = 8
    validWaterConstraints.gh_min = 20
    validWaterConstraints.gh_max = 30

    const serviceProto = Object.getPrototypeOf(service)
    const result = serviceProto.checkWaterConstraintsAreValid(validWaterConstraints)
    const expectedResult = new Result()

    expect(result).toEqual(expectedResult)
  })

  test('updateSpeciesNaming returns adapter response', async () => {
    const speciesNaming: SpeciesNaming = new SpeciesNaming([])

    HasuraAdapter.prototype.mutationUpdateSpeciesNaming = jest.fn().mockImplementationOnce(() => {
      return 'species_uuid';
    });

    expect(await service.updateSpeciesNaming('jwt', speciesNaming)).toEqual('species_uuid')
  })

  test('checkWaterConstraintsAreValid with invalid temp', () => {
    const validWaterConstraints: WaterConstraints = new WaterConstraints([])
    validWaterConstraints.temp_min = 20
    validWaterConstraints.temp_max = 15
    validWaterConstraints.ph_min = 6
    validWaterConstraints.ph_max = 8
    validWaterConstraints.gh_min = 20
    validWaterConstraints.gh_max = 30

    const serviceProto = Object.getPrototypeOf(service)
    const result = serviceProto.checkWaterConstraintsAreValid(validWaterConstraints)
    const expectedResult = new Result()
    expectedResult.errors = [new UseCaseError("temp_min", 400)]

    expect(result).toEqual(expectedResult)
  })

  test('checkWaterConstraintsAreValid with invalid gh', () => {
    const validWaterConstraints: WaterConstraints = new WaterConstraints([])
    validWaterConstraints.temp_min = 20
    validWaterConstraints.temp_max = 25
    validWaterConstraints.ph_min = 6
    validWaterConstraints.ph_max = 8
    validWaterConstraints.gh_min = 20
    validWaterConstraints.gh_max = 10

    const serviceProto = Object.getPrototypeOf(service)
    const result = serviceProto.checkWaterConstraintsAreValid(validWaterConstraints)
    const expectedResult = new Result()
    expectedResult.errors = [new UseCaseError("gh_min", 400)]

    expect(result).toEqual(expectedResult)
  })

  test('checkWaterConstraintsAreValid with invalid ph', () => {
    const validWaterConstraints: WaterConstraints = new WaterConstraints([])
    validWaterConstraints.temp_min = 20
    validWaterConstraints.temp_max = 25
    validWaterConstraints.ph_min = 10
    validWaterConstraints.ph_max = 8
    validWaterConstraints.gh_min = 20
    validWaterConstraints.gh_max = 30

    const serviceProto = Object.getPrototypeOf(service)
    const result = serviceProto.checkWaterConstraintsAreValid(validWaterConstraints)
    const expectedResult = new Result()
    expectedResult.errors = [new UseCaseError("ph_min", 400)]

    expect(result).toEqual(expectedResult)
  })

  test('createWaterConstraints with valid waterConstraints and successful request', async () => {
    const validWaterConstraints: WaterConstraints = new WaterConstraints([])
    validWaterConstraints.temp_min = 20
    validWaterConstraints.temp_max = 25
    validWaterConstraints.ph_min = 6
    validWaterConstraints.ph_max = 8
    validWaterConstraints.gh_min = 20
    validWaterConstraints.gh_max = 30

    HasuraAdapter.prototype.mutationCreateWaterConstraints = jest.fn().mockImplementationOnce(() => {
      return 'water_constraints_uuid';
    });

    expect(await service.createWaterConstraints('jwt', 'species_uuid', validWaterConstraints)).toEqual('water_constraints_uuid')
  })

  test('createWaterConstraints with valid waterConstraints and failed request', async () => {
    const validWaterConstraints: WaterConstraints = new WaterConstraints([])
    validWaterConstraints.temp_min = 20
    validWaterConstraints.temp_max = 25
    validWaterConstraints.ph_min = 6
    validWaterConstraints.ph_max = 8
    validWaterConstraints.gh_min = 20
    validWaterConstraints.gh_max = 30

    HasuraAdapter.prototype.mutationCreateWaterConstraints = jest.fn().mockImplementationOnce(() => {
      return [new UseCaseError('error from adapter', 400)];
    });

    expect(await service.createWaterConstraints('jwt', 'species_uuid', validWaterConstraints)).toEqual([new UseCaseError('error from adapter', 400)])
  })

  test('createWaterConstraints with invalid waterConstraints', async () => {
    const validWaterConstraints: WaterConstraints = new WaterConstraints([])
    validWaterConstraints.temp_min = 10
    validWaterConstraints.temp_max = 25
    validWaterConstraints.ph_min = 6
    validWaterConstraints.ph_max = 8
    validWaterConstraints.gh_min = 20
    validWaterConstraints.gh_max = 30

    expect(await service.createWaterConstraints('jwt', 'species_uuid', validWaterConstraints)).toEqual([new UseCaseError("ph_min", 400)])
  })

  test('updateWaterConstraints with valid waterConstraints and successful request', async () => {
    const validWaterConstraints: WaterConstraints = new WaterConstraints([])
    validWaterConstraints.temp_min = 20
    validWaterConstraints.temp_max = 25
    validWaterConstraints.ph_min = 6
    validWaterConstraints.ph_max = 8
    validWaterConstraints.gh_min = 20
    validWaterConstraints.gh_max = 30

    HasuraAdapter.prototype.mutationEditWaterConstraints = jest.fn().mockImplementationOnce(() => {
      return 'water_constraints_uuid';
    });

    expect(await service.updateWaterConstraints('jwt',  validWaterConstraints)).toEqual('water_constraints_uuid')
  })

  test('updateWaterConstraints with valid waterConstraints and failed request', async () => {
    const validWaterConstraints: WaterConstraints = new WaterConstraints([])
    validWaterConstraints.temp_min = 20
    validWaterConstraints.temp_max = 25
    validWaterConstraints.ph_min = 6
    validWaterConstraints.ph_max = 8
    validWaterConstraints.gh_min = 20
    validWaterConstraints.gh_max = 30

    HasuraAdapter.prototype.mutationEditWaterConstraints = jest.fn().mockImplementationOnce(() => {
      return [new UseCaseError('error from adapter', 400)];
    });

    expect(await service.updateWaterConstraints('jwt',  validWaterConstraints)).toEqual([new UseCaseError('error from adapter', 400)])
  })

  test('updateWaterConstraints with invalid waterConstraints', async () => {
    const validWaterConstraints: WaterConstraints = new WaterConstraints([])
    validWaterConstraints.temp_min = 10
    validWaterConstraints.temp_max = 25
    validWaterConstraints.ph_min = 6
    validWaterConstraints.ph_max = 8
    validWaterConstraints.gh_min = 20
    validWaterConstraints.gh_max = 30

    expect(await service.updateWaterConstraints('jwt',  validWaterConstraints)).toEqual([new UseCaseError("ph_min", 400)])
  })

  test('createAnimalSpecs returns adapter response', async () => {
    const animalSpecs: AnimalSpecs = new AnimalSpecs([])

    HasuraAdapter.prototype.mutationCreateAnimalSpecs = jest.fn().mockImplementationOnce(() => {
      return 'animal_specs_uuid';
    });

    expect(await service.createAnimalSpecs('jwt', 'species_uuid', animalSpecs)).toEqual('animal_specs_uuid')
  })

  test('( returns adapter response', async () => {
    const animalSpecs: AnimalSpecs = new AnimalSpecs([])

    HasuraAdapter.prototype.mutationAddAnimalSpecsToSpecies = jest.fn().mockImplementationOnce(() => {
      return 'animal_specs_uuid';
    });

    expect(await service.addAnimalSpecsToSpecies('jwt', 'species_uuid', animalSpecs)).toEqual('animal_specs_uuid')
  })

  test('updateAnimalSpecs returns adapter response', async () => {
    const animalSpecs: AnimalSpecs = new AnimalSpecs([])

    HasuraAdapter.prototype.mutationEditAnimalSpecs = jest.fn().mockImplementationOnce(() => {
      return 'animal_specs_uuid';
    });

    expect(await service.updateAnimalSpecs('jwt',  animalSpecs)).toEqual('animal_specs_uuid')
  })

  test('updatePublicationState returns adapter response', async () => {
    HasuraAdapter.prototype.mutationUpdatePublicationState = jest.fn().mockImplementationOnce(() => {
      return 'species_uuid';
    });

    expect(await service.updatePublicationState('jwt',  'species_uuid', 'new_state')).toEqual('species_uuid')
  })

})
