import * as CONSTANTS from '../CONSTANTS.js';

var drawPhenotype = (Phenotypes, scene, j) => {
  for (var i = 0; i < CONSTANTS.PRIMITIVES; i++) {
    Phenotypes[j][i].draw(scene);
  }
};

var deletePhenotype = (Phenotypes, scene, j) => {
  for (var i = 0; i < CONSTANTS.PRIMITIVES; i++) {
    Phenotypes[j][i].delete(scene);
  }
};

var BFS = (adjency_matrix, start_node) => {
  var queue = [];
  queue.push(start_node);

  var visited_counter = 1;

  var visited = [];
  visited[start_node] = true;

  while (queue.length > 0) {
    var node = queue.shift();
    for (var i = 1; i < adjency_matrix[node].length; i++) {
      if (adjency_matrix[node][i] && !visited[i]) {
        visited[i] = true;
        visited_counter += 1;
        queue.push(i);
      }
    }
  }
  return visited_counter;
};

var is_disconnected = (Phenotype) => {
  var i, j;
  var connectivity = Array.from(
    Array(CONSTANTS.PRIMITIVES),
    () => new Array(CONSTANTS.PRIMITIVES)
  );
  for (i = 0; i < CONSTANTS.PRIMITIVES; i++) {
    for (j = 0; j < CONSTANTS.PRIMITIVES; j++) {
      var polyA = new SAT.Shape(
        Phenotype[i].points,
        CONSTANTS.FACES,
        CONSTANTS.EDGES
      );
      var polyB = new SAT.Shape(
        Phenotype[j].points,
        CONSTANTS.FACES,
        CONSTANTS.EDGES
      );
      if (i == j) {
        connectivity[i][j] = 0;
      } else if (SAT.CheckCollision(polyA, polyB)) {
        connectivity[i][j] = 1;
      } else {
        connectivity[i][j] = 0;
      }
    }
  }

  var visited = BFS(connectivity, 0);

  if (visited == CONSTANTS.PRIMITIVES) {
    return 1;
  } else {
    return CONSTANTS.IS_DISCONNECTED;
  }
};

var roulette_wheel = (weighted_sum) => {
  var probabilities = [];
  var sum = 0;
  for (var i = 0; i < weighted_sum.length; i++) {
    sum += weighted_sum[i];
  }

  for (var i = 0; i < weighted_sum.length; i++) {
    probabilities[i] = weighted_sum[i] / sum;
  }

  return probabilities;
};

var sortWithIndeces = (toSort) => {
  var temp = toSort.slice();
  for (var i = 0; i < temp.length; i++) {
    temp[i] = [temp[i], i];
  }
  temp.sort(function (left, right) {
    return left[0] < right[0] ? -1 : 1;
  });
  temp.sortIndices = [];
  for (var j = 0; j < temp.length; j++) {
    temp.sortIndices.push(temp[j][1]);
    temp[j] = temp[j][0];
  }
  return temp.sortIndices;
};

var select_individual = (sorted_probabilities) => {
  var sums = [];

  for (var i = 0; i < sorted_probabilities.length; i++) {
    sums[i] = 0;
    for (var j = 0; j <= i; j++) {
      sums[i] += sorted_probabilities[j];
    }
  }

  var random = Math.random();
  for (var i = 0; i < sorted_probabilities.length; i++) {
    if (random < sums[i]) {
      return i;
    }
  }
};

var get_new_arr = (index, array) => {
  var arr = [];
  var flag = 0;
  for (var i = 0; i < array.length; i++) {
    if (i == index) {
      flag = 1;
      continue;
    }
    if (flag == 1) {
      arr[i - 1] = array[i];
    } else {
      arr[i] = array[i];
    }
  }
  return arr;
};

var getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export {
  drawPhenotype,
  deletePhenotype,
  is_disconnected,
  roulette_wheel,
  sortWithIndeces,
  select_individual,
  get_new_arr,
  getRandomInt,
};
