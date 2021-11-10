import SpeciesNaming from "~/app/species/global/entities/SpeciesNaming";
import WaterConstraints from "~/app/species/global/entities/WaterConstraints";

export default class Species {
  uuid: string
  created_at: Date
  updated_at: Date
  user: string
  species_naming: SpeciesNaming
  water_constraint: WaterConstraints
  origin: string
  publication_state: string
  category: string

  constructor(species: Array<string>) {
    this.uuid = species.hasOwnProperty('uuid') ? species['uuid'] : ''
    this.created_at = species.hasOwnProperty('created_at') ? new Date(species['created_at']) : new Date()
    this.updated_at = species.hasOwnProperty('updated_at') ? new Date(species['updated_at']) : new Date()
    this.user = species.hasOwnProperty('user') ? species['user'] : ''
    this.species_naming = species.hasOwnProperty('species_naming') && species['species_naming'] !== null ? new SpeciesNaming(species['species_naming']) : new SpeciesNaming([])
    this.water_constraint = species.hasOwnProperty('water_constraint') && species['water_constraint'] !== null ? new WaterConstraints(species['water_constraint']) : new  WaterConstraints([])
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

  public getPublicationStateStyle(): string {
    const publicationStateStyle: object = {
      'DRAFT': 'secondary',
      'PRE_PUBLISHED': 'info',
      'MODERATED': 'warning',
      'PUBLISHED': 'success',
      'ARCHIVED': 'secondary',
    }

    return publicationStateStyle[this.publication_state]
  }

  public getPublicationStateContent(): string {
    const publicationStateContent: object = {
      'DRAFT': 'brouillon',
      'PRE_PUBLISHED': 'pré-publié',
      'MODERATED': 'modéré',
      'PUBLISHED': 'publié',
      'ARCHIVED': 'archivé',
    }

    return publicationStateContent[this.publication_state]
  }
}
