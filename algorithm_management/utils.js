import * as CONSTANTS from '../CONSTANTS.js';

var drawPhenotype = function(Phenotypes , scene, j){
    for( var i = 0; i < CONSTANTS.PRIMITIVES; i++){
        Phenotypes[j][i].draw(scene);
    }
}

var deletePhenotype = function(Phenotypes, scene, j){
    for(var i = 0; i< CONSTANTS.PRIMITIVES; i++){
        Phenotypes[j][i].delete(scene);
    }
}
export {drawPhenotype,deletePhenotype}