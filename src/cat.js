
import * as THREE from '../libs/three_js/three.module.js';
import { GLTFLoader } from '../libs/loaders/GLTFLoader.js';
import { Utils } from './Utils.js'

const utils = new Utils();

class Cat {
    CAT_MODEL_PATH = './src/models/cat.gltf';
    MODEL = 'model';

    SPINE0 = 'spine0';
    SPINE1 = 'spine1';
    SPINE2 = 'spine2';
    SPINE3 = 'spine3';
    SPINE4 = 'spine4';
    SPINE5 = 'spine5';
    SPINE6 = 'spine6';

    TAIL0 = 'tail0';
    TAIL1 = 'tail1';
    TAIL2 = 'tail2';
    TAIL3 = 'tail3';
    TAIL4 = 'tail4';

    FACE = 'face';

    BREAST_C = 'BreastC';
    SHOULDER_L = 'shoulderL';
    UPPER_ARM_L = 'upper_armL';
    FOREARM_L = 'forearmL';
    HAND_L = 'handL';
    F_TOE_L = 'f_toeL';
    SHOULDER_R = 'shoulderR';
    UPPER_ARM_R = 'upper_armR';
    FOREARM_R = 'forearmR';
    HAND_R = 'handR';
    F_TOE_R = 'f_toeR';
    BELLY_C = 'bellyC';

    PELVIS_L = 'pelvisL';
    THIGH_L = 'thighL';
    SHIN_L = 'shinL';
    FOOT_L = 'footL';
    R_TOE_L = 'r_toeL';
    PELVIS_R = 'pelvisR';
    THIGH_R = 'thighR';
    SHIN_R = 'shinR';
    FOOT_R = 'footR';
    R_TOE_R = 'r_toeR';
    PELVIS_C = 'pelvisC';

    constructor() {
        this.gltfLoader = null;
        this.loadedData = null;
        this.scene = null;
        this.model = null;
        this.parts = {
            spine0: null,

            tail0: null,
            tail1: null,
            tail2: null,
            tail3: null,
            tail4: null,

            spine1: null,
            spine2: null,
            spine3: null,
            spine4: null,
            spine5: null,
            spine6: null,

            face: null,

            breastC: null,
            shoulderL: null,
            upperarmL: null,
            forearmL: null,
            handL: null,
            f_toeL: null,
            shoulderR: null,
            upperarmR: null,
            forearmR: null,
            handR: null,
            f_toeR: null,
            bellyC: null,

            pelvisL: null,
            thighL: null,
            shinL: null,
            footL: null,
            r_toeL: null,

            pelvisR: null,
            thighR: null,
            shinR: null,
            footR: null,
            r_toeR: null,

            pelvisC: null
        }
        const MODEL = 'model';

        const SPINE0 = 'spine0';
        const SPINE1 = 'spine1';
        const SPINE2 = 'spine2';
        const SPINE3 = 'spine3';
        const SPINE4 = 'spine4';
        const SPINE5 = 'spine5';
        const SPINE6 = 'spine6';

        const TAIL0 = 'tail0';
        const TAIL1 = 'tail1';
        const TAIL2 = 'tail2';
        const TAIL3 = 'tail3';
        const TAIL4 = 'tail4';

        const FACE = 'face';

        const BREAST_C = 'BreastC';
        const SHOULDER_L = 'shoulderL';
        const UPPER_ARM_L = 'upperL';
        const FOREARM_L = 'forearmL';
        const HAND_L = 'handL';
        const F_TOE_L = 'f_toeL';
        const SHOULDER_R = 'shoulderR';
        const UPPER_ARM_R = 'upperR';
        const FOREARM_R = 'forearmR';
        const HAND_R = 'handR';
        const F_TOE_R = 'f_toeR';
        const BELLY_C = 'bellyC';

        const PELVIS_L = 'pelvisL';
        const THIGH_L = 'thighL';
        const SHIN_L = 'shinL';
        const FOOT_L = 'footL';
        const R_TOE_L = 'r_toeL';
        const PELVIS_R = 'pelvisR';
        const THIGH_R = 'thighR';
        const SHIN_R = 'shinR';
        const FOOT_R = 'footR';
        const R_TOE_R = 'r_toeR';
        const PELVIS_C = 'pelvisC';
        this.PARTS = [SPINE0, TAIL0, TAIL1, TAIL2, TAIL3, TAIL4,
            SPINE1, SPINE2, SPINE3, SPINE4, SPINE5, SPINE6, FACE, BREAST_C, SHOULDER_L,
            UPPER_ARM_L, FOREARM_L, HAND_L, F_TOE_L, SHOULDER_R, UPPER_ARM_R,
            FOREARM_R, HAND_R, F_TOE_R, BELLY_C, PELVIS_L, THIGH_L, SHIN_L,
            FOOT_L, R_TOE_L, PELVIS_R, THIGH_R, SHIN_R, FOOT_R, R_TOE_R, PELVIS_C]
    }
    async load() {
        this.gltfLoader = new GLTFLoader();
        this.data_loaded = await this.gltfLoader.loadAsync(this.CAT_MODEL_PATH);
        this.scene = this.data_loaded.scene;
        //this.scene.updateMatrixWorld(true);

        
        this.model = this.scene.getObjectByName('model');
        console.log(this.model)
        //utils.print_dump_object(this.model);
    }

