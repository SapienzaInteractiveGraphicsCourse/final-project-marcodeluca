
import * as THREE from '../libs/three_js/three.module.js';
import { GLTFLoader } from '../libs/loaders/GLTFLoader.js';


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
    }
    async load() {
        this.gltfLoader = new GLTFLoader();
        this.data_loaded = await this.gltfLoader.loadAsync(this.CAT_MODEL_PATH);
        this.scene = this.data_loaded.scene;
        this.model = this.scene.getObjectByName('model');
    }

    init() {
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
    }
}
export { Cat };
