
export default interface ServicesInterface {
  queryTotalSpecies(jwt: string): Promise<number|null>
}
