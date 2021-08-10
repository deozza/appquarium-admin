export default interface AdapterInterface {
  queryTotalSpecies(): Promise<number | null>
}
