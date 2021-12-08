import Result from "~/app/utils/useCasesResult/Result";
import Image from "~/app/file/entities/Image";

export default interface UseCaseInterface {
  uploadFile(fileName: string, fileSource: string, basePath: string, file: File): Promise<Result>
  editFileMetadata(image: Image): Promise<Result>
  deleteFile(image: Image): Promise<Result>

}
