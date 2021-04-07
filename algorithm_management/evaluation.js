import * as CONSTANTS from '../CONSTANTS.js';
import * as properties from './properties.js';
import * as math from './math.js';
import * as utils from './utils.js';
import * as population from './population.js';

// MASS EVALUATION //
var calculate_mass = (Phenotypes) => {
  var i, j;
  var masses = [];
  for (j = 0; j < CONSTANTS.INITIAL_POPULATION_SIZE; j++) {
    for (i = 0; i < CONSTANTS.PRIMITIVES; i++) {
      if (i == 0) {
        masses[j] = Phenotypes[j][i].get_mass();
      } else {
        masses[j] += Phenotypes[j][i].get_mass();
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
//todo: SET parameter h to be able to constrain space on certain height
var calculate_size = (Phenotypes) => {
  var i;
  var size = [];

  for (i = 0; i < CONSTANTS.INITIAL_POPULATION_SIZE; i++) {
    var extents = properties.get_design_extents(Phenotypes[i]);
    var width = Math.abs(extents[0] - extents[1]).toFixed(2);
    var height = Math.abs(extents[2] - extents[3]).toFixed(2);
    var depth = Math.abs(extents[4] - extents[5]).toFixed(2);

    console.log(width, height, depth);

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

// HEIGHT EVALUATION //
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

// EVALUATE DISTANCE FROM CENTER OF MASS AND CENTER OF DESIGN //
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

// EVALUATE THE CONNECTIVITY OF DESIGN //
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
// EVALUATE THE TABLE TOP AREA //
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

var get_distances = function (Phenotypes) {
  var distances = [];
  for (var i = 0; i < CONSTANTS.INITIAL_POPULATION_SIZE; i++) {
    var arr = math.calculate_desired_center_of_mass(Phenotypes[i]);
    var center_of_mass = math.calculate_center_of_mass(Phenotypes[i]);
    distances[i] = math.distance_between_points(
      [arr[0], arr[1], arr[2]],
      [center_of_mass[0], arr[1], center_of_mass[2]]
    );
  }
  return distances;
};

var get_weighted_sum = (Phenotypes) => {
  var masses = [];
  var mass_eval = [];
  var sizes = [];
  var size_eval = [];

  var dist = [];
  var connect = [];

  var heights = [];
  var heights_eval = [];

  var top = [];
  var top_eval = [];

  population.Fix_Overlapping_Primitives(Phenotypes);
  masses = calculate_mass(Phenotypes);
  mass_eval = evaluate_mass(masses);

  sizes = calculate_size(Phenotypes);
  size_eval = evaluate_size(sizes);

  heights = calculate_heights(Phenotypes);
  heights_eval = evalulate_heights(heights);

  //area = calculate_area(Phenotypes);
  dist = evaluate_distances(Phenotypes);
  connect = evaluate_connectivity(Phenotypes, CONSTANTS.FACES, CONSTANTS.EDGES);

  top = calculate_table_top(Phenotypes);
  top_eval = evaluate_table_top(top);

  var weighted_sum = [];
  for (var i = 0; i < CONSTANTS.INITIAL_POPULATION_SIZE; i++) {
    weighted_sum[i] =
      (size_eval[i] * CONSTANTS.SIZE_WEIGHT +
        mass_eval[i] * CONSTANTS.MASS_WEIGHT +
        dist[i] * CONSTANTS.CENTER_OF_MASS_WEIGHT +
        heights_eval[i] * CONSTANTS.TABLE_HEIGHT_WEIGHT +
        top_eval[i] * CONSTANTS.COUNTER_AREA_WEIGHT) *
      (connect[i] * CONSTANTS.IS_DISCONNECTED_WEIGHT);
  }
  return weighted_sum;
};

var get_avarages = (Phenotypes) => {
  var mass = [];
  var area = [];
  var size = [];
  var dist = [];
  var connect = [];
  var top = [];

  mass = calculate_mass(Phenotypes);
  const sum1 = mass.reduce((a, b) => a + b, 0);
  const avg1 = sum1 / mass.length || 0;

  console.log(
    `The IDEAL_MASS is: ${CONSTANTS.IDEAL_MASS}. The average is: ${avg1}`
  );
  //_________________________________________________________________________//

  size = calculate_size(Phenotypes);

  const sum2 = size.reduce((a, b) => a + b, 0);
  const avg2 = sum2 / size.length || 0;

  console.log(
    `The IDEAL_SIZE is: ${CONSTANTS.IDEAL_SIZE}. The average is: ${avg2}`
  );
  //_________________________________________________________________________//

  area = calculate_table_top(Phenotypes);

  const sum3 = area.reduce((a, b) => a + b, 0);
  const avg3 = sum3 / area.length || 0;

  console.log(
    `The IDEAL_AREA is: ${CONSTANTS.IDEAL_COUNTER_AREA}. The average is: ${avg3}`
  );
  //_________________________________________________________________________//
  dist = get_distances(Phenotypes);

  const sum4 = dist.reduce((a, b) => a + b, 0);
  const avg4 = sum4 / dist.length || 0;

  console.log(
    `The DISTANCE IS  is: ${CONSTANTS.IDEAL_CENTER_OF_MASS}. The average is: ${avg4}`
  );
  //_________________________________________________________________________//

  top = calculate_heights(Phenotypes);

  const sum5 = top.reduce((a, b) => a + b, 0);
  const avg5 = sum5 / top.length || 0;

  console.log(
    `The IDEAL_TOP_HEIGHT is: ${CONSTANTS.IDEAL_TABLE_HEIGHT}. The average is: ${avg5}`
  );
};

export { get_weighted_sum, get_avarages };
