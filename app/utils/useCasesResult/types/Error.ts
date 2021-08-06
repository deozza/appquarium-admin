import type ResultTypeInterface from "./ResultTypeInterface";

export default class Error implements ResultTypeInterface {
  code: number;
  type: string;

  constructor(type: string, code: number) {
    this.type = type
    this.code = code
  }

}
