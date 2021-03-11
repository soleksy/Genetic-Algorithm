import Primitive from './Primitive.js'
import { createControls } from "/system/controls.js";

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = createControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

camera.position.set(0, 0, 20);

var P1 = new Primitive();
var P2 = new Primitive();

P1.draw(scene);
P2.draw(scene);

var update = function () {
};

var render = function () {
    renderer.render(scene, camera);
};

var MainLoop = function () {

    requestAnimationFrame(MainLoop);
    update();
    render();

};

MainLoop();