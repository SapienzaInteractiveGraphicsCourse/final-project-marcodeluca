
import * as THREE from '../libs/three_js/three.module.js';
import { GLTFLoader } from '../libs/loaders/GLTFLoader.js';
import { Utils } from './Utils.js'

const utils = new Utils();

class Cat {
    CAT_MODEL_PATH = './src/models/cat.gltf';
    MODEL = 'MODEL';
    HIPS = 'HIPS';

    LEFT_UP_LEG = 'LEFT_UP_LEG';
    LEFT_LEG = 'LEFT_LEG';
    LEFT_FOOT = 'LEFT_FOOT';
    LEFT_TOE_BASE = 'LEFT_TOE_BASE';

    RIGHT_UP_LEG = 'RIGHT_UP_LEG';
    RIGHT_LEG = 'RIGHT_LEG';
    RIGHT_FOOT = 'RIGHT_FOOT';
    RIGHT_TOE_BASE = 'RIGHT_TOE_BASE';

    SPINE0 = 'SPINE0';
    SPINE1 = 'SPINE1';
    SPINE2 = 'SPINE2';
    SPINE3 = 'SPINE3';

    LEFT_SHOULDER = 'LEFT_SHOULDER';
    LEFT_ARM = 'LEFT_ARM';
    LEFT_FOREARM = 'LEFT_FOREARM';
    LEFT_HAND = 'LEFT_HAND';

    RIGHT_SHOULDER = 'RIGHT_SHOULDER';
    RIGHT_ARM = 'RIGHT_ARM';
    RIGHT_FOREARM = 'RIGHT_FOREARM';
    RIGHT_HAND = 'RIGHT_HAND';

    NECK0 = 'NECK0';
    NECK1 = 'NECK1';
    HEAD = 'HEAD';
    EYE_L = 'EYE_L';
    EYE_R = 'EYE_R';

    TAIL0 = 'TAIL0';
    TAIL1 = 'TAIL1';
    TAIL2 = 'TAIL2';
    TAIL3 = 'TAIL3';
    TAIL4 = 'TAIL4';
    TAIL5 = 'TAIL5';
    TAIL6 = 'TAIL6';

    constructor() {
        this.gltfLoader = null;
        this.loadedData = null;
        this.scene = null;
        this.model = null;

        this.parts = {
            hips: null,

            leftUpLeg: null,
            leftLeg: null,
            leftFoot: null,
            leftToeBase: null,

            rightUpLeg: null,
            rightLeg: null,
            rightFoot: null,
            rightToeBase: null,

            spine0: null,
            spine1: null,
            spine2: null,
            spine3: null,

            leftShoulder: null,
            leftArm: null,
            leftForeArm: null,
            leftHand: null,

            rightShoulder: null,
            rightArm: null,
            rightForeArm: null,
            rightHand: null,


            neck0: null,
            neck1: null,
            head: null,
            eyeL: null,
            eyeR: null,


            tail0: null,
            tail1: null,
            tail2: null,
            tail3: null,
            tail4: null,
            tail5: null,
            tail6: null,
        }
    }
    async load() {
        this.gltfLoader = new GLTFLoader();
        this.data_loaded = await this.gltfLoader.loadAsync(this.CAT_MODEL_PATH);
        this.scene = this.data_loaded.scene;
        this.scene.updateMatrixWorld(true);
        this.model = this.scene.getObjectByName('Cat_Reference');
    }

    init() {
        this.parts.hips = this.model.getObjectByName('Cat_Hips');

        this.parts.leftUpLeg = this.model.getObjectByName('Cat_LeftUpLeg');
        this.parts.leftLeg = this.model.getObjectByName('Cat_LeftLeg');
        this.parts.leftFoot = this.model.getObjectByName('Cat_LeftFoot');
        this.parts.leftToeBase = this.model.getObjectByName('Cat_LeftToeBase');

        this.parts.rightUpLeg = this.model.getObjectByName('Cat_RightUpLeg');
        this.parts.rightLeg = this.model.getObjectByName('Cat_RightLeg');
        this.parts.rightFoot = this.model.getObjectByName('Cat_RightFoot');
        this.parts.rightToeBase = this.model.getObjectByName('Cat_RightToeBase');

        this.parts.spine0 = this.model.getObjectByName('Cat_Spine');
        this.parts.spine1 = this.model.getObjectByName('Cat_Spine1');
        this.parts.spine2 = this.model.getObjectByName('Cat_Spine2');
        this.parts.spine3 = this.model.getObjectByName('Cat_Spine3');

        this.parts.leftShoulder = this.model.getObjectByName('Cat_LeftShoulder');
        this.parts.leftArm = this.model.getObjectByName('Cat_LeftArm');
        this.parts.leftForeArm = this.model.getObjectByName('Cat_LeftForeArm');
        this.parts.leftHand = this.model.getObjectByName('Cat_LeftHand');

        this.parts.rightShoulder = this.model.getObjectByName('Cat_RightShoulder');
        this.parts.rightArm = this.model.getObjectByName('Cat_RightArm');
        this.parts.rightForeArm = this.model.getObjectByName('Cat_RightForeArm');
        this.parts.rightHand = this.model.getObjectByName('Cat_RightHand');

        this.parts.neck0 = this.model.getObjectByName('Cat_Neck');
        this.parts.neck1 = this.model.getObjectByName('Cat_Neck1');
        this.parts.head = this.model.getObjectByName('Cat_Head');
        this.parts.eyeL = this.model.getObjectByName('Cat_EyeL');
        this.parts.eyeR = this.model.getObjectByName('Cat_EyeR');

        this.parts.tail0 = this.model.getObjectByName('Cat_Tail');
        this.parts.tail1 = this.model.getObjectByName('Cat_Tail1');
        this.parts.tail2 = this.model.getObjectByName('Cat_Tail2');
        this.parts.tail3 = this.model.getObjectByName('Cat_Tail3');
        this.parts.tail4 = this.model.getObjectByName('Cat_Tail4');
        this.parts.tail5 = this.model.getObjectByName('Cat_Tail5');
        this.parts.tail6 = this.model.getObjectByName('Cat_TailEnd');

        this.model.scale.set(1, 1, 1);
        this.setPosition(150, 121, -160, this.MODEL);
        this.increaseRotation(0,0,0.6,this.MODEL)
        utils.print_dump_object(this.model);
    }


