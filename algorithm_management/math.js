import * as CONSTANTS from '../CONSTANTS.js';
//given point at center of primitive1 generate 3 planes perpendicular to each other, at the same time parallel to corresponding axis
//find the longest distance between p2 and every such plane.

var find_axis = (center1, center2) => {
  var plane_x = new THREE.Plane();
  plane_x.setFromNormalAndCoplanarPoint(new THREE.Vector3(1, 0, 0), center1);

  var plane_y = new THREE.Plane();
  plane_y.setFromNormalAndCoplanarPoint(new THREE.Vector3(0, 1, 0), center1);

  var plane_z = new THREE.Plane();
  plane_z.setFromNormalAndCoplanarPoint(new THREE.Vector3(0, 0, 1), center1);

  var dx = plane_x.distanceToPoint(center2);
  var dy = plane_y.distanceToPoint(center2);
  var dz = plane_z.distanceToPoint(center2);

  var max = Math.max(dx, dy, dz);

  if (max == dx) {
    return 'x';
  } else if (max == dy) {
    return 'y';
  } else {
    return 'z';
  }
};

//finds the sides of the primitives which has to be squashed
var find_sides = (p1, p2, axes) => {
  if (axes == 'x') {
    var l1 = p1.max_x - p1.min_x;
    var l2 = p2.max_x - p2.min_x;

    //P1 center is farther on the x axis.
    if (p1.x >= p2.x) {
      var dist = Math.abs(p1.side_min_x[0].x - p2.side_max_x[0].x);
      //P1 longer on the x axis
      if (l1 >= l2) {
        var large_chunk = (l1 / (l1 + l2)) * dist - 0.04;
        var small_chunk = dist - large_chunk - 0.04;

        p1.width -= large_chunk;
        p1.x += large_chunk / 2;
        p2.width -= small_chunk;
        p2.x -= small_chunk / 2;

        p1.update();
        p2.update();
      }
      //P2 longer on the x axis
      else {
        var large_chunk = (l2 / (l1 + l2)) * dist - 0.04;
        var small_chunk = dist - large_chunk - 0.04;

        p1.width -= small_chunk;
        p1.x += small_chunk / 2;
        p2.width -= large_chunk;
        p2.x -= large_chunk / 2;

        p1.update();
        p2.update();
      }
    }
    //P2 center is farther on x axis.
    else {
      var dist = Math.abs(p1.side_max_x[0].x - p2.side_min_x[0].x);
      //P1 longer on x axis
      if (l1 >= l2) {
        var large_chunk = (l1 / (l1 + l2)) * dist - 0.04;
        var small_chunk = dist - large_chunk - 0.04;

        p2.width -= small_chunk;
        p2.x += small_chunk / 2;

        p1.width -= large_chunk;
        p1.x -= large_chunk / 2;

        p1.update();
        p2.update();
      }
      //P2 longer on x axis
      else {
        var large_chunk = (l2 / (l1 + l2)) * dist - 0.04;
        var small_chunk = dist - large_chunk - 0.04;

        p2.width -= large_chunk;
        p2.x += large_chunk / 2;

        p1.width -= small_chunk;
        p1.x -= small_chunk / 2;

        p1.update();
        p2.update();
      }
    }
  } else if (axes == 'y') {
    var l1 = p1.max_y - p1.min_y;
    var l2 = p2.max_y - p2.min_y;

    //P1 center is farther on y axis.
    if (p1.y >= p2.y) {
      var dist = Math.abs(p1.side_min_y[0].y - p2.side_max_y[0].y);
      //P1 longer on y axis
      if (l1 >= l2) {
        var large_chunk = (l1 / (l1 + l2)) * dist - 0.04;
        var small_chunk = dist - large_chunk - 0.04;

        p1.height -= large_chunk;
        p1.y += large_chunk / 2;

        p2.height -= small_chunk;
        p2.y -= small_chunk / 2;

        p1.update();
        p2.update();
      }
      //P2 longer on y axis
      else {
        var large_chunk = (l2 / (l1 + l2)) * dist - 0.04;
        var small_chunk = dist - large_chunk - 0.04;

        p1.height -= small_chunk;
        p1.y += small_chunk / 2;
        p2.height -= large_chunk;
        p2.y -= large_chunk / 2;

        p1.update();
        p2.update();
      }
    }
    //P2 center is farther on y axis.
    else {
      var dist = Math.abs(p1.side_max_y[0].y - p2.side_min_y[0].y);
      //P1 longer on y axis
      if (l1 >= l2) {
        var large_chunk = (l1 / (l1 + l2)) * dist - 0.04;
        var small_chunk = dist - large_chunk - 0.04;

        p2.height -= small_chunk;
        p2.y += small_chunk / 2;

        p1.height -= large_chunk;
        p1.y -= large_chunk / 2;

        p1.update();
        p2.update();
      }
      //P2 longer on y axis
      else {
        var large_chunk = (l2 / (l1 + l2)) * dist - 0.04;
        var small_chunk = dist - large_chunk - 0.04;

        p2.height -= large_chunk;
        p2.y += large_chunk / 2;

        p1.height -= small_chunk;
        p1.y -= small_chunk / 2;

        p1.update();
        p2.update();
      }
    }
  } else {
    var l1 = p1.max_z - p1.min_z;
    var l2 = p2.max_z - p2.min_z;

    //P1 center farther on z axis.
    if (p1.z >= p2.z) {
      var dist = Math.abs(p1.side_min_z[0].z - p2.side_max_z[0].z);
      //P1 longer on z axis
      if (l1 >= l2) {
        var large_chunk = (l1 / (l1 + l2)) * dist - 0.04;
        var small_chunk = dist - large_chunk - 0.04;

        p1.depth -= large_chunk;
        p1.z += large_chunk / 2;

        p2.depth -= small_chunk;
        p2.z -= small_chunk / 2;

        p1.update();
        p2.update();
      }
      //P2 longer on z axis
      else {
        var large_chunk = (l2 / (l1 + l2)) * dist - 0.04;
        var small_chunk = dist - large_chunk - 0.04;

        p1.depth -= small_chunk;
        p1.z += small_chunk / 2;
        p2.depth -= large_chunk;
        p2.z -= large_chunk / 2;

        p1.update();
        p2.update();
      }
    }
    //P2 center farther on z axis
    else {
      var dist = Math.abs(p1.side_max_z[0].z - p2.side_min_z[0].z);
      //P1 longer on z axis
      if (l1 >= l2) {
        var large_chunk = (l1 / (l1 + l2)) * dist - 0.03;
        var small_chunk = dist - large_chunk - 0.04;

        p2.depth -= small_chunk;
        p2.z += small_chunk / 2;

        p1.depth -= large_chunk;
        p1.z -= large_chunk / 2;

        p1.update();
        p2.update();
      }
      //P2 longer on z axis
      else {
        var large_chunk = (l2 / (l1 + l2)) * dist - 0.04;
        var small_chunk = dist - large_chunk - 0.04;

        p2.depth -= large_chunk;
        p2.z += large_chunk / 2;

        p1.depth -= small_chunk;
        p1.z -= small_chunk / 2;
        p1.update();
        p2.update();
      }
    }
  }
};

