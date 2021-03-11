import * as CONSTANTS from '../CONSTANTS.js';
import Primitive from '../Primitive.js';

var clonePhenotype = function(Phenotype)
{
    var clonePhenotype = [];
    for (var j = 0; j < CONSTANTS.PRIMITIVES; j++) {
        clonePhenotype[j] = Phenotype[j].clone();
    }

    return clonePhenotype;
}

var clonePrimitive = function(Primitive)
{
    var clonePrimitive = Primitive.clone();

    return clonePrimitive;
}


var Population_INIT = function () {
    var i, j;
    var genotypes = Array.from(Array(CONSTANTS.INITIAL_POPULATION_SIZE), () => new Array(CONSTANTS.PRIMITIVES));

    for (i = 0; i < CONSTANTS.INITIAL_POPULATION_SIZE; i++) {
        for (j = 0; j < CONSTANTS.PRIMITIVES; j++) {
            genotypes[i][j] = new Primitive();
        }
    }
    return genotypes;
}

var Map_Genotypes_To_Phenotypes = function (genotypes) {
    var i, j;
    var Phenotypes = Array.from(Array(CONSTANTS.INITIAL_POPULATION_SIZE), () => new Array(CONSTANTS.PRIMITIVES));

    for (i = 0; i < CONSTANTS.INITIAL_POPULATION_SIZE; i++) {
        for (j = 0; j < CONSTANTS.PRIMITIVES; j++) {
            Phenotypes[i][j] = clonePrimitive(genotypes[i][j]);
        }
    }
    return Phenotypes;
}

export{Population_INIT,clonePhenotype,Map_Genotypes_To_Phenotypes,clonePrimitive}