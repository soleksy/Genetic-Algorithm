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

export { drawPhenotype, deletePhenotype, BFS, is_disconnected };
