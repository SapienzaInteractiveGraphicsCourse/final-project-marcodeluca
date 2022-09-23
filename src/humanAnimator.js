import * as TWEEN from '../libs/tween_js/tween.esm.js';
import * as THREE from '../libs/three_js/three.module.js';
import { Box } from './utils/box.js'

class HumanAnimator {
    constructor(human, environment) {
        this.human = human;
        this.environment = environment
        this.parts = this.human.parts;
        this.walking = false;
        this.currentTween = "";
        this.stopped = false;
        this.changingDirection = false
        this.direction = 1;   //1=Positive Z, 2= Positive X, -1=Negative Z, -2 = Negative X
        this.tweenGroup;

        this.goingIdle = false
        this.stopCommanded = false
        this.interacting = false
        this.idleConfiguration = {
            //hips: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            name: "idle",
            spine: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            spine1: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            spine2: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            neck: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            head: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            eyeR: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            eyeL: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            shoulderL: { x: 0.0, y: 0.0, z: 0.7114734, w: -0.7027131 },
            armL: { x: -0.4605586, y: -0.5451714, z: 0.4122821, w: -0.5663015 },
            foreArmL: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            handL: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            middleL1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            middleL2: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            middleL3: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            thumbL1: { x: 0.0980368, y: -0.0188544, z: 0.1879154, w: 0.9770983 },
            thumbL2: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            thumbL3: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            indexL1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            indexL2: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            indexL3: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            ringL1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            ringL2: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            ringL3: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            pinkyL1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            pinkyL2: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            pinkyL3: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            shoulderR: { x: 0.0, y: 0.0, z: 0.7103533, w: 0.7038453 },
            armR: { x: -0.4605713, y: 0.5451539, z: -0.4104623, w: -0.5676284 },
            foreArmR: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            handR: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            middleR1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            middleR2: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            middleR3: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            thumbR1: { x: -0.0980067, y: -0.0190105, z: 0.1894713, w: -0.9767978 },
            thumbR2: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            thumbR3: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            indexR1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            indexR2: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            indexR3: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            ringR1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            ringR2: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            ringR3: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            pinkyR1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            pinkyR2: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            pinkyR3: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            upLegR: { x: 0.0, y: 0.0, z: 0.9999997, w: 0.0007963 },
            legR: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            footR: { x: 0.3894183, y: 0.0, z: 0.0, w: 0.921061 },
            toeR: { x: 0.4349655, y: 0.0, z: 0.0, w: 0.9004471 },
            upLegL: { x: 0.0, y: 0.0, z: 0.9999997, w: 0.0007963 },
            legL: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            footL: { x: 0.3894183, y: 0.0, z: 0.0, w: 0.921061 },
            toeL: { x: 0.4349655, y: 0.0, z: 0.0, w: 0.9004471 },
        }
        this.idleXYZConfiguration = {
            name: "idle",
            hips: new THREE.Vector3(0.0, 0.0, 0.0),
            spine: new THREE.Vector3(0.0, 0.0, 0.0),
            spine1: new THREE.Vector3(0.0, 0.0, 0.0),
            spine2: new THREE.Vector3(0.0, 0.0, 0.0),
            neck: new THREE.Vector3(0.0, 0.0, 0.0),
            head: new THREE.Vector3(0.0, 0.0, 0.0),
            eyeR: new THREE.Vector3(0.0, 0.0, 0.0),
            eyeL: new THREE.Vector3(0.0, 0.0, 0.0),
            shoulderL: new THREE.Vector3(0.0, 0.0, -1.58),
            armL: new THREE.Vector3(1.59, 0.24, -1.5),
            foreArmL: new THREE.Vector3(0.2, 0.0, 0.0),
            handL: new THREE.Vector3(0.0, 0.0, 0.0),
            middleL1: new THREE.Vector3(0.2, 0.0, 0.0),
            middleL2: new THREE.Vector3(0.0, 0.0, 0.0),
            middleL3: new THREE.Vector3(0.0, 0.0, 0.0),
            thumbL1: new THREE.Vector3(0.2, 0.0, 0.38),
            thumbL2: new THREE.Vector3(0.0, 0.0, 0.0),
            thumbL3: new THREE.Vector3(0.0, 0.0, 0.0),
            indexL1: new THREE.Vector3(0.2, 0.0, 0.0),
            indexL2: new THREE.Vector3(0.0, 0.0, 0.0),
            indexL3: new THREE.Vector3(0.0, 0.0, 0.0),
            ringL1: new THREE.Vector3(0.2, 0.0, 0.0),
            ringL2: new THREE.Vector3(0.0, 0.0, 0.0),
            ringL3: new THREE.Vector3(0.0, 0.0, 0.0),
            pinkyL1: new THREE.Vector3(0.2, 0.0, 0.0),
            pinkyL2: new THREE.Vector3(0.0, 0.0, 0.0),
            pinkyL3: new THREE.Vector3(0.0, 0.0, 0.0),
            shoulderR: new THREE.Vector3(0.0, 0.0, 1.58),
            armR: new THREE.Vector3(1.59, -0.24, 1.5),
            foreArmR: new THREE.Vector3(0.2, 0.0, 0.0),
            handR: new THREE.Vector3(0.0, 0.0, 0.0),
            middleR1: new THREE.Vector3(0.2, 0.0, 0.0),
            middleR2: new THREE.Vector3(0.0, 0.0, 0.0),
            middleR3: new THREE.Vector3(0.0, 0.0, 0.0),
            thumbR1: new THREE.Vector3(0.2, 0.0, -0.38),
            thumbR2: new THREE.Vector3(0.0, 0.0, 0.0),
            thumbR3: new THREE.Vector3(0.0, 0.0, 0.0),
            indexR1: new THREE.Vector3(0.2, 0.0, 0.0),
            indexR2: new THREE.Vector3(0.0, 0.0, 0.0),
            indexR3: new THREE.Vector3(0.0, 0.0, 0.0),
            ringR1: new THREE.Vector3(0.2, 0.0, 0.0),
            ringR2: new THREE.Vector3(0.0, 0.0, 0.0),
            ringR3: new THREE.Vector3(0.0, 0.0, 0.0),
            pinkyR1: new THREE.Vector3(0.2, 0.0, 0.0),
            pinkyR2: new THREE.Vector3(0.0, 0.0, 0.0),
            pinkyR3: new THREE.Vector3(0.0, 0.0, 0.0),
            upLegR: new THREE.Vector3(0.0, 0.0, 3.14),
            legR: new THREE.Vector3(0.0, 0.0, 0.0),
            footR: new THREE.Vector3(0.8, 0.0, 0.0),
            toeR: new THREE.Vector3(0.9, 0.0, 0.0),
            upLegL: new THREE.Vector3(0.0, 0.0, 3.14),
            legL: new THREE.Vector3(0.0, 0.0, 0.0),
            footL: new THREE.Vector3(0.8, 0.0, 0.0),
            toeL: new THREE.Vector3(0.9, 0.0, 0.0),
        }

        //Walk configurations

        this.walkStartRightConfiguration = {
            //hips: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            name: "walkStartRight",
            spine: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            spine1: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            spine2: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            neck: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            head: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            eyeR: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            eyeL: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            shoulderL: { x: -0.173854, y: -0.1760213, z: 0.6893554, w: -0.6808674 },
            armL: { x: -0.4383891, y: -0.5631528, z: 0.4345984, w: -0.5493616 },
            foreArmL: { x: 0.0993347, y: -0.0099667, z: 0.0993347, w: 0.9900333 },
            handL: { x: 0.0, y: 0.0, z: 0.0749297, w: 0.9971888 },
            middleL1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            middleL2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            middleL3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            thumbL1: { x: 0.0980368, y: -0.0188544, z: 0.1879154, w: 0.9770983 },
            thumbL2: { x: 0.0, y: 0.0, z: 0.0998334, w: 0.9950042 },
            thumbL3: { x: 0.0, y: 0.0, z: 0.0749297, w: 0.9971888 },
            indexL1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            indexL2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            indexL3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            ringL1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            ringL2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            ringL3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            pinkyL1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            pinkyL2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            pinkyL3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            shoulderR: { x: -0.0982168, y: 0.0991249, z: 0.7034032, w: 0.6969589 },
            armR: { x: -0.4605713, y: 0.5451539, z: -0.4104623, w: -0.5676284 },
            foreArmR: { x: 0.0974272, y: 0.0217866, z: -0.2171394, w: 0.971022 },
            handR: { x: 0.0, y: 0.0, z: -0.1395431, w: 0.990216 },
            middleR1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            middleR2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            middleR3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            thumbR1: { x: -0.0980067, y: -0.0190105, z: 0.1894713, w: -0.9767978 },
            thumbR2: { x: 0.0, y: 0.0, z: 0.0998334, w: 0.9950042 },
            thumbR3: { x: 0.0, y: 0.0, z: 0.0749297, w: 0.9971888 },
            indexR1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            indexR2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            indexR3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            ringR1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            ringR2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            ringR3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            pinkyR1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            pinkyR2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            pinkyR3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            upLegR: { x: -0.0001111, y: 0.1395431, z: 0.9902157, w: 0.0007885 },
            legR: { x: -0.1395431, y: 0.0, z: 0.0, w: 0.990216 },
            footR: { x: 0.4349655, y: 0.0, z: 0.0, w: 0.9004471 },
            toeR: { x: 0.5438348, y: 0.0, z: 0.0, w: 0.8391923 },
            upLegL: { x: 0.0000716, y: -0.0898785, z: 0.9959524, w: 0.0007931 },
            legL: { x: -0.1395431, y: 0.0, z: 0.0, w: 0.990216 },
            footL: { x: 0.3428978, y: 0.0, z: 0.0, w: 0.9393727 },
            toeL: { x: 0.5646425, y: 0.0, z: 0.0, w: 0.8253356 },
        }
        this.walkEndRightConfiguration = {
            //hips: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            name: "walkEndRight",
            spine: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            spine1: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            spine2: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            neck: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            head: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            eyeR: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            eyeL: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            shoulderL: { x: -0.2243825, y: -0.2271797, z: 0.6742282, w: -0.6659266 },
            armL: { x: -0.4383891, y: -0.5631528, z: 0.4345984, w: -0.5493616 },
            foreArmL: { x: 0.0993347, y: -0.0099667, z: 0.0993347, w: 0.9900333 },
            handL: { x: 0.0, y: 0.0, z: 0.0749297, w: 0.9971888 },
            middleL1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            middleL2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            middleL3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            thumbL1: { x: 0.0980368, y: -0.0188544, z: 0.1879154, w: 0.9770983 },
            thumbL2: { x: 0.0, y: 0.0, z: 0.0998334, w: 0.9950042 },
            thumbL3: { x: 0.0, y: 0.0, z: 0.0749297, w: 0.9971888 },
            indexL1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            indexL2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            indexL3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            ringL1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            ringL2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            ringL3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            pinkyL1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            pinkyL2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            pinkyL3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            shoulderR: { x: -0.1501636, y: 0.151552, z: 0.6939984, w: 0.6876403 },
            armR: { x: -0.4605713, y: 0.5451539, z: -0.4104623, w: -0.5676284 },
            foreArmR: { x: 0.0974272, y: 0.0217866, z: -0.2171394, w: 0.971022 },
            handR: { x: 0.0, y: 0.0, z: -0.1395431, w: 0.990216 },
            middleR1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            middleR2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            middleR3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            thumbR1: { x: -0.0980067, y: -0.0190105, z: 0.1894713, w: -0.9767978 },
            thumbR2: { x: 0.0, y: 0.0, z: 0.0998334, w: 0.9950042 },
            thumbR3: { x: 0.0, y: 0.0, z: 0.0749297, w: 0.9971888 },
            indexR1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            indexR2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            indexR3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            ringR1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            ringR2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            ringR3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            pinkyR1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            pinkyR2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            pinkyR3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            upLegR: { x: -0.0000914, y: 0.1147467, z: 0.9933945, w: 0.0007911 },
            legR: { x: -0.1147467, y: 0.0, z: 0.0, w: 0.9933948 },
            footR: { x: 0.3428978, y: 0.0, z: 0.0, w: 0.9393727 },
            toeR: { x: 0.4794255, y: 0.0, z: 0.0, w: 0.8775826 },
            upLegL: { x: 0.0000716, y: -0.0898785, z: 0.9959524, w: 0.0007931 },
            legL: { x: -0.1395431, y: 0.0, z: 0.0, w: 0.990216 },
            footL: { x: 0.247404, y: 0.0, z: 0.0, w: 0.9689124 },
            toeL: { x: 0.6816388, y: 0.0, z: 0.0, w: 0.7316889 },
        }
        this.walkChangeRightToLeftConfiguration = {
            //hips: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            name: "walkChangeRightToLeft",
            spine: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            spine1: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            spine2: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            neck: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            head: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            eyeR: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            eyeL: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            shoulderL: { x: 0.0980588, y: 0.0992812, z: 0.7045123, w: -0.6958377 },
            armL: { x: -0.34931, y: -0.6223412, z: 0.5118139, w: -0.4782473 },
            foreArmL: { x: 0.0993347, y: -0.0099667, z: 0.0993347, w: 0.9900333 },
            handL: { x: 0.0, y: 0.0, z: 0.0749297, w: 0.9971888 },
            middleL1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            middleL2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            middleL3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            thumbL1: { x: 0.0980368, y: -0.0188544, z: 0.1879154, w: 0.9770983 },
            thumbL2: { x: 0.0, y: 0.0, z: 0.0998334, w: 0.9950042 },
            thumbL3: { x: 0.0, y: 0.0, z: 0.0749297, w: 0.9971888 },
            indexL1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            indexL2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            indexL3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            ringL1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            ringL2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            ringL3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            pinkyL1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            pinkyL2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            pinkyL3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            shoulderR: { x: 0, y: 0, z: 0.7103533, w: 0.7038453 },
            armR: { x: -0.3739328, y: 0.6078594, z: -0.4906785, w: -0.4999158 },
            foreArmR: { x: 0.0974272, y: 0.0217866, z: -0.2171394, w: 0.971022 },
            handR: { x: 0.0, y: 0.0, z: -0.1395431, w: 0.990216 },
            middleR1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            middleR2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            middleR3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            thumbR1: { x: -0.0980067, y: -0.0190105, z: 0.1894713, w: -0.9767978 },
            thumbR2: { x: 0.0, y: 0.0, z: 0.0998334, w: 0.9950042 },
            thumbR3: { x: 0.0, y: 0.0, z: 0.0749297, w: 0.9971888 },
            indexR1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            indexR2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            indexR3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            ringR1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            ringR2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            ringR3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            pinkyR1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            pinkyR2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            pinkyR3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            upLegR: { x: 0.0000716, y: -0.0898785, z: 0.9959524, w: 0.0007931 },
            legR: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            footR: { x: 0.4794255, y: 0.0, z: 0.0, w: 0.8775826 },
            toeR: { x: 0.3894183, y: 0.0, z: 0.0, w: 0.921061 },
            upLegL: { x: -0.0000636, y: 0.0799147, z: 0.9968014, w: 0.0007938 },
            legL: { x: -0.3569493, y: 0.0, z: 0.0, w: 0.9341238 },
            footL: { x: 0.247404, y: 0.0, z: 0.0, w: 0.9689124 },
            toeL: { x: 0.6816388, y: 0.0, z: 0.0, w: 0.7316889 },
        }
        this.walkStartLeftConfiguration = {
            //hips: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            name: "walkStartLeft",
            spine: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            spine1: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            spine2: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            neck: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            head: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            eyeR: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            eyeL: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            shoulderL: { x: 0.0980588, y: 0.0992812, z: 0.7045123, w: -0.6958377 },
            armL: { x: -0.4383891, y: -0.5631528, z: 0.4345984, w: -0.5493616 },
            foreArmL: { x: 0.0993347, y: -0.0099667, z: 0.0993347, w: 0.9900333 },
            handL: { x: 0.0, y: 0.0, z: 0.0749297, w: 0.9971888 },
            middleL1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            middleL2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            middleL3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            thumbL1: { x: 0.0980368, y: -0.0188544, z: 0.1879154, w: 0.9770983 },
            thumbL2: { x: 0.0, y: 0.0, z: 0.0998334, w: 0.9950042 },
            thumbL3: { x: 0.0, y: 0.0, z: 0.0749297, w: 0.9971888 },
            indexL1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            indexL2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            indexL3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            ringL1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            ringL2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            ringL3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            pinkyL1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            pinkyL2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            pinkyL3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            shoulderR: { x: 0.1673059, y: -0.1688528, z: 0.6899931, w: 0.6836717 },
            armR: { x: -0.3739328, y: 0.6078594, z: -0.4906785, w: -0.4999158 },
            foreArmR: { x: 0.0974272, y: 0.0217866, z: -0.2171394, w: 0.971022 },
            handR: { x: 0.0, y: 0.0, z: -0.1395431, w: 0.990216 },
            middleR1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            middleR2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            middleR3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            thumbR1: { x: -0.0980067, y: -0.0190105, z: 0.1894713, w: -0.9767978 },
            thumbR2: { x: 0.0, y: 0.0, z: 0.0998334, w: 0.9950042 },
            thumbR3: { x: 0.0, y: 0.0, z: 0.0749297, w: 0.9971888 },
            indexR1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            indexR2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            indexR3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            ringR1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            ringR2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            ringR3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            pinkyR1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            pinkyR2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            pinkyR3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            upLegR: { x: 0.0000716, y: -0.0898785, z: 0.9959524, w: 0.0007931 },
            legR: { x: -0.1395431, y: 0.0, z: 0.0, w: 0.990216 },
            footR: { x: 0.3428978, y: 0.0, z: 0.0, w: 0.9393727 },
            toeR: { x: 0.5646425, y: 0.0, z: 0.0, w: 0.8253356 },
            upLegL: { x: -0.0001111, y: 0.1395431, z: 0.9902157, w: 0.0007885 },
            legL: { x: -0.1395431, y: 0.0, z: 0.0, w: 0.990216 },
            footL: { x: 0.4349655, y: 0.0, z: 0.0, w: 0.9004471 },
            toeL: { x: 0.4349655, y: 0.0, z: 0.0, w: 0.9004471 },
        }
        this.walkEndLeftConfiguration = {
            //hips: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            name: "walkEndLeft",
            spine: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            spine1: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            spine2: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            neck: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            head: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            eyeR: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            eyeL: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            shoulderL: { x: 0.149922, y: 0.151791, z: 0.6950927, w: -0.6865341 },
            armL: { x: -0.4383891, y: -0.5631528, z: 0.4345984, w: -0.5493616 },
            foreArmL: { x: 0.0993347, y: -0.0099667, z: 0.0993347, w: 0.9900333 },
            handL: { x: 0.0, y: 0.0, z: 0.0749297, w: 0.9971888 },
            middleL1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            middleL2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            middleL3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            thumbL1: { x: 0.0980368, y: -0.0188544, z: 0.1879154, w: 0.9770983 },
            thumbL2: { x: 0.0, y: 0.0, z: 0.0998334, w: 0.9950042 },
            thumbL3: { x: 0.0, y: 0.0, z: 0.0749297, w: 0.9971888 },
            indexL1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            indexL2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            indexL3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            ringL1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            ringL2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            ringL3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            pinkyL1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            pinkyL2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            pinkyL3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            shoulderR: { x: 0.224744, y: -0.226822, z: 0.6731668, w: 0.6669995 },
            armR: { x: -0.3739328, y: 0.6078594, z: -0.4906785, w: -0.4999158 },
            foreArmR: { x: 0.0974272, y: 0.0217866, z: -0.2171394, w: 0.971022 },
            handR: { x: 0.0, y: 0.0, z: -0.1395431, w: 0.990216 },
            middleR1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            middleR2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            middleR3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            thumbR1: { x: -0.0980067, y: -0.0190105, z: 0.1894713, w: -0.9767978 },
            thumbR2: { x: 0.0, y: 0.0, z: 0.0998334, w: 0.9950042 },
            thumbR3: { x: 0.0, y: 0.0, z: 0.0749297, w: 0.9971888 },
            indexR1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            indexR2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            indexR3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            ringR1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            ringR2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            ringR3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            pinkyR1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            pinkyR2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            pinkyR3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            upLegR: { x: 0.0000716, y: -0.0898785, z: 0.9959524, w: 0.0007931 },
            legR: { x: -0.1395431, y: 0.0, z: 0.0, w: 0.990216 },
            footR: { x: 0.247404, y: 0.0, z: 0.0, w: 0.9689124 },
            toeR: { x: 0.6816388, y: 0.0, z: 0.0, w: 0.7316889 },
            upLegL: { x: -0.0000914, y: 0.1147467, z: 0.9933945, w: 0.0007911 },
            legL: { x: -0.1147467, y: 0.0, z: 0.0, w: 0.9933948 },
            footL: { x: 0.3428978, y: 0.0, z: 0.0, w: 0.9393727 },
            toeL: { x: 0.4794255, y: 0.0, z: 0.0, w: 0.8775826 },
        }
        this.walkChangeLeftToRightConfiguration = {
            //hips: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            name: "walkChangeLeftToRight",
            spine: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            spine1: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            spine2: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            neck: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            head: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            eyeR: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            eyeL: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            shoulderL: { x: 0.0980588, y: 0.0992812, z: 0.7045123, w: -0.6958377 },
            armL: { x: -0.34931, y: -0.6223412, z: 0.5118139, w: -0.4782473 },
            foreArmL: { x: 0.0993347, y: -0.0099667, z: 0.0993347, w: 0.9900333 },
            handL: { x: 0.0, y: 0.0, z: 0.0749297, w: 0.9971888 },
            middleL1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            middleL2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            middleL3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            thumbL1: { x: 0.0980368, y: -0.0188544, z: 0.1879154, w: 0.9770983 },
            thumbL2: { x: 0.0, y: 0.0, z: 0.0998334, w: 0.9950042 },
            thumbL3: { x: 0.0, y: 0.0, z: 0.0749297, w: 0.9971888 },
            indexL1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            indexL2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            indexL3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            ringL1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            ringL2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            ringL3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            pinkyL1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            pinkyL2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            pinkyL3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            shoulderR: { x: 0, y: 0, z: 0.7103533, w: 0.7038453 },
            armR: { x: -0.3739328, y: 0.6078594, z: -0.4906785, w: -0.4999158 },
            foreArmR: { x: 0.0974272, y: 0.0217866, z: -0.2171394, w: 0.971022 },
            handR: { x: 0.0, y: 0.0, z: -0.1395431, w: 0.990216 },
            middleR1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            middleR2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            middleR3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            thumbR1: { x: -0.0980067, y: -0.0190105, z: 0.1894713, w: -0.9767978 },
            thumbR2: { x: 0.0, y: 0.0, z: 0.0998334, w: 0.9950042 },
            thumbR3: { x: 0.0, y: 0.0, z: 0.0749297, w: 0.9971888 },
            indexR1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            indexR2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            indexR3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            ringR1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            ringR2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            ringR3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            pinkyR1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            pinkyR2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            pinkyR3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            upLegR: { x: -0.0000636, y: 0.0799147, z: 0.9968014, w: 0.0007938 },
            legR: { x: -0.3569493, y: 0.0, z: 0.0, w: 0.9341238 },
            footR: { x: 0.247404, y: 0.0, z: 0.0, w: 0.9689124 },
            toeR: { x: 0.6816388, y: 0.0, z: 0.0, w: 0.7316889 },
            upLegL: { x: 0.0000716, y: -0.0898785, z: 0.9959524, w: 0.0007931 },
            legL: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            footL: { x: 0.4794255, y: 0.0, z: 0.0, w: 0.8775826 },
            toeL: { x: 0.3894183, y: 0.0, z: 0.0, w: 0.921061 }
        }


        //Sitting on couch configurations
        this.sitOnCouchConfiguration = {
            hips: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            name: "sitOnCouch",
            spine: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            spine1: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            spine2: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            neck: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            head: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            eyeR: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            eyeL: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
            shoulderL: { x: 0.0980588, y: 0.0992812, z: 0.7045123, w: -0.6958377 },
            armL: { x: -0.34931, y: -0.6223412, z: 0.5118139, w: -0.4782473 },
            foreArmL: { x: 0.0993347, y: -0.0099667, z: 0.0993347, w: 0.9900333 },
            handL: { x: 0.0, y: 0.0, z: 0.0749297, w: 0.9971888 },
            middleL1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            middleL2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            middleL3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            thumbL1: { x: 0.0980368, y: -0.0188544, z: 0.1879154, w: 0.9770983 },
            thumbL2: { x: 0.0, y: 0.0, z: 0.0998334, w: 0.9950042 },
            thumbL3: { x: 0.0, y: 0.0, z: 0.0749297, w: 0.9971888 },
            indexL1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            indexL2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            indexL3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            ringL1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            ringL2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            ringL3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            pinkyL1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            pinkyL2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            pinkyL3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            shoulderR: { x: 0, y: 0, z: 0.7103533, w: 0.7038453 },
            armR: { x: -0.3739328, y: 0.6078594, z: -0.4906785, w: -0.4999158 },
            foreArmR: { x: 0.0974272, y: 0.0217866, z: -0.2171394, w: 0.971022 },
            handR: { x: 0.0, y: 0.0, z: -0.1395431, w: 0.990216 },
            middleR1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            middleR2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            middleR3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            thumbR1: { x: -0.0980067, y: -0.0190105, z: 0.1894713, w: -0.9767978 },
            thumbR2: { x: 0.0, y: 0.0, z: 0.0998334, w: 0.9950042 },
            thumbR3: { x: 0.0, y: 0.0, z: 0.0749297, w: 0.9971888 },
            indexR1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            indexR2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            indexR3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            ringR1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            ringR2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            ringR3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            pinkyR1: { x: 0.0998334, y: 0.0, z: 0.0, w: 0.9950042 },
            pinkyR2: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            pinkyR3: { x: 0.0749297, y: 0.0, z: 0.0, w: 0.9971888 },
            upLegR: { x: -0.000593, y: 0.7446429, z: 0.6674626, w: 0.0005315 },
            legR: { x: -0.7068252, y: 0.0, z: 0.0, w: 0.7073883 },
            footR: { x: 0.3894183, y: 0.0, z: 0.0, w: 0.921061 },
            toeR: { x: 0.4349655, y: 0.0, z: 0.0, w: 0.9004471 },
            upLegL: { x: -0.000593, y: 0.7446429, z: 0.6674626, w: 0.0005315 },
            legL: { x: -0.7068252, y: 0.0, z: 0.0, w: 0.7073883 },
            footL: { x: 0.3894183, y: 0.0, z: 0.0, w: 0.921061 },
            toeL: { x: 0.4349655, y: 0.0, z: 0.0, w: 0.9004471 }
        }
        this.sitOnCouchInitConfiguration = {

            name: "sitOnCouchInit",
            hips: new THREE.Vector3(1.57, 4.71, 1.57),
            spine: new THREE.Vector3(0.0, 0.0, 0.0),
            spine1: new THREE.Vector3(0.0, 0.0, 0.0),
            spine2: new THREE.Vector3(0.0, 0.0, 0.0),
            neck: new THREE.Vector3(0.0, 0.0, 0.0),
            head: new THREE.Vector3(0.0, 0.0, 0.0),
            eyeR: new THREE.Vector3(0.0, 0.0, 0.0),
            eyeL: new THREE.Vector3(0.0, 0.0, 0.0),
            shoulderL: new THREE.Vector3(6.1, 0, 4.6),
            armL: new THREE.Vector3(1.5, 0.5, 4.78),
            foreArmL: new THREE.Vector3(0, 1.5, 0.7),
            handL: new THREE.Vector3(6.58, 5.9, 0),
            middleL1: new THREE.Vector3(0.1, 0.0, 0.0),
            middleL2: new THREE.Vector3(0.1, 0.0, 0.0),
            middleL3: new THREE.Vector3(0.0, 0.0, 0.0),
            thumbL1: new THREE.Vector3(0.2, 0, 0.38),
            thumbL2: new THREE.Vector3(0.0, 0.0, 0.0),
            thumbL3: new THREE.Vector3(0.0, 0.0, 0.0),
            indexL1: new THREE.Vector3(0.1, 0.0, 0.0),
            indexL2: new THREE.Vector3(0.1, 0.0, 0.0),
            indexL3: new THREE.Vector3(0.0, 0.0, 0.0),
            ringL1: new THREE.Vector3(0.1, 0.0, 0.0),
            ringL2: new THREE.Vector3(0.1, 0.0, 0.0),
            ringL3: new THREE.Vector3(0.0, 0.0, 0.0),
            pinkyL1: new THREE.Vector3(0.1, 0.0, 0.0),
            pinkyL2: new THREE.Vector3(0.1, 0.0, 0.0),
            pinkyL3: new THREE.Vector3(0.1, 0.0, 0.0),
            shoulderR: new THREE.Vector3(1.52, 0.0, 2.23),
            armR: new THREE.Vector3(1.0, 0.0, 0.0),
            foreArmR: new THREE.Vector3(0.38, 5.55, 0.0),
            handR: new THREE.Vector3(5.9, 0.0, 0.0),
            middleR1: new THREE.Vector3(5.9, 0.0, 0.0),
            middleR2: new THREE.Vector3(0.3, 0.0, 0.0),
            middleR3: new THREE.Vector3(0.3, 0.0, 0.0),
            thumbR1: new THREE.Vector3(0.2, 0.0, 5.9),
            thumbR2: new THREE.Vector3(0.0, 0.0, 0.0),
            thumbR3: new THREE.Vector3(0.0, 0.0, 0.0),
            indexR1: new THREE.Vector3(5.9, 0.0, 0.0),
            indexR2: new THREE.Vector3(0.3, 0.0, 0.0),
            indexR3: new THREE.Vector3(0.3, 0.0, 0.0),
            ringR1: new THREE.Vector3(5.9, 0.0, 0.0),
            ringR2: new THREE.Vector3(0.3, 0.0, 0.0),
            ringR3: new THREE.Vector3(0.3, 0.0, 0.0),
            pinkyR1: new THREE.Vector3(5.9, 0.0, 0.0),
            pinkyR2: new THREE.Vector3(0.3, 0.0, 0.0),
            pinkyR3: new THREE.Vector3(0.3, 0.0, 0.0),
            upLegR: new THREE.Vector3(6.28, 0, 3.14),
            legR: new THREE.Vector3(6.28, 0, 0),
            footR: new THREE.Vector3(0.8, 0, 0),
            toeR: new THREE.Vector3(0.9, 0, 0),
            upLegL: new THREE.Vector3(6.28, 0, 3.14),
            legL: new THREE.Vector3(6.28, 0, 0),
            footL: new THREE.Vector3(0.8, 0, 0),
            toeL: new THREE.Vector3(0.9, 0, 0),
        }
        this.sitOnCouchStartConfiguration = {

            name: "sitOnCouchStart",
            hips: new THREE.Vector3(1.57, 4.71, 1.57),
            spine: new THREE.Vector3(0.0, 0.0, 0.0),
            spine1: new THREE.Vector3(0.0, 0.0, 0.0),
            spine2: new THREE.Vector3(0.0, 0.0, 0.0),
            neck: new THREE.Vector3(0.0, 0.0, 0.0),
            head: new THREE.Vector3(0.0, 0.0, 0.0),
            eyeR: new THREE.Vector3(0.0, 0.0, 0.0),
            eyeL: new THREE.Vector3(0.0, 0.0, 0.0),
            shoulderL: new THREE.Vector3(6.1, 0, 4.7),
            armL: new THREE.Vector3(1.59, 0.5, 4.88),
            foreArmL: new THREE.Vector3(0.2, 1.5, 0.7),
            handL: new THREE.Vector3(5.75, 5.9, 0),
            middleL1: new THREE.Vector3(0.1, 0.0, 0.0),
            middleL2: new THREE.Vector3(0.1, 0.0, 0.0),
            middleL3: new THREE.Vector3(0.0, 0.0, 0.0),
            thumbL1: new THREE.Vector3(0.2, 0, 0.38),
            thumbL2: new THREE.Vector3(0.0, 0.0, 0.0),
            thumbL3: new THREE.Vector3(0.0, 0.0, 0.0),
            indexL1: new THREE.Vector3(0.1, 0.0, 0.0),
            indexL2: new THREE.Vector3(0.1, 0.0, 0.0),
            indexL3: new THREE.Vector3(0.0, 0.0, 0.0),
            ringL1: new THREE.Vector3(0.1, 0.0, 0.0),
            ringL2: new THREE.Vector3(0.1, 0.0, 0.0),
            ringL3: new THREE.Vector3(0.0, 0.0, 0.0),
            pinkyL1: new THREE.Vector3(0.1, 0.0, 0.0),
            pinkyL2: new THREE.Vector3(0.1, 0.0, 0.0),
            pinkyL3: new THREE.Vector3(0.1, 0.0, 0.0),
            shoulderR: new THREE.Vector3(1.52, 0.0, 2.23),
            armR: new THREE.Vector3(1.0, 0.0, 0.0),
            foreArmR: new THREE.Vector3(0.0, 6.28, -0.16),
            handR: new THREE.Vector3(5.7, 0.0, 0.0),
            middleR1: new THREE.Vector3(5.9, 0.0, 0.0),
            middleR2: new THREE.Vector3(0.0, 0.0, 0.0),
            middleR3: new THREE.Vector3(0.0, 0.0, 0.0),
            thumbR1: new THREE.Vector3(0.2, 0.0, 5.84),
            thumbR2: new THREE.Vector3(0.0, 0.0, 0.0),
            thumbR3: new THREE.Vector3(0.0, 0.0, 0.0),
            indexR1: new THREE.Vector3(5.9, 0.0, 0.0),
            indexR2: new THREE.Vector3(0.0, 0.0, 0.0),
            indexR3: new THREE.Vector3(0.0, 0.0, 0.0),
            ringR1: new THREE.Vector3(5.9, 0.0, 0.0),
            ringR2: new THREE.Vector3(0.0, 0.0, 0.0),
            ringR3: new THREE.Vector3(0.0, 0.0, 0.0),
            pinkyR1: new THREE.Vector3(5.9, 0.0, 0.0),
            pinkyR2: new THREE.Vector3(0.0, 0.0, 0.0),
            pinkyR3: new THREE.Vector3(0.0, 0.0, 0.0),
            upLegR: new THREE.Vector3(5.1, 0, 3.14),
            legR: new THREE.Vector3(5.1, 0, 0),
            footR: new THREE.Vector3(0.8, 0, 0),
            toeR: new THREE.Vector3(0.9, 0, 0),
            upLegL: new THREE.Vector3(5.1, 0, 3.14),
            legL: new THREE.Vector3(5.1, 0, 0),
            footL: new THREE.Vector3(0.8, 0, 0),
            toeL: new THREE.Vector3(0.9, 0, 0),
        }
        this.sitOnCouchEndConfiguration = {

            name: "sitOnCouchEnd",
            hips: new THREE.Vector3(1.57, 4.71, 1.57),
            spine: new THREE.Vector3(0.0, 0.0, 0.0),
            spine1: new THREE.Vector3(0.0, 0.0, 0.0),
            spine2: new THREE.Vector3(0.0, 0.0, 0.0),
            neck: new THREE.Vector3(0.0, 0.0, 0.0),
            head: new THREE.Vector3(0.0, 0.0, 0.0),
            eyeR: new THREE.Vector3(0.0, 0.0, 0.0),
            eyeL: new THREE.Vector3(0.0, 0.0, 0.0),
            shoulderL: new THREE.Vector3(6.1, 0, 4.7),
            armL: new THREE.Vector3(1.59, 0.5, 5.25),
            foreArmL: new THREE.Vector3(0.2, 1.5, 0.7),
            handL: new THREE.Vector3(5.75, 6.58, 0),
            middleL1: new THREE.Vector3(0.2, 0.0, 0.0),
            middleL2: new THREE.Vector3(0.2, 0.0, 0.0),
            middleL3: new THREE.Vector3(0.2, 0.0, 0.0),
            thumbL1: new THREE.Vector3(0.2, 0, 0.38),
            thumbL2: new THREE.Vector3(0.0, 0.0, 0.0),
            thumbL3: new THREE.Vector3(0.0, 0.0, 0.0),
            indexL1: new THREE.Vector3(0.3, 0.0, 0.0),
            indexL2: new THREE.Vector3(0.2, 0.0, 0.0),
            indexL3: new THREE.Vector3(0.1, 0.0, 0.0),
            ringL1: new THREE.Vector3(0.15, 0.0, 0.0),
            ringL2: new THREE.Vector3(0.15, 0.0, 0.0),
            ringL3: new THREE.Vector3(0.15, 0.0, 0.0),
            pinkyL1: new THREE.Vector3(0.1, 0.0, 0.0),
            pinkyL2: new THREE.Vector3(0.0, 0.0, 0.0),
            pinkyL3: new THREE.Vector3(0.1, 0.0, 0.0),
            shoulderR: new THREE.Vector3(1.55, 0.0, 2.0),
            armR: new THREE.Vector3(0.45, 0.0, 0.0),
            foreArmR: new THREE.Vector3(0.3, 5.9, -1.18),
            handR: new THREE.Vector3(6.05, -0.28, 0.0),
            middleR1: new THREE.Vector3(6.48, 0.0, 0.0),
            middleR2: new THREE.Vector3(0.5, 0.0, 0.0),
            middleR3: new THREE.Vector3(0.5, 0.0, 0.0),
            thumbR1: new THREE.Vector3(0.2, 0.0, 5.84),
            thumbR2: new THREE.Vector3(0.2, 0.0, 0.0),
            thumbR3: new THREE.Vector3(0.0, 0.0, 0.0),
            indexR1: new THREE.Vector3(6.48, 0.0, 0.0),
            indexR2: new THREE.Vector3(0.5, 0.0, 0.0),
            indexR3: new THREE.Vector3(0.5, 0.0, 0.0),
            ringR1: new THREE.Vector3(6.48, 0.0, 0.0),
            ringR2: new THREE.Vector3(0.5, 0.0, 0.0),
            ringR3: new THREE.Vector3(0.5, 0.0, 0.0),
            pinkyR1: new THREE.Vector3(6.48, 0.0, 0.0),
            pinkyR2: new THREE.Vector3(0.5, 0.0, 0.0),
            pinkyR3: new THREE.Vector3(0.5, 0.0, 0.0),
            upLegR: new THREE.Vector3(4.6, 0, 3.14),
            legR: new THREE.Vector3(4.75, 0, 0),
            footR: new THREE.Vector3(0.7, 0, 0),
            toeR: new THREE.Vector3(0.9, 0, 0),
            upLegL: new THREE.Vector3(4.6, 0, 3.14),
            legL: new THREE.Vector3(4.75, 0, 0),
            footL: new THREE.Vector3(0.7, 0, 0),
            toeL: new THREE.Vector3(0.9, 0, 0),
        }

        //Eating food configurations
        this.EatInitConfiguration = {

            name: "eatInit",
            hips: new THREE.Vector3(0.0, 0.0, 0.0),
            spine: new THREE.Vector3(0.3, 0.0, 0.0),
            spine1: new THREE.Vector3(0.3, 0.0, 0.0),
            spine2: new THREE.Vector3(0.3, 0.0, 0.0),
            neck: new THREE.Vector3(0.0, 0.0, 0.0),
            head: new THREE.Vector3(0.0, 0.0, 0.0),
            eyeR: new THREE.Vector3(0.0, 0.0, 0.0),
            eyeL: new THREE.Vector3(0.0, 0.0, 0.0),
            shoulderL: new THREE.Vector3(0.0, -0.38, -1.58),
            armL: new THREE.Vector3(1.47, 0.45, -0.05),
            foreArmL: new THREE.Vector3(0.2, 0.0, 0.0),
            handL: new THREE.Vector3(0.0, -0.73, 0.0),
            middleL1: new THREE.Vector3(0.0, 0.0, 0.0),
            middleL2: new THREE.Vector3(0.0, 0.0, 0.0),
            middleL3: new THREE.Vector3(0.0, 0.0, 0.0),
            thumbL1: new THREE.Vector3(0.0, 1.09, 0.45),
            thumbL2: new THREE.Vector3(0.0, 0.0, 0.0),
            thumbL3: new THREE.Vector3(0.0, 0.0, 0.0),
            indexL1: new THREE.Vector3(0.0, 0.0, 0.0),
            indexL2: new THREE.Vector3(0.0, 0.0, 0.0),
            indexL3: new THREE.Vector3(0.0, 0.0, 0.0),
            ringL1: new THREE.Vector3(0.0, 0.0, 0.0),
            ringL2: new THREE.Vector3(0.0, 0.0, 0.0),
            ringL3: new THREE.Vector3(0.0, 0.0, 0.0),
            pinkyL1: new THREE.Vector3(0.0, 0.0, 0.0),
            pinkyL2: new THREE.Vector3(0.0, 0.0, 0.0),
            pinkyL3: new THREE.Vector3(0.0, 0.0, 0.0),
            shoulderR: new THREE.Vector3(0.0, 0.0, 1.0),
            armR: new THREE.Vector3(1.7, 0.0, 1.02),
            foreArmR: new THREE.Vector3(0.2, 0.0, -0.38),
            handR: new THREE.Vector3(-1.28, 0.0, 0.0),
            middleR1: new THREE.Vector3(0.0, 0.0, 0.0),
            middleR2: new THREE.Vector3(0.0, 0.0, 0.0),
            middleR3: new THREE.Vector3(0.0, 0.0, 0.0),
            thumbR1: new THREE.Vector3(0.0, 0.0, -0.38),
            thumbR2: new THREE.Vector3(0.0, 0.0, 0.0),
            thumbR3: new THREE.Vector3(0.0, 0.0, 0.0),
            indexR1: new THREE.Vector3(0.0, 0.0, 0.0),
            indexR2: new THREE.Vector3(0.0, 0.0, 0.0),
            indexR3: new THREE.Vector3(0.0, 0.0, 0.0),
            ringR1: new THREE.Vector3(0.0, 0.0, 0.0),
            ringR2: new THREE.Vector3(0.0, 0.0, 0.0),
            ringR3: new THREE.Vector3(0.0, 0.0, 0.0),
            pinkyR1: new THREE.Vector3(0.0, 0.0, 0.0),
            pinkyR2: new THREE.Vector3(0.0, 0.0, 0.0),
            pinkyR3: new THREE.Vector3(0.0, 0.0, 0.0),
            upLegR: new THREE.Vector3(0.0, 0, 3.14),
            legR: new THREE.Vector3(0.0, 0, 0),
            footR: new THREE.Vector3(0.8, 0, 0),
            toeR: new THREE.Vector3(0.9, 0, 0),
            upLegL: new THREE.Vector3(0.0, 0, 3.14),
            legL: new THREE.Vector3(0.0, 0, 0),
            footL: new THREE.Vector3(0.8, 0, 0),
            toeL: new THREE.Vector3(0.9, 0, 0),
        }
        this.EatMoveChairConfiguration = {

            name: "eatMoveChair",
            hips: new THREE.Vector3(0.0, 0.0, 0.0),
            spine: new THREE.Vector3(0.4, 0.0, 0.0),
            spine1: new THREE.Vector3(0.4, 0.0, 0.0),
            spine2: new THREE.Vector3(0.4, 0.0, 0.0),
            neck: new THREE.Vector3(0.0, 0.3, 0.0),
            head: new THREE.Vector3(0.0, 0.2, 0.0),
            eyeR: new THREE.Vector3(0.0, 0.0, 0.0),
            eyeL: new THREE.Vector3(0.0, 0.0, 0.0),
            shoulderL: new THREE.Vector3(0.0, 0.52, -1.58),
            armL: new THREE.Vector3(1.59, 0.0, -0.15),
            foreArmL: new THREE.Vector3(0.2, 0.0, 0.0),
            handL: new THREE.Vector3(0.0, -0.73, 0.0),
            middleL1: new THREE.Vector3(0.0, 0.0, 0.0),
            middleL2: new THREE.Vector3(0.0, 0.0, 0.0),
            middleL3: new THREE.Vector3(0.0, 0.0, 0.0),
            thumbL1: new THREE.Vector3(0.0, 1.09, 0.45),
            thumbL2: new THREE.Vector3(0.0, 0.0, 0.0),
            thumbL3: new THREE.Vector3(0.0, 0.0, 0.0),
            indexL1: new THREE.Vector3(0.0, 0.0, 0.0),
            indexL2: new THREE.Vector3(0.0, 0.0, 0.0),
            indexL3: new THREE.Vector3(0.0, 0.0, 0.0),
            ringL1: new THREE.Vector3(0.0, 0.0, 0.0),
            ringL2: new THREE.Vector3(0.0, 0.0, 0.0),
            ringL3: new THREE.Vector3(0.0, 0.0, 0.0),
            pinkyL1: new THREE.Vector3(0.0, 0.0, 0.0),
            pinkyL2: new THREE.Vector3(0.0, 0.0, 0.0),
            pinkyL3: new THREE.Vector3(0.0, 0.0, 0.0),
            shoulderR: new THREE.Vector3(0.0, 0.0, 0.8),
            armR: new THREE.Vector3(1.7, 0.0, 0.9),
            foreArmR: new THREE.Vector3(0.2, 0.0, -0.38),
            handR: new THREE.Vector3(-1.53, 0.45, 0.0),
            middleR1: new THREE.Vector3(0.0, 0.0, 0.0),
            middleR2: new THREE.Vector3(0.0, 0.0, 0.0),
            middleR3: new THREE.Vector3(0.0, 0.0, 0.0),
            thumbR1: new THREE.Vector3(0.0, 0.0, -0.38),
            thumbR2: new THREE.Vector3(0.0, 0.0, 0.0),
            thumbR3: new THREE.Vector3(0.0, 0.0, 0.0),
            indexR1: new THREE.Vector3(0.0, 0.0, 0.0),
            indexR2: new THREE.Vector3(0.0, 0.0, 0.0),
            indexR3: new THREE.Vector3(0.0, 0.0, 0.0),
            ringR1: new THREE.Vector3(0.0, 0.0, 0.0),
            ringR2: new THREE.Vector3(0.0, 0.0, 0.0),
            ringR3: new THREE.Vector3(0.0, 0.0, 0.0),
            pinkyR1: new THREE.Vector3(0.0, 0.0, 0.0),
            pinkyR2: new THREE.Vector3(0.0, 0.0, 0.0),
            pinkyR3: new THREE.Vector3(0.0, 0.0, 0.0),
            upLegR: new THREE.Vector3(0.0, 0, 3.14),
            legR: new THREE.Vector3(0.0, 0, 0),
            footR: new THREE.Vector3(0.8, 0, 0),
            toeR: new THREE.Vector3(0.9, 0, 0),
            upLegL: new THREE.Vector3(0.0, 0, 3.14),
            legL: new THREE.Vector3(0.0, 0, 0),
            footL: new THREE.Vector3(0.8, 0, 0),
            toeL: new THREE.Vector3(0.9, 0, 0),
        }
        this.eatIdleConfiguration = {

            name: "eatIdle",
            hips: new THREE.Vector3(0.0, -1.57, 0.0),
            spine: new THREE.Vector3(0.0, 0.0, 0.0),
            spine1: new THREE.Vector3(0.0, 0.0, 0.0),
            spine2: new THREE.Vector3(0.0, 0.0, 0.0),
            neck: new THREE.Vector3(0.0, 0.3, 0.0),
            head: new THREE.Vector3(0.3, 0.3, 0.0),
            eyeR: new THREE.Vector3(0.0, 0.0, 0.0),
            eyeL: new THREE.Vector3(0.0, 0.0, 0.0),
            shoulderL: new THREE.Vector3(0.0, 0.0, -1.58),
            armL: new THREE.Vector3(1.59, 0.24, -1.5),
            foreArmL: new THREE.Vector3(0.2, 0.0, 0.0),
            handL: new THREE.Vector3(0.0, 0.0, 0.0),
            middleL1: new THREE.Vector3(0.0, 0.0, 0.0),
            middleL2: new THREE.Vector3(0.0, 0.0, 0.0),
            middleL3: new THREE.Vector3(0.0, 0.0, 0.0),
            thumbL1: new THREE.Vector3(0.0, 1.09, 0.45),
            thumbL2: new THREE.Vector3(0.0, 0.0, 0.0),
            thumbL3: new THREE.Vector3(0.0, 0.0, 0.0),
            indexL1: new THREE.Vector3(0.0, 0.0, 0.0),
            indexL2: new THREE.Vector3(0.0, 0.0, 0.0),
            indexL3: new THREE.Vector3(0.0, 0.0, 0.0),
            ringL1: new THREE.Vector3(0.0, 0.0, 0.0),
            ringL2: new THREE.Vector3(0.0, 0.0, 0.0),
            ringL3: new THREE.Vector3(0.0, 0.0, 0.0),
            pinkyL1: new THREE.Vector3(0.0, 0.0, 0.0),
            pinkyL2: new THREE.Vector3(0.0, 0.0, 0.0),
            pinkyL3: new THREE.Vector3(0.0, 0.0, 0.0),
            shoulderR: new THREE.Vector3(0.0, 0.0, 1.58),
            armR: new THREE.Vector3(1.59, -0.24, 1.52),
            foreArmR: new THREE.Vector3(0.2, 0.0, -0.38),
            handR: new THREE.Vector3(0.0, 0.0, 0.0),
            middleR1: new THREE.Vector3(0.0, 0.0, 0.0),
            middleR2: new THREE.Vector3(0.0, 0.0, 0.0),
            middleR3: new THREE.Vector3(0.0, 0.0, 0.0),
            thumbR1: new THREE.Vector3(0.0, 0.0, -0.38),
            thumbR2: new THREE.Vector3(0.0, 0.0, 0.0),
            thumbR3: new THREE.Vector3(0.0, 0.0, 0.0),
            indexR1: new THREE.Vector3(0.0, 0.0, 0.0),
            indexR2: new THREE.Vector3(0.0, 0.0, 0.0),
            indexR3: new THREE.Vector3(0.0, 0.0, 0.0),
            ringR1: new THREE.Vector3(0.0, 0.0, 0.0),
            ringR2: new THREE.Vector3(0.0, 0.0, 0.0),
            ringR3: new THREE.Vector3(0.0, 0.0, 0.0),
            pinkyR1: new THREE.Vector3(0.0, 0.0, 0.0),
            pinkyR2: new THREE.Vector3(0.0, 0.0, 0.0),
            pinkyR3: new THREE.Vector3(0.0, 0.0, 0.0),
            upLegR: new THREE.Vector3(0.0, 0, 3.14),
            legR: new THREE.Vector3(0.0, 0, 0),
            footR: new THREE.Vector3(0.8, 0, 0),
            toeR: new THREE.Vector3(0.9, 0, 0),
            upLegL: new THREE.Vector3(0.0, 0, 3.14),
            legL: new THREE.Vector3(0.0, 0, 0),
            footL: new THREE.Vector3(0.8, 0, 0),
            toeL: new THREE.Vector3(0.9, 0, 0),
        }
        this.eatStepInitConfiguration = {

            name: "eatStepInit",
            hips: new THREE.Vector3(0.0, -1.57, 0.0),
            spine: new THREE.Vector3(0.0, 0.0, 0.0),
            spine1: new THREE.Vector3(0.0, 0.0, 0.0),
            spine2: new THREE.Vector3(0.0, 0.0, 0.0),
            neck: new THREE.Vector3(0.0, 0.3, 0.0),
            head: new THREE.Vector3(0.3, 0.3, 0.0),
            eyeR: new THREE.Vector3(0.0, 0.0, 0.0),
            eyeL: new THREE.Vector3(0.0, 0.0, 0.0),
            shoulderL: new THREE.Vector3(0.0, 0.0, -1.58),
            armL: new THREE.Vector3(1.59, 0.24, -1.5),
            foreArmL: new THREE.Vector3(-0.8, 0.0, 0.0),
            handL: new THREE.Vector3(0.0, 0.0, 0.0),
            middleL1: new THREE.Vector3(0.0, 0.0, 0.0),
            middleL2: new THREE.Vector3(0.0, 0.0, 0.0),
            middleL3: new THREE.Vector3(0.0, 0.0, 0.0),
            thumbL1: new THREE.Vector3(0.0, 1.09, 0.45),
            thumbL2: new THREE.Vector3(0.0, 0.0, 0.0),
            thumbL3: new THREE.Vector3(0.0, 0.0, 0.0),
            indexL1: new THREE.Vector3(0.0, 0.0, 0.0),
            indexL2: new THREE.Vector3(0.0, 0.0, 0.0),
            indexL3: new THREE.Vector3(0.0, 0.0, 0.0),
            ringL1: new THREE.Vector3(0.0, 0.0, 0.0),
            ringL2: new THREE.Vector3(0.0, 0.0, 0.0),
            ringL3: new THREE.Vector3(0.0, 0.0, 0.0),
            pinkyL1: new THREE.Vector3(0.0, 0.0, 0.0),
            pinkyL2: new THREE.Vector3(0.0, 0.0, 0.0),
            pinkyL3: new THREE.Vector3(0.0, 0.0, 0.0),
            shoulderR: new THREE.Vector3(0.0, 0.0, 1.58),
            armR: new THREE.Vector3(1.59, -0.24, 1.52),
            foreArmR: new THREE.Vector3(0.2, 0.0, -0.38),
            handR: new THREE.Vector3(0.0, 0.0, 0.0),
            middleR1: new THREE.Vector3(0.0, 0.0, 0.0),
            middleR2: new THREE.Vector3(0.0, 0.0, 0.0),
            middleR3: new THREE.Vector3(0.0, 0.0, 0.0),
            thumbR1: new THREE.Vector3(0.0, 0.0, -0.38),
            thumbR2: new THREE.Vector3(0.0, 0.0, 0.0),
            thumbR3: new THREE.Vector3(0.0, 0.0, 0.0),
            indexR1: new THREE.Vector3(0.0, 0.0, 0.0),
            indexR2: new THREE.Vector3(0.0, 0.0, 0.0),
            indexR3: new THREE.Vector3(0.0, 0.0, 0.0),
            ringR1: new THREE.Vector3(0.0, 0.0, 0.0),
            ringR2: new THREE.Vector3(0.0, 0.0, 0.0),
            ringR3: new THREE.Vector3(0.0, 0.0, 0.0),
            pinkyR1: new THREE.Vector3(0.0, 0.0, 0.0),
            pinkyR2: new THREE.Vector3(0.0, 0.0, 0.0),
            pinkyR3: new THREE.Vector3(0.0, 0.0, 0.0),
            upLegR: new THREE.Vector3(0.0, 0, 3.14),
            legR: new THREE.Vector3(0.0, 0, 0),
            footR: new THREE.Vector3(0.8, 0, 0),
            toeR: new THREE.Vector3(0.9, 0, 0),
            upLegL: new THREE.Vector3(-0.48, 0, 3.75),
            legL: new THREE.Vector3(0.1, 0, 0),
            footL: new THREE.Vector3(0.4, 0, 0),
            toeL: new THREE.Vector3(0.9, 0, 0),
        }
        this.eatStepStartConfiguration = {

            name: "eatStepStart",   //Pos = -175 0 430
            hips: new THREE.Vector3(0.0, -1.57, 0.0),
            spine: new THREE.Vector3(0.0, 0.0, 0.0),
            spine1: new THREE.Vector3(0.0, 0.0, 0.0),
            spine2: new THREE.Vector3(0.0, 0.0, 0.0),
            neck: new THREE.Vector3(0.6, 0.1, 0.0),
            head: new THREE.Vector3(0.4, 0.2, 0.0),
            eyeR: new THREE.Vector3(0.0, 0.0, 0.0),
            eyeL: new THREE.Vector3(0.0, 0.0, 0.0),
            shoulderL: new THREE.Vector3(0.0, 0.0, -1.58),
            armL: new THREE.Vector3(1.59, 0.24, -1.5),
            foreArmL: new THREE.Vector3(-0.13, 0.0, 0.41),
            handL: new THREE.Vector3(-0.37, 0.0, 0.0),
            middleL1: new THREE.Vector3(0.0, 0.0, 0.0),
            middleL2: new THREE.Vector3(0.0, 0.0, 0.0),
            middleL3: new THREE.Vector3(0.0, 0.0, 0.0),
            thumbL1: new THREE.Vector3(0.0, 1.09, 0.45),
            thumbL2: new THREE.Vector3(0.0, 0.0, 0.0),
            thumbL3: new THREE.Vector3(0.0, 0.0, 0.0),
            indexL1: new THREE.Vector3(0.0, 0.0, 0.0),
            indexL2: new THREE.Vector3(0.0, 0.0, 0.0),
            indexL3: new THREE.Vector3(0.0, 0.0, 0.0),
            ringL1: new THREE.Vector3(0.0, 0.0, 0.0),
            ringL2: new THREE.Vector3(0.0, 0.0, 0.0),
            ringL3: new THREE.Vector3(0.0, 0.0, 0.0),
            pinkyL1: new THREE.Vector3(0.0, 0.0, 0.0),
            pinkyL2: new THREE.Vector3(0.0, 0.0, 0.0),
            pinkyL3: new THREE.Vector3(0.0, 0.0, 0.0),
            shoulderR: new THREE.Vector3(0.0, 0.0, 1.58),
            armR: new THREE.Vector3(1.59, -0.24, 1.52),
            foreArmR: new THREE.Vector3(0.0, 0.0, -0.74),
            handR: new THREE.Vector3(0.0, -0.94, 0.0),
            middleR1: new THREE.Vector3(0.0, 0.0, 0.0),
            middleR2: new THREE.Vector3(0.0, 0.0, 0.0),
            middleR3: new THREE.Vector3(0.0, 0.0, 0.0),
            thumbR1: new THREE.Vector3(0.0, 0.0, -0.38),
            thumbR2: new THREE.Vector3(0.0, 0.0, 0.0),
            thumbR3: new THREE.Vector3(0.0, 0.0, 0.0),
            indexR1: new THREE.Vector3(0.0, 0.0, 0.0),
            indexR2: new THREE.Vector3(0.0, 0.0, 0.0),
            indexR3: new THREE.Vector3(0.0, 0.0, 0.0),
            ringR1: new THREE.Vector3(0.0, 0.0, 0.0),
            ringR2: new THREE.Vector3(0.0, 0.0, 0.0),
            ringR3: new THREE.Vector3(0.0, 0.0, 0.0),
            pinkyR1: new THREE.Vector3(0.0, 0.0, 0.0),
            pinkyR2: new THREE.Vector3(0.0, 0.0, 0.0),
            pinkyR3: new THREE.Vector3(0.0, 0.0, 0.0),
            upLegR: new THREE.Vector3(0.0, 0.0, 2.9),
            legR: new THREE.Vector3(0.0, 0.0, 0.0),
            footR: new THREE.Vector3(0.6, 0.16, 0.2),
            toeR: new THREE.Vector3(1.0, 0, 0),
            upLegL: new THREE.Vector3(-0.28, 0, 3.35),
            legL: new THREE.Vector3(0.0, 0, 0),
            footL: new THREE.Vector3(0.0, 0, 0),
            toeL: new THREE.Vector3(1.2, 0, 0),
        }
        this.eatStepMiddleConfiguration = {

            name: "eatStepMiddle",   //Pos = -200 0 500
            hips: new THREE.Vector3(0.0, -1.57, 0.0),
            spine: new THREE.Vector3(0.0, 0.0, 0.0),
            spine1: new THREE.Vector3(0.0, 0.0, 0.0),
            spine2: new THREE.Vector3(0.0, 0.0, 0.0),
            neck: new THREE.Vector3(0.6, 0.0, 0.0),
            head: new THREE.Vector3(0.4, 0.0, 0.0),
            eyeR: new THREE.Vector3(0.0, 0.0, 0.0),
            eyeL: new THREE.Vector3(0.0, 0.0, 0.0),
            shoulderL: new THREE.Vector3(0.0, 0.0, -1.58),
            armL: new THREE.Vector3(1.59, 0.24, -1.5),
            foreArmL: new THREE.Vector3(-0.13, 0.0, 0.41),
            handL: new THREE.Vector3(-0.37, 0.0, 0.0),
            middleL1: new THREE.Vector3(0.0, 0.0, 0.0),
            middleL2: new THREE.Vector3(0.0, 0.0, 0.0),
            middleL3: new THREE.Vector3(0.0, 0.0, 0.0),
            thumbL1: new THREE.Vector3(0.0, 1.09, 0.45),
            thumbL2: new THREE.Vector3(0.0, 0.0, 0.0),
            thumbL3: new THREE.Vector3(0.0, 0.0, 0.0),
            indexL1: new THREE.Vector3(0.0, 0.0, 0.0),
            indexL2: new THREE.Vector3(0.0, 0.0, 0.0),
            indexL3: new THREE.Vector3(0.0, 0.0, 0.0),
            ringL1: new THREE.Vector3(0.0, 0.0, 0.0),
            ringL2: new THREE.Vector3(0.0, 0.0, 0.0),
            ringL3: new THREE.Vector3(0.0, 0.0, 0.0),
            pinkyL1: new THREE.Vector3(0.0, 0.0, 0.0),
            pinkyL2: new THREE.Vector3(0.0, 0.0, 0.0),
            pinkyL3: new THREE.Vector3(0.0, 0.0, 0.0),
            shoulderR: new THREE.Vector3(0.0, 0.0, 1.58),
            armR: new THREE.Vector3(1.59, -0.24, 1.52),
            foreArmR: new THREE.Vector3(0.0, 0.0, -0.74),
            handR: new THREE.Vector3(0.0, -0.94, 0.0),
            middleR1: new THREE.Vector3(0.0, 0.0, 0.0),
            middleR2: new THREE.Vector3(0.0, 0.0, 0.0),
            middleR3: new THREE.Vector3(0.0, 0.0, 0.0),
            thumbR1: new THREE.Vector3(0.0, 0.0, -0.38),
            thumbR2: new THREE.Vector3(0.0, 0.0, 0.0),
            thumbR3: new THREE.Vector3(0.0, 0.0, 0.0),
            indexR1: new THREE.Vector3(0.0, 0.0, 0.0),
            indexR2: new THREE.Vector3(0.0, 0.0, 0.0),
            indexR3: new THREE.Vector3(0.0, 0.0, 0.0),
            ringR1: new THREE.Vector3(0.0, 0.0, 0.0),
            ringR2: new THREE.Vector3(0.0, 0.0, 0.0),
            ringR3: new THREE.Vector3(0.0, 0.0, 0.0),
            pinkyR1: new THREE.Vector3(0.0, 0.0, 0.0),
            pinkyR2: new THREE.Vector3(0.0, 0.0, 0.0),
            pinkyR3: new THREE.Vector3(0.0, 0.0, 0.0),
            upLegR: new THREE.Vector3(0.1, 0.0, 2.65),
            legR: new THREE.Vector3(0.0, 0.0, 0.0),
            footR: new THREE.Vector3(0.0, 0, 0),
            toeR: new THREE.Vector3(0.98, 0, 0),
            upLegL: new THREE.Vector3(0.0, 0, 3.14),
            legL: new THREE.Vector3(0.0, 0, 0),
            footL: new THREE.Vector3(0.8, 0, 0),
            toeL: new THREE.Vector3(0.9, 0, 0),
        }
        this.eatStepEndConfiguration = {

            name: "eatStepEnd",   //Pos = -200 0 500
            hips: new THREE.Vector3(0.0, -1.57, 0.0),
            spine: new THREE.Vector3(0.0, 0.0, 0.0),
            spine1: new THREE.Vector3(0.0, 0.0, 0.0),
            spine2: new THREE.Vector3(0.0, 0.0, 0.0),
            neck: new THREE.Vector3(0.6, 0.0, 0.0),
            head: new THREE.Vector3(0.4, 0.0, 0.0),
            eyeR: new THREE.Vector3(0.0, 0.0, 0.0),
            eyeL: new THREE.Vector3(0.0, 0.0, 0.0),
            shoulderL: new THREE.Vector3(0.0, 0.0, -1.58),
            armL: new THREE.Vector3(1.59, 0.24, -1.5),
            foreArmL: new THREE.Vector3(-0.13, 0.0, 0.41),
            handL: new THREE.Vector3(-0.37, 0.0, 0.0),
            middleL1: new THREE.Vector3(0.0, 0.0, 0.0),
            middleL2: new THREE.Vector3(0.0, 0.0, 0.0),
            middleL3: new THREE.Vector3(0.0, 0.0, 0.0),
            thumbL1: new THREE.Vector3(0.0, 1.09, 0.45),
            thumbL2: new THREE.Vector3(0.0, 0.0, 0.0),
            thumbL3: new THREE.Vector3(0.0, 0.0, 0.0),
            indexL1: new THREE.Vector3(0.0, 0.0, 0.0),
            indexL2: new THREE.Vector3(0.0, 0.0, 0.0),
            indexL3: new THREE.Vector3(0.0, 0.0, 0.0),
            ringL1: new THREE.Vector3(0.0, 0.0, 0.0),
            ringL2: new THREE.Vector3(0.0, 0.0, 0.0),
            ringL3: new THREE.Vector3(0.0, 0.0, 0.0),
            pinkyL1: new THREE.Vector3(0.0, 0.0, 0.0),
            pinkyL2: new THREE.Vector3(0.0, 0.0, 0.0),
            pinkyL3: new THREE.Vector3(0.0, 0.0, 0.0),
            shoulderR: new THREE.Vector3(0.0, 0.0, 1.58),
            armR: new THREE.Vector3(1.59, -0.24, 1.52),
            foreArmR: new THREE.Vector3(0.0, 0.0, -0.74),
            handR: new THREE.Vector3(0.0, -0.94, 0.0),
            middleR1: new THREE.Vector3(0.0, 0.0, 0.0),
            middleR2: new THREE.Vector3(0.0, 0.0, 0.0),
            middleR3: new THREE.Vector3(0.0, 0.0, 0.0),
            thumbR1: new THREE.Vector3(0.0, 0.0, -0.38),
            thumbR2: new THREE.Vector3(0.0, 0.0, 0.0),
            thumbR3: new THREE.Vector3(0.0, 0.0, 0.0),
            indexR1: new THREE.Vector3(0.0, 0.0, 0.0),
            indexR2: new THREE.Vector3(0.0, 0.0, 0.0),
            indexR3: new THREE.Vector3(0.0, 0.0, 0.0),
            ringR1: new THREE.Vector3(0.0, 0.0, 0.0),
            ringR2: new THREE.Vector3(0.0, 0.0, 0.0),
            ringR3: new THREE.Vector3(0.0, 0.0, 0.0),
            pinkyR1: new THREE.Vector3(0.0, 0.0, 0.0),
            pinkyR2: new THREE.Vector3(0.0, 0.0, 0.0),
            pinkyR3: new THREE.Vector3(0.0, 0.0, 0.0),
            upLegR: new THREE.Vector3(-0.09, 0.0, 3.14),
            legR: new THREE.Vector3(-0.08, 0.0, 0.0),
            footR: new THREE.Vector3(0.8, 0, 0),
            toeR: new THREE.Vector3(0.9, 0, 0),
            upLegL: new THREE.Vector3(0.0, 0, 3.14),
            legL: new THREE.Vector3(0.0, 0, 0),
            footL: new THREE.Vector3(0.8, 0, 0),
            toeL: new THREE.Vector3(0.9, 0, 0),
        }
        this.eatSitConfiguration = {

            name: "eatSit",   //Pos = -150 -80 500
            hips: new THREE.Vector3(0.0, -1.57, 0.0),
            spine: new THREE.Vector3(0.0, 0.0, 0.0),
            spine1: new THREE.Vector3(0.0, 0.0, 0.0),
            spine2: new THREE.Vector3(0.0, 0.0, 0.0),
            neck: new THREE.Vector3(0.2, 0.0, 0.0),
            head: new THREE.Vector3(0.2, 0.0, 0.0),
            eyeR: new THREE.Vector3(0.0, 0.0, 0.0),
            eyeL: new THREE.Vector3(0.0, 0.0, 0.0),
            shoulderL: new THREE.Vector3(0.0, 0.0, -1.58),
            armL: new THREE.Vector3(1.59, 0.24, -0.5),
            foreArmL: new THREE.Vector3(0.35, 0.0, 0.41),
            handL: new THREE.Vector3(0.0, 0.38
                , 0.0),
            middleL1: new THREE.Vector3(0.2, 0.0, 0.0),
            middleL2: new THREE.Vector3(0.1, 0.0, 0.0),
            middleL3: new THREE.Vector3(0.1, 0.0, 0.0),
            thumbL1: new THREE.Vector3(0.2, 0.0, 0.38),
            thumbL2: new THREE.Vector3(0.0, 0.0, 0.1),
            thumbL3: new THREE.Vector3(0.0, 0.0, -0.2),
            indexL1: new THREE.Vector3(0.2, 0.0, 0.0),
            indexL2: new THREE.Vector3(0.1, 0.0, 0.0),
            indexL3: new THREE.Vector3(0.1, 0.0, 0.0),
            ringL1: new THREE.Vector3(0.0, 0.0, 0.0),
            ringL2: new THREE.Vector3(0.1, 0.0, 0.0),
            ringL3: new THREE.Vector3(0.1, 0.0, 0.0),
            pinkyL1: new THREE.Vector3(0.1, 0.0, 0.0),
            pinkyL2: new THREE.Vector3(0.2, 0.0, 0.0),
            pinkyL3: new THREE.Vector3(0.1, 0.0, 0.0),
            shoulderR: new THREE.Vector3(0.0, 0.0, 1.58),
            armR: new THREE.Vector3(1.59, -0.24, 0.5),
            foreArmR: new THREE.Vector3(0.35, 0.0, -0.41),
            handR: new THREE.Vector3(0.0, -0.38, 0.0),
            middleR1: new THREE.Vector3(0.2, 0.0, 0.0),
            middleR2: new THREE.Vector3(0.1, 0.0, 0.0),
            middleR3: new THREE.Vector3(0.1, 0.0, 0.0),
            thumbR1: new THREE.Vector3(0.2, 0.0, -0.38),
            thumbR2: new THREE.Vector3(0.0, 0.0, 0.1),
            thumbR3: new THREE.Vector3(0.0, 0.0, -0.1),
            indexR1: new THREE.Vector3(0.2, 0.0, 0.0),
            indexR2: new THREE.Vector3(0.1, 0.0, 0.0),
            indexR3: new THREE.Vector3(0.1, 0.0, 0.0),
            ringR1: new THREE.Vector3(0.2, 0.0, 0.0),
            ringR2: new THREE.Vector3(0.1, 0.0, 0.0),
            ringR3: new THREE.Vector3(0.1, 0.0, 0.0),
            pinkyR1: new THREE.Vector3(0.2, 0.0, 0.0),
            pinkyR2: new THREE.Vector3(0.1, 0.0, 0.0),
            pinkyR3: new THREE.Vector3(0.1, 0.0, 0.0),
            upLegR: new THREE.Vector3(-1.44, 0.0, 3.14),
            legR: new THREE.Vector3(-1.44, 0.0, 0.0),
            footR: new THREE.Vector3(0.4, 0, 0),
            toeR: new THREE.Vector3(1.2, 0, 0),
            upLegL: new THREE.Vector3(-1.44, 0, 3.14),
            legL: new THREE.Vector3(-1.44, 0, 0),
            footL: new THREE.Vector3(0.4, 0, 0),
            toeL: new THREE.Vector3(1.2, 0, 0),
        }
        this.eatMoveBurgerConfiguration = {

            name: "eatMoveBurger",   //Pos = -150 -80 500. Burger is moved to -1.83, 2.4, 4.84
            hips: new THREE.Vector3(0.0, -1.57, 0.0),
            spine: new THREE.Vector3(0.0, 0.0, 0.0),
            spine1: new THREE.Vector3(0.0, 0.0, 0.0),
            spine2: new THREE.Vector3(0.0, 0.0, 0.0),
            neck: new THREE.Vector3(0.1, 0.0, 0.0),
            head: new THREE.Vector3(0.0, 0.0, 0.0),
            eyeR: new THREE.Vector3(0.0, 0.0, 0.0),
            eyeL: new THREE.Vector3(0.0, 0.0, 0.0),
            shoulderL: new THREE.Vector3(0.0, 0.0, -1.58),
            armL: new THREE.Vector3(1.59, 0.24, -1.1),
            foreArmL: new THREE.Vector3(-0.03, 0.0, 2.31),
            handL: new THREE.Vector3(0.25, 0.0, 0.0),
            middleL1: new THREE.Vector3(0.2, 0.0, 0.0),
            middleL2: new THREE.Vector3(0.25, 0.0, 0.0),
            middleL3: new THREE.Vector3(0.2, 0.0, 0.0),
            thumbL1: new THREE.Vector3(0.2, 0.0, 0.38),
            thumbL2: new THREE.Vector3(0.0, 0.0, 0.1),
            thumbL3: new THREE.Vector3(0.0, 0.0, 0.0),
            indexL1: new THREE.Vector3(0.3, 0.0, 0.0),
            indexL2: new THREE.Vector3(0.2, 0.0, 0.0),
            indexL3: new THREE.Vector3(0.2, 0.0, 0.0),
            ringL1: new THREE.Vector3(0.1, 0.0, 0.0),
            ringL2: new THREE.Vector3(0.2, 0.0, 0.0),
            ringL3: new THREE.Vector3(0.2, 0.0, 0.0),
            pinkyL1: new THREE.Vector3(0.2, 0.0, 0.0),
            pinkyL2: new THREE.Vector3(0.2, 0.0, 0.0),
            pinkyL3: new THREE.Vector3(0.2, 0.0, 0.0),
            shoulderR: new THREE.Vector3(0.0, 0.0, 1.58),
            armR: new THREE.Vector3(1.59, -0.24, 1.1),
            foreArmR: new THREE.Vector3(0.0, 0.0, -2.31),
            handR: new THREE.Vector3(0.3, 0.3, 0.0),
            middleR1: new THREE.Vector3(0.4, 0.0, 0.0),
            middleR2: new THREE.Vector3(0.2, 0.0, 0.0),
            middleR3: new THREE.Vector3(0.2, 0.0, 0.0),
            thumbR1: new THREE.Vector3(0.45, 0.0, -0.38),
            thumbR2: new THREE.Vector3(0.0, 0.0, 0.1),
            thumbR3: new THREE.Vector3(0.0, 0.0, 0.0),
            indexR1: new THREE.Vector3(0.4, 0.0, 0.0),
            indexR2: new THREE.Vector3(0.2, 0.0, 0.0),
            indexR3: new THREE.Vector3(0.2, 0.0, 0.0),
            ringR1: new THREE.Vector3(0.4, 0.0, 0.0),
            ringR2: new THREE.Vector3(0.1, 0.0, 0.0),
            ringR3: new THREE.Vector3(0.2, 0.0, 0.0),
            pinkyR1: new THREE.Vector3(0.2, 0.0, 0.0),
            pinkyR2: new THREE.Vector3(0.1, 0.0, 0.0),
            pinkyR3: new THREE.Vector3(0.1, 0.0, 0.0),
            upLegR: new THREE.Vector3(-1.44, 0.0, 3.14),
            legR: new THREE.Vector3(-1.44, 0.0, 0.0),
            footR: new THREE.Vector3(0.4, 0, 0),
            toeR: new THREE.Vector3(1.2, 0, 0),
            upLegL: new THREE.Vector3(-1.44, 0, 3.14),
            legL: new THREE.Vector3(-1.44, 0, 0),
            footL: new THREE.Vector3(0.4, 0, 0),
            toeL: new THREE.Vector3(1.2, 0, 0),
        }
        this.tweensIdle = [];
        this.tweensWalkStartRight = [];
        this.tweensWalkEndRight = [];
        this.tweensWalkChangeRightToLeft = []
        this.tweensWalkStartLeft = [];
        this.tweensWalkEndLeft = [];
        this.tweensWalkChangeLeftToRight = [];
        this.tweenMovement = null;

        this.walkBoxes = environment.walkBoxes;
        this.boundaries = environment.boundaries;

        this.interactionPossible = -1;
        this.interactionBoxes = []
    }
    init() {
        this.initParts(0)
        this.tweenGroup = new TWEEN.Group();
        this.human.model.position.set(200, 0, 700)
        this.tweensWalkStartRight = this.setupTweenQuaternions(this.walkStartRightConfiguration, 200);
        this.tweensWalkEndRight = this.setupTweenQuaternions(this.walkEndRightConfiguration, 200);
        this.tweensWalkChangeRightToLeft = this.setupTweenQuaternions(this.walkChangeRightToLeftConfiguration, 200);
        this.tweensWalkStartLeft = this.setupTweenQuaternions(this.walkStartLeftConfiguration, 200);
        this.tweensWalkEndLeft = this.setupTweenQuaternions(this.walkEndLeftConfiguration, 200);
        this.tweensWalkChangeLeftToRight = this.setupTweenQuaternions(this.walkChangeLeftToRightConfiguration, 200);

        this.tweensWalkChangeLeftToRight[0].onComplete(() => {
            if (this.walking) {
                this.tweensWalkStartRight = this.setupTweenQuaternions(this.walkStartRightConfiguration, 500);
                this.chain(this.tweensWalkStartRight, this.tweensWalkEndRight)
                this.start(this.tweensWalkStartRight)
            }
        })
        this.chain(this.tweensWalkStartRight, this.tweensWalkEndRight)
        this.chain(this.tweensWalkEndRight, this.tweensWalkChangeRightToLeft)
        this.chain(this.tweensWalkChangeRightToLeft, this.tweensWalkStartLeft)
        this.chain(this.tweensWalkStartLeft, this.tweensWalkEndLeft)
        this.chain(this.tweensWalkEndLeft, this.tweensWalkChangeLeftToRight)

        this.interactionBoxes.push(new Box([260, -90], [340, -10]));  //Couch Interaction = 0
        this.interactionBoxes.push(new Box([-200, 310], [-85, 440]));  //Table Interaction = 1


    }

