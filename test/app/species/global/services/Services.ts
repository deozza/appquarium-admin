import Services from "~/app/species/global/services/Services";
import Result from "~/app/utils/useCasesResult/Result";
import UseCaseError from "~/app/utils/useCasesResult/types/UseCaseError";
import Species from "~/app/species/global/entities/Species";
import User from "~/app/user/entities/User";
import WaterConstraints from "~/app/species/global/entities/WaterConstraints";
import HasuraAdapter from "~/app/species/global/adapters/HasuraAdapter";

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

})
