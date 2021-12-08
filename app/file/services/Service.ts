import ServiceInterface from "~/app/file/services/ServiceInterface";
import Image from "~/app/file/entities/Image";
import UseCaseError from "~/app/utils/useCasesResult/types/UseCaseError";
import AdapterInterface from "~/app/file/adapters/AdapterInterface";
import FirebaseAdapter from "~/app/file/adapters/FirebaseAdapter";

export default class Service implements ServiceInterface{

  private readonly module: any

  constructor(module: any) {
    this.module = module
  }

  getComputedFileName(fileName: string): string {
    return fileName.replaceAll(' ', '_')
      .replaceAll("'", '_')
      .toLowerCase();
  }

  getMetadata(fileName: string, fileSource: string): object {
    return {
      customMetadata: {
        alt: fileName,
        source: fileSource
      }
    }
  }

  async uploadFile(path: string, file: File, metadata: object): Promise<Image | Array<UseCaseError>> {
    const adapter: AdapterInterface = new FirebaseAdapter(this.module)

    return await adapter.uploadFile(path, file, metadata)
  }

  async editFileMetadata(image: Image): Promise<boolean | Array<UseCaseError>> {
    const adapter: AdapterInterface = new FirebaseAdapter(this.module)

    return await adapter.editFileMetadata(image)
  }

  async deleteFile(image: Image): Promise<boolean | Array<UseCaseError>> {
    const adapter: AdapterInterface = new FirebaseAdapter(this.module)

    return await adapter.deleteFile(image)
  }
}
