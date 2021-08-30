// A THREE.js Environment is made up of 5 things:
//  - Renderer (What the user sees)
//  - Scene (the data)
//  - Camera (the perspective)
//  - Meshes (objects in the 3D world)
//  - Lights

const { BoxHelper } = require("three");
const THREE = require("three");

function createRerender() {
  let renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor("#16161d");
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

function createCube() {
  // Geometry - The actual shape/ skeleton of the object
  let geometry = new THREE.BoxGeometry(4, 4, 4);
  // Material - The colour / how it interacts with ligth
  let material = new THREE.MeshLambertMaterial({
    color: "tomato",
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
    color: "dodgerblue",
  });
  // Mesh
  let mesh = new THREE.Mesh(geo, mat);
  // Return the mesh
  return mesh;
}

function createLight() {
  let ligth = new THREE.PointLight("white", 1);
  return ligth;
}

function createLightHelper(light) {
  let helper = new THREE.PointLightHelper(light);
  return helper;
}

let renderer = createRerender();
let scene = createScene();
let camera = createCamera();
let axesHelper = createAxesHelper();
let cube = createCube();
let sphere = createSphere();
let light = createLight();
let lightHelper = createLightHelper(light);

light.position.x = 10;
light.position.y = 10;
light.position.z = 10;

sphere.position.x = 20;

scene.add(axesHelper);
scene.add(cube, sphere, light, lightHelper);

// anytime camera n scene chnage or run, we need to rerender(renderer fx used)
renderer.render(scene, camera);

function animate() {
  //  Inrement and decrement
  // cube.position.x += 0.1;
  // cube.position.y -= 0.1;
  // cube.position.z -= 0.1;
  // cube.rotation.x += 0.1;
  // sphere.position.x += 0.2;
  renderer.render(scene, camera);
  requestAnimationFrame(animate); // Can you call animate as soon as you can
}

animate();
