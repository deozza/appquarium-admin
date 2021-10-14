import User from "~/app/user/entities/User";

export default class InvertebrateInit {
  uuid: string
  owner: User
  origin: string
  name: string
  genre: string
  family: string
  publication_state: string
  species_category: string

  public constructor(owner: User) {
    this.publication_state = 'DRAFT'
    this.species_category = 'invertebrate'
    this.owner = owner
    this.origin = ''
    this.name = ''
    this.genre = ''
    this.family = ''
    this.uuid = ''
  }

  toJSON () {
    return { ...this } // here I make a POJO's copy of the class instance
  }
}
