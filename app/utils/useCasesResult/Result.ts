import Success from "./types/Success";
import Error from "./types/Error";

export default class Result {
  success: Success | null = null
  errors: Array<Error> = []
  content: any = {}

  public addSuccess(type: string,  code: number){
    this.success = new Success(type, code)
  }

  public addError(type: string, code: number){
    const error: Error = new Error(type, code)
    this.errors.push(error)
  }

  public isSuccessful(): boolean{
    return this.success !== null && this.errors.length === 0;
  }

  public isFailed(): boolean{
    return this.success === null && this.errors.length > 0;
  }
}
