import PlantUseCase from "~/app/species/plant/useCases/UseCase";
import Services from "~/app/species/plant/services/Services";
import Result from "~/app/utils/useCasesResult/Result";
import UseCaseSuccess from "~/app/utils/useCasesResult/types/UseCaseSuccess";
import UseCaseError from "~/app/utils/useCasesResult/types/UseCaseError";

jest.mock("~/app/species/plant/services/Services")

describe('Testing PlantUseCase.ts', () => {

  test('getListOfPlants returns success on Services success', async () => {

    Services.prototype.queryGetListOfPlants = jest.fn().mockImplementationOnce(() => {
      return [];
    });

    const useCase: PlantUseCase = new PlantUseCase()

    const expectedResponse: Result = new Result()
    expectedResponse.content = []
    expectedResponse.success = new UseCaseSuccess('Query is ok', 200)

    expect(await useCase.getListOfPlants('jwt')).toEqual(expectedResponse)
  })

  test('getListOfPlants returns UseCaseError on Services error', async () => {

    Services.prototype.queryGetListOfPlants = jest.fn().mockImplementationOnce(() => {
      return new UseCaseError('Adapter error', 400);
    });

    const useCase: PlantUseCase = new PlantUseCase()

    const expectedResponse: Result = new Result()
    expectedResponse.content = {}
    expectedResponse.errors = [new UseCaseError('Adapter error', 400)]

    expect(await useCase.getListOfPlants('jwt')).toEqual(expectedResponse)
  })

  test('getPlantGenres returns success on Services success', async () => {

    Services.prototype.queryPlantGenres = jest.fn().mockImplementationOnce(() => {
      return [];
    });

    const useCase: PlantUseCase = new PlantUseCase()

    const expectedResponse: Result = new Result()
    expectedResponse.content = []
    expectedResponse.success = new UseCaseSuccess('Query is ok', 200)

    expect(await useCase.getPlantGenres('jwt')).toEqual(expectedResponse)
  })

  test('getPlantGenres returns UseCaseError on Services error', async () => {

    Services.prototype.queryPlantGenres = jest.fn().mockImplementationOnce(() => {
      return new UseCaseError('Adapter error', 400);
    });

    const useCase: PlantUseCase = new PlantUseCase()

    const expectedResponse: Result = new Result()
    expectedResponse.content = {}
    expectedResponse.errors = [new UseCaseError('Adapter error', 400)]

    expect(await useCase.getPlantGenres('jwt')).toEqual(expectedResponse)
  })


  test('getPlantFamilies returns success on Services success', async () => {

    Services.prototype.queryPlantFamilies = jest.fn().mockImplementationOnce(() => {
      return [];
    });

    const useCase: PlantUseCase = new PlantUseCase()

    const expectedResponse: Result = new Result()
    expectedResponse.content = []
    expectedResponse.success = new UseCaseSuccess('Query is ok', 200)

    expect(await useCase.getPlantFamilies('jwt')).toEqual(expectedResponse)
  })

  test('getPlantFamilies returns UseCaseError on Services error', async () => {

    Services.prototype.queryPlantFamilies = jest.fn().mockImplementationOnce(() => {
      return new UseCaseError('Adapter error', 400);
    });

    const useCase: PlantUseCase = new PlantUseCase()

    const expectedResponse: Result = new Result()
    expectedResponse.content = {}
    expectedResponse.errors = [new UseCaseError('Adapter error', 400)]

    expect(await useCase.getPlantFamilies('jwt')).toEqual(expectedResponse)
  })
})