    startWalking() {
        if (!this.walking && !this.interacting && !this.goingIdle) {
            this.walking = true;
            this.start(this.tweensWalkStartRight);
            this.moveHuman();
            this.stopped = false;
        }
    }

    stopWalking() {
        if (!this.stopped && !this.goingIdle) {
            this.goingIdle=true
            if (this.tweenMovement) {
                this.tweenMovement.stop()
            }
            this.stopCurrentTween()
            this.tweensIdle = this.setupTweenQuaternions(this.idleConfiguration, 500)
            this.tweensIdle[0].onComplete(() => {
                this.tweensWalkStartRight = this.setupTweenQuaternions(this.walkStartRightConfiguration, 500);
                this.chain(this.tweensWalkStartRight, this.tweensWalkEndRight)
                this.goingIdle=false
            })
            this.start(this.tweensIdle)

            this.stopped = true
            this.walking = false
        }
    }
    turnLeft() {
        if (!this.changingDirection && !this.interacting) {
            this.changingDirection = true
            let tmp = this.parts.hips.rotation.y * 100
            tmp += 157
            if (tmp >= 628) {
                tmp += -628
            }
            this.parts.hips.rotation.y = tmp / 100
            this.changeDirection()
        }

    }
    turnRight() {
        if (!this.changingDirection && !this.interacting) {
            this.changingDirection = true
            let tmp = this.parts.hips.rotation.y * 100
            tmp += -157
            if (tmp < 0) {
                tmp += 628
            }
            this.parts.hips.rotation.y = tmp / 100
            this.changeDirection()
        }
    }
    changeDirection() {

        switch (this.parts.hips.rotation.y) {
            case 0:
                this.direction = 1;
                break;
            case 1.57:
                this.direction = 2;
                break;
            case 3.14:
                this.direction = -1;
                break;
            case 4.71:
                this.direction = -2;
                break;
        }
        if (this.walking) {
            if (this.tweenMovement) {
                this.tweenMovement.stop()
            }
            this.moveHuman()
        }
    }
    stopCurrentTween() {
        switch (this.currentTween) {
            case this.idleConfiguration.name:
                break;
            case this.walkStartRightConfiguration.name:
                this.stop(this.tweensWalkStartRight)
                break;
            case this.walkEndRightConfiguration.name:
                this.stop(this.tweensWalkEndRight)
                break;
            case this.walkChangeRightToLeftConfiguration.name:
                this.stop(this.tweensWalkChangeRightToLeft)
                break;
            case this.walkStartLeftConfiguration.name:
                this.stop(this.tweensWalkStartLeft)
                break;
            case this.walkEndLeftConfiguration.name:
                this.stop(this.tweensWalkEndLeft)
                break;
            case this.walkChangeLeftToRightConfiguration.name:
                this.stop(this.tweensWalkChangeLeftToRight)
                break;
        }

    }
    moveHuman() {
        var position = new THREE.Vector3(this.human.model.position.x, this.human.model.position.y, this.human.model.position.z);
        let speed = 1
        let time = 5
        if (this.direction == 1) {
            position.z = position.z + speed;
        }
        else if (this.direction == -1) {
            position.z = position.z - speed;
        }
        else if (this.direction == 2) {
            position.x = position.x + speed;
        }
        else {
            position.x = position.x - speed;
        }
        if (this.canWalkTo(position.x, position.z)) {
            this.checkInteraction(position.x, position.z)
            this.tweenMovement = new TWEEN.Tween(this.human.model.position, this.tweenGroup).to(position, time).onComplete(() => {
                if (this.walking) {
                    this.moveHuman()
                }
                else {
                    this.stopWalking()
                    return
                }
            });
            this.tweenMovement.start()
        }
        else {
            if (this.walking) {
                this.stopWalking()
            }

        }

    }
    canWalkTo(x, z) {
        if (this.boundaries.containsPoint(x, z)) {
            for (var box of this.walkBoxes) {
                if (box.containsPoint(x, z)) {

                    return false
                }

            }

            return true
        }
        else {
            return false
        }
    }

