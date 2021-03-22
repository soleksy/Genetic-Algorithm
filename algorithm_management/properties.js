import * as CONSTANTS from '../CONSTANTS.js';

var get_design_extents = (Phenotype) => {
    var j;
    var max_x = 0;
    var max_y = 0;
    var max_z = 0;

    var min_x = 0;
    var min_y = 0;
    var min_z = 0;

    for (j = 0; j < CONSTANTS.PRIMITIVES; j++) {
        var loc_max_x = Phenotype[j].max_x;
        var loc_max_y = Phenotype[j].max_y;
        var loc_max_z = Phenotype[j].max_z;

        var loc_min_x = Phenotype[j].min_x;
        var loc_min_y = Phenotype[j].min_y;
        var loc_min_z = Phenotype[j].min_z;

        if (loc_max_x > max_x) {
            max_x = loc_max_x;
        }

        if (loc_max_y > max_y) {
            max_y = loc_max_y;
        }

        if (loc_max_z > max_z) {
            max_z = loc_max_z;
        }

        if (loc_min_x < min_x) {
            min_x = loc_min_x;
        }

        if (loc_min_y < min_y) {
            min_y = loc_min_y;
        }

        if (loc_min_z < min_z) {
            min_z = loc_min_z;
        }
    }
    
    return [max_x,min_x,max_y,min_y,max_z,min_z];
}


export {get_design_extents}