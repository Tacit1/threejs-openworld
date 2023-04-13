
import './style.css'
import * as Three from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new Three.Scene();

const camera = new Three.PerspectiveCamera(75 , (window.innerWidth) / window.innerHeight, 0.1, 1000);

const renderer = new Three.WebGLRenderer({
  canvas: document.querySelector('#bg')
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);



const geometry = new Three.TorusGeometry( 10, 3, 16, 100 );
const material = new Three.MeshStandardMaterial({ color: 0xFF6347});
const torus = new Three.Mesh(geometry, material);

scene.add(torus);

const pointLight = new Three.PointLight(0xffffff);
const ambientLight = new Three.AmbientLight(0xffffff);
pointLight.position.set(20,20,20)

scene.add(pointLight, ambientLight)

const lightHelper = new Three.PointLightHelper(pointLight);
const gridHelper = new Three.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);


function addStar(){
  const geometry  = new Three.SphereGeometry(0.25, 24, 24);
  const material = new Three.MeshStandardMaterial( { color: 0xffffff });
  const star = new Three.Mesh(geometry, material);
  console.log("add star")
  const [x, y, z] = Array(3).fill().map( () => Three.MathUtils.randFloatSpread( 100 ) );
  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar)


const textureLoader = new Three.TextureLoader();
const spaceTexture = textureLoader.load('./images/space.jpg');
scene.background = spaceTexture;

const memeTexture = textureLoader.load('./images/meme.png')

const meme = new Three.Mesh(
  new Three.BoxGeometry(3, 3, 3),
  new Three.MeshBasicMaterial({map: memeTexture})
);
scene.add(meme);

const moonTexture = textureLoader.load('./images/moon.jpg');
const normalTexture = textureLoader.load('./images/normal.jpg');

const moon = new Three.Mesh(
    new Three.SphereGeometry(3, 32, 32), 
    new Three.MeshStandardMaterial({map: moonTexture, normalMap: normalTexture})
);
moon.position.set(10, 0, 0);
scene.add(moon);

function animate(){
    requestAnimationFrame(animate);
    
    torus.rotation.x += 0.01;
    torus.rotation.y  += 0.005;
    torus.rotation.z += 0.01;
    controls.update();

    renderer.render(scene, camera);

}

animate();