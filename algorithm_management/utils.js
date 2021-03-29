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

export { drawPhenotype, deletePhenotype, BFS };
