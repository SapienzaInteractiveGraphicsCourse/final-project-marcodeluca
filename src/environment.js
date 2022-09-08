import * as THREE from '../libs/three_js/three.module.js';
import { GLTFLoader } from '../libs/loaders/GLTFLoader.js';
import { Utils } from './Utils.js'

const utils = new Utils();

class Environment {
    ENVIRONMENT_MODEL_PATH = './src/models/room.gltf';
    FLOOR_TEXTURE_PATH = './src/textures/Floor/Floor';
    COUCH_TEXTURE_PATH = './src/textures/Couch/Couch';
    PILLOW_TEXTURE_PATH = './src/textures/Couch/Pillow';
    WOOD_TEXTURE_PATH = './src/textures/Wood/Wood';
    METAL_TEXTURE_PATH = './src/textures/Metal/Metal';
    STEAK_TEXTURE_PATH = './src/textures/Steak/Steak_basecolor.jpg';
    TVScreen;
    TVRenderTarget;
    TVcamera;
    TVScene;
    constructor() {
        this.gltfLoader = null;
        this.loadedData = null;
        this.scene = null;
        this.textureLoader = null;

        this.floor = null;
        this.floorTexture = null;

        this.wallNorth = null;
        this.wallEast = null;
        this.wallWest = null;
        this.wallTexture = null;

        this.couch1 = null;
        this.couchTexture = null;

        this.woodTexture = null; //Unused
        this.steakTexture = null;
        this.cubeCamera = null;
        this.cubeCamera2 = null;

    }

    async load() {
        this.gltfLoader = new GLTFLoader();
        this.textureLoader = new THREE.TextureLoader();
        this.loadedData = await this.gltfLoader.loadAsync(this.ENVIRONMENT_MODEL_PATH);
        this.floorTexture = this.setupTexture(this.FLOOR_TEXTURE_PATH, 10, 10);
        this.couchTexture = this.setupTexture(this.COUCH_TEXTURE_PATH, 3, 3);
        this.pillowTexture = this.setupTexture(this.PILLOW_TEXTURE_PATH, 3, 3);
        this.woodTexture = this.setupTexture(this.WOOD_TEXTURE_PATH, 10, 10);
        this.metalTexture = this.setupTexture(this.METAL_TEXTURE_PATH, 3, 3);

        //this.steakTexture = this.textureLoader.load(this.STEAK_TEXTURE_PATH);

        this.scene = this.loadedData.scene;
        this.scene.scale.set(100, 100, 100);
        this.scene.updateMatrixWorld(true);
        let gltfLoader = new GLTFLoader();
        let loadedData= await gltfLoader.loadAsync('./src/models/human.gltf');
        let model = loadedData.scene.children[0];
        console.log(model)
        loadedData.scene.scale.set(0.025,0.025,0.025);
        console.log(loadedData)
        this.scene.add(model);
        console.log(this.scene)
    }
    init(scene) {
        this.room();
        this.lights(scene)

        scene.add(this.scene);
    }

