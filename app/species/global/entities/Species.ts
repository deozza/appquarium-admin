import SpeciesNaming from "~/app/species/global/entities/SpeciesNaming";

export default class Species {
  uuid: string
  created_at: Date
  updated_at: Date
  user: string
  species_naming: SpeciesNaming | null
  water_constraints: string
  origin: string
  publication_state: string
  category: string

  constructor(species: Array<string>) {

    console.log(species)

    this.uuid = species.hasOwnProperty('uuid') ? species['uuid'] : ''
    this.created_at = species.hasOwnProperty('created_at') ? species['created_at'] : ''
    this.updated_at = species.hasOwnProperty('updated_at') ? species['updated_at'] : ''
    this.user = species.hasOwnProperty('user') ? species['user'] : ''
    this.species_naming = species.hasOwnProperty('species_naming') && species['species_naming'] !== null ? new SpeciesNaming(species['species_naming']) : null
    this.water_constraints = species.hasOwnProperty('water_constraints') ? species['water_constraints'] : ''
    this.origin = species.hasOwnProperty('origin') ? species['origin'] : ''
    this.publication_state = species.hasOwnProperty('publication_state') ? species['publication_state'] : ''
    this.category = species.hasOwnProperty('category') ? species['category'] : ''
  }

  toJSON () {
    return { ...this } // here I make a POJO's copy of the class instance
  }

  public computeLinkToSpecies(): string {
    return '/species/'+this.category+'/'+this.uuid
  }

  public computeName(): string {
    if(this.species_naming !== null && this.species_naming.species_genre !== null){
      return this.species_naming.species_genre?.name + " " + this.species_naming.name
    }
    return 'NA'
  }
}
