import * as THREE from '../libs/three_js/three.module.js';
import { Environment } from './environment.js';
import { GUI } from '../libs/human_interface/dat.gui.module.js';
import { OrbitControls } from '../libs/human_interface/OrbitControls.js';
import Stats from '../libs/human_interface/stats.module.js';
import { ColorGUIHelper } from './utils/colorGUIHelper.js';
import { Cat } from './cat.js'
import { CatAnimator } from './catAnimator.js'

import { Human } from './human.js'
import { HumanAnimator } from './humanAnimator.js'


let canvas, camera, scene, renderer, pixelRatio, width, height;

let environment, cat, catAnimator, human, humanAnimator;

let stats;
await load();
init();
render();
async function load() { //Async function to load all the models

    environment = new Environment();
    await environment.load();

    cat = new Cat();
    await cat.load();

    human = new Human();
    await human.load();
}

function init() {

    //Container
    const container = document.createElement('div');
    document.body.appendChild(container);
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


    //Stats
    stats = new Stats();
    container.appendChild(stats.dom);
    //Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);

    window.addEventListener('resize', onWindowResize);

    //Environment
    environment.init(scene);

    //Cat
    cat.init();
    scene.add(cat.model);
    catAnimator = new CatAnimator(cat, environment);
    catAnimator.init();


    //Human
    human.init();
    scene.add(human.model);
    humanAnimator = new HumanAnimator(human, environment);
    humanAnimator.init();

    //Commands Listener
    commandListenerInit()


    const gui = new GUI();
    let folder = gui.addFolder("Human Colors")
    folder.addColor(new ColorGUIHelper(human.colorableParts.hair, 'color'), 'value').name('Hair Color');
    folder.addColor(new ColorGUIHelper(human.colorableParts.skin, 'color'), 'value').name('Skin Color');
    folder.addColor(new ColorGUIHelper(human.colorableParts.bracelet, 'color'), 'value').name('Bracelet Color');
    folder.addColor(new ColorGUIHelper(human.colorableParts.jacket, 'color'), 'value').name('Jacket Color');
    folder.addColor(new ColorGUIHelper(human.colorableParts.shirt, 'color'), 'value').name('Shirt Color');
    folder.addColor(new ColorGUIHelper(human.colorableParts.pants, 'color'), 'value').name('Pants Color');
    folder.addColor(new ColorGUIHelper(human.colorableParts.shoes, 'color'), 'value').name('Shoes Color');
    folder.open()
    folder = gui.addFolder("Lights")

    folder.addColor(new ColorGUIHelper(environment.ambientLight, 'color'), 'value').name("Ambient Color")
    folder.add(environment.ambientLight, 'intensity', 0.0, 1.0, 0.01).name("Ambient Intensity")

    folder.addColor(new ColorGUIHelper(environment.pointLight, 'color'), 'value').name("Lamp Color")
    folder.add(environment.pointLight, 'intensity', 0.0, 1.0, 0.01).name("Lamp Intensity")
    folder.open()

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
    humanAnimator.update();
    environment.updateLampLight();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
    stats.update();
}

function commandListenerInit() {
    document.addEventListener('keydown', (event) => {
        let key = event.key;
        if (key == "f") {
            humanAnimator.startInteraction()
        }
        if (key == "g") {
            humanAnimator.stopInteraction()
        }
        if (key == "ArrowUp" || key == "w") {
            humanAnimator.startWalking()
        }
        else if (key == "ArrowLeft" || key == "a") {
            humanAnimator.turnLeft()
        }
        else if (key == "ArrowRight" || key == "d") {
            humanAnimator.turnRight()
        }
    }, false)
    document.addEventListener('keyup', (event) => {
        let key = event.key;
        if (key == "ArrowUp" || key == "w") {
            humanAnimator.stopWalking()
        }
        else if (key == "ArrowLeft" || key == "ArrowRight" || key == "a" || key == "d") {
            humanAnimator.changingDirection = false
        }

    }, false)
}