    room() {
        //utils.print_dump_object(this.scene);
        this.floor = this.scene.getObjectByName('Floor');
        this.floor.material = this.setupMaterial(this.floorTexture, 0.00, 1.0);
        this.wallMaterial = new THREE.MeshPhongMaterial({ color: 0x135CA3 });

        this.wallEast = this.scene.getObjectByName('Wall_est');
        this.wallEast.material = this.wallMaterial;
        this.wallNorth = this.scene.getObjectByName('Wall_nord');
        this.wallNorth.material = this.wallMaterial;
        this.wallWest = this.scene.getObjectByName('Wall_west');
        this.wallWest.material = this.wallMaterial;

        this.ceiling = this.scene.getObjectByName('Ceiling');
        this.ceiling.material = this.wallMaterial.clone();
        this.ceiling.material.color.set(0xFFFFFF);

        let Couch1Parts = ['Couch11', 'Couch12', 'Couch13', 'Couch14', 'Couch15',]
        let pillowsParts = ['Couch1pillow1', 'Couch1pillow2', 'Couch2pillow1', 'Couch2pillow2',]
        let Couch2Parts = ['Couch21', 'Couch22', 'Couch23', 'Couch24', 'Couch25',]
        this.couch1 = [];
        this.couch2 = [];
        this.pillows = [];
        this.couchMaterial = this.setupMaterial(this.couchTexture, 0.05, 1.0);
        this.couchMaterial.color.set(0xf1eed5);
        this.pillowMaterial = this.setupMaterial(this.pillowTexture, 0.05, 1.0);

        for (let i = 0; i < 5; i++) {
            this.couch1[i] = this.scene.getObjectByName(Couch1Parts[i]);
            this.couch2[i] = this.scene.getObjectByName(Couch2Parts[i]);
            this.couch1[i].material = this.couchMaterial;
            this.couch2[i].material = this.couchMaterial;

        }
        const colors = [0xff5650, 0xd3c7a2, 0x50bfff, 0xd3c7a2]
        for (let i = 0; i < 4; i++) {
            this.pillows[i] = this.scene.getObjectByName(pillowsParts[i]);
            this.pillows[i].material = this.pillowMaterial.clone();
            this.pillows[i].material.color.set(colors[i]);

        }
        this.woodMaterial = this.setupMaterial(this.woodTexture, 0.0, 1.0);
        this.metalMaterial = this.setupMaterial(this.metalTexture, 0.0, 0.0);
        this.metalMaterial.metal = 1;

        this.lampMaterial = this.setupMaterial(this.metalTexture, 0.00, 0.0);
        this.lampMaterial.metal = 1;
        this.lampMaterial.emissiveMap = this.metalTexture['roughness'];
        //this.lampMaterial.emissiveIntensity=255;

        const cubeRenderTarget1 = new THREE.WebGLCubeRenderTarget(1024, {
            generateMipmaps: true,
            minFilter: THREE.LinearMipmapLinearFilter,
        })
        this.cubeCamera = new THREE.CubeCamera(0.1, 1000, cubeRenderTarget1)


        this.lampBase = this.scene.getObjectByName('Lamp_2');
        this.lampBase.material = new THREE.MeshStandardMaterial({
            envMap: cubeRenderTarget1.texture,
            color: 0xc8c8c8,
            metalness: 1.0,
            roughness: 0
        })
        this.lampBase.add(this.cubeCamera);
        this.lampHead = this.scene.getObjectByName('Light');
        this.lampHead.material = new THREE.MeshStandardMaterial({
            emissive: 0xFFFFFF,
            emissiveIntensity: 40,
            metalness: 1.0,
            roughness: 0
        })
        //console.log(this.scene.getObjectByName('TV_holder').material);
        //this.lampHead.material.emissive= 0xFFFFFF;
        //this.lampHead.material.emissiveIntensity=100;

        //TV Table parts
        this.TVtableWood = this.scene.getObjectByName('Plane003_Plane001');
        this.TVtableWood.material = this.woodMaterial;
        this.TVtableWood.material.side = THREE.DoubleSide;
        this.TVtableButtons = this.scene.getObjectByName('Plane003_Plane001_1');
        this.TVtableButtons.material = this.metalMaterial;
        this.TVtableButtons.material.side = THREE.DoubleSide;
        this.TVtableEdge = this.scene.getObjectByName('Plane003_Plane001_2');
        this.TVtableEdge.material = this.metalMaterial;
        this.TVtableEdge.material.side = THREE.DoubleSide;
        //TV Holder
        this.scene.getObjectByName('TV_holder').material = this.metalMaterial
        //TV parts
        this.scene.getObjectByName('Plane_2').material = new THREE.MeshPhongMaterial({ color: 0xFFFFFF }); // Samsung Logo of the TV
        this.scene.getObjectByName('Plane_3').material = new THREE.MeshPhongMaterial({ color: 0x000000 }); // Samsung Logo Backdrop
        this.scene.getObjectByName('Plane_4').material = this.metalMaterial; // TV Screen Edge


        //TV Screen and its reflection
/*
        this.TVRenderTarget = new THREE.WebGLRenderTarget(5000, 5000);
        this.TVcamera = new THREE.PerspectiveCamera(120, 4.55 / 2.555, 0.001, 800);
        this.TVcamera.position.set(-1.1 * 4.25, 1.8 * 2.75, -0.5);
        this.TVcamera.updateProjectionMatrix();
  */
       //const camerahelper = new THREE.CameraHelper(this.TVcamera);
        //this.scene.add(camerahelper);


        this.TVScreen = new THREE.Mesh(new THREE.PlaneGeometry(4.55, 2.555), new THREE.MeshStandardMaterial({
            color: 0x0c0c0c,
            // Almost black, since the TV is turned off. Technically should be black, but that way there would be no reflection at all
            //map: this.TVRenderTarget.texture,
            metallic:1.0,
            roughness: 0.05
        }));
        this.TVScreen.position.x = -4.385;
        this.TVScreen.position.y = 2.925;
        this.TVScreen.position.z = -0.5;
        this.TVScreen.rotation.y = Math.PI / 2;
        this.scene.add(this.TVScreen);

//TV SCreen 2
/*
        const cubeRenderTarget2 = new THREE.WebGLCubeRenderTarget(1024, {
            //generateMipmaps: true,
            //minFilter: THREE.LinearMipmapLinearFilter,
        })
        this.cubeCamera2 = new THREE.CubeCamera(1, 1000, cubeRenderTarget2)


        this.screen =  new THREE.Mesh(new THREE.BoxGeometry(0.1, 2.555, 4.55), new THREE.MeshStandardMaterial({
            envMap: cubeRenderTarget2.texture,
            color: 0xc8c8c8,
            metalness: 1.0,
            roughness: 0.05
        }));
        this.screen.position.x = -4.385;
        this.screen.position.y = 2.925;
        this.screen.position.z = -0.5;
        //this.scene.add(this.screen);
        //this.screen.add(this.cubeCamera2);
*/
//End tv screen

        this.TV = this.scene.getObjectByName('Plane_5'); // Samsung Logo holder
        this.TV = this.scene.getObjectByName('Plane_6'); // TV Lower Edge
        this.TV.material = this.metalMaterial;
        this.TV = this.scene.getObjectByName('Plane_7'); // Samsung Logo of the TV
        this.TV.material = this.metalMaterial;

        //Kitchen table
        this.scene.getObjectByName('Plane001').material = this.woodMaterial; //Upper part
        this.scene.getObjectByName('Plane001_1').material = this.metalMaterial.clone(); //Legs
        this.scene.getObjectByName('Plane001_2').material.color.set(0xeeeeee);
        this.scene.getObjectByName('Plane001_2').material = this.metalMaterial.clone(); //Feet
        this.scene.getObjectByName('Plane001_2').material.color.set(0x0c0c0c);


        //Chair 1
        this.scene.getObjectByName('Cube006').material = this.pillowMaterial.clone(); //Upper part
        this.scene.getObjectByName('Cube006').material.color.set(0xd3c7a2);

        //Chair 2
        this.scene.getObjectByName('Cube007').material = this.pillowMaterial.clone(); //Upper part
        this.scene.getObjectByName('Cube007').material.color.set(0xd3c7a2);

    }
    lights(scene) {
        //Ambient lighting
        const AMBIENT_LIGHT_COLOR = 0xFFFFFF;
        const AMBIENT_LIGHT_INTENSITY = 0.3;

        const ambientLight = new THREE.AmbientLight(AMBIENT_LIGHT_COLOR, AMBIENT_LIGHT_INTENSITY);
        scene.add(ambientLight);

        //Lamp light
        const color = 0xFFFFFF;
        const intensity = 0.7;
        const light = new THREE.PointLight(color, intensity,);
        light.position.set(400, 355, 550);
        const helper = new THREE.PointLightHelper(light, 5, 0xFF0000);
        //scene.add(helper);
        scene.add(light);

    }