var distance_between_points = (p1, p2) => {
  var x_diff = Math.abs(p1[0] - p2[0]);
  var y_diff = Math.abs(p1[1] - p2[1]);
  var z_diff = Math.abs(p1[2] - p2[2]);

  var dist = Math.sqrt(x_diff * x_diff + y_diff * y_diff + z_diff * z_diff);

  return dist;
};

var calculate_desired_center_of_mass = (Phenotype) => {
  var point = [];
  var min_height = 0;
  var h;
  for (var i = 0; i < CONSTANTS.PRIMITIVES; i++) {
    if (i == 0) {
      min_height = Phenotype[i].y - Phenotype[i].height / 2;
      h = i;
    } else if (min_height > Phenotype[i].y - Phenotype[i].height / 2) {
      min_height = Phenotype[i].y - Phenotype[i].height / 2;
      h = i;
    }
  }

  point = [
    Phenotype[h].x,
    Phenotype[h].y - Phenotype[h].height / 2,
    Phenotype[h].z,
    Phenotype[h].width,
    Phenotype[h].depth,
  ];

  return point;
};

var center_of_mass = (points, masses) => {
  var total_mass = 0;
  var x_com = 0;
  var y_com = 0;
  var z_com = 0;
  for (var i = 0; i < CONSTANTS.PRIMITIVES; i++) {
    total_mass += masses[i];
  }

  for (var i = 0; i < CONSTANTS.PRIMITIVES; i++) {
    x_com += points[i].x * masses[i];
  }
  for (var i = 0; i < CONSTANTS.PRIMITIVES; i++) {
    y_com += points[i].y * masses[i];
  }
  for (var i = 0; i < CONSTANTS.PRIMITIVES; i++) {
    z_com += points[i].z * masses[i];
  }

  x_com /= total_mass;
  y_com /= total_mass;
  z_com /= total_mass;

  return [x_com, y_com, z_com];
};

var calculate_center_of_mass = (Phenotype) => {
  var points = [];
  var masses = [];
  var com = [];

  for (var i = 0; i < CONSTANTS.PRIMITIVES; i++) {
    points[i] = Phenotype[i].center;
    masses[i] = Phenotype[i].get_mass();
  }
  com = center_of_mass(points, masses);

  return com;
};
var is_inside = (p1, p2, width, depth) => {
  var x_min = p1[0] - width / 2;
  var x_max = p1[0] + width / 2;

  var z_min = p1[2] - depth / 2;
  var z_max = p1[2] + depth / 2;

  if (p2[0] <= x_max && p2[0] >= x_min) {
    if (p2[2] <= z_max && p2[2] >= z_min) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export {
  find_axis,
  find_sides,
  distance_between_points,
  calculate_desired_center_of_mass,
  calculate_center_of_mass,
  center_of_mass,
  is_inside,
};