    checkInteraction(x, z) {
        // 0x22d646    green            0xff5650 red
        for (let i = 0; i < this.interactionBoxes.length; i++) {
            if (this.interactionBoxes[i].containsPoint(x, z)) {
                this.environment.carpets[i].material.color.set(0x22d646);
                this.interactionPossible = i
                return
            }
            else {
                this.environment.carpets[i].material.color.set(0xff5650);
                this.interactionPossible = -1
            }
        }
    }
    initParts(time) {
        var human = this.human;
        var tweens = [];
        //tweens.push(new TWEEN.Tween(human.parts.hips.quaternion).to(this.idleConfiguration.hips, time));
        tweens.push(new TWEEN.Tween(human.parts.spine.quaternion).to(this.idleConfiguration.spine, time));
        tweens.push(new TWEEN.Tween(human.parts.spine1.quaternion).to(this.idleConfiguration.spine1, time));
        tweens.push(new TWEEN.Tween(human.parts.spine2.quaternion).to(this.idleConfiguration.spine2, time));
        tweens.push(new TWEEN.Tween(human.parts.neck.quaternion).to(this.idleConfiguration.neck, time));
        tweens.push(new TWEEN.Tween(human.parts.head.quaternion).to(this.idleConfiguration.head, time));
        tweens.push(new TWEEN.Tween(human.parts.eyeR.quaternion).to(this.idleConfiguration.eyeR, time));
        tweens.push(new TWEEN.Tween(human.parts.eyeL.quaternion).to(this.idleConfiguration.eyeL, time));
        tweens.push(new TWEEN.Tween(human.parts.shoulderL.quaternion).to(this.idleConfiguration.shoulderL, time));
        tweens.push(new TWEEN.Tween(human.parts.armL.quaternion).to(this.idleConfiguration.armL, time));
        tweens.push(new TWEEN.Tween(human.parts.foreArmL.quaternion).to(this.idleConfiguration.foreArmL, time));
        tweens.push(new TWEEN.Tween(human.parts.handL.quaternion).to(this.idleConfiguration.handL, time));
        tweens.push(new TWEEN.Tween(human.parts.middleL1.quaternion).to(this.idleConfiguration.middleL1, time));
        tweens.push(new TWEEN.Tween(human.parts.middleL2.quaternion).to(this.idleConfiguration.middleL2, time));
        tweens.push(new TWEEN.Tween(human.parts.middleL3.quaternion).to(this.idleConfiguration.middleL3, time));
        tweens.push(new TWEEN.Tween(human.parts.thumbL1.quaternion).to(this.idleConfiguration.thumbL1, time));
        tweens.push(new TWEEN.Tween(human.parts.thumbL2.quaternion).to(this.idleConfiguration.thumbL2, time));
        tweens.push(new TWEEN.Tween(human.parts.thumbL3.quaternion).to(this.idleConfiguration.thumbL3, time));
        tweens.push(new TWEEN.Tween(human.parts.indexL1.quaternion).to(this.idleConfiguration.indexL1, time));
        tweens.push(new TWEEN.Tween(human.parts.indexL2.quaternion).to(this.idleConfiguration.indexL2, time));
        tweens.push(new TWEEN.Tween(human.parts.indexL3.quaternion).to(this.idleConfiguration.indexL3, time));
        tweens.push(new TWEEN.Tween(human.parts.ringL1.quaternion).to(this.idleConfiguration.ringL1, time));
        tweens.push(new TWEEN.Tween(human.parts.ringL2.quaternion).to(this.idleConfiguration.ringL2, time));
        tweens.push(new TWEEN.Tween(human.parts.ringL3.quaternion).to(this.idleConfiguration.ringL3, time));
        tweens.push(new TWEEN.Tween(human.parts.pinkyL1.quaternion).to(this.idleConfiguration.pinkyL1, time));
        tweens.push(new TWEEN.Tween(human.parts.pinkyL2.quaternion).to(this.idleConfiguration.pinkyL2, time));
        tweens.push(new TWEEN.Tween(human.parts.pinkyL3.quaternion).to(this.idleConfiguration.pinkyL3, time));
        tweens.push(new TWEEN.Tween(human.parts.shoulderR.quaternion).to(this.idleConfiguration.shoulderR, time));
        tweens.push(new TWEEN.Tween(human.parts.armR.quaternion).to(this.idleConfiguration.armR, time));
        tweens.push(new TWEEN.Tween(human.parts.foreArmR.quaternion).to(this.idleConfiguration.foreArmR, time));
        tweens.push(new TWEEN.Tween(human.parts.handR.quaternion).to(this.idleConfiguration.handR, time));
        tweens.push(new TWEEN.Tween(human.parts.middleR1.quaternion).to(this.idleConfiguration.middleR1, time));
        tweens.push(new TWEEN.Tween(human.parts.middleR2.quaternion).to(this.idleConfiguration.middleR2, time));
        tweens.push(new TWEEN.Tween(human.parts.middleR3.quaternion).to(this.idleConfiguration.middleR3, time));
        tweens.push(new TWEEN.Tween(human.parts.thumbR1.quaternion).to(this.idleConfiguration.thumbR1, time));
        tweens.push(new TWEEN.Tween(human.parts.thumbR2.quaternion).to(this.idleConfiguration.thumbR2, time));
        tweens.push(new TWEEN.Tween(human.parts.thumbR3.quaternion).to(this.idleConfiguration.thumbR3, time));
        tweens.push(new TWEEN.Tween(human.parts.indexR1.quaternion).to(this.idleConfiguration.indexR1, time));
        tweens.push(new TWEEN.Tween(human.parts.indexR2.quaternion).to(this.idleConfiguration.indexR2, time));
        tweens.push(new TWEEN.Tween(human.parts.indexR3.quaternion).to(this.idleConfiguration.indexR3, time));
        tweens.push(new TWEEN.Tween(human.parts.ringR1.quaternion).to(this.idleConfiguration.ringR1, time));
        tweens.push(new TWEEN.Tween(human.parts.ringR2.quaternion).to(this.idleConfiguration.ringR2, time));
        tweens.push(new TWEEN.Tween(human.parts.ringR3.quaternion).to(this.idleConfiguration.ringR3, time));
        tweens.push(new TWEEN.Tween(human.parts.pinkyR1.quaternion).to(this.idleConfiguration.pinkyR1, time));
        tweens.push(new TWEEN.Tween(human.parts.pinkyR2.quaternion).to(this.idleConfiguration.pinkyR2, time));
        tweens.push(new TWEEN.Tween(human.parts.pinkyR3.quaternion).to(this.idleConfiguration.pinkyR3, time));

        tweens.push(new TWEEN.Tween(human.parts.upLegR.quaternion).to(this.idleConfiguration.upLegR, time));
        tweens.push(new TWEEN.Tween(human.parts.legR.quaternion).to(this.idleConfiguration.legR, time));
        tweens.push(new TWEEN.Tween(human.parts.footR.quaternion).to(this.idleConfiguration.footR, time));
        tweens.push(new TWEEN.Tween(human.parts.toeR.quaternion).to(this.idleConfiguration.toeR, time));
        tweens.push(new TWEEN.Tween(human.parts.upLegL.quaternion).to(this.idleConfiguration.upLegL, time));
        tweens.push(new TWEEN.Tween(human.parts.legL.quaternion).to(this.idleConfiguration.legL, time));
        tweens.push(new TWEEN.Tween(human.parts.footL.quaternion).to(this.idleConfiguration.footL, time));
        tweens.push(new TWEEN.Tween(human.parts.toeL.quaternion).to(this.idleConfiguration.toeL, time));
        this.start(tweens)
        for (let i = 0; i < tweens.length; i++) {
            tweens[i].update()
        }
        this.stop(tweens)
    }

