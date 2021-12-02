import FishUseCase from "~/app/species/fish/useCases/UseCase";
import Services from "~/app/species/fish/services/Services";
import Result from "~/app/utils/useCasesResult/Result";
import UseCaseSuccess from "~/app/utils/useCasesResult/types/UseCaseSuccess";
import UseCaseError from "~/app/utils/useCasesResult/types/UseCaseError";
import Species from "~/app/species/global/entities/Species";
import User from "~/app/user/entities/User";

jest.mock("~/app/species/fish/services/Services")

describe('Testing FishUseCase.ts', () => {

  test('getListOfFishes returns success on Services success', async () => {

    Services.prototype.queryGetListOfFishes = jest.fn().mockImplementationOnce(() => {
      return [];
    });

    const useCase: FishUseCase = new FishUseCase()

    const expectedResponse: Result = new Result()
    expectedResponse.content = []
    expectedResponse.success = new UseCaseSuccess('Query is ok', 200)

    expect(await useCase.getListOfFishes('jwt')).toEqual(expectedResponse)
  })

  test('getListOfFishes returns UseCaseError on Services error', async () => {

    Services.prototype.queryGetListOfFishes = jest.fn().mockImplementationOnce(() => {
      return new UseCaseError('Adapter error', 400);
    });

    const useCase: FishUseCase = new FishUseCase()

    const expectedResponse: Result = new Result()
    expectedResponse.content = {}
    expectedResponse.errors = [new UseCaseError('Adapter error', 400)]

    expect(await useCase.getListOfFishes('jwt')).toEqual(expectedResponse)
  })

  test('getFishGenres returns success on Services success', async () => {

    Services.prototype.queryFishGenres = jest.fn().mockImplementationOnce(() => {
      return [];
    });

    const useCase: FishUseCase = new FishUseCase()

    const expectedResponse: Result = new Result()
    expectedResponse.content = []
    expectedResponse.success = new UseCaseSuccess('Query is ok', 200)

    expect(await useCase.getFishGenres('jwt')).toEqual(expectedResponse)
  })

  test('getFishGenres returns UseCaseError on Services error', async () => {

    Services.prototype.queryFishGenres = jest.fn().mockImplementationOnce(() => {
      return new UseCaseError('Adapter error', 400);
    });

    const useCase: FishUseCase = new FishUseCase()

    const expectedResponse: Result = new Result()
    expectedResponse.content = {}
    expectedResponse.errors = [new UseCaseError('Adapter error', 400)]

    expect(await useCase.getFishGenres('jwt')).toEqual(expectedResponse)
  })


  test('getFishFamilies returns success on Services success', async () => {

    Services.prototype.queryFishFamilies = jest.fn().mockImplementationOnce(() => {
      return [];
    });

    const useCase: FishUseCase = new FishUseCase()

    const expectedResponse: Result = new Result()
    expectedResponse.content = []
    expectedResponse.success = new UseCaseSuccess('Query is ok', 200)

    expect(await useCase.getFishFamilies('jwt')).toEqual(expectedResponse)
  })

  test('getFishFamilies returns UseCaseError on Services error', async () => {

    Services.prototype.queryFishFamilies = jest.fn().mockImplementationOnce(() => {
      return new UseCaseError('Adapter error', 400);
    });

    const useCase: FishUseCase = new FishUseCase()

    const expectedResponse: Result = new Result()
    expectedResponse.content = {}
    expectedResponse.errors = [new UseCaseError('Adapter error', 400)]

    expect(await useCase.getFishFamilies('jwt')).toEqual(expectedResponse)
  })

  test('initNewFish', () => {
    const useCase: FishUseCase = new FishUseCase()

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
    const fish: Species = useCase.initNewFish(user)

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

})
