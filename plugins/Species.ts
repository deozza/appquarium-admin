import Vue from "vue"
import SpeciesNaming from "~/app/species/global/entities/SpeciesNaming";
import Species from "~/app/species/global/entities/Species";

Vue.filter("speciesComputedName", (speciesNaming: SpeciesNaming) => speciesNaming.species_genre?.name + " " + speciesNaming.name)
Vue.filter("speciesComputedLink", (species: Species) => '/species/'+species.category+'/'+species.uuid)
