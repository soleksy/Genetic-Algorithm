import * as CONSTANTS from './CONSTANTS.js';
import { createControls } from '/system/controls.js';
import * as population from './algorithm_management/population.js';
import * as evaluation from './algorithm_management/evaluation.js';
import * as properties from './algorithm_management/properties.js';
import * as utils from './algorithm_management/utils.js';
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

// 1) Generate Initial Population
var PHENOTYPES = population.Population_INIT();

// 2) Store genotypes for future use, the initial genotypes will be altered due to normalization but the their initial value is needed
//    for the evolution process.

var GENOTYPES = [];
GENOTYPES = population.StoreGenotypes(PHENOTYPES);

// 3) Correct the phenotypes (solve the problem of overlapping) using SAT theorem.

population.Fix_Overlapping_Primitives(PHENOTYPES);

// 4) Evaluate the corrected phenotypes
// calculate & evaluate mass
var masses = evaluation.calculate_mass(PHENOTYPES);
var mass_eval = evaluation.evaluate_mass(masses);

//calculate & evaluate size
var sizes = evaluation.calculate_size(PHENOTYPES);
var size_eval = evaluation.evaluate_size(sizes);

//calculate & evaluate height
var heights = evaluation.calculate_heights(PHENOTYPES);
var heights_eval = evaluation.evalulate_heights(heights);

// evaluate distance & connectivity
var dist = evaluation.evaluate_distances(PHENOTYPES);
var connect = evaluation.evaluate_connectivity(PHENOTYPES);

//calculate && evaluate table top area

console.log(mass_eval);
console.log(size_eval);
console.log(heights_eval);
console.log(dist);
console.log(connect);

// 5) Perform the standard Genetic Algorithm to obtain new population
// 6) Repeat the process until some condition

var GeneticAlgorithm = () => {};

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
