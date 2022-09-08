import * as THREE from '../libs/three_js/three.module.js';
import { Environment } from './environment.js';
import { GUI } from '../libs/human_interface/dat.gui.module.js';
import { OrbitControls } from '../libs/human_interface/OrbitControls.js';
import { Cat } from './cat.js'
import { Utils } from './Utils.js'
import { IdleCatAnimator } from './idleCatAnimator.js'
import { MoveCatAnimator } from './moveCatAnimator.js'

const utils = new Utils();

let canvas, camera, scene, renderer, pixelRatio, width, height;

let environment, idleCat, idleCatAnimator, moveCat, moveCatAnimator;

await load();
init();
render();
async function load() { //Async function to load all the models

    //Environment (the room)
    environment = new Environment();
    await environment.load();


    //resting cat
    idleCat = new Cat();
    await idleCat.load();
    //moving cat
    //moveCat = new Cat();
    //await moveCat.load();

}

function init() {

    canvas = document.querySelector('#canvas');
    //Renderer
    pixelRatio = window.devicePixelRatio;
    width = canvas.clientWidth * pixelRatio | 0;
    height = canvas.clientHeight * pixelRatio | 0;
    renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(width, height, false);
    renderer.shadowMap.enabled = true;

    //Camera

    const fov = 45;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 8000;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 5000);

    // CONTROLS ------------------------------------------------------------------
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 100, 0);
    controls.update();

    //Scene

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);


    window.addEventListener('resize', onWindowResize);

    //Environment
    environment.init(scene);

    //idleCat
    idleCat.init();
    scene.add(idleCat.model);
    idleCatAnimator = new IdleCatAnimator(idleCat, environment);
    idleCatAnimator.init();

    //moving Cat
    /*
    moveCat.init();
    scene.add(moveCat.model);
    moveCatAnimator = new MoveCatAnimator(moveCat, environment);
    moveCatAnimator.init();

    const gui = new GUI();
    console.log((moveCat.parts))

    let folder = gui.addFolder('Model');
    let part = moveCat.model;
    folder.add(part.position, 'x', -2000, 2000, 0.01).name('X Position')
    folder.add(part.position, 'y', -2000, 2000, 0.01).name('Y Position')
    folder.add(part.position, 'z', -2000, 2000, 0.01).name('Z Position')

    folder.open()
    for (let i = 0; i < moveCat.PARTS.length; i++) {

        let part = moveCat.parts[Object.keys(moveCat.parts)[i]];
        let folder = gui.addFolder(part.name);
        folder.add(part.rotation, 'x', 0, Math.PI * 2, 0.01).name('X Rotation')
        folder.add(part.rotation, 'y', 0, Math.PI * 2, 0.01).name('Y Rotation')
        folder.add(part.rotation, 'z', 0, Math.PI * 2, 0.01).name('Z Rotation')
        folder.open();
    }
*/

}


function onWindowResize() {
    width = canvas.clientWidth * pixelRatio | 0;
    height = canvas.clientHeight * pixelRatio | 0;
    canvas = renderer.domElement;
    renderer.setSize(width, height, false);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

function render() {
    idleCatAnimator.update();
 //   moveCatAnimator.update();
    environment.updateReflectionCamera(renderer, scene, camera.position);
    renderer.render(scene, camera);

    requestAnimationFrame(render);
}