    init() {
        console.log(this.model);
        this.parts.spine0 = this.model.getObjectByName(this.SPINE0);

        this.parts.tail0 = this.model.getObjectByName(this.TAIL0);
        this.parts.tail1 = this.model.getObjectByName(this.TAIL1);
        this.parts.tail2 = this.model.getObjectByName(this.TAIL2);
        this.parts.tail3 = this.model.getObjectByName(this.TAIL3);
        this.parts.tail4 = this.model.getObjectByName(this.TAIL4);

        this.parts.spine1 = this.model.getObjectByName(this.SPINE1);
        this.parts.spine2 = this.model.getObjectByName(this.SPINE2);
        this.parts.spine3 = this.model.getObjectByName(this.SPINE3);
        this.parts.spine4 = this.model.getObjectByName(this.SPINE4);
        this.parts.spine5 = this.model.getObjectByName(this.SPINE5);
        this.parts.spine6 = this.model.getObjectByName(this.SPINE6);

        this.parts.face = this.model.getObjectByName(this.FACE);

        this.parts.breastC = this.model.getObjectByName(this.BREAST_C);
        this.parts.shoulderL = this.model.getObjectByName(this.SHOULDER_L);
        this.parts.upperarmL = this.model.getObjectByName(this.UPPER_ARM_L);
        this.parts.forearmL = this.model.getObjectByName(this.FOREARM_L);
        this.parts.handL = this.model.getObjectByName(this.HAND_L);
        this.parts.f_toeL = this.model.getObjectByName(this.F_TOE_L);
        this.parts.shoulderR = this.model.getObjectByName(this.SHOULDER_R);
        this.parts.upperarmR = this.model.getObjectByName(this.UPPER_ARM_R);
        this.parts.forearmR = this.model.getObjectByName(this.FOREARM_R);
        this.parts.handR = this.model.getObjectByName(this.HAND_R);
        this.parts.f_toeR = this.model.getObjectByName(this.F_TOE_R);
        this.parts.bellyC = this.model.getObjectByName(this.BELLY_C);

        this.parts.pelvisL = this.model.getObjectByName(this.PELVIS_L);
        this.parts.thighL = this.model.getObjectByName(this.THIGH_L);
        this.parts.shinL = this.model.getObjectByName(this.SHIN_L);
        this.parts.footL = this.model.getObjectByName(this.FOOT_L);
        this.parts.r_toeL = this.model.getObjectByName(this.R_TOE_L);

        this.parts.pelvisR = this.model.getObjectByName(this.PELVIS_R);
        this.parts.thighR = this.model.getObjectByName(this.THIGH_R);
        this.parts.shinR = this.model.getObjectByName(this.SHIN_R);
        this.parts.footR = this.model.getObjectByName(this.FOOT_R);
        this.parts.r_toeR = this.model.getObjectByName(this.R_TOE_R);

        this.parts.pelvisC = this.model.getObjectByName(this.PELVIS_C);

        console.log(this.parts);
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
        part.position.set(part.position.x + x, part.position.y + y, part.position.z + z);
    }


    setRotation(x, y, z, partName) {
        let part = this.findPart(partName);
        part.rotation._x = x;
        part.rotation._y = y;
        part.rotation._z = z;
        this.model.children[1].skeleton.update();

    }
    increaseRotation(x, y, z, partName) {
        let part = this.findPart(partName);
        part.rotation.set(part.rotation.x + x, part.rotation.y + y, part.rotation.z + z);
    }
    setRotationX(x, partName) {
        let part = this.findPart(partName);
        part.rotation._x = x;
    }
    setRotationY(y, partName) {
        let part = this.findPart(partName);
        part.rotation._y = y;
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
