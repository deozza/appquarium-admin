import SpeciesUseCase from "~/app/species/global/useCases/UseCase";
import Services from "~/app/species/global/services/Services";
import Result from "~/app/utils/useCasesResult/Result";
import UseCaseSuccess from "~/app/utils/useCasesResult/types/UseCaseSuccess";
import UseCaseError from "~/app/utils/useCasesResult/types/UseCaseError";
import Species from "~/app/species/global/entities/Species";
import User from "~/app/user/entities/User";
import AnimalSpecs from "~/app/species/global/entities/AnimalSpecs";
import WaterConstraints from "~/app/species/global/entities/WaterConstraints";

jest.mock("~/app/species/global/services/Services")

describe('Testing SpeciesUseCase.ts', () => {

  test('getTotalSpecies returns success on Services success', async () => {

    Services.prototype.queryTotalSpecies = jest.fn().mockImplementationOnce(() => {
      return 1;
    });

    const useCase: SpeciesUseCase = new SpeciesUseCase()

    const expectedResponse: Result = new Result()
    expectedResponse.content = 1
    expectedResponse.success = new UseCaseSuccess('Query is ok', 200)

    expect(await useCase.getTotalSpecies('jwt')).toEqual(expectedResponse)
  })

  test('getTotalSpecies returns error on null', async () => {

    Services.prototype.queryTotalSpecies = jest.fn().mockImplementationOnce(() => {
      return null;
    });

    const useCase: SpeciesUseCase = new SpeciesUseCase()

    const expectedResponse: Result = new Result()
    expectedResponse.errors = [new UseCaseError('Query failed', 400)]

    expect(await useCase.getTotalSpecies('jwt')).toEqual(expectedResponse)
  })

  test('getSpecies returns success on Services success', async () => {

    Services.prototype.queryGetSpecies = jest.fn().mockImplementationOnce(() => {
      return new Species([]);
    });

    const useCase: SpeciesUseCase = new SpeciesUseCase()

    const expectedResponse: Result = new Result()
    expectedResponse.content = new Species([])
    expectedResponse.success = new UseCaseSuccess('Query is ok', 200)
    const response: Result = await useCase.getSpecies('jwt', 'uuid')


    expect(response.isSuccessful()).toBeTruthy()
  })

  test('getSpecies returns error on Services failure error', async () => {

    Services.prototype.queryGetSpecies = jest.fn().mockImplementationOnce(() => {
      return new UseCaseError('error', 400);
    });

    const useCase: SpeciesUseCase = new SpeciesUseCase()

    const expectedResponse: Result = new Result()
    expectedResponse.errors = [new UseCaseError('Query failed', 400)]

    expect(await useCase.getSpecies('jwt', 'uuid')).toEqual(expectedResponse)
  })

  test('getSpecies returns error on Services failure not found', async () => {

    Services.prototype.queryGetSpecies = jest.fn().mockImplementationOnce(() => {
      return new UseCaseError('error', 404);
    });

    const useCase: SpeciesUseCase = new SpeciesUseCase()

    const expectedResponse: Result = new Result()
    expectedResponse.errors = [new UseCaseError('Species not found', 404)]

    expect(await useCase.getSpecies('jwt', 'uuid')).toEqual(expectedResponse)
  })

  test('getListOfSpecies returns success on Services success', async () => {

    Services.prototype.queryListOfSpecies = jest.fn().mockImplementationOnce(() => {
      return [];
    });

    const useCase: SpeciesUseCase = new SpeciesUseCase()

    const expectedResponse: Result = new Result()
    expectedResponse.content = []
    expectedResponse.success = new UseCaseSuccess('Query is ok', 200)

    expect(await useCase.getListOfSpecies('jwt')).toEqual(expectedResponse)
  })

  test('getListOfSpecies returns error on null', async () => {

    Services.prototype.queryListOfSpecies = jest.fn().mockImplementationOnce(() => {
      return new UseCaseError('error', 400);
    });

    const useCase: SpeciesUseCase = new SpeciesUseCase()

    const expectedResponse: Result = new Result()
    expectedResponse.errors = [new UseCaseError('error', 400)]

    expect(await useCase.getListOfSpecies('jwt')).toEqual(expectedResponse)
  })


  test('getSpeciesCategories returns success on Services success', async () => {

    Services.prototype.querySpeciesCategories = jest.fn().mockImplementationOnce(() => {
      return [];
    });

    const useCase: SpeciesUseCase = new SpeciesUseCase()

    const expectedResponse: Result = new Result()
    expectedResponse.content = []
    expectedResponse.success = new UseCaseSuccess('Query is ok', 200)

    expect(await useCase.getSpeciesCategories('jwt')).toEqual(expectedResponse)
  })

  test('getSpeciesCategories returns error on null', async () => {

    Services.prototype.querySpeciesCategories = jest.fn().mockImplementationOnce(() => {
      return new UseCaseError('error', 400);
    });

    const useCase: SpeciesUseCase = new SpeciesUseCase()

    const expectedResponse: Result = new Result()
    expectedResponse.errors = [new UseCaseError('error', 400)]

    expect(await useCase.getSpeciesCategories('jwt')).toEqual(expectedResponse)
  })

  test('getSpeciesOrigins returns success on Services success', async () => {

    Services.prototype.querySpeciesOrigins = jest.fn().mockImplementationOnce(() => {
      return [];
    });

    const useCase: SpeciesUseCase = new SpeciesUseCase()

    const expectedResponse: Result = new Result()
    expectedResponse.content = []
    expectedResponse.success = new UseCaseSuccess('Query is ok', 200)

    expect(await useCase.getSpeciesOrigins('jwt')).toEqual(expectedResponse)
  })

  test('getSpeciesOrigins returns error on null', async () => {

    Services.prototype.querySpeciesOrigins = jest.fn().mockImplementationOnce(() => {
      return new UseCaseError('error', 400);
    });

    const useCase: SpeciesUseCase = new SpeciesUseCase()

    const expectedResponse: Result = new Result()
    expectedResponse.errors = [new UseCaseError('error', 400)]

    expect(await useCase.getSpeciesOrigins('jwt')).toEqual(expectedResponse)
  })

  test('updateWaterConstraints returns error if service has failed', async () => {
    const species: Species = new Species([])

    Services.prototype.updateWaterConstraints = jest.fn().mockImplementationOnce(() => {
      return [new UseCaseError('error', 400)];
    });

    const useCase: SpeciesUseCase = new SpeciesUseCase()

    const expectedResponse: Result = new Result()
    expectedResponse.errors = [new UseCaseError('error', 400)]

    expect(await useCase.updateWaterConstraints('jwt', species)).toEqual(expectedResponse)
  })

  test('updateWaterConstraints returns success', async () => {
    const species: Species = new Species([])
    const waterConstraints: WaterConstraints = new WaterConstraints([])

    Services.prototype.updateWaterConstraints = jest.fn().mockImplementationOnce(() => {
      return waterConstraints;
    });

    const useCase: SpeciesUseCase = new SpeciesUseCase()

    const expectedResponse: Result = new Result()
    expectedResponse.success = new UseCaseSuccess('Query is OK', 200)

    expect(await useCase.updateWaterConstraints('jwt', species)).toEqual(expectedResponse)
  })

  test('addWaterConstraints returns error if creation is failed', async () => {
    const species: Species = new Species([])

    Services.prototype.createWaterConstraints = jest.fn().mockImplementationOnce(() => {
      return [new UseCaseError('error', 400)];
    });

    const useCase: SpeciesUseCase = new SpeciesUseCase()

    const expectedResponse: Result = new Result()
    expectedResponse.errors = [new UseCaseError('error', 400)]

    expect(await useCase.addWaterConstraints('jwt', species)).toEqual(expectedResponse)
  })

  test('addWaterConstraints returns error if add is failed', async () => {
    const species: Species = new Species([])

    Services.prototype.createWaterConstraints = jest.fn().mockImplementationOnce(() => {
      return 'water_constraints_uuid';
    });

    Services.prototype.addWaterConstraintsToSpecies = jest.fn().mockImplementationOnce(() => {
      return new UseCaseError('error', 400);
    });

    const useCase: SpeciesUseCase = new SpeciesUseCase()

    const expectedResponse: Result = new Result()
    expectedResponse.errors = [new UseCaseError('error', 400)]

    expect(await useCase.addWaterConstraints('jwt', species)).toEqual(expectedResponse)
  })

  test('addWaterConstraints returns success', async () => {
    const species: Species = new Species([])
    const waterConstraints: WaterConstraints = new WaterConstraints([])

    Services.prototype.createWaterConstraints = jest.fn().mockImplementationOnce(() => {
      return 'water_constraints_uuid';
    });

    Services.prototype.addWaterConstraintsToSpecies = jest.fn().mockImplementationOnce(() => {
      return waterConstraints;
    });

    const useCase: SpeciesUseCase = new SpeciesUseCase()

    const expectedResponse: Result = new Result()
    expectedResponse.content = 'water_constraints_uuid'
    expectedResponse.success = new UseCaseSuccess('Query is OK', 201)

    expect(await useCase.addWaterConstraints('jwt', species)).toEqual(expectedResponse)
  })

  test('updateAnimalSpecs returns error if service has failed', async () => {
    const species: Species = new Species([])

    Services.prototype.updateAnimalSpecs = jest.fn().mockImplementationOnce(() => {
      return [new UseCaseError('error', 400)];
    });

    const useCase: SpeciesUseCase = new SpeciesUseCase()

    const expectedResponse: Result = new Result()
    expectedResponse.errors = [new UseCaseError('error', 400)]

    expect(await useCase.updateAnimalSpecs('jwt', species)).toEqual(expectedResponse)
  })

  test('updateAnimalSpecs returns success', async () => {
    const species: Species = new Species([])
    const animalSpecs: AnimalSpecs = new AnimalSpecs([])

    Services.prototype.updateAnimalSpecs = jest.fn().mockImplementationOnce(() => {
      return animalSpecs;
    });

    const useCase: SpeciesUseCase = new SpeciesUseCase()

    const expectedResponse: Result = new Result()
    expectedResponse.success = new UseCaseSuccess('Query is OK', 200)

    expect(await useCase.updateAnimalSpecs('jwt', species)).toEqual(expectedResponse)
  })

  test('addAnimalSpecs returns error if creation is failed', async () => {
    const species: Species = new Species([])

    Services.prototype.createAnimalSpecs = jest.fn().mockImplementationOnce(() => {
      return [new UseCaseError('error', 400)];
    });

    const useCase: SpeciesUseCase = new SpeciesUseCase()

    const expectedResponse: Result = new Result()
    expectedResponse.errors = [new UseCaseError('error', 400)]

    expect(await useCase.addAnimalSpecs('jwt', species)).toEqual(expectedResponse)
  })

  test('addAnimalSpecs returns error if add is failed', async () => {
    const species: Species = new Species([])

    Services.prototype.createAnimalSpecs = jest.fn().mockImplementationOnce(() => {
      return 'animal_specs_uuid';
    });

    Services.prototype.addAnimalSpecsToSpecies = jest.fn().mockImplementationOnce(() => {
      return new UseCaseError('error', 400);
    });

    const useCase: SpeciesUseCase = new SpeciesUseCase()

    const expectedResponse: Result = new Result()
    expectedResponse.errors = [new UseCaseError('error', 400)]

    expect(await useCase.addAnimalSpecs('jwt', species)).toEqual(expectedResponse)
  })

  test('addAnimalSpecs returns success', async () => {
    const species: Species = new Species([])
    const animalSpecs: AnimalSpecs = new AnimalSpecs([])

    Services.prototype.createAnimalSpecs = jest.fn().mockImplementationOnce(() => {
      return 'animal_specs_uuid';
    });

    Services.prototype.addAnimalSpecsToSpecies = jest.fn().mockImplementationOnce(() => {
      return animalSpecs;
    });

    const useCase: SpeciesUseCase = new SpeciesUseCase()

    const expectedResponse: Result = new Result()
    expectedResponse.content = 'animal_specs_uuid'
    expectedResponse.success = new UseCaseSuccess('Query is OK', 201)

    expect(await useCase.addAnimalSpecs('jwt', species)).toEqual(expectedResponse)
  })

  test('updatePublicationState returns error if state is not reachable', async () => {
    const species: Species = new Species([])

    Services.prototype.checkNextState = jest.fn().mockImplementationOnce(() => {
      return [new UseCaseError('error', 409)];
    });

    const useCase: SpeciesUseCase = new SpeciesUseCase()

    const expectedResponse: Result = new Result()
    expectedResponse.errors = [new UseCaseError('error', 409)]

    expect(await useCase.updatePublicationState('jwt', species, 'nextState')).toEqual(expectedResponse)
  })

  test('updatePublicationState returns error if query is failed', async () => {
    const species: Species = new Species([])

    Services.prototype.checkNextState = jest.fn().mockImplementationOnce(() => {
      return true;
    });

    Services.prototype.updatePublicationState = jest.fn().mockImplementationOnce(() => {
      return [new UseCaseError('error', 400)];
    });

    const useCase: SpeciesUseCase = new SpeciesUseCase()

    const expectedResponse: Result = new Result()
    expectedResponse.errors = [new UseCaseError('error', 400)]

    expect(await useCase.updatePublicationState('jwt', species, 'nextState')).toEqual(expectedResponse)
  })

  test('updatePublicationState returns success ', async () => {
    const species: Species = new Species([])

    Services.prototype.checkNextState = jest.fn().mockImplementationOnce(() => {
      return true;
    });

    Services.prototype.updatePublicationState = jest.fn().mockImplementationOnce(() => {
      return 'success';
    });

    const useCase: SpeciesUseCase = new SpeciesUseCase()

    const expectedResponse: Result = new Result()
    expectedResponse.content = 'success'
    expectedResponse.success = new UseCaseSuccess('Query is OK', 200)

    expect(await useCase.updatePublicationState('jwt', species, 'nextState')).toEqual(expectedResponse)
  })

  test('deleteSpecies returns success on Services success', async () => {

    Services.prototype.deleteSpecies = jest.fn().mockImplementationOnce(() => {
      return true;
    });

    const useCase: SpeciesUseCase = new SpeciesUseCase()

    const expectedResponse: Result = new Result()
    expectedResponse.content = {}
    expectedResponse.success = new UseCaseSuccess('Resource is deleted', 204)

    expect(await useCase.deleteSpecies('jwt', new Species([]))).toEqual(expectedResponse)
  })

  test('deleteSpecies returns error on null', async () => {

    Services.prototype.deleteSpecies = jest.fn().mockImplementationOnce(() => {
      return [new UseCaseError('error', 400)];
    });

    const useCase: SpeciesUseCase = new SpeciesUseCase()

    const expectedResponse: Result = new Result()
    expectedResponse.errors = [new UseCaseError('error', 400)]

    expect(await useCase.deleteSpecies('jwt', new Species([]))).toEqual(expectedResponse)
  })
})
