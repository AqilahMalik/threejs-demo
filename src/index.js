// A THREE.js Environment is made up of 5 things:
// - Renderer (what the user sees)
// - Scene (the data)
// - Camera (the perspective)
// - Meshes (objects in the 3D world)
// - Lights

const THREE = require("three");
const orbit = require("three-orbit-controls");

const OrbitControls = orbit(THREE);

function createRenderer() {
  let renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor("#16161d"); // Eigengrau
  renderer.setPixelRatio(window.devicePixelRatio);
  let output = document.querySelector("#output");
  output.appendChild(renderer.domElement);
  return renderer;
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
  camera.position.set(-30, 40, 30); // x, y, z
  camera.lookAt(0, 0, 0);
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
  // Geometry - The actual shape/skeleton of the object
  let geometry = new THREE.BoxGeometry(4, 4, 4);
  // Material - The colour/how it interacts with light
  let material = new THREE.MeshLambertMaterial({
    color: getRandomColor(),
  });
  // Create a mesh by combining the geometry and the material
  let mesh = new THREE.Mesh(geometry, material);
  // Return it so we can add it to the scene
  return mesh;
}

function createSphere() {
  // Geometry
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
  let light = new THREE.PointLight("white", 1.2);
  return light;
}

function createLightHelper(light) {
  let helper = new THREE.PointLightHelper(light);
  return helper;
}

let renderer = createRenderer();
let scene = createScene();
let camera = createCamera();
// let axesHelper = createAxesHelper();
let cube = createCube();
let sphere = createSphere();
let light = createLight();
let lightHelper = createLightHelper(light);

new OrbitControls(camera);

light.position.x = 10;
light.position.y = 10;
light.position.z = 10;

sphere.position.x = 20;

let cubes = [];
let cubeCount = 500;

for (let i = 1; i <= cubeCount; i += 1) {
  let c = createCube();
  c.position.x = Math.random() * 400 - 200; // -200 to 200
  c.position.y = Math.random() * 400 - 200; // -200 to 200
  c.position.z = Math.random() * 400 - 200; // -200 to 200
  cubes.push(c);
}

console.log(cubes.length);

// scene.add(axesHelper);
scene.add(cube, sphere, light, lightHelper, ...cubes);

renderer.render(scene, camera);

function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cube.rotation.z += 0.01;

  cubes.forEach(function (c) {
    c.rotation.x -= 0.01;
    c.rotation.y -= 0.01;
    c.rotation.z -= 0.01;
  });

  // cube.rotation.z -= 0.1;
  // cube.position.z -= 0.1;
  // Muck around with the axes
  // Increment and decrement the x, y, z
  renderer.render(scene, camera);
  requestAnimationFrame(animate); // Can you call animate as soon as you can
}

animate();
