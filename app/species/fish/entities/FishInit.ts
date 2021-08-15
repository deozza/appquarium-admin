import User from "~/app/user/entities/User";

export default class FishInit {
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
    this.species_category = 'fish'
    this.owner = owner
    this.origin = ''
    this.name = ''
    this.genre = ''
    this.family = ''
    this.uuid = ''
  }
}
