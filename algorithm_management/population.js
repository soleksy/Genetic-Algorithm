import * as CONSTANTS from '../CONSTANTS.js';
import Primitive from '../Primitive.js';
import * as math from './math.js';
import * as utils from './utils.js';

var generate_parameters = () => {
  var x =
    Math.floor(Math.random() * (CONSTANTS.MAXPOS - CONSTANTS.MINPOS + 1)) +
    CONSTANTS.MINPOS;
  var y =
    Math.floor(Math.random() * (CONSTANTS.MAXPOS - CONSTANTS.MINPOS + 1)) +
    CONSTANTS.MINPOS;
  var z =
    Math.floor(Math.random() * (CONSTANTS.MAXPOS - CONSTANTS.MINPOS + 1)) +
    CONSTANTS.MINPOS;

  var height =
    Math.floor(Math.random() * (CONSTANTS.MAXLEN - CONSTANTS.MINLEN + 1)) +
    CONSTANTS.MINLEN;
  var width =
    Math.floor(Math.random() * (CONSTANTS.MAXLEN - CONSTANTS.MINLEN + 1)) +
    CONSTANTS.MINLEN;
  var depth =
    Math.floor(Math.random() * (CONSTANTS.MAXLEN - CONSTANTS.MINLEN + 1)) +
    CONSTANTS.MINLEN;

  return [x, y, z, height, width, depth];
};

var clonePhenotype = (Phenotype) => {
  var clonePhenotype = [];
  for (var j = 0; j < CONSTANTS.PRIMITIVES; j++) {
    clonePhenotype[j] = Phenotype[j].clone();
  }

  return clonePhenotype;
};

var clonePrimitive = (Primitive) => {
  var clonePrimitive = Primitive.clone();

  return clonePrimitive;
};

var Population_INIT = () => {
  var i, j;
  var genotypes = Array.from(
    Array(CONSTANTS.INITIAL_POPULATION_SIZE),
    () => new Array(CONSTANTS.PRIMITIVES)
  );

  for (i = 0; i < CONSTANTS.INITIAL_POPULATION_SIZE; i++) {
    for (j = 0; j < CONSTANTS.PRIMITIVES; j++) {
      var parameters = generate_parameters();

      genotypes[i][j] = new Primitive(
        parameters[0],
        parameters[1],
        parameters[2],
        parameters[3],
        parameters[4],
        parameters[5]
      );
    }
  }
  return genotypes;
};

var StoreGenotypes = (Phenotypes) => {
  var i, j;
  var Genotypes = Array.from(
    Array(CONSTANTS.INITIAL_POPULATION_SIZE),
    () => new Array(CONSTANTS.PRIMITIVES)
  );

  for (i = 0; i < CONSTANTS.INITIAL_POPULATION_SIZE; i++) {
    for (j = 0; j < CONSTANTS.PRIMITIVES; j++) {
      Genotypes[i][j] = clonePrimitive(Phenotypes[i][j]);
    }
  }
  return Genotypes;
};

var Fix_Overlapping_Primitives = (Phenotypes) => {
  var i, j, m;
  for (i = 0; i < CONSTANTS.INITIAL_POPULATION_SIZE; i++) {
    for (j = 0; j < CONSTANTS.PRIMITIVES; j++) {
      for (m = j + 1; m < CONSTANTS.PRIMITIVES; m++) {
        var polyA = new SAT.Shape(
          Phenotypes[i][j].points,
          CONSTANTS.FACES,
          CONSTANTS.EDGES
        );
        var polyB = new SAT.Shape(
          Phenotypes[i][m].points,
          CONSTANTS.FACES,
          CONSTANTS.EDGES
        );
        if (SAT.CheckCollision(polyA, polyB)) {
          var axes = math.find_axis(
            Phenotypes[i][j].center,
            Phenotypes[i][m].center
          );
          math.find_sides(Phenotypes[i][j], Phenotypes[i][m], axes);
        }
      }
    }
  }
};

var Selection = (Phenotypes, Num_Of_Selections, Weighted_Sum) => {
  var selected = [];

  var probabilities;
  var sorted_probabilities;
  var indeces;
  var select;

  for (var i = 0; i < Num_Of_Selections; i++) {
    probabilities = utils.roulette_wheel(Weighted_Sum);
    sorted_probabilities = probabilities.slice();
    sorted_probabilities.sort();
    indeces = utils.sortWithIndeces(probabilities);
    select = utils.select_individual(sorted_probabilities);
    //console.log(Weighted_Sum); // uncomment for selection testing purpouses
    //console.log(probabilities);
    //console.log(sorted_probabilities);
    //console.log(indeces);
    //console.log(select);
    //console.log(Phenotypes);
    selected.push(clonePhenotype(Phenotypes[indeces[select]]));
    Phenotypes = utils.get_new_arr(indeces[select], Phenotypes);
    probabilities = utils.get_new_arr(indeces[select], probabilities);
    Weighted_Sum = utils.get_new_arr(indeces[select], Weighted_Sum);
  }

  return selected;
};

