import * as THREE from '../libs/three_js/three.module.js';
import { Environment } from './environment.js';
import { GUI } from '../libs/human_interface/dat.gui.module.js';
import { OrbitControls } from '../libs/human_interface/OrbitControls.js';
import {Cat} from './cat.js'
import { Utils } from './Utils.js'

const utils = new Utils();

let canvas, camera, scene, renderer, cubes, pixelRatio, width, height;

let environment, cat;

await load();
init();
render();
async function load() { //Async function to load all the models

    //Environment (the room)
    environment = new Environment();
    await environment.load();


    //User controlled cat
    cat = new Cat();
    await cat.load();
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
    cat.init(scene);
    scene.add(cat.model);
//    utils.print_dump_object(scene.cat.model);
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
    //time *= 0.001;  // convert time to seconds

    environment.updateReflectionCamera(renderer, scene, camera.position);
    renderer.render(scene, camera);

    requestAnimationFrame(render);
}