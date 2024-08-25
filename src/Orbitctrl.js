import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

const cursor ={
  x:0,
  y:0
}; 

window.addEventListener("mousemove", (event)=>{
  cursor.x = event.clientX/sizes.width - 0.5;
  cursor.y = -1* event.clientX/sizes.width - 0.5;
  
})

// Scene
const scene = new THREE.Scene();

// Object
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
scene.add(mesh);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.x = 2;
camera.position.y = 2;
camera.position.z = 2;
camera.lookAt(mesh.position);
scene.add(camera);

const control =  new OrbitControls(camera, canvas);
// control.target.y =2;
control.enableDamping = true;
// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Animate
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  // mesh.rotation.y = elapsedTime;

  camera.position.x = Math.sin(cursor.x*Math.PI*2)*5;
  camera.position.z=  Math.cos(cursor.x*Math.PI*2)*3;
  camera.position.y=  Math.cos(cursor.x*Math.PI*2)*3;
  camera.lookAt(mesh.position);
  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
