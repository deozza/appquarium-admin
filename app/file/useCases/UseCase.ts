import UseCaseInterface from "~/app/file/useCases/UseCaseInterface";
import Result from "~/app/utils/useCasesResult/Result";
import Service from "~/app/file/services/Service";
import Image from "~/app/file/entities/Image";
import UseCaseError from "~/app/utils/useCasesResult/types/UseCaseError";

export default class UseCase implements UseCaseInterface {
  private readonly module: any

  constructor(module: any) {
    this.module = module
  }

  async  uploadFile(fileName: string, fileSource: string, basePath: string, file: File | null): Promise<Result> {
    const result: Result = new Result()
    const fileService: Service = new Service(this.module)

    if(file === null){
      result.addError('File should not be empty', 400)
      return result
    }

    const computedFileName: string = fileService.getComputedFileName(fileName)
    const metadata: object = fileService.getMetadata(fileName, fileSource)
    const completeRemotePath: string = basePath + '/' + computedFileName

    const image: Image | Array<UseCaseError> = await fileService.uploadFile(completeRemotePath, file, metadata)
    if (!(image instanceof Image)) {
      result.errors = image
      return result
    }

    result.addSuccess('Query is OK', 201)
    result.content = image
    return result
  }

  async editFileMetadata(image: Image): Promise<Result> {
    const result: Result = new Result()
    const fileService: Service = new Service(this.module)

    const isEdited: boolean | Array<UseCaseError> = await fileService.editFileMetadata(image)
    if(typeof isEdited !== 'boolean'){
      result.errors = isEdited
      return result
    }

    result.addSuccess('Query is OK', 200)
    return result
  }

  async deleteFile(image: Image): Promise<Result> {
    const result: Result = new Result()
    const fileService: Service = new Service(this.module)

    const isDeleted: boolean | Array<UseCaseError> = await fileService.deleteFile(image)
    if(typeof isDeleted !== 'boolean'){
      result.errors = isDeleted
      return result
    }

    result.addSuccess('Query is OK', 204)
    return result
  }

}
