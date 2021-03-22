import * as CONSTANTS from '../CONSTANTS.js';
import Primitive from '../Primitive.js';
import * as math from './math.js';
var clonePhenotype = (Phenotype) => {
    var clonePhenotype = [];
    for (var j = 0; j < CONSTANTS.PRIMITIVES; j++) {
        clonePhenotype[j] = Phenotype[j].clone();
    }

    return clonePhenotype;
}

var clonePrimitive = (Primitive) => {
    var clonePrimitive = Primitive.clone();

    return clonePrimitive;
}


var Population_INIT = () => {
    var i, j;
    var genotypes = Array.from(Array(CONSTANTS.INITIAL_POPULATION_SIZE), () => new Array(CONSTANTS.PRIMITIVES));

    for (i = 0; i < CONSTANTS.INITIAL_POPULATION_SIZE; i++) {
        for (j = 0; j < CONSTANTS.PRIMITIVES; j++) {
            genotypes[i][j] = new Primitive();
        }
    }
    return genotypes;
}

var StoreGenotypes = (Phenotypes) => {
    var i, j;
    var Genotypes = Array.from(Array(CONSTANTS.INITIAL_POPULATION_SIZE), () => new Array(CONSTANTS.PRIMITIVES));

    for (i = 0; i < CONSTANTS.INITIAL_POPULATION_SIZE; i++) {
        for (j = 0; j < CONSTANTS.PRIMITIVES; j++) {
            Genotypes[i][j] = clonePrimitive(Phenotypes[i][j]);
        }
    }
    return Genotypes;
}


var Fix_Overlapping_Primitives = (Phenotypes) => {
    var i, j, m;
    for (i = 0; i < CONSTANTS.INITIAL_POPULATION_SIZE; i++) {
        for (j = 0; j < CONSTANTS.PRIMITIVES; j++) {
            for (m = j + 1; m < CONSTANTS.PRIMITIVES; m++) {
                var polyA = new SAT.Shape(Phenotypes[i][j].points,CONSTANTS.FACES,CONSTANTS.EDGES);
                var polyB = new SAT.Shape(Phenotypes[i][m].points,CONSTANTS.FACES,CONSTANTS.EDGES);
                if (SAT.CheckCollision(polyA,polyB)) {
                    var axes = math.find_axis(Phenotypes[i][j].center, Phenotypes[i][m].center)
                    math.find_sides(Phenotypes[i][j], Phenotypes[i][m], axes);
                }
            }
        }
    }
}


export{Population_INIT,clonePhenotype,StoreGenotypes,clonePrimitive,Fix_Overlapping_Primitives}