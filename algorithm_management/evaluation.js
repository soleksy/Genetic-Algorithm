import * as CONSTANTS from '../CONSTANTS.js';
import * as properties from './properties.js';
import * as math from './math.js';
import * as utils from './utils.js';
// MASS EVALUATION //

var calculate_mass = (Phenotypes) => {
  var i, j;
  var masses = [];
  for (j = 0; j < CONSTANTS.INITIAL_POPULATION_SIZE; j++) {
    for (i = 0; i < CONSTANTS.PRIMITIVES; i++) {
      if (i == 0) {
        masses[j] = Phenotypes[j][i].get_mass() / 1000;
      } else {
        masses[j] += Phenotypes[j][i].get_mass() / 1000;
      }
    }
  }
  return masses;
};

var evaluate_mass = (masses) => {
  var mass_evaluation = [];
  for (var i = 0; i < CONSTANTS.INITIAL_POPULATION_SIZE; i++) {
    if (Math.abs(masses[i] - CONSTANTS.IDEAL_MASS) > 300) {
      mass_evaluation[i] = 0;
    } else if (masses[i] >= CONSTANTS.IDEAL_MASS) {
      mass_evaluation[i] = CONSTANTS.IDEAL_MASS / masses[i];
    } else {
      mass_evaluation[i] = masses[i] / CONSTANTS.IDEAL_MASS;
    }
  }
  return mass_evaluation;
};

// SIZE EVALUATION //

var calculate_size = (Phenotypes) => {
  var i;
  var size = [];

  for (i = 0; i < CONSTANTS.INITIAL_POPULATION_SIZE; i++) {
    var extents = properties.get_design_extents(Phenotypes[i]);
    var width = Math.abs(extents[0] - extents[1]);
    var height = Math.abs(extents[2] - extents[3]);
    var depth = Math.abs(extents[4] - extents[5]);

    var p_size = 2 * (width * height + depth * height + depth * width);
    size[i] = p_size;
  }

  return size;
};

var evaluate_size = (sizes) => {
  var evaluation = [];
  for (var i = 0; i < CONSTANTS.INITIAL_POPULATION_SIZE; i++) {
    if (sizes[i] >= CONSTANTS.IDEAL_SIZE) {
      evaluation[i] = CONSTANTS.IDEAL_SIZE / sizes[i];
    } else {
      evaluation[i] = sizes[i] / CONSTANTS.IDEAL_SIZE;
    }
  }
  return evaluation;
};

var calculate_heights = (Phenotypes) => {
  var heights = [];
  for (var i = 0; i < CONSTANTS.INITIAL_POPULATION_SIZE; i++) {
    var extents = properties.get_design_extents(Phenotypes[i]);
    heights[i] = Math.abs(extents[2] - extents[3]);
  }
  return heights;
};

var evalulate_heights = (heights) => {
  var height_evaluation = [];
  for (var i = 0; i < CONSTANTS.INITIAL_POPULATION_SIZE; i++) {
    if (heights[i] >= CONSTANTS.IDEAL_TABLE_HEIGHT) {
      height_evaluation[i] = CONSTANTS.IDEAL_TABLE_HEIGHT / heights[i];
    } else {
      height_evaluation[i] = heights[i] / CONSTANTS.IDEAL_TABLE_HEIGHT;
    }
  }

  return height_evaluation;
};

var evaluate_distances = (Phenotypes) => {
  var distance;
  var distance_eval = [];
  for (var i = 0; i < CONSTANTS.INITIAL_POPULATION_SIZE; i++) {
    var arr = math.calculate_desired_center_of_mass(Phenotypes[i]);
    var center_of_mass = math.calculate_center_of_mass(Phenotypes[i]);
    distance = math.distance_between_points(
      [arr[0], arr[1], arr[2]],
      [center_of_mass[0], arr[1], center_of_mass[2]]
    );
    if (
      math.is_inside([arr[0], arr[1], arr[2]], center_of_mass, arr[3], arr[4])
    ) {
      if (distance < 1) {
        distance_eval[i] = 1 - distance;
      } else {
        distance_eval[i] = 0;
      }
    } else {
      distance_eval[i] = 0;
    }
  }
  return distance_eval;
};

var evaluate_connectivity = (Phenotypes) => {
  var isdisconnected = [];
  for (var i = 0; i < Phenotypes.length; i++) {
    isdisconnected[i] = utils.is_disconnected(
      Phenotypes[i],
      CONSTANTS.FACES,
      CONSTANTS.EDGES
    );
  }

  return isdisconnected;
};

var calculate_table_top = (Phenotypes) => {
  var areas = [];
  var max_height;
  var h;
  for (var j = 0; j < CONSTANTS.INITIAL_POPULATION_SIZE; j++) {
    max_height = 0;
    for (var i = 0; i < CONSTANTS.PRIMITIVES; i++) {
      if (max_height < Phenotypes[j][i].y + Phenotypes[j][i].height / 2) {
        max_height = Phenotypes[j][i].y + Phenotypes[j][i].height / 2;
        h = i;
      }
    }

    areas[j] = Phenotypes[j][h].width * 20 * 20 * Phenotypes[j][h].depth;
  }
  return areas;
};

var evaluate_table_top = (areas) => {
  var table_top_eval = [];
  for (var j = 0; j < CONSTANTS.INITIAL_POPULATION_SIZE; j++) {
    if (areas[j] >= CONSTANTS.IDEAL_COUNTER_AREA) {
      table_top_eval[j] = CONSTANTS.IDEAL_COUNTER_AREA / areas[j];
    } else {
      table_top_eval[j] = areas[j] / CONSTANTS.IDEAL_COUNTER_AREA;
    }
  }

  return table_top_eval;
};

export {
  calculate_mass,
  evaluate_mass,
  calculate_size,
  evaluate_size,
  calculate_heights,
  evalulate_heights,
  evaluate_distances,
  evaluate_connectivity,
  calculate_table_top,
  evaluate_table_top,
};