    updateReflectionCamera(renderer$, scene$, eyeposition) {
        let lookat;
        const currentRenderTarget = renderer$.getRenderTarget();
        this.cubeCamera.update(renderer$, scene$);
        //this.cubeCamera2.update(renderer$, scene$);
/*
        lookat = new THREE.Vector3((eyeposition.x),
            ((this.TVcamera.position.y) - eyeposition.y),
            (this.TVcamera.position.z - eyeposition.z))
        this.TVcamera.lookAt(lookat);
        this.TVcamera.updateProjectionMatrix();
        renderer$.setRenderTarget(this.TVRenderTarget);
        renderer$.render(scene$, this.TVcamera);
        */
        renderer$.setRenderTarget(currentRenderTarget);
    }

    setupTexture(path, X, Y) {
        let texture = {};
        texture['color'] = this.textureLoader.load(path + '_basecolor.jpg');
        texture['height'] = this.textureLoader.load(path + '_height.png');
        texture['normal'] = this.textureLoader.load(path + '_normal.jpg');
        texture['roughness'] = this.textureLoader.load(path + '_roughness.jpg');
        texture['ambientOcclusion'] = this.textureLoader.load(path + '_ambientOcclusion.jpg');

        for (const [key, value] of Object.entries(texture)) {
            this.repeatTexture(texture[key], X, Y);
        }

        return texture
    }
    setupMaterial(texture, dispScale, bumpScale$) {
        let material = new THREE.MeshStandardMaterial({
            map: texture['color'],
            normalMap: texture['normal'],
            displacementMap: texture['height'],
            displacementScale: dispScale,
            bumpMap: texture['roughness'],
            bumpScale: bumpScale$,
            aoMap: texture['ambientOcclusion'],
        });
        return material
    }
    repeatTexture(texture, X, Y) {
        texture.wrapT = THREE.RepeatWrapping;
        texture.wrapS = THREE.RepeatWrapping;
        texture.repeat.set(X, Y);
    }
    setupReflection() {

    }
}
export { Environment };