var Crossing = (Genotypes, Num_Of_Offsprings) => {
  var Offsprings = [];
  for (var i = 0; i < Num_Of_Offsprings; i++) {
    Offsprings[i] = [
      new Primitive(),
      new Primitive(),
      new Primitive(),
      new Primitive(),
    ];
  }

  for (var i = 0; i < Num_Of_Offsprings; i++) {
    var P1 = utils.getRandomInt(0, Genotypes.length - 1);
    var P2 = utils.getRandomInt(0, Genotypes.length - 1);

    var crossing_point1 = utils.getRandomInt(0, 1);
    var crossing_point2 = utils.getRandomInt(0, 1);
    var cointoss = utils.getRandomInt(0, 1);
    var mutation = utils.getRandomInt(0, 100);

    for (var j = 0; j < CONSTANTS.PRIMITIVES; j++) {
      if (cointoss == 0) {
        if (crossing_point1 == 0) {
          Offsprings[i][j].x = Genotypes[P1][j].x;
          Offsprings[i][j].y = Genotypes[P2][j].y;
          Offsprings[i][j].z = Genotypes[P2][j].z;
        } else {
          Offsprings[i][j].x = Genotypes[P1][j].x;
          Offsprings[i][j].y = Genotypes[P1][j].y;
          Offsprings[i][j].z = Genotypes[P2][j].z;
        }
        if (crossing_point2 == 0) {
          Offsprings[i][j].width = Genotypes[P1][j].width;
          Offsprings[i][j].height = Genotypes[P2][j].height;
          Offsprings[i][j].depth = Genotypes[P2][j].depth;
        } else {
          Offsprings[i][j].width = Genotypes[P1][j].width;
          Offsprings[i][j].height = Genotypes[P1][j].height;
          Offsprings[i][j].depth = Genotypes[P2][j].depth;
        }
      } else {
        if (crossing_point1 == 0) {
          Offsprings[i][j].x = Genotypes[P2][j].x;
          Offsprings[i][j].y = Genotypes[P1][j].y;
          Offsprings[i][j].z = Genotypes[P1][j].z;
        } else {
          Offsprings[i][j].x = Genotypes[P2][j].x;
          Offsprings[i][j].y = Genotypes[P2][j].y;
          Offsprings[i][j].z = Genotypes[P1][j].z;
        }
        if (crossing_point2 == 0) {
          Offsprings[i][j].width = Genotypes[P2][j].width;
          Offsprings[i][j].height = Genotypes[P1][j].height;
          Offsprings[i][j].depth = Genotypes[P1][j].depth;
        } else {
          Offsprings[i][j].width = Genotypes[P2][j].width;
          Offsprings[i][j].height = Genotypes[P2][j].height;
          Offsprings[i][j].depth = Genotypes[P1][j].depth;
        }
      }
      if (mutation < 2) {
        var toss = utils.getRandomInt(0, 7);
        if (toss == 0) {
          Offsprings[i][j].width *= 0.8;
          Offsprings[i][j].height *= 0.8;
          Offsprings[i][j].depth *= 0.8;
        } else if (toss == 1) {
          Offsprings[i][j].width *= 1.2;
          Offsprings[i][j].height *= 0.8;
          Offsprings[i][j].depth *= 0.8;
        } else if (toss == 2) {
          Offsprings[i][j].width *= 1.2;
          Offsprings[i][j].height *= 1.2;
          Offsprings[i][j].depth *= 0.8;
        } else if (toss == 3) {
          Offsprings[i][j].width *= 1.2;
          Offsprings[i][j].height *= 1.2;
          Offsprings[i][j].depth *= 1.2;
        } else if (toss == 4) {
          Offsprings[i][j].width *= 1.2;
          Offsprings[i][j].height *= 0.8;
          Offsprings[i][j].depth *= 1.2;
        } else if (toss == 5) {
          Offsprings[i][j].width *= 0.8;
          Offsprings[i][j].height *= 1.2;
          Offsprings[i][j].depth *= 1.2;
        } else if (toss == 6) {
          Offsprings[i][j].width *= 0.8;
          Offsprings[i][j].height *= 0.8;
          Offsprings[i][j].depth *= 1.2;
        } else if (toss == 7) {
          Offsprings[i][j].width *= 0.8;
          Offsprings[i][j].height *= 1.2;
          Offsprings[i][j].depth *= 0.8;
        }
      }
      Offsprings[i][j].update();
    }
  }

  return Offsprings;
};

export {
  Population_INIT,
  clonePhenotype,
  StoreGenotypes,
  clonePrimitive,
  Fix_Overlapping_Primitives,
  Selection,
  Crossing,
};