    setPosition(x, y, z, partName) {
        let part = this.findPart(partName);
        part.position.set(x, y, z);
    }
    setPositionX(x, partName) {
        let part = this.findPart(partName);
        part.position.set(x, part.position.y, part.position.z);
    }
    setPositionY(y, partName) {
        let part = this.findPart(partName);
        part.position.set(part.position.x, y, part.position.z);
    }
    setPositionZ(z, partName) {
        let part = this.findPart(partName);
        part.position.set(part.position.x, part.position.y, z);
    }
    
    increasePosition(x, y, z, partName) {
        let part = this.findPart(partName);
        part.position.set(part.position.x+x, part.position.y+y, part.position.z+z);
    }


    setRotation(x, y, z, partName) {
        let part = this.findPart(partName);
        part.rotation.set(x, y, z);
    }
    increaseRotation(x, y, z, partName) {
        let part = this.findPart(partName);
        part.rotation.set(part.rotation.x+x, part.rotation.y+y, part.rotation.z+z);
    }
    setRotationX(x, partName) {
        let part = this.findPart(partName);
        part.rotation.set(x, part.rotation.y, part.rotation.z);
    }
    setRotationY(y, partName) {
        let part = this.findPart(partName);
        part.rotation.set(part.rotation.x, y, part.rotation.z);
    }
    setRotationZ(z, partName) {
        let part = this.findPart(partName);
        part.rotation.set(part.rotation.x, part.rotation.y, z);
    }

    findPart(name) {
        switch (name) {
            case this.MODEL:
                return this.model
            case this.HIPS:
                return this.parts.hips;
            case this.LEFT_UP_LEG:
                return this.parts.leftUpLeg;
            case this.LEFT_LEG:
                return this.parts.leftLeg;
            case this.LEFT_FOOT:
                return this.parts.leftFoot;
            case this.LEFT_TOE_BASE:
                return this.parts.leftToeBase;

            case this.RIGHT_UP_LEG:
                return this.parts.rightUpLeg;
            case this.RIGHT_LEG:
                return this.parts.rightLeg;
            case this.RIGHT_FOOT:
                return this.parts.rightFoot;
            case this.RIGHT_TOE_BASE:
                return this.parts.rightToeBase;

            case this.SPINE0:
                return this.parts.spine0;
            case this.SPINE1:
                return this.parts.spine1;
            case this.SPINE2:
                return this.parts.spine2;
            case this.SPINE3:
                return this.parts.spine3;

            case this.LEFT_SHOULDER:
                return this.parts.leftShoulder;
            case this.LEFT_ARM:
                return this.parts.leftArm;
            case this.LEFT_FOREARM:
                return this.parts.leftForeArm;
            case this.LEFT_HAND:
                return this.parts.leftHand;

            case this.RIGHT_SHOULDER:
                return this.parts.rightShoulder;
            case this.RIGHT_ARM:
                return this.parts.rightArm;
            case this.RIGHT_FOREARM:
                return this.parts.rightForeArm;
            case this.RIGHT_HAND:
                return this.parts.rightHand;

            case this.NECK0:
                return this.parts.neck0;
            case this.NECK1:
                return this.parts.neck1;
            case this.HEAD:
                return this.parts.head;
            case this.EYE_L:
                return this.parts.eyeL;
            case this.EYE_R:
                return this.parts.eyeR;

            case this.TAIL0:
                return this.parts.tail0;
            case this.TAIL1:
                return this.parts.tail1;
            case this.TAIL2:
                return this.parts.tail2;
            case this.TAIL3:
                return this.parts.tail3;
            case this.TAIL4:
                return this.parts.tail4;
            case this.TAIL5:
                return this.parts.tail5;
            case this.TAIL6:
                return this.parts.tail6;
        }
    }
}
export { Cat };