    sitOnCouch() {
        let tweens = []
        tweens = this.setupTweenXYZ(this.sitOnCouchInitConfiguration, 0)
        tweens.push(this.setupTweenPosition(new THREE.Vector3(320, 0, -50), 0))
        let tweens1 = this.setupTweenXYZ(this.sitOnCouchStartConfiguration, 500)
        tweens1.push(this.setupTweenPosition(new THREE.Vector3(400, -65, -50), 500))
        let tweens2 = this.setupTweenXYZ(this.sitOnCouchEndConfiguration, 500)
        tweens2.push(this.setupTweenPosition(new THREE.Vector3(400, -115, -50), 500))
        this.chain(tweens, tweens1)
        this.chain(tweens1, tweens2)
        this.start(tweens)
    }
    standFromCouch() {
        let tweens = []
        tweens = this.setupTweenXYZ(this.sitOnCouchStartConfiguration, 500)
        tweens.push(this.setupTweenPosition(new THREE.Vector3(400, -65, -50), 500))
        let tweens1 = this.setupTweenXYZ(this.sitOnCouchInitConfiguration, 500)
        tweens1.push(this.setupTweenPosition(new THREE.Vector3(320, 0, -50), 500))
        this.chain(tweens, tweens1)
        let tweens2 = []

        tweens2.push(this.setupTweenHips({ x: 0.0, y: 0.0, z: 0.0, w: 1.0 }, 0).onComplete(() => {
            this.parts.hips.rotation.z = 0.0;
            this.parts.hips.rotation.y = 4.71;
            this.parts.hips.rotation.z = 0.0;
            this.changeDirection()
            this.interacting = false
            this.stopCommanded = false

        }))
        tweens2 = tweens2.concat(this.setupTweenQuaternions(this.idleConfiguration, 0))
        tweens2.push(this.setupTweenPosition(new THREE.Vector3(320, 0, -50), 0))
        this.chain(tweens1, tweens2)

        this.start(tweens)
    }

