// A THREE.js Environment is made up of 5 things:
//  - Renderer (What the user sees)
//  - Scene (the data)
//  - Camera (the perspective)
//  - Meshes (objects in the 3D world)
//  - Lights

const THREE = require("three");
const orbit = require("three-orbit-controls");

const OrbitControls = orbit(THREE);

function createRerender() {
  let renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor("#16161d");
  renderer.setPixelRatio(window.devicePixelRatio);
  let output = document.querySelector("#output");
  output.appendChild(renderer.domElement);
  return renderer; // So we can use it later on
}

function createScene() {
  return new THREE.Scene();
}

function createCamera() {
  let camera = new THREE.PerspectiveCamera(
    45, // Field of View
    window.innerWidth / window.innerHeight, // Aspect Ratio
    0.1, // Near Value
    1000 // Far Value
  );
  camera.position.set(-30, 40, 30); // x, y, z (position of the camera)
  camera.lookAt(0, 0, 0); // (look at the centre of that position)
  return camera;
}

function createAxesHelper() {
  let axesHelper = new THREE.AxesHelper(40);
  return axesHelper;
}

function getRandomColor() {
  let colors = [
    "dodgerblue",
    "tomato",
    "limegreen",
    "rebeccapurple",
    "gold",
    "lavender",
    "lightcoral",
    "papayawhip",
  ];
  let randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

function createCube() {
  // Geometry - The actual shape/ skeleton of the object
  let geometry = new THREE.BoxGeometry(4, 4, 4);
  // Material - The colour / how it interacts with ligth
  let material = new THREE.MeshLambertMaterial({
    color: getRandomColor(),
  });
  // Create a mesh by combining the geometry and the material
  let mesh = new THREE.Mesh(geometry, material);
  // Return it so we can added to the scene
  return mesh;
}

function createSphere() {
  // Geometry - (radius, width, height)
  let geo = new THREE.SphereGeometry(4, 30, 30);
  // Material
  let mat = new THREE.MeshLambertMaterial({
    color: getRandomColor(),
  });
  // Mesh
  let mesh = new THREE.Mesh(geo, mat);
  // Return the mesh
  return mesh;
}

function createLight() {
  let ligth = new THREE.PointLight("white", 1.5);
  return ligth;
}

function createLightHelper(light) {
  let helper = new THREE.PointLightHelper(light);
  return helper;
}

let renderer = createRerender();
let scene = createScene();
let camera = createCamera();
// let axesHelper = createAxesHelper();
let cube = createCube();
let sphere = createSphere();
let light = createLight();
let lightHelper = createLightHelper(light);

//let controls = new orbit(camera, renderer.domElement);
new OrbitControls(camera);

light.position.x = 10;
light.position.y = 10;
light.position.z = 10;

let spheres = [];
let sphereCount = 300;

let cubes = [];
let cubeCount = 500;

for (let i = 1; i <= cubeCount; i += 1) {
  let c = createCube();
  c.position.x = Math.random() * 400 - 200; // -200 to 200, random 3D position
  c.position.y = Math.random() * 400 - 200;
  c.position.z = Math.random() * 400 - 200;
  cubes.push(c);
}

console.log(cubes.length);

for (let m = 1; m <= sphereCount; m += 1) {
  let d = createSphere();
  d.position.x = Math.random() * 400 - 200; // -200 to 200, random 3D position
  d.position.y = Math.random() * 400 - 200;
  d.position.z = Math.random() * 400 - 200;
  spheres.push(d);
}

console.log(spheres.length);

// scene.add(axesHelper);
scene.add(cube, sphere, light, lightHelper, ...cubes, ...spheres);
// ... = separate operator, (run the fx multiple time)

// anytime camera n scene chnage or run, we need to rerender(renderer fx used)
renderer.render(scene, camera);

function animate() {
  cube.rotation.x += 0.03;
  cube.rotation.y += 0.03;
  cube.rotation.z += 0.03;

  cubes.forEach(function (c) {
    c.rotation.x += -0.03;
    c.rotation.y += -0.03;
    c.rotation.z += -0.03;
  });

  sphere.rotation.x += 0.03;

  spheres.forEach(function (d) {
    d.position.x += 0.2;
    d.position.y += 0.2;
    d.position.z += 0.2;
  });

  //  Inrement and decrement
  // cube.position.x += 0.1;
  // cube.position.y -= 0.1;
  // cube.position.z -= 0.1;
  // cube.rotation.x += 0.1;

  renderer.render(scene, camera);
  requestAnimationFrame(animate); // Can you call animate as soon as you can
}

animate();
