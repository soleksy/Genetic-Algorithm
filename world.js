import * as CONSTANTS from './CONSTANTS.js';
import { createControls } from '/system/controls.js';
import * as population from './algorithm_management/population.js';
import * as evaluation from './algorithm_management/evaluation.js';
import * as utils from './algorithm_management/utils.js';
import Primitive from './Primitive.js';
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  90,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = createControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

camera.position.set(0, 0, 20);

// Perform the standard Genetic Algorithm to obtain new population
var GeneticAlgorithm = (Phenotypes) => {
  var Genotypes = population.StoreGenotypes(Phenotypes);
  population.Fix_Overlapping_Primitives(Phenotypes);
  var Weighted_Sum = evaluation.get_weighted_sum(Phenotypes);
  var Selected = population.Selection(Genotypes, 80, Weighted_Sum);
  var Offsprings = population.Crossing(
    Selected,
    CONSTANTS.INITIAL_POPULATION_SIZE
  );
  return Offsprings;
};

var PHENOTYPES = population.Population_INIT();

for (var i = 0; i <= CONSTANTS.NUM_OF_GENERATIONS; i++) {
  console.log('Generacja' + i + ' z ' + CONSTANTS.NUM_OF_GENERATIONS);
  PHENOTYPES = GeneticAlgorithm(PHENOTYPES);

  if (i == CONSTANTS.NUM_OF_GENERATIONS) {
    evaluation.get_avarages(PHENOTYPES);
  }
  if (i == 0) {
    evaluation.get_starting_avarages(PHENOTYPES);
  }
}

console.log(PHENOTYPES);

var i = 0;
// DRAW THE INITIAL POPULATION
document.addEventListener('keydown', (e) => {
  if (e.code == 'ArrowRight') {
    if (i == CONSTANTS.INITIAL_POPULATION_SIZE - 1) {
      utils.deletePhenotype(PHENOTYPES, scene, i);
      utils.drawPhenotype(PHENOTYPES, scene, i);
    } else {
      utils.deletePhenotype(PHENOTYPES, scene, i);
      i += 1;
      utils.drawPhenotype(PHENOTYPES, scene, i);
    }
  } else if (e.code == 'ArrowLeft') {
    if (i == 0) {
      utils.deletePhenotype(PHENOTYPES, scene, i);
      utils.drawPhenotype(PHENOTYPES, scene, i);
    } else {
      utils.deletePhenotype(PHENOTYPES, scene, i);
      i -= 1;
      utils.drawPhenotype(PHENOTYPES, scene, i);
    }
  }
});

var update = () => {};

var render = () => {
  renderer.render(scene, camera);
};

var MainLoop = () => {
  requestAnimationFrame(MainLoop);
  update();
  render();
};

MainLoop();