    startFoodInteraction() {
        this.human.model.position.set(-160, 0, 370)
        this.parts.hips.rotation.y = 0;
        let tweens = []
        tweens = this.setupTweenXYZ(this.EatInitConfiguration, 500)
        tweens.push(this.setupTweenPosition(new THREE.Vector3(-160, 0, 370), 500))
        let tweens1 = this.setupTweenXYZ(this.EatMoveChairConfiguration, 1000)
        tweens1.push(new TWEEN.Tween(this.environment.chair.position, this.tweenGroup).to(new THREE.Vector3(-1.2, 1.67, 5), 1000))
        let tweens2 = this.setupTweenXYZ(this.eatIdleConfiguration, 500)
        tweens2.push(this.setupTweenPosition(new THREE.Vector3(-160, 0, 370), 500))
        let tweens3 = this.setupTweenXYZ(this.eatStepInitConfiguration, 500)
        tweens3.push(this.setupTweenPosition(new THREE.Vector3(-160, 0, 370), 500))
        let tweens4 = this.setupTweenXYZ(this.eatStepStartConfiguration, 500)
        tweens4.push(this.setupTweenPosition(new THREE.Vector3(-175, 0, 430), 500))
        let tweens5 = this.setupTweenXYZ(this.eatStepMiddleConfiguration, 500)
        tweens5.push(this.setupTweenPosition(new THREE.Vector3(-200, 0, 500), 500))
        let tweens6 = this.setupTweenXYZ(this.eatStepEndConfiguration, 500)
        tweens6.push(this.setupTweenPosition(new THREE.Vector3(-200, 0, 500), 500))
        let tweens7 = this.setupTweenXYZ(this.eatSitConfiguration, 500)
        tweens7.push(this.setupTweenPosition(new THREE.Vector3(-150, -80, 500), 500))
        let tweens8 = this.setupTweenXYZ(this.eatMoveBurgerConfiguration, 500)
        let burgerPositions=new THREE.Vector3([-2.7,-2.6,-2.5,-2.4, -2.3, -2.2, -2.1, -2.0, -1.84],[1.95, 2.1, 2.25, 2.34, 2.43, 2.52, 2.61, 2.65, 2.7], [4.9, 4.9, 4.9, 4.9, 4.9, 4.9, 4.9])
        tweens8.push(new TWEEN.Tween(this.environment.burger.position, this.tweenGroup).to(burgerPositions, 500).onComplete(() => {
            this.eat()
        }))
        this.chain(tweens, tweens1)
        this.chain(tweens1, tweens2)
        this.chain(tweens2, tweens3)
        this.chain(tweens3, tweens4)
        this.chain(tweens4, tweens5)
        this.chain(tweens5, tweens6)
        this.chain(tweens6, tweens7)
        this.chain(tweens7, tweens8)

        this.start(tweens)
    }
    stopFoodInteraction() {
        let tweens0 = []

        tweens0.push(this.setupTweenHips({ x: 0.0, y: 0.0, z: 0.0, w: 1.0 }, 500).onComplete(() => {
            this.parts.hips.rotation.z = 0.0;
            this.parts.hips.rotation.y = 0.0;
            this.parts.hips.rotation.z = 0.0;
            let tweensIdle = this.setupTweenQuaternions(this.idleConfiguration, 0)
            this.start(tweensIdle)
            this.changeDirection()
            this.interacting = false
            this.stopCommanded = false

        }))
        tweens0 = tweens0.concat(this.setupTweenXYZ(this.idleXYZConfiguration, 500))
        tweens0.push(this.setupTweenPosition(new THREE.Vector3(-160, 0, 370), 500))
        let tweens = []
        tweens = this.setupTweenXYZ(this.EatInitConfiguration, 1000)
        tweens.push(new TWEEN.Tween(this.environment.chair.position, this.tweenGroup).to(new THREE.Vector3(-2.53, 1.67, 4.9), 1000).onComplete(() => {
            this.stopInteracting = false
            this.parts.hips.rotation.y = 0;
        }))
        let tweens1 = this.setupTweenXYZ(this.EatMoveChairConfiguration, 500)
        tweens1.push(this.setupTweenPosition(new THREE.Vector3(-160, 0, 370), 500))
        let tweens2 = this.setupTweenXYZ(this.eatIdleConfiguration, 500)
        tweens2.push(this.setupTweenPosition(new THREE.Vector3(-160, 0, 370), 500))
        let tweens3 = this.setupTweenXYZ(this.eatStepInitConfiguration, 500)
        tweens3.push(this.setupTweenPosition(new THREE.Vector3(-160, 0, 370), 500))
        let tweens4 = this.setupTweenXYZ(this.eatStepStartConfiguration, 500)
        tweens4.push(this.setupTweenPosition(new THREE.Vector3(-175, 0, 430), 500))
        let tweens5 = this.setupTweenXYZ(this.eatStepMiddleConfiguration, 500)
        tweens5.push(this.setupTweenPosition(new THREE.Vector3(-200, 0, 500), 500))
        let tweens6 = this.setupTweenXYZ(this.eatStepEndConfiguration, 500)
        tweens6.push(this.setupTweenPosition(new THREE.Vector3(-200, 0, 500), 500))
        let tweens7 = this.setupTweenXYZ(this.eatSitConfiguration, 500)
        let burgerPositions=new THREE.Vector3([-1.84,-2.0,-2.1,-2.2,-2.3,-2.4,-2.5,-2.6,-2.7],[2.7,2.65,2.61,2.52,2.43,2.34,2.25,2.1,1.95], [4.9, 4.9, 4.9, 4.9, 4.9, 4.9, 4.9])

        tweens7.push(new TWEEN.Tween(this.environment.burger.position, this.tweenGroup).to(burgerPositions, 500))
        let tweens8 = this.setupTweenXYZ(this.eatMoveBurgerConfiguration, 500)
        tweens8.push(this.setupTweenPosition(new THREE.Vector3(-150, -80, 500), 500))

        this.chain(tweens8, tweens7)
        this.chain(tweens7, tweens6)
        this.chain(tweens6, tweens5)
        this.chain(tweens5, tweens4)
        this.chain(tweens4, tweens3)
        this.chain(tweens3, tweens2)
        this.chain(tweens2, tweens1)
        this.chain(tweens1, tweens)
        this.chain(tweens, tweens0)

        this.start(tweens8)
    }
    eat() {
        if (!this.stopCommanded) {
            let target = 0.1
            if (this.parts.head.rotation.x == 0.1) {
                target = 0.0
            }
            let tween = new TWEEN.Tween(this.parts.head.rotation, this.tweenGroup).to(new THREE.Vector3(target, 0.0, 0.0), 500).onComplete(() => {
                this.eat()
            })
            tween.start()
        }
        else {
            this.stopFoodInteraction()
        }

    }
    startInteraction() {
        if (!this.interacting && !this.stopCommanded) {
            if (this.walking) {
                this.stopWalking()
            }
            switch (this.interactionPossible) {
                case -1:
                    break;
                case 0:
                    this.interacting = true
                    this.stopCommanded = false
                    this.sitOnCouch()
                    break;
                case 1:
                    this.interacting = true
                    this.stopCommanded = false
                    this.startFoodInteraction()
                    break;

            }
        }


    }

