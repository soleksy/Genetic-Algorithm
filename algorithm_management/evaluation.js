import * as CONSTANTS from '../CONSTANTS.js';
import * as properties from './properties.js';
var calculate_mass = function (Phenotypes) {
    var i,j;
    var masses = [];
    for(j = 0; j < CONSTANTS.INITIAL_POPULATION_SIZE; j++){
        for (i = 0; i < CONSTANTS.PRIMITIVES; i++) {
            if(i == 0){
                masses[j] = (Phenotypes[j][i].get_mass())/1000;
            }
            else{
                masses[j] += (Phenotypes[j][i].get_mass())/1000;
            }
        }
}
    return masses;
}

var evaluate_mass = function(masses){
    var mass_evaluation = [];
    for (var i = 0; i < CONSTANTS.INITIAL_POPULATION_SIZE; i++) {

        if(Math.abs(masses[i] - CONSTANTS.IDEAL_MASS) > 300)
        {
            mass_evaluation[i] = 0;
        }
        else if (masses[i] >= CONSTANTS.IDEAL_MASS) {
            mass_evaluation[i] = (CONSTANTS.IDEAL_MASS / masses[i])
        }
        else {
            mass_evaluation[i] = (masses[i] / CONSTANTS.IDEAL_MASS)
        }
    }
    return mass_evaluation;
}


var calculate_size = function (Phenotypes) {
    var i;
    var size = [];
    
    for (i = 0; i < CONSTANTS.INITIAL_POPULATION_SIZE; i++) {
        var extents = properties.get_design_extents(Phenotypes[i]);
        var width = Math.abs(extents[0] - extents[1]);
        var height = Math.abs(extents[2] - extents[3]);
        var depth = Math.abs(extents[4] - extents[5]);

        var p_size = 2 * ((width * height) + (depth * height) + (depth * width))
        size[i] = p_size;
    }

    return size;
}

var evaluate_size = function(sizes){
    var evaluation = [];
    for(var i = 0; i < CONSTANTS.INITIAL_POPULATION_SIZE; i++){
        if (sizes[i] >= CONSTANTS.IDEAL_SIZE) {
            evaluation[i] = (CONSTANTS.IDEAL_SIZE / sizes[i])
        }
        else {
            evaluation[i] = (sizes[i] / CONSTANTS.IDEAL_SIZE)
        }
    }
    return evaluation;

}

export{calculate_mass,evaluate_mass,calculate_size,evaluate_size}