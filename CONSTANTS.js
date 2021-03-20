const INITIAL_POPULATION_SIZE = 20;
const PRIMITIVES = 4;

const IDEAL_MASS = 450;
const IDEAL_SIZE = 250; 

const EDGES = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 4],
    [3, 4],
    [2, 5],
    [0, 7],
    [1, 6]
];

const FACES = [
    [0, 1, 2, 3],  // front
    [4, 5, 6, 7],  // back
    [3, 2, 5, 4],  // right
    [7, 6, 1, 0],  // left
    [7, 0, 3, 4],  // top
    [5, 2, 1, 6]   // bottom
]


export{INITIAL_POPULATION_SIZE,PRIMITIVES,IDEAL_MASS,IDEAL_SIZE,EDGES,FACES}