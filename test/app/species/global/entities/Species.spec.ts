import Species from "~/app/species/global/entities/Species";
import InvalidSpeciesObjectError from "~/errors/app/species/global/entities/InvalidSpeciesObjectError";

let species: Species

describe('Testing Species.ts entity', () => {

  describe('computeLinkToSpecies', () => {
    test('with valid data', () => {
      species = new Species([])
      species.category = "category"
      species.uuid = "uuid"

      expect(species.computeLinkToSpecies()).toEqual('/species/category/uuid')
    })

    test('without data would fail', () => {
      species = new Species([])

      expect(()=>species.computeLinkToSpecies()).toThrow(InvalidSpeciesObjectError)
    })

    test('without category would fail', () => {
      species = new Species([])
      species.uuid = 'uuid'

      expect(()=>species.computeLinkToSpecies()).toThrow(InvalidSpeciesObjectError)
    })

    test('without uuid would fail', () => {
      species = new Species([])
      species.category = 'category'

      expect(()=>species.computeLinkToSpecies()).toThrow(InvalidSpeciesObjectError)
    })
  })

  describe('computeName', () => {
    test('with valid data', () => {
      species = new Species([])
      species.species_naming.species_genre.name = "Genrename"
      species.species_naming.name = "Speciesname"

      expect(species.computeName()).toEqual('Genrename Speciesname')
    })

    test('without data would fail', () => {
      species = new Species([])

      expect(species.computeName()).toEqual('NA')
    })

    test('without species_genre would fail', () => {
      species = new Species([])
      species.species_naming.name = 'Speciesname'

      expect(species.computeName()).toEqual('NA')
    })

    test('without species_naming.name would fail', () => {
      species = new Species([])
      species.species_naming.species_genre.name = 'Genrename'

      expect(species.computeName()).toEqual('NA')
    })
  })

  describe('getPublicationStateStyle', () => {
    test('with valid data', () => {
      species = new Species([])
      species.publication_state = "DRAFT"

      expect(species.getPublicationStateStyle()).toEqual('secondary')
    })

    test('without data would fail', () => {
      species = new Species([])

      expect(()=>species.getPublicationStateStyle()).toThrow(InvalidSpeciesObjectError)
    })

    test('without valid data would fail', () => {
      species = new Species([])
      species.publication_state = 'invalid'

      expect(()=>species.getPublicationStateStyle()).toThrow(new Error('Unexpected publication_state : invalid'))
    })
  })

  describe('getPublicationStateContent', () => {
    test('with valid data', () => {
      species = new Species([])
      species.publication_state = "DRAFT"

      expect(species.getPublicationStateContent()).toEqual('brouillon')
    })

    test('without data would fail', () => {
      species = new Species([])

      expect(()=>species.getPublicationStateContent()).toThrow(InvalidSpeciesObjectError)
    })

    test('without valid data would fail', () => {
      species = new Species([])
      species.publication_state = 'invalid'

      expect(()=>species.getPublicationStateContent()).toThrow(new Error('Unexpected publication_state : invalid'))
    })
  })


})