    stopInteraction() {
        if (this.interacting && !this.stopCommanded) {
            this.stopCommanded = true
            if (this.interactionPossible == 0) {
                this.standFromCouch()
            }
        }
    }

    setupTweenPosition(position, time) {
        return new TWEEN.Tween(this.human.model.position, this.tweenGroup).to(position, time)
    }
    setupTweenHips(hipsConfiguration, time) {
        return new TWEEN.Tween(this.human.parts.hips.quaternion, this.tweenGroup).to(hipsConfiguration, time)
    }
    setupTweenQuaternions(configuration, time) {
        var human = this.human;
        var tweens = [];
        //tweens.push(new TWEEN.Tween(human.parts.hips.quaternion, this.tweenGroup).to(configuration.hips, time));
        tweens.push(new TWEEN.Tween(human.parts.spine.quaternion, this.tweenGroup).to(configuration.spine, time));
        tweens.push(new TWEEN.Tween(human.parts.spine1.quaternion, this.tweenGroup).to(configuration.spine1, time));
        tweens.push(new TWEEN.Tween(human.parts.spine2.quaternion, this.tweenGroup).to(configuration.spine2, time));
        tweens.push(new TWEEN.Tween(human.parts.neck.quaternion, this.tweenGroup).to(configuration.neck, time));
        tweens.push(new TWEEN.Tween(human.parts.head.quaternion, this.tweenGroup).to(configuration.head, time));
        tweens.push(new TWEEN.Tween(human.parts.eyeR.quaternion, this.tweenGroup).to(configuration.eyeR, time));
        tweens.push(new TWEEN.Tween(human.parts.eyeL.quaternion, this.tweenGroup).to(configuration.eyeL, time));
        tweens.push(new TWEEN.Tween(human.parts.shoulderL.quaternion, this.tweenGroup).to(configuration.shoulderL, time));
        tweens.push(new TWEEN.Tween(human.parts.armL.quaternion, this.tweenGroup).to(configuration.armL, time));
        tweens.push(new TWEEN.Tween(human.parts.foreArmL.quaternion, this.tweenGroup).to(configuration.foreArmL, time));
        tweens.push(new TWEEN.Tween(human.parts.handL.quaternion, this.tweenGroup).to(configuration.handL, time));
        tweens.push(new TWEEN.Tween(human.parts.middleL1.quaternion, this.tweenGroup).to(configuration.middleL1, time));
        tweens.push(new TWEEN.Tween(human.parts.middleL2.quaternion, this.tweenGroup).to(configuration.middleL2, time));
        tweens.push(new TWEEN.Tween(human.parts.middleL3.quaternion, this.tweenGroup).to(configuration.middleL3, time));
        tweens.push(new TWEEN.Tween(human.parts.thumbL1.quaternion, this.tweenGroup).to(configuration.thumbL1, time));
        tweens.push(new TWEEN.Tween(human.parts.thumbL2.quaternion, this.tweenGroup).to(configuration.thumbL2, time));
        tweens.push(new TWEEN.Tween(human.parts.thumbL3.quaternion, this.tweenGroup).to(configuration.thumbL3, time));
        tweens.push(new TWEEN.Tween(human.parts.indexL1.quaternion, this.tweenGroup).to(configuration.indexL1, time));
        tweens.push(new TWEEN.Tween(human.parts.indexL2.quaternion, this.tweenGroup).to(configuration.indexL2, time));
        tweens.push(new TWEEN.Tween(human.parts.indexL3.quaternion, this.tweenGroup).to(configuration.indexL3, time));
        tweens.push(new TWEEN.Tween(human.parts.ringL1.quaternion, this.tweenGroup).to(configuration.ringL1, time));
        tweens.push(new TWEEN.Tween(human.parts.ringL2.quaternion, this.tweenGroup).to(configuration.ringL2, time));
        tweens.push(new TWEEN.Tween(human.parts.ringL3.quaternion, this.tweenGroup).to(configuration.ringL3, time));
        tweens.push(new TWEEN.Tween(human.parts.pinkyL1.quaternion, this.tweenGroup).to(configuration.pinkyL1, time));
        tweens.push(new TWEEN.Tween(human.parts.pinkyL2.quaternion, this.tweenGroup).to(configuration.pinkyL2, time));
        tweens.push(new TWEEN.Tween(human.parts.pinkyL3.quaternion, this.tweenGroup).to(configuration.pinkyL3, time));
        tweens.push(new TWEEN.Tween(human.parts.shoulderR.quaternion, this.tweenGroup).to(configuration.shoulderR, time));
        tweens.push(new TWEEN.Tween(human.parts.armR.quaternion, this.tweenGroup).to(configuration.armR, time));
        tweens.push(new TWEEN.Tween(human.parts.foreArmR.quaternion, this.tweenGroup).to(configuration.foreArmR, time));
        tweens.push(new TWEEN.Tween(human.parts.handR.quaternion, this.tweenGroup).to(configuration.handR, time));
        tweens.push(new TWEEN.Tween(human.parts.middleR1.quaternion, this.tweenGroup).to(configuration.middleR1, time));
        tweens.push(new TWEEN.Tween(human.parts.middleR2.quaternion, this.tweenGroup).to(configuration.middleR2, time));
        tweens.push(new TWEEN.Tween(human.parts.middleR3.quaternion, this.tweenGroup).to(configuration.middleR3, time));
        tweens.push(new TWEEN.Tween(human.parts.thumbR1.quaternion, this.tweenGroup).to(configuration.thumbR1, time));
        tweens.push(new TWEEN.Tween(human.parts.thumbR2.quaternion, this.tweenGroup).to(configuration.thumbR2, time));
        tweens.push(new TWEEN.Tween(human.parts.thumbR3.quaternion, this.tweenGroup).to(configuration.thumbR3, time));
        tweens.push(new TWEEN.Tween(human.parts.indexR1.quaternion, this.tweenGroup).to(configuration.indexR1, time));
        tweens.push(new TWEEN.Tween(human.parts.indexR2.quaternion, this.tweenGroup).to(configuration.indexR2, time));
        tweens.push(new TWEEN.Tween(human.parts.indexR3.quaternion, this.tweenGroup).to(configuration.indexR3, time));
        tweens.push(new TWEEN.Tween(human.parts.ringR1.quaternion, this.tweenGroup).to(configuration.ringR1, time));
        tweens.push(new TWEEN.Tween(human.parts.ringR2.quaternion, this.tweenGroup).to(configuration.ringR2, time));
        tweens.push(new TWEEN.Tween(human.parts.ringR3.quaternion, this.tweenGroup).to(configuration.ringR3, time));
        tweens.push(new TWEEN.Tween(human.parts.pinkyR1.quaternion, this.tweenGroup).to(configuration.pinkyR1, time));
        tweens.push(new TWEEN.Tween(human.parts.pinkyR2.quaternion, this.tweenGroup).to(configuration.pinkyR2, time));
        tweens.push(new TWEEN.Tween(human.parts.pinkyR3.quaternion, this.tweenGroup).to(configuration.pinkyR3, time));

        tweens.push(new TWEEN.Tween(human.parts.upLegR.quaternion, this.tweenGroup).to(configuration.upLegR, time));
        tweens.push(new TWEEN.Tween(human.parts.legR.quaternion, this.tweenGroup).to(configuration.legR, time));
        tweens.push(new TWEEN.Tween(human.parts.footR.quaternion, this.tweenGroup).to(configuration.footR, time));
        tweens.push(new TWEEN.Tween(human.parts.toeR.quaternion, this.tweenGroup).to(configuration.toeR, time));
        tweens.push(new TWEEN.Tween(human.parts.upLegL.quaternion, this.tweenGroup).to(configuration.upLegL, time));
        tweens.push(new TWEEN.Tween(human.parts.legL.quaternion, this.tweenGroup).to(configuration.legL, time));
        tweens.push(new TWEEN.Tween(human.parts.footL.quaternion, this.tweenGroup).to(configuration.footL, time));
        tweens.push(new TWEEN.Tween(human.parts.toeL.quaternion, this.tweenGroup).to(configuration.toeL, time));

        tweens[0].onStart(() => {
            this.currentTween = configuration.name;
        })

        return tweens
    }
    setupTweenXYZ(configuration, time) {
        var human = this.human;
        var tweens = [];
        tweens.push(new TWEEN.Tween(human.parts.hips.rotation, this.tweenGroup).to(configuration.hips, time));
        tweens.push(new TWEEN.Tween(human.parts.spine.rotation, this.tweenGroup).to(configuration.spine, time));
        tweens.push(new TWEEN.Tween(human.parts.spine1.rotation, this.tweenGroup).to(configuration.spine1, time));
        tweens.push(new TWEEN.Tween(human.parts.spine2.rotation, this.tweenGroup).to(configuration.spine2, time));
        tweens.push(new TWEEN.Tween(human.parts.neck.rotation, this.tweenGroup).to(configuration.neck, time));
        tweens.push(new TWEEN.Tween(human.parts.head.rotation, this.tweenGroup).to(configuration.head, time));
        tweens.push(new TWEEN.Tween(human.parts.eyeR.rotation, this.tweenGroup).to(configuration.eyeR, time));
        tweens.push(new TWEEN.Tween(human.parts.eyeL.rotation, this.tweenGroup).to(configuration.eyeL, time));
        tweens.push(new TWEEN.Tween(human.parts.shoulderL.rotation, this.tweenGroup).to(configuration.shoulderL, time));
        tweens.push(new TWEEN.Tween(human.parts.armL.rotation, this.tweenGroup).to(configuration.armL, time));
        tweens.push(new TWEEN.Tween(human.parts.foreArmL.rotation, this.tweenGroup).to(configuration.foreArmL, time));
        tweens.push(new TWEEN.Tween(human.parts.handL.rotation, this.tweenGroup).to(configuration.handL, time));
        tweens.push(new TWEEN.Tween(human.parts.middleL1.rotation, this.tweenGroup).to(configuration.middleL1, time));
        tweens.push(new TWEEN.Tween(human.parts.middleL2.rotation, this.tweenGroup).to(configuration.middleL2, time));
        tweens.push(new TWEEN.Tween(human.parts.middleL3.rotation, this.tweenGroup).to(configuration.middleL3, time));
        tweens.push(new TWEEN.Tween(human.parts.thumbL1.rotation, this.tweenGroup).to(configuration.thumbL1, time));
        tweens.push(new TWEEN.Tween(human.parts.thumbL2.rotation, this.tweenGroup).to(configuration.thumbL2, time));
        tweens.push(new TWEEN.Tween(human.parts.thumbL3.rotation, this.tweenGroup).to(configuration.thumbL3, time));
        tweens.push(new TWEEN.Tween(human.parts.indexL1.rotation, this.tweenGroup).to(configuration.indexL1, time));
        tweens.push(new TWEEN.Tween(human.parts.indexL2.rotation, this.tweenGroup).to(configuration.indexL2, time));
        tweens.push(new TWEEN.Tween(human.parts.indexL3.rotation, this.tweenGroup).to(configuration.indexL3, time));
        tweens.push(new TWEEN.Tween(human.parts.ringL1.rotation, this.tweenGroup).to(configuration.ringL1, time));
        tweens.push(new TWEEN.Tween(human.parts.ringL2.rotation, this.tweenGroup).to(configuration.ringL2, time));
        tweens.push(new TWEEN.Tween(human.parts.ringL3.rotation, this.tweenGroup).to(configuration.ringL3, time));
        tweens.push(new TWEEN.Tween(human.parts.pinkyL1.rotation, this.tweenGroup).to(configuration.pinkyL1, time));
        tweens.push(new TWEEN.Tween(human.parts.pinkyL2.rotation, this.tweenGroup).to(configuration.pinkyL2, time));
        tweens.push(new TWEEN.Tween(human.parts.pinkyL3.rotation, this.tweenGroup).to(configuration.pinkyL3, time));
        tweens.push(new TWEEN.Tween(human.parts.shoulderR.rotation, this.tweenGroup).to(configuration.shoulderR, time));
        tweens.push(new TWEEN.Tween(human.parts.armR.rotation, this.tweenGroup).to(configuration.armR, time));
        tweens.push(new TWEEN.Tween(human.parts.foreArmR.rotation, this.tweenGroup).to(configuration.foreArmR, time));
        tweens.push(new TWEEN.Tween(human.parts.handR.rotation, this.tweenGroup).to(configuration.handR, time));
        tweens.push(new TWEEN.Tween(human.parts.middleR1.rotation, this.tweenGroup).to(configuration.middleR1, time));
        tweens.push(new TWEEN.Tween(human.parts.middleR2.rotation, this.tweenGroup).to(configuration.middleR2, time));
        tweens.push(new TWEEN.Tween(human.parts.middleR3.rotation, this.tweenGroup).to(configuration.middleR3, time));
        tweens.push(new TWEEN.Tween(human.parts.thumbR1.rotation, this.tweenGroup).to(configuration.thumbR1, time));
        tweens.push(new TWEEN.Tween(human.parts.thumbR2.rotation, this.tweenGroup).to(configuration.thumbR2, time));
        tweens.push(new TWEEN.Tween(human.parts.thumbR3.rotation, this.tweenGroup).to(configuration.thumbR3, time));
        tweens.push(new TWEEN.Tween(human.parts.indexR1.rotation, this.tweenGroup).to(configuration.indexR1, time));
        tweens.push(new TWEEN.Tween(human.parts.indexR2.rotation, this.tweenGroup).to(configuration.indexR2, time));
        tweens.push(new TWEEN.Tween(human.parts.indexR3.rotation, this.tweenGroup).to(configuration.indexR3, time));
        tweens.push(new TWEEN.Tween(human.parts.ringR1.rotation, this.tweenGroup).to(configuration.ringR1, time));
        tweens.push(new TWEEN.Tween(human.parts.ringR2.rotation, this.tweenGroup).to(configuration.ringR2, time));
        tweens.push(new TWEEN.Tween(human.parts.ringR3.rotation, this.tweenGroup).to(configuration.ringR3, time));
        tweens.push(new TWEEN.Tween(human.parts.pinkyR1.rotation, this.tweenGroup).to(configuration.pinkyR1, time));
        tweens.push(new TWEEN.Tween(human.parts.pinkyR2.rotation, this.tweenGroup).to(configuration.pinkyR2, time));
        tweens.push(new TWEEN.Tween(human.parts.pinkyR3.rotation, this.tweenGroup).to(configuration.pinkyR3, time));

        tweens.push(new TWEEN.Tween(human.parts.upLegR.rotation, this.tweenGroup).to(configuration.upLegR, time));
        tweens.push(new TWEEN.Tween(human.parts.legR.rotation, this.tweenGroup).to(configuration.legR, time));
        tweens.push(new TWEEN.Tween(human.parts.footR.rotation, this.tweenGroup).to(configuration.footR, time));
        tweens.push(new TWEEN.Tween(human.parts.toeR.rotation, this.tweenGroup).to(configuration.toeR, time));
        tweens.push(new TWEEN.Tween(human.parts.upLegL.rotation, this.tweenGroup).to(configuration.upLegL, time));
        tweens.push(new TWEEN.Tween(human.parts.legL.rotation, this.tweenGroup).to(configuration.legL, time));
        tweens.push(new TWEEN.Tween(human.parts.footL.rotation, this.tweenGroup).to(configuration.footL, time));
        tweens.push(new TWEEN.Tween(human.parts.toeL.rotation, this.tweenGroup).to(configuration.toeL, time));

        tweens[0].onStart(() => {
            this.currentTween = configuration.name;
        })

        return tweens
    }
    start(tweens) {
        for (var tween of tweens) {
            tween.start()
        }
    }
    stop(tweens) {
        for (var tween of tweens) {
            tween.stop()
        }

    }
    chain(tweens1, tweens2) {
        for (let i = 0; i < tweens1.length; i++) {
            tweens1[i].chain(tweens2[i]);
        }
    }
    update() {
        this.tweenGroup.update();
    }
}
export { HumanAnimator };