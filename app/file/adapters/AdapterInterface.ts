import Image from "~/app/file/entities/Image";
import UseCaseError from "~/app/utils/useCasesResult/types/UseCaseError";

export default interface AdapterInterface {
  uploadFile(path: string, file: File, metadata: object): Promise<Image | Array<UseCaseError>>

  editFileMetadata(image: Image): Promise<boolean | Array<UseCaseError>>

  deleteFile(image: Image): Promise<boolean | Array<UseCaseError>>
}
