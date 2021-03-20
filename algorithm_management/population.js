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

var StoreGenotypes = function (Phenotypes) {
    var i, j;
    var Genotypes = Array.from(Array(CONSTANTS.INITIAL_POPULATION_SIZE), () => new Array(CONSTANTS.PRIMITIVES));

    for (i = 0; i < CONSTANTS.INITIAL_POPULATION_SIZE; i++) {
        for (j = 0; j < CONSTANTS.PRIMITIVES; j++) {
            Genotypes[i][j] = clonePrimitive(Phenotypes[i][j]);
        }
    }
    return Genotypes;
}

export{Population_INIT,clonePhenotype,StoreGenotypes,clonePrimitive}