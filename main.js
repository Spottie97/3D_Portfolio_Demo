import './style.css';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render( scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({color: 0xFDF6347});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus)

//Lighting for specific area
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20,20,20)

//Lighting that covers the whole room
const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

//THREE.js has helpers to make things easier(lighting and shaders)
//The light helper adds a box that shows the area the lighting is coming from.(like in Unity)
const lightHelper = new THREE.PointLightHelper(pointLight)
//The grid helper draws a grid on the screen to help with positioning
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)

//Control Orbit using OrbitControlls
const controls = new OrbitControls(camera, renderer.domElement);


function animate(){
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();
