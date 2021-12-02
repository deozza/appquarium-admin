import InvertebrateUseCase from "~/app/species/invertebrate/useCases/UseCase";
import Services from "~/app/species/invertebrate/services/Services";
import Result from "~/app/utils/useCasesResult/Result";
import UseCaseSuccess from "~/app/utils/useCasesResult/types/UseCaseSuccess";
import UseCaseError from "~/app/utils/useCasesResult/types/UseCaseError";

jest.mock("~/app/species/invertebrate/services/Services")

describe('Testing InvertebrateUseCase.ts', () => {

  test('getListOfInvertebrates returns success on Services success', async () => {

    Services.prototype.queryGetListOfInvertebrates = jest.fn().mockImplementationOnce(() => {
      return [];
    });

    const useCase: InvertebrateUseCase = new InvertebrateUseCase()

    const expectedResponse: Result = new Result()
    expectedResponse.content = []
    expectedResponse.success = new UseCaseSuccess('Query is ok', 200)

    expect(await useCase.getListOfInvertebrates('jwt')).toEqual(expectedResponse)
  })

  test('getListOfInvertebrates returns UseCaseError on Services error', async () => {

    Services.prototype.queryGetListOfInvertebrates = jest.fn().mockImplementationOnce(() => {
      return new UseCaseError('Adapter error', 400);
    });

    const useCase: InvertebrateUseCase = new InvertebrateUseCase()

    const expectedResponse: Result = new Result()
    expectedResponse.content = {}
    expectedResponse.errors = [new UseCaseError('Adapter error', 400)]

    expect(await useCase.getListOfInvertebrates('jwt')).toEqual(expectedResponse)
  })

  test('getInvertebrateGenres returns success on Services success', async () => {

    Services.prototype.queryInvertebrateGenres = jest.fn().mockImplementationOnce(() => {
      return [];
    });

    const useCase: InvertebrateUseCase = new InvertebrateUseCase()

    const expectedResponse: Result = new Result()
    expectedResponse.content = []
    expectedResponse.success = new UseCaseSuccess('Query is ok', 200)

    expect(await useCase.getInvertebrateGenres('jwt')).toEqual(expectedResponse)
  })

  test('getInvertebrateGenres returns UseCaseError on Services error', async () => {

    Services.prototype.queryInvertebrateGenres = jest.fn().mockImplementationOnce(() => {
      return new UseCaseError('Adapter error', 400);
    });

    const useCase: InvertebrateUseCase = new InvertebrateUseCase()

    const expectedResponse: Result = new Result()
    expectedResponse.content = {}
    expectedResponse.errors = [new UseCaseError('Adapter error', 400)]

    expect(await useCase.getInvertebrateGenres('jwt')).toEqual(expectedResponse)
  })


  test('getInvertebrateFamilies returns success on Services success', async () => {

    Services.prototype.queryInvertebrateFamilies = jest.fn().mockImplementationOnce(() => {
      return [];
    });

    const useCase: InvertebrateUseCase = new InvertebrateUseCase()

    const expectedResponse: Result = new Result()
    expectedResponse.content = []
    expectedResponse.success = new UseCaseSuccess('Query is ok', 200)

    expect(await useCase.getInvertebrateFamilies('jwt')).toEqual(expectedResponse)
  })

  test('getInvertebrateFamilies returns UseCaseError on Services error', async () => {

    Services.prototype.queryInvertebrateFamilies = jest.fn().mockImplementationOnce(() => {
      return new UseCaseError('Adapter error', 400);
    });

    const useCase: InvertebrateUseCase = new InvertebrateUseCase()

    const expectedResponse: Result = new Result()
    expectedResponse.content = {}
    expectedResponse.errors = [new UseCaseError('Adapter error', 400)]

    expect(await useCase.getInvertebrateFamilies('jwt')).toEqual(expectedResponse)
  })
})
