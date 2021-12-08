import UseCaseError from "~/app/utils/useCasesResult/types/UseCaseError";
import Image from "~/app/file/entities/Image";

export default interface ServiceInterface {
  getComputedFileName(fileName: string): string
  getMetadata(fileName: string, fileSource: string): object
  uploadFile(path: string, file: File, metadata: object): Promise< Image | Array<UseCaseError>>
  editFileMetadata(image: Image): Promise< boolean | Array<UseCaseError>>
  deleteFile(image: Image): Promise< boolean | Array<UseCaseError>>
